from flask import Blueprint, request, jsonify, send_file
from app.core.database import get_db
from app.api.middleware import jwt_required, admin_required
from app.core.rate_limiter import limiter
import json
import uuid
import os
import requests as http_requests
from datetime import datetime, timezone
from app.config import ATTACHMENTS_PATH, OUTBOUND_WORKER_URL, OUTBOUND_AUTH_SECRET

api_bp = Blueprint('api', __name__)

@api_bp.route('/health', methods=['GET'])
def health():
    db = get_db()
    db.close()
    return jsonify({"status": "ok", "version": "1.0.0", "db_size_bytes": 0})

@api_bp.route('/stats', methods=['GET'])
@admin_required
def stats():
    db = get_db()
    cur = db.cursor()
    cur.execute("SELECT COUNT(*) FROM messages")
    total_messages = cur.fetchone()[0]
    cur.execute("SELECT COUNT(*) FROM messages WHERE is_read=0")
    unread_count = cur.fetchone()[0]
    cur.execute("SELECT COUNT(*) FROM send_log")
    total_sent = cur.fetchone()[0]
    cur.execute("SELECT COUNT(*) FROM mailboxes")
    mailbox_count = cur.fetchone()[0]
    db.close()
    return jsonify({
        "total_messages": total_messages,
        "unread_count": unread_count,
        "total_sent": total_sent,
        "storage_bytes": 0,
        "mailbox_count": mailbox_count,
        "messages_today": 0,
        "sent_today": 0
    })

@api_bp.route('/mailboxes', methods=['GET'])
@admin_required
def get_mailboxes():
    db = get_db()
    cur = db.cursor()
    cur.execute("SELECT * FROM mailboxes")
    res = [dict(row) for row in cur.fetchall()]
    db.close()
    return jsonify(res)

@api_bp.route('/mailboxes', methods=['POST'])
@admin_required
def create_mailbox():
    data = request.json
    db = get_db()
    now = datetime.now(timezone.utc).isoformat()
    try:
        db.execute(
            "INSERT INTO mailboxes (address, display_name, domain, created_at, is_active) VALUES (?, ?, ?, ?, ?)",
            (data['address'], data.get('display_name', ''), data['domain'], now, 1)
        )
        for folder in ['Inbox', 'Sent', 'Drafts', 'Trash', 'Spam']:
            db.execute(
                "INSERT INTO folders (mailbox_address, name, system_folder, created_at) VALUES (?, ?, 1, ?)",
                (data['address'], folder, now)
            )
        db.commit()
    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 400
    finally:
        db.close()
    return jsonify({"status": "created"}), 201

@api_bp.route('/mailboxes/<address>', methods=['GET'])
@admin_required
def get_mailbox(address):
    db = get_db()
    cur = db.execute("SELECT * FROM mailboxes WHERE address=?", (address,))
    row = cur.fetchone()
    db.close()
    if row:
        return jsonify(dict(row))
    return jsonify({"error": "not found"}), 404

@api_bp.route('/mailboxes/<address>', methods=['DELETE'])
@admin_required
def delete_mailbox(address):
    db = get_db()
    db.execute("DELETE FROM mailboxes WHERE address=?", (address,))
    db.commit()
    db.close()
    return jsonify({"status": "deleted"})

@api_bp.route('/mailboxes/<address>', methods=['PATCH'])
@admin_required
def patch_mailbox(address):
    data = request.json
    if 'display_name' in data:
        db = get_db()
        db.execute("UPDATE mailboxes SET display_name=? WHERE address=?", (data['display_name'], address))
        db.commit()
        db.close()
    return jsonify({"status": "updated"})

def check_mailbox_access(address):
    if request.user.get('role') == 'admin':
        return True
    return address in request.user.get('mailboxes', [])

@api_bp.route('/mailboxes/<address>/messages', methods=['GET'])
@jwt_required
def get_messages(address):
    if not check_mailbox_access(address):
        return jsonify({"error": "forbidden"}), 403
    folder = request.args.get('folder', 'Inbox')
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 50))
    offset = (page - 1) * per_page
    
    db = get_db()
    cur = db.execute("SELECT id FROM folders WHERE mailbox_address=? AND name=?", (address, folder))
    folder_row = cur.fetchone()
    if not folder_row:
        db.close()
        return jsonify({"error": "folder not found"}), 404
        
    folder_id = folder_row['id']
    cur = db.execute("SELECT * FROM messages WHERE folder_id=? ORDER BY received_at DESC LIMIT ? OFFSET ?", (folder_id, per_page, offset))
    msgs = [dict(row) for row in cur.fetchall()]
    db.close()
    return jsonify(msgs)

@api_bp.route('/mailboxes/<address>/messages/<int:msg_id>', methods=['GET'])
@jwt_required
def get_message(address, msg_id):
    if not check_mailbox_access(address):
        return jsonify({"error": "forbidden"}), 403
    db = get_db()
    cur = db.execute("SELECT * FROM messages WHERE id=? AND mailbox_address=?", (msg_id, address))
    msg = cur.fetchone()
    if not msg:
        db.close()
        return jsonify({"error": "not found"}), 404
        
    res = dict(msg)
    cur = db.execute("SELECT * FROM attachments WHERE message_id=?", (msg_id,))
    res['attachments'] = [dict(row) for row in cur.fetchall()]
    db.close()
    return jsonify(res)

@api_bp.route('/mailboxes/<address>/messages/<int:msg_id>', methods=['DELETE'])
@jwt_required
def delete_message(address, msg_id):
    if not check_mailbox_access(address):
        return jsonify({"error": "forbidden"}), 403
    db = get_db()
    cur = db.execute("SELECT folder_id FROM messages WHERE id=? AND mailbox_address=?", (msg_id, address))
    msg = cur.fetchone()
    if not msg:
        db.close()
        return jsonify({"error": "not found"}), 404
        
    cur = db.execute("SELECT id FROM folders WHERE mailbox_address=? AND name=?", (address, 'Trash'))
    trash_id = cur.fetchone()['id']
    
    if msg['folder_id'] == trash_id:
        db.execute("DELETE FROM messages WHERE id=?", (msg_id,))
    else:
        db.execute("UPDATE messages SET folder_id=? WHERE id=?", (trash_id, msg_id))
        
    db.commit()
    db.close()
    return jsonify({"status": "deleted"})

@api_bp.route('/mailboxes/<address>/messages/<int:msg_id>', methods=['PATCH'])
@jwt_required
def patch_message(address, msg_id):
    if not check_mailbox_access(address):
        return jsonify({"error": "forbidden"}), 403
    data = request.json
    db = get_db()
    if 'is_read' in data:
        db.execute("UPDATE messages SET is_read=? WHERE id=? AND mailbox_address=?", (data['is_read'], msg_id, address))
    if 'is_starred' in data:
        db.execute("UPDATE messages SET is_starred=? WHERE id=? AND mailbox_address=?", (data['is_starred'], msg_id, address))
    if 'folder_id' in data:
        db.execute("UPDATE messages SET folder_id=? WHERE id=? AND mailbox_address=?", (data['folder_id'], msg_id, address))
    db.commit()
    db.close()
    return jsonify({"status": "updated"})

@api_bp.route('/mailboxes/<address>/messages/move', methods=['POST'])
@jwt_required
def bulk_move(address):
    if not check_mailbox_access(address):
        return jsonify({"error": "forbidden"}), 403
    data = request.json
    msg_ids = data.get('message_ids', [])
    folder_id = data.get('folder_id')
    db = get_db()
    for mid in msg_ids:
        db.execute("UPDATE messages SET folder_id=? WHERE id=? AND mailbox_address=?", (folder_id, mid, address))
    db.commit()
    db.close()
    return jsonify({"status": "moved"})

@api_bp.route('/mailboxes/<address>/messages/mark', methods=['POST'])
@jwt_required
def bulk_mark(address):
    if not check_mailbox_access(address):
        return jsonify({"error": "forbidden"}), 403
    data = request.json
    msg_ids = data.get('message_ids', [])
    is_read = data.get('is_read')
    db = get_db()
    for mid in msg_ids:
        db.execute("UPDATE messages SET is_read=? WHERE id=? AND mailbox_address=?", (is_read, mid, address))
    db.commit()
    db.close()
    return jsonify({"status": "marked"})

@api_bp.route('/mailboxes/<address>/folders', methods=['GET'])
@jwt_required
def get_folders(address):
    if not check_mailbox_access(address):
        return jsonify({"error": "forbidden"}), 403
    db = get_db()
    cur = db.execute("SELECT id, name, system_folder FROM folders WHERE mailbox_address=?", (address,))
    folders = [dict(row) for row in cur.fetchall()]
    for f in folders:
        cur = db.execute("SELECT COUNT(*) FROM messages WHERE folder_id=? AND is_read=0", (f['id'],))
        f['unread_count'] = cur.fetchone()[0]
    db.close()
    return jsonify(folders)

@api_bp.route('/mailboxes/<address>/folders', methods=['POST'])
@jwt_required
def create_folder(address):
    if not check_mailbox_access(address):
        return jsonify({"error": "forbidden"}), 403
    name = request.json.get('name')
    now = datetime.now(timezone.utc).isoformat()
    db = get_db()
    try:
        db.execute("INSERT INTO folders (mailbox_address, name, system_folder, created_at) VALUES (?, ?, 0, ?)", (address, name, now))
        db.commit()
    except Exception as e:
        db.rollback()
        db.close()
        return jsonify({"error": str(e)}), 400
    db.close()
    return jsonify({"status": "created"}), 201

@api_bp.route('/mailboxes/<address>/folders/<int:fid>', methods=['DELETE'])
@jwt_required
def delete_folder(address, fid):
    if not check_mailbox_access(address):
        return jsonify({"error": "forbidden"}), 403
    db = get_db()
    cur = db.execute("SELECT system_folder FROM folders WHERE id=? AND mailbox_address=?", (fid, address))
    row = cur.fetchone()
    if row and row['system_folder'] == 1:
        db.close()
        return jsonify({"error": "cannot delete system folder"}), 400
    db.execute("DELETE FROM folders WHERE id=? AND mailbox_address=?", (fid, address))
    db.commit()
    db.close()
    return jsonify({"status": "deleted"})

@api_bp.route('/mailboxes/<address>/search', methods=['GET'])
@jwt_required
def search_messages(address):
    if not check_mailbox_access(address):
        return jsonify({"error": "forbidden"}), 403
    q = request.args.get('q', '')
    folder = request.args.get('folder')
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 50))
    offset = (page - 1) * per_page
    
    db = get_db()
    query = """
        SELECT m.* FROM messages m
        JOIN messages_fts fts ON m.id = fts.rowid
        WHERE m.mailbox_address = ? AND messages_fts MATCH ?
    """
    params = [address, q]
    
    if folder:
        cur = db.execute("SELECT id FROM folders WHERE mailbox_address=? AND name=?", (address, folder))
        row = cur.fetchone()
        if row:
            query += " AND m.folder_id = ?"
            params.append(row['id'])
            
    query += " ORDER BY m.received_at DESC LIMIT ? OFFSET ?"
    params.extend([per_page, offset])
    
    cur = db.execute(query, params)
    msgs = [dict(row) for row in cur.fetchall()]
    db.close()
    return jsonify(msgs)

def _dispatch_send(address, data):
    allowed, reason = limiter.check_rate(address)
    if not allowed:
        return jsonify({"error": reason}), 429

    now = datetime.now(timezone.utc).isoformat()
    msg_id = f"<{uuid.uuid4()}@{address.split('@')[1]}>"

    worker_payload = {
        "from": address,
        "to": data.get('to', []),
        "cc": data.get('cc'),
        "bcc": data.get('bcc'),
        "subject": data.get('subject', ''),
        "text": data.get('text') or data.get('text_body', ''),
        "html": data.get('html') or data.get('html_body', ''),
        "replyTo": data.get('reply_to') or data.get('replyTo'),
        "inReplyTo": data.get('in_reply_to') or data.get('inReplyTo'),
        "references": data.get('references'),
        "messageId": msg_id
    }

    status = 'sent'
    error_msg = None
    worker_resp = None

    if OUTBOUND_WORKER_URL:
        try:
            resp = http_requests.post(
                OUTBOUND_WORKER_URL,
                json=worker_payload,
                headers={"Authorization": f"Bearer {OUTBOUND_AUTH_SECRET}"},
                timeout=30
            )
            worker_resp = resp.text
            if not resp.ok:
                status = 'failed'
                error_msg = resp.text
        except Exception as e:
            status = 'failed'
            error_msg = str(e)
    else:
        status = 'failed'
        error_msg = 'Outbound worker not configured'

    db = get_db()
    db.execute(
        "INSERT INTO send_log (message_id, from_address, to_addresses, subject, sent_at, status, error_message, worker_response) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        (msg_id, address, json.dumps(data.get('to', [])), data.get('subject', ''), now, status, error_msg, worker_resp)
    )

    if status == 'sent':
        limiter.record_send(address)
        cur = db.execute("SELECT id FROM folders WHERE mailbox_address=? AND name='Sent'", (address,))
        sent_folder = cur.fetchone()
        if sent_folder:
            db.execute("""
                INSERT INTO messages (
                    message_id, mailbox_address, folder_id, from_address, to_addresses, cc_addresses,
                    subject, text_body, html_body, sent_at, is_read, is_starred, is_draft,
                    in_reply_to, reference_ids, created_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 0, 0, ?, ?, ?)
            """, (
                msg_id, address, sent_folder['id'], address,
                json.dumps(data.get('to', [])), json.dumps(data.get('cc', [])),
                data.get('subject', ''), data.get('text') or data.get('text_body', ''), data.get('html') or data.get('html_body', ''),
                now, data.get('in_reply_to') or data.get('inReplyTo', ''), data.get('references', ''), now
            ))

    db.commit()
    db.close()

    if status == 'failed':
        return jsonify({"error": error_msg or "Send failed"}), 502
    return jsonify({"status": "sent", "message_id": msg_id})


@api_bp.route('/mailboxes/<address>/send', methods=['POST'])
@jwt_required
def send_email(address):
    if not check_mailbox_access(address):
        return jsonify({"error": "forbidden"}), 403
    return _dispatch_send(address, request.json)

@api_bp.route('/mailboxes/<address>/drafts', methods=['POST'])
@jwt_required
def create_draft(address):
    if not check_mailbox_access(address):
        return jsonify({"error": "forbidden"}), 403
    data = request.json
    db = get_db()
    cur = db.execute("SELECT id FROM folders WHERE mailbox_address=? AND name='Drafts'", (address,))
    folder_id = cur.fetchone()['id']
    now = datetime.now(timezone.utc).isoformat()
    
    cur = db.execute("""
        INSERT INTO messages (
            message_id, mailbox_address, folder_id, to_addresses, subject, text_body, html_body, is_draft, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?)
    """, (str(uuid.uuid4()), address, folder_id, json.dumps(data.get('to', [])), data.get('subject', ''), data.get('text_body', ''), data.get('html_body', ''), now))
    db.commit()
    draft_id = cur.lastrowid
    db.close()
    return jsonify({"status": "created", "id": draft_id})

@api_bp.route('/mailboxes/<address>/drafts/<int:did>', methods=['PUT'])
@jwt_required
def update_draft(address, did):
    if not check_mailbox_access(address):
        return jsonify({"error": "forbidden"}), 403
    data = request.json
    db = get_db()
    db.execute("""
        UPDATE messages SET to_addresses=?, subject=?, text_body=?, html_body=?
        WHERE id=? AND mailbox_address=? AND is_draft=1
    """, (json.dumps(data.get('to', [])), data.get('subject', ''), data.get('text_body', ''), data.get('html_body', ''), did, address))
    db.commit()
    db.close()
    return jsonify({"status": "updated"})

@api_bp.route('/mailboxes/<address>/drafts/<int:did>/send', methods=['POST'])
@jwt_required
def send_draft(address, did):
    if not check_mailbox_access(address):
        return jsonify({"error": "forbidden"}), 403
    db = get_db()
    cur = db.execute("SELECT * FROM messages WHERE id=? AND mailbox_address=? AND is_draft=1", (did, address))
    draft = cur.fetchone()
    db.close()
    if not draft:
        return jsonify({"error": "draft not found"}), 404
    draft = dict(draft)
    send_data = {
        "to": json.loads(draft.get('to_addresses') or '[]'),
        "subject": draft.get('subject', ''),
        "text_body": draft.get('text_body', ''),
        "html_body": draft.get('html_body', ''),
        "in_reply_to": draft.get('in_reply_to', ''),
        "references": draft.get('reference_ids', '')
    }
    result = _dispatch_send(address, send_data)
    if not isinstance(result, tuple):
        db = get_db()
        db.execute("DELETE FROM messages WHERE id=? AND mailbox_address=? AND is_draft=1", (did, address))
        db.commit()
        db.close()
    return result

@api_bp.route('/attachments/<int:aid>/download', methods=['GET'])
@jwt_required
def download_attachment(aid):
    db = get_db()
    cur = db.execute("SELECT * FROM attachments WHERE id=?", (aid,))
    att = cur.fetchone()
    if not att:
        db.close()
        return jsonify({"error": "not found"}), 404
        
    cur = db.execute("SELECT mailbox_address FROM messages WHERE id=?", (att['message_id'],))
    msg = cur.fetchone()
    if not msg or not check_mailbox_access(msg['mailbox_address']):
        db.close()
        return jsonify({"error": "forbidden"}), 403
        
    db.close()
    path = att['storage_path']
    if not os.path.abspath(path).startswith(os.path.abspath(ATTACHMENTS_PATH)):
        return jsonify({"error": "invalid path"}), 400
        
    return send_file(path, as_attachment=True, download_name=att['filename'], mimetype=att['content_type'])

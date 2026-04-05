from flask import Blueprint, request, jsonify
import hmac
import hashlib
import json
import os
from datetime import datetime, timezone
from app.config import WEBHOOK_SECRET, ATTACHMENTS_PATH
from app.core.database import get_db
from app.core.r2_client import fetch_email_from_r2, delete_from_r2
from app.core.mime_parser import parse_eml

webhook_bp = Blueprint('webhook', __name__)

def verify_signature(req):
    signature = req.headers.get('X-DockFlare-Signature')
    if not signature or not WEBHOOK_SECRET:
        return False
    body = req.get_data()
    expected = hmac.new(WEBHOOK_SECRET.encode(), body, hashlib.sha256).hexdigest()
    return hmac.compare_digest(signature, expected)

@webhook_bp.route('/inbound', methods=['POST'])
def inbound():
    if not verify_signature(request):
        return jsonify({"error": "invalid signature"}), 401
        
    data = request.json
    r2_key = data.get('r2_key')
    if not r2_key:
        return jsonify({"error": "missing r2_key"}), 400
        
    try:
        eml_bytes = fetch_email_from_r2(r2_key)
        parsed = parse_eml(eml_bytes)
        
        db = get_db()
        
        to_address = ''
        for addr in parsed['to_addresses']:
            cur = db.execute("SELECT address FROM mailboxes WHERE address=?", (addr,))
            if cur.fetchone():
                to_address = addr
                break
                
        if not to_address:
            db.close()
            return jsonify({"status": "ignored", "reason": "unknown recipient"}), 200
            
        cur = db.execute("SELECT id FROM folders WHERE mailbox_address=? AND name='Inbox'", (to_address,))
        folder_row = cur.fetchone()
        folder_id = folder_row['id'] if folder_row else None
        
        now = datetime.now(timezone.utc).isoformat()
        
        cur = db.execute("""
            INSERT INTO messages (
                message_id, mailbox_address, folder_id, from_address, from_name,
                to_addresses, cc_addresses, bcc_addresses, subject, text_body, html_body,
                received_at, is_read, is_starred, is_draft, in_reply_to, reference_ids,
                size_bytes, has_attachments, headers_json, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, 0, ?, ?, ?, ?, ?, ?)
        """, (
            parsed['message_id'], to_address, folder_id, parsed['from_address'], parsed['from_name'],
            json.dumps(parsed['to_addresses']), json.dumps(parsed['cc_addresses']), json.dumps(parsed['bcc_addresses']),
            parsed['subject'], parsed['text_body'], parsed['html_body'], parsed['received_at'],
            parsed['in_reply_to'], parsed['references'], data.get('size_bytes', 0),
            1 if parsed['attachments'] else 0, json.dumps(parsed['headers_json']), now
        ))
        msg_id = cur.lastrowid
        
        for att in parsed['attachments']:
            att_dir = os.path.join(ATTACHMENTS_PATH, str(msg_id))
            os.makedirs(att_dir, exist_ok=True)
            safe_filename = att['filename'].replace('/', '_').replace('\\', '_')
            att_path = os.path.join(att_dir, safe_filename)
            with open(att_path, 'wb') as f:
                f.write(att['data'])
                
            db.execute("""
                INSERT INTO attachments (
                    message_id, filename, content_type, size_bytes, storage_path, content_id, is_inline, created_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """, (msg_id, att['filename'], att['content_type'], att['size_bytes'], att_path, att['content_id'], att['is_inline'], now))
            
        db.commit()
        db.close()
        
        delete_from_r2(r2_key)
        
        return jsonify({"status": "success"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

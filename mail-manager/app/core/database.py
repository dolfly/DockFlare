import sqlite3
import os
import json
from app.config import DB_PATH

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = get_db()
    conn.execute('PRAGMA journal_mode=WAL')
    conn.executescript("""
        CREATE TABLE IF NOT EXISTS mailboxes (
            address TEXT PRIMARY KEY,
            display_name TEXT,
            domain TEXT,
            created_at TEXT,
            is_active INTEGER
        );
        CREATE TABLE IF NOT EXISTS folders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            mailbox_address TEXT,
            name TEXT,
            system_folder INTEGER,
            created_at TEXT,
            UNIQUE(mailbox_address, name),
            FOREIGN KEY(mailbox_address) REFERENCES mailboxes(address) ON DELETE CASCADE
        );
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            message_id TEXT UNIQUE,
            mailbox_address TEXT,
            folder_id INTEGER,
            from_address TEXT,
            from_name TEXT,
            to_addresses TEXT,
            cc_addresses TEXT,
            bcc_addresses TEXT,
            subject TEXT,
            text_body TEXT,
            html_body TEXT,
            received_at TEXT,
            sent_at TEXT,
            is_read INTEGER,
            is_starred INTEGER,
            is_draft INTEGER,
            in_reply_to TEXT,
            reference_ids TEXT,
            size_bytes INTEGER,
            has_attachments INTEGER,
            headers_json TEXT,
            created_at TEXT,
            FOREIGN KEY(mailbox_address) REFERENCES mailboxes(address) ON DELETE CASCADE,
            FOREIGN KEY(folder_id) REFERENCES folders(id) ON DELETE CASCADE
        );
        CREATE VIRTUAL TABLE IF NOT EXISTS messages_fts USING fts5(
            subject, from_address, from_name, to_addresses, text_body,
            tokenize='porter unicode61'
        );
        CREATE TABLE IF NOT EXISTS attachments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            message_id INTEGER,
            filename TEXT,
            content_type TEXT,
            size_bytes INTEGER,
            storage_path TEXT,
            content_id TEXT,
            is_inline INTEGER,
            created_at TEXT,
            FOREIGN KEY(message_id) REFERENCES messages(id) ON DELETE CASCADE
        );
        CREATE TABLE IF NOT EXISTS send_log (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            message_id TEXT,
            from_address TEXT,
            to_addresses TEXT,
            subject TEXT,
            sent_at TEXT,
            status TEXT,
            error_message TEXT,
            worker_response TEXT
        );
        CREATE TABLE IF NOT EXISTS bounce_log (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            original_message_id TEXT,
            bounce_type TEXT,
            recipient TEXT,
            reason TEXT,
            received_at TEXT
        );
        CREATE INDEX IF NOT EXISTS idx_messages_mailbox ON messages(mailbox_address);
        CREATE INDEX IF NOT EXISTS idx_messages_folder ON messages(folder_id);
        CREATE INDEX IF NOT EXISTS idx_messages_received ON messages(received_at DESC);
        CREATE INDEX IF NOT EXISTS idx_messages_read ON messages(is_read);
        CREATE INDEX IF NOT EXISTS idx_attachments_message ON attachments(message_id);
        CREATE INDEX IF NOT EXISTS idx_send_log_from ON send_log(from_address);
        
        DROP TRIGGER IF EXISTS messages_ai;
        CREATE TRIGGER messages_ai AFTER INSERT ON messages BEGIN
            INSERT INTO messages_fts(rowid, subject, from_address, from_name, to_addresses, text_body)
            VALUES (new.id, new.subject, new.from_address, new.from_name, new.to_addresses, new.text_body);
        END;
        DROP TRIGGER IF EXISTS messages_ad;
        CREATE TRIGGER messages_ad AFTER DELETE ON messages BEGIN
            DELETE FROM messages_fts WHERE rowid = old.id;
        END;
        DROP TRIGGER IF EXISTS messages_au;
        CREATE TRIGGER messages_au AFTER UPDATE ON messages BEGIN
            DELETE FROM messages_fts WHERE rowid = old.id;
            INSERT INTO messages_fts(rowid, subject, from_address, from_name, to_addresses, text_body)
            VALUES (new.id, new.subject, new.from_address, new.from_name, new.to_addresses, new.text_body);
        END;
    """)
    conn.commit()
    conn.close()

init_db()

import logging
from flask import Flask, render_template, request
import os

logging.basicConfig(level=logging.INFO, format='%(asctime)s [%(levelname)s] %(message)s')
app = Flask(__name__)
app.secret_key = os.urandom(24)
app.config['PREFERRED_URL_SCHEME'] = 'https'

@app.before_request
def detect_protocol():
    forwarded_proto = request.headers.get('X-Forwarded-Proto', '').lower()
    app.config['PREFERRED_URL_SCHEME'] = 'https' if forwarded_proto == 'https' or request.is_secure else 'http'

@app.after_request # <--- ADDED
def add_security_headers(response):
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'SAMEORIGIN'
    response.headers['X-XSS-Protection'] = '1; mode=block'
    forwarded_proto = request.headers.get('X-Forwarded-Proto', '').lower()
    is_https = forwarded_proto == 'https' or request.is_secure
    csp = (
        "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; "
        "script-src * 'unsafe-inline' 'unsafe-eval'; "
        "style-src * 'unsafe-inline'; "
        "img-src * data: blob:; "
        "font-src * data:; "
        "connect-src *; "
        "frame-src *; "
    )
    if is_https:
        csp += "upgrade-insecure-requests; "
    response.headers['Content-Security-Policy'] = csp
    response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
    if is_https:
        response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, X-Requested-With, Authorization'
    return response

@app.route('/')
def super_minimal_route():
    logging.info("Attempting to render super_minimal.html")
    try:
        return render_template('super_minimal.html')
    except Exception as e:
        logging.error(f"Error rendering super_minimal.html: {e}", exc_info=True)
        return "Error rendering template, check logs", 500

if __name__ == '__main__':
    logging.info("Starting SUPER MINIMAL Flask app for testing render_template.")
    app.run(host='0.0.0.0', port=5000, debug=True)
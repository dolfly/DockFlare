from flask import Flask
from .api.routes import api_bp
from .api.webhook import webhook_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object('app.config')
    app.register_blueprint(api_bp, url_prefix='/api/v1')
    app.register_blueprint(webhook_bp, url_prefix='/api/v1/webhook')
    return app

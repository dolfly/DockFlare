import threading
import boto3
from botocore.config import Config as BotoConfig
from app.config import config

_client = None
_lock = threading.Lock()


def get_client():
    global _client
    if _client is None:
        with _lock:
            if _client is None:
                _client = boto3.client(
                    's3',
                    endpoint_url=config.R2_ENDPOINT_URL,
                    aws_access_key_id=config.R2_ACCESS_KEY_ID,
                    aws_secret_access_key=config.R2_SECRET_ACCESS_KEY,
                    config=BotoConfig(signature_version='s3v4'),
                    region_name='auto'
                )
    return _client


def fetch_email_from_r2(r2_key):
    s3 = get_client()
    resp = s3.get_object(Bucket=config.R2_BUCKET_NAME, Key=r2_key)
    return resp['Body'].read()


def delete_from_r2(r2_key):
    s3 = get_client()
    s3.delete_object(Bucket=config.R2_BUCKET_NAME, Key=r2_key)

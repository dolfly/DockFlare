import boto3
from botocore.config import Config
from app.config import R2_ENDPOINT_URL, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME

def get_client():
    return boto3.client(
        's3',
        endpoint_url=R2_ENDPOINT_URL,
        aws_access_key_id=R2_ACCESS_KEY_ID,
        aws_secret_access_key=R2_SECRET_ACCESS_KEY,
        config=Config(signature_version='s3v4'),
        region_name='auto'
    )

def fetch_email_from_r2(r2_key):
    s3 = get_client()
    resp = s3.get_object(Bucket=R2_BUCKET_NAME, Key=r2_key)
    return resp['Body'].read()

def delete_from_r2(r2_key):
    s3 = get_client()
    s3.delete_object(Bucket=R2_BUCKET_NAME, Key=r2_key)

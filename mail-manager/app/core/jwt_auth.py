import jwt
from app.config import JWT_PUBLIC_KEY, JWT_ALGORITHM, JWT_ISSUER, JWT_AUDIENCE

def verify_jwt(token):
    try:
        decoded = jwt.decode(
            token,
            JWT_PUBLIC_KEY,
            algorithms=[JWT_ALGORITHM],
            issuer=JWT_ISSUER,
            audience=JWT_AUDIENCE
        )
        return decoded
    except Exception:
        return None

import jwt
from datetime import datetime, timedelta
import os

SECRET_KEY = os.getenv("SECRET_KEY")

def generate_token(user_id, expires_in=None): 
    expires_in = int(expires_in or os.getenv("JWT_EXPIRATION"))
    expiration_delta = timedelta(days=expires_in)
    payload = {
        "user_id": str(user_id),
        "exp": datetime.utcnow() + expiration_delta
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")

def verify_token(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

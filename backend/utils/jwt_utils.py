import jwt
from datetime import datetime, timedelta

SECRET_KEY = "your_secret_key_here"

def generate_token(user_id, expires_in=3600):
    payload = {
        "user_id": str(user_id),
        "exp": datetime.utcnow() + timedelta(seconds=expires_in)
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

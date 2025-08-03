from functools import wraps
from flask import request, jsonify
import jwt
import os

SECRET_KEY = os.getenv("SECRET_KEY")

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
       
        if "Authorization" in request.headers:
            auth_header = request.headers["Authorization"]
            
            if auth_header.startswith("Bearer"):
                token = auth_header.split(" ")[1]

        if not token:
            return jsonify({"error": "Token is missing!"}), 401

        try:
            data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            user_id = data.get("user_id")
            if not user_id:
                raise ValueError("Invalid token payload")
            # Inject user_id into the route
            return f(user_id=user_id, *args, **kwargs)
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token has expired!"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token!"}), 401
        except Exception as e:
            return jsonify({"error": str(e)}), 401

    return decorated

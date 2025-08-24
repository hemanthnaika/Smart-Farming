from flask import request, jsonify
from models.user_model import User
from flask_bcrypt import Bcrypt
from utils.jwt_utils import generate_token
from mongoengine import NotUniqueError
from mongoengine.errors import ValidationError

bcrypt = Bcrypt()
def register_user():
    try:
        name = request.form.get("fullName")
        email = request.form.get("email")
        password = request.form.get("password")

        if not all([name, email, password]):
            return jsonify({"success": False, "message": "All fields are required"}), 400

        if User.objects(email=email).first():
            return jsonify({"success": False, "message": "User already exists"}), 409

        hashed_pw = bcrypt.generate_password_hash(password).decode("utf-8")
        user = User(name=name, email=email, password=hashed_pw)
        user.save()

        token = generate_token(str(user.id))
        return jsonify({
            "success": True,
            "message": "User registered successfully",
            "token": token,
            "user": {
             
                "email": user.email,
                "name": user.name,
            }
        }), 201

    except Exception as error:
        return jsonify({"success": False, "message": str(error)}), 500


def login_user():
    try:
        email = request.form.get("email")
        password = request.form.get("password")

        user = User.objects(email=email).first()
        if not user:
            return jsonify({"success": False, "message": "User not found"}), 404

        if not bcrypt.check_password_hash(user.password, password):
            return jsonify({"success": False, "message": "Invalid Password"}), 401

        token = generate_token(str(user.id))
        return jsonify({
            "success": True,
            "message": "Login successful",
            "token": token,
            "user": {
                "email": user.email,
                "name": user.name,
            }
        }), 200

    except Exception as error:
        return jsonify({"success": False, "message": "Server Error", "error": str(error)}), 500

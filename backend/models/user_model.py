# models/user_model.py
from flask_mongoengine import MongoEngine
from datetime import datetime
import re

db = MongoEngine()

class User(db.Document):
    name = db.StringField(
        required=True,
        min_length=2,
        max_length=50,
        error_messages={
            'required': 'User Name is required',
            'min_length': 'Name must be at least 2 characters',
            'max_length': 'Name must be at most 50 characters',
        }
    )

    email = db.EmailField(
        required=True,
        unique=True,
        error_messages={
            'required': 'User Email is required',
            'unique': 'This email is already registered',
            'invalid': 'Please enter a valid email address',
        }
    )

    password = db.StringField(
        required=True,
        min_length=6,
        error_messages={
            'required': 'User Password is required',
            'min_length': 'Password must be at least 6 characters',
        }
    )

    is_admin = db.BooleanField(default=False)
    address = db.StringField()

    phone_number = db.StringField(
        regex=r'^\d{10}$',
        error_messages={
            'invalid': 'Please enter a valid 10-digit phone number'
        }
    )

    created_at = db.DateTimeField(default=datetime.utcnow)
    updated_at = db.DateTimeField(default=datetime.utcnow)
    meta = {
        'collection': 'users',
        'indexes': [
            {'fields': ['email'], 'unique': True},
            {'fields': ['created_at']},
            {'fields': ['updated_at']}
        ]
    }
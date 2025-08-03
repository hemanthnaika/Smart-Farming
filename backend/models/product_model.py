from mongoengine import Document, StringField, FloatField, IntField, ReferenceField
from datetime import datetime
from .user_model import User  # adjust import if needed

class Product(Document):
    user = ReferenceField(User, required=True)  # reference to user
    name = StringField(required=True, max_length=100)
    price = FloatField(required=True, min_value=0)
    quantity = IntField(required=True, min_value=1)
    location = StringField(required=True, max_length=100)
    contact = StringField(required=True, max_length=20)
    description = StringField(max_length=1000)
    category = StringField(required=True, max_length=50) 
    image = StringField()  
    created_at = StringField(default=str(datetime.utcnow()))

    meta = {
        'collection': 'products',
        'ordering': ['-created_at'],
        'indexes': ['user', 'location']
    }

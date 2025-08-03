# app.py
from flask import Flask, jsonify, request
from models.user_model import db, User

from routes.auth_routes import auth_bp
from flask_bcrypt import Bcrypt
from middlewares.error_handlers import register_error_handlers
from flask_cors import CORS
from routes.product_routes import product_routes
from dotenv import load_dotenv
from routes.fertilizer_routes import fertilizer_routes
import os


load_dotenv() 

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

app.config['MONGODB_SETTINGS'] = {
    'db': 'smartfarmdb',
    'host': os.getenv("MONGO_URI"),
}

db.init_app(app)
Bcrypt(app)




# Register routes
app.register_blueprint(auth_bp)
app.register_blueprint(product_routes)
app.register_blueprint(fertilizer_routes)



@app.route('/')
def home():
    return jsonify({'message': 'Welcome to the Smart Farming API!'})

register_error_handlers(app)


if __name__ == '__main__':
    app.run(debug=True)

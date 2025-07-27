# app.py
from flask import Flask, jsonify, request
from models.user_model import db, User

from routes.auth_routes import auth_bp
from flask_bcrypt import Bcrypt
from middlewares.error_handlers import register_error_handlers
from flask_cors import CORS
from routes.product_routes import product_routes

app = Flask(__name__)
CORS(app)


app.config['SECRET_KEY'] = 'your_secret_key_here'
app.config['MONGODB_SETTINGS'] = {
    'db': 'smartfarmdb',
    'host': 'mongodb+srv://localhost/test',

}

db.init_app(app)
Bcrypt(app)




# Register routes
app.register_blueprint(auth_bp)
app.register_blueprint(product_routes)






@app.route('/')
def home():
    return jsonify({'message': 'Welcome to the Smart Farming API!'})

register_error_handlers(app)


if __name__ == '__main__':
    app.run(debug=True)

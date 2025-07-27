from flask import request, jsonify
from models.product_model import Product
from models.user_model import User
import os

def add_product(user_id):
    try:
        # Get the user from DB
        user = User.objects(id=user_id).first()
        if not user:
            return jsonify({"error": "User not found"}), 404

        # Get form fields from request.form
        name = request.form.get("name")
        price = request.form.get("price")
        quantity = request.form.get("quantity")
        location = request.form.get("location")
        contact = request.form.get("contact")
        description = request.form.get("description", "")
        image_file = request.files.get("image")

        # Validate required fields
        if not all([name, price, quantity, location, contact]):
            return jsonify({"error": "All required fields must be filled."}), 400

        # Handle image file saving
        image_path = ""
        if image_file:
            upload_folder = "static/uploads/products"
            os.makedirs(upload_folder, exist_ok=True)
            image_path = os.path.join(upload_folder, image_file.filename)
            image_file.save(image_path)

        # Create and save product
        product = Product(
            user=user,
            name=name,
            price=price,
            quantity=quantity,
            location=location,
            contact=contact,
            description=description,
            image=image_path
        )
        product.save()

        return jsonify({"message": "Product added successfully", "product_id": str(product.id)}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500



def get_all_products():
    try:
        products = Product.objects().order_by("-id")  # latest first
        product_list = []

        for product in products:
            product_list.append({
                "id": str(product.id),
                "name": product.name,
                "price": product.price,
                "quantity": product.quantity,
                "location": product.location,
                "contact": product.contact,
                "description": product.description,
                "image": product.image,
                "user": {
                    "id": str(product.user.id),
                    "name": product.user.name,
                    "email": product.user.email
                }
            })

        return jsonify({"products": product_list}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


def update_product(user_id):
    try:
        user=User.objects(id=user_id).first()
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        
        

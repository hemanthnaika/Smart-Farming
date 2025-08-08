from flask import request, jsonify
from models.product_model import Product
from models.user_model import User
import os
import uuid
from bson.objectid import ObjectId

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
        category=request.form.get("category")
        unit=request.form.get("unit")

        if not category:
            return jsonify({"error": "Category is required"}), 400

        # Validate required fields
        if not all([name, price, quantity, location, contact,category,unit]):
            return jsonify({"error": "All required fields must be filled."}), 400

        # Handle image file saving
        image_path = ""
        if image_file:
             upload_folder = "static/uploads/products"
             os.makedirs(upload_folder, exist_ok=True)
             ext = os.path.splitext(image_file.filename)[1]
             new_filename = f"{uuid.uuid4().hex}{ext}"
             image_path = os.path.join(upload_folder, new_filename)
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
            image=image_path,
            category=category,
            unit=unit,
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
                "category": product.category,
                "unit": product.unit,
                "user": {
                    "id": str(product.user.id),
                    "name": product.user.name,
                    "email": product.user.email
                }
            })

        return jsonify({"products": product_list}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

def get_product(id):
    try:
        product = Product.objects.get(id=id)

        product_data = {
            "id": str(product.id),
            "name": product.name,
            "price": product.price,
            "quantity": product.quantity,
            "location": product.location,
            "contact": product.contact,
            "description": product.description,
            "image": product.image,
            "category":product.category,
            "unit": product.unit,
            "user": {
                "id": str(product.user.id),
                "name": product.user.name,
                "email": product.user.email
            }
        }

        return jsonify({"success": True, "product": product_data}), 200

    except Product.DoesNotExist:
        return jsonify({"success": False, "message": "Product not found"}), 404

    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500
        

def get_all_my_products(user_id):
    try:
        user = User.objects(id=user_id).first()
        if not user:
            return jsonify({"error": "User not found"}), 404

        products = Product.objects(user=user).order_by("-id")  # latest first
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
                "category":product.category,
                "unit": product.unit,
            })

        return jsonify({"products": product_list}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    



def update_product(product_id, user_id):
    try:
        # Find the product
        product = Product.objects(id=ObjectId(product_id)).first()
        if not product:
            return jsonify({"error": "Product not found"}), 404

        # Check if user is owner
        if str(product.user.id) != str(user_id):
            return jsonify({"error": "Unauthorized"}), 403

        # Get form data
        name = request.form.get("name")
        price = request.form.get("price")
        quantity = request.form.get("quantity")
        location = request.form.get("location")
        contact = request.form.get("contact")
        description = request.form.get("description", "")
        category = request.form.get("category")
        image_file = request.files.get("image")
        unit=request.form.get("unit")

        # Update fields after converting to correct types
        if name: product.name = name
        if price:
            try:
                product.price = float(price)
            except ValueError:
                return jsonify({"error": "Invalid price format"}), 400

        if quantity:
            try:
                product.quantity = int(quantity)
            except ValueError:
                return jsonify({"error": "Invalid quantity format"}), 400

        if location: product.location = location
        if contact: product.contact = contact
        if description: product.description = description
        if category: product.category = category
        if unit: product.unit = unit

        # Handle optional image upload
        if image_file and image_file.filename != "":
            upload_folder = "static/uploads/products"
            os.makedirs(upload_folder, exist_ok=True)
            ext = os.path.splitext(image_file.filename)[1]
            new_filename = f"{uuid.uuid4().hex}{ext}"
            image_path = os.path.join(upload_folder, new_filename)
            image_file.save(image_path)
            product.image = image_path

        product.save()
        return jsonify({"message": "Product updated successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500



def delete_product(product_id, user_id):
    try:
        product = Product.objects(id=ObjectId(product_id)).first()
        if not product:
            return jsonify({"error": "Product not found"}), 404

        if str(product.user.id) != str(user_id):
            return jsonify({"error": "Unauthorized"}), 403
        
        BASE_DIR = os.path.abspath(os.path.dirname(__file__))
        full_image_path = os.path.join(BASE_DIR, product.image)

        if product.image and os.path.exists(full_image_path):
            os.remove(full_image_path)

        # Delete the product from the database
        product.delete()
        return jsonify({"message": "Product deleted successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


def get_products_by_category():
    try:
        category = request.args.get("category")
        if not category:
            return jsonify({"error": "Category is required"}), 400

        products = Product.objects(category=category).order_by("-id")
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
                "category": product.category,
                "unit": product.unit,

                "user": {
                    "id": str(product.user.id),
                    "name": product.user.name,
                    "email": product.user.email
                }
            })

        return jsonify({"products": product_list}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
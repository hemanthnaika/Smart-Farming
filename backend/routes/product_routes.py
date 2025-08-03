from flask import Blueprint
from controllers.product_controller import add_product, get_all_products,get_product,get_all_my_products,update_product,delete_product,get_products_by_category

from middlewares.auth_middleware import token_required

product_routes = Blueprint("product_routes", __name__)

@product_routes.route("/add-product", methods=["POST"])
@token_required
def add_product_route(user_id):
    return add_product(user_id)
product_routes.route("/all-products", methods=["GET"])(get_all_products)
product_routes.route("/all-products/<string:id>", methods=["GET"])(get_product)
@product_routes.route("/products-by-category", methods=["GET"])
def get_category():
    return get_products_by_category()


# User Routes
@product_routes.route('/my-products', methods=["GET"])
@token_required
def get_my_products(user_id):
    return get_all_my_products(user_id)

@product_routes.route("/products/<string:product_id>", methods=["PUT"])
@token_required
def update_product_route(product_id,user_id):
    return update_product(product_id,user_id)


@product_routes.route("/delete-product/<string:product_id>", methods=["DELETE"])
@token_required
def delete_product_route(product_id, user_id):
    return delete_product(product_id, user_id)
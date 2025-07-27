from flask import Blueprint
from controllers.product_controller import add_product, get_all_products,update_product
from middlewares.auth_middleware import token_required

product_routes = Blueprint("product_routes", __name__)

@product_routes.route("/add-product", methods=["POST"])
@token_required
def add_product_route(user_id):
    return add_product(user_id)

product_routes.route("/all-products", methods=["GET"])(get_all_products)

@product_routes.route("/update-product",methods=["POST"])
@token_required
def update_product_route(user_id):
    return update_product(user_id)
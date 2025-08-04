from flask import Blueprint
from controllers.crop_controller import detect_disease
crop_routes = Blueprint("crop_routes", __name__)

@crop_routes.route("/predict-crop-disease", methods=["POST"])
def handle_prediction():
    return detect_disease()
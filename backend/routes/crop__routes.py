from flask import Blueprint, request, jsonify
fertilizer_routes = Blueprint("crop_routes", __name__)

@fertilizer_routes.route("/predict-fertilizer", methods=["POST"])
def handle_prediction():
    return detect_disease()
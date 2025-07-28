from flask import Blueprint, request, jsonify
from controllers.fertilizer_controller import predict

fertilizer_routes = Blueprint("fertilizer_routes", __name__)

@fertilizer_routes.route("/predict-fertilizer", methods=["POST"])
def handle_prediction():
    return predict()

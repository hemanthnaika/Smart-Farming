from flask import Blueprint, request, jsonify
from Predict.predict_controller import run_prediction

def predict():
    try:
        data = request.form
        soil = int(data.get("soil"))
        crop = int(data.get("crop"))
        temp = float(data.get("temperature"))
        humidity = float(data.get("humidity"))
        moisture = float(data.get("moisture"))

        result = run_prediction(temp, humidity, moisture, soil, crop)
        return jsonify(result)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 400
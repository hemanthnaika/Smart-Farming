from flask import Flask, request, jsonify
import pandas as pd
import joblib
import os

MODEL_PATH = r"F:\project\smart_farming\backend\model\fertilizer_recommender.joblib"
if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f"Model file not found at {MODEL_PATH}")

model = joblib.load(MODEL_PATH)


def recommend_fertilizer(nitrogen, potassium, phosphorous, soil_type, crop_type):
    input_df = pd.DataFrame([{
        "Nitrogen": nitrogen,
        "Potassium": potassium,
        "Phosphorous": phosphorous,
        "Soil Type": soil_type,
        "Crop Type": crop_type
    }])
    prediction = model.predict(input_df)[0]
    return prediction


def predict():
    try:
        data = request.get_json()

        nitrogen = float(data.get("nitrogen"))
        potassium = float(data.get("potassium"))
        phosphorous = float(data.get("phosphorous"))
        soil_type = data.get("soil_type")
        crop_type = data.get("crop_type")

        result = recommend_fertilizer(nitrogen, potassium, phosphorous, soil_type, crop_type)

        return jsonify({"recommended_fertilizer": result})

    except Exception as e:
        return jsonify({"error": str(e)}), 400
import pandas as pd
import joblib

import os

base_dir = os.path.dirname(os.path.abspath(__file__))

model_dir = os.path.join(base_dir, "..", "model")

npk_model = joblib.load(os.path.join(model_dir, "npk_predictor.pkl"))
fertilizer_classifier = joblib.load(os.path.join(model_dir, "fertilizer_model.pkl"))
fertilizer_encoder = joblib.load(os.path.join(model_dir, "label_encoder.pkl"))

def run_prediction(temp, humidity, moisture, soil, crop):
   
    user_input = pd.DataFrame([{
        "Temparature": temp,
        "Humidity ": humidity,
        "Moisture": moisture,
        "Soil Type": soil,
        "Crop Type": crop
    }])

  
    predicted_npk = npk_model.predict(user_input)[0]
    n_val, k_val, p_val = [round(x, 2) for x in predicted_npk]

   
    fertilizer_input = user_input.copy()
    fertilizer_input["Nitrogen"] = n_val
    fertilizer_input["Potassium"] = k_val
    fertilizer_input["Phosphorous"] = p_val

    fertilizer_label = fertilizer_classifier.predict(fertilizer_input)[0]
    fertilizer_name = fertilizer_encoder.inverse_transform([fertilizer_label])[0]

    return {
        "nitrogen": n_val,
        "potassium": k_val,
        "phosphorous": p_val,
        "fertilizer": fertilizer_name
    }

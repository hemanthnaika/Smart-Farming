from flask import  request, jsonify
import os
import json
from PIL import Image
import numpy as np
import tensorflow as tf 
import os

# Get the current directory of the file
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "..", "model", "plant_disease_prediction_model.h5")

# Load class indices
# Load class indices and convert keys to int
with open(os.path.join(BASE_DIR, "..", "model", "class_indices.json")) as f:
    class_indices = json.load(f)
    class_indices = {int(k): v for k, v in class_indices.items()}

model = tf.keras.models.load_model(MODEL_PATH)




def load_and_preprocess_image(image_path, target_size=(224, 224)):
    img = Image.open(image_path)
    img = img.resize(target_size)
    img_array = np.array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array.astype('float32') / 255.0
    return img_array


def detect_disease():
    print("Class Indices:", class_indices)
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    image = request.files['image']
    upload_folder = "static/uploads/crops"
    os.makedirs(upload_folder, exist_ok=True)
    save_path = os.path.join(upload_folder, image.filename)
    image.save(save_path)

    try:
        img_array = load_and_preprocess_image(save_path)
        prediction = model.predict(img_array)
        predicted_index = np.argmax(prediction, axis=1)[0]
        predicted_class = class_indices.get(predicted_index, "Unknown")

        return jsonify({'result': predicted_class})
    except Exception as e:
        print(e)
        return jsonify({'error': 'Prediction failed', 'message': str(e)}), 500

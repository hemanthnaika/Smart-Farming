from flask import request, jsonify
import io
from PIL import Image
import numpy as np
import tensorflow as tf
import os, json

# Get the current directory of the file
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "..", "model", "plant_disease_prediction_model.h5")

# Load class indices
with open(os.path.join(BASE_DIR, "..", "model", "class_indices.json")) as f:
    class_indices = json.load(f)
    class_indices = {int(k): v for k, v in class_indices.items()}

# Load treatment/solution file
with open(os.path.join(BASE_DIR, "..", "model", "solution.json")) as f:
    solutions = json.load(f)

# Load model
model = tf.keras.models.load_model(MODEL_PATH)


def load_and_preprocess_image(image_file, target_size=(224, 224)):
    img = Image.open(image_file)  # file-like object
    img = img.resize(target_size)
    img_array = np.array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array.astype('float32') / 255.0
    return img_array


def detect_disease():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    image_file = request.files['image']

    try:
        # Load directly from memory (without saving)
        img_array = load_and_preprocess_image(io.BytesIO(image_file.read()))

        prediction = model.predict(img_array)
        predicted_index = np.argmax(prediction, axis=1)[0]
        predicted_class = class_indices.get(predicted_index, "Unknown")

        confidence = float(np.max(prediction) * 100)

        # Fetch solution if available
        solution_text = solutions.get(predicted_class, "No treatment information available.")

        return jsonify({
            'result': predicted_class,
            'accuracy': round(confidence, 2),
            'solution': solution_text
        })

    except Exception as e:
        print("Prediction Error:", e)
        return jsonify({'error': 'Prediction failed', 'message': str(e)}), 500

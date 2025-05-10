from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import os

app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": "http://localhost:5173"}})

# Load the model
MODEL_PATH = "fabric_model.h5"
model = tf.keras.models.load_model(MODEL_PATH)
print(f"✅ Model loaded successfully from: {MODEL_PATH}")

# Define class names (adjust if needed)
class_names = ['defective', 'normal']

def preprocess_image(image_bytes):
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = img.resize((224, 224))  # Make sure this matches your training size
    img_array = np.array(img) / 255.0  # Normalize
    return np.expand_dims(img_array, axis=0)

@app.route("/predict", methods=["POST"])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    filename = file.filename
    image_bytes = file.read()
    print(f"🖼️ Received image: {filename}")

    try:
        img_tensor = preprocess_image(image_bytes)
        predictions = model.predict(img_tensor)
        predicted_index = np.argmax(predictions)
        confidence = float(np.max(predictions) * 100)

        result = {
            "filename": filename,
            "prediction": class_names[predicted_index],
            "confidence": round(confidence, 2)
        }

        print(f"🔍 Prediction: {result['prediction']}")
        print(f"📈 Confidence: {result['confidence']}%")

        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
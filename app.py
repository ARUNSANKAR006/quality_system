from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from PIL import Image
from flask_cors import CORS
import json

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load trained model
model = tf.keras.models.load_model('defect_detection_model.h5')

# Load class indices (e.g., {"normal": 0, "defective": 1})
with open('class_indices.json', 'r') as f:
    class_indices = json.load(f)

# Reverse to get index → label mapping
index_to_label = {v: k for k, v in class_indices.items()}

# Preprocessing function
def preprocess_image(file, target_size=(128, 128)):  # change to (224, 224) if needed
    img = Image.open(file).convert('RGB')
    img = img.resize(target_size)
    img_array = np.array(img) / 255.0  # Normalize
    img_array = np.expand_dims(img_array, axis=0)  # (1, H, W, 3)
    return img_array

# Prediction route
@app.route('/predict', methods=['POST'])
def predict():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400

        file = request.files['file']
        print("Received file:", file.filename)

        img_array = preprocess_image(file)

        predictions = model.predict(img_array)
        predicted_index = np.argmax(predictions[0])
        confidence = float(predictions[0][predicted_index])
        predicted_label = index_to_label[predicted_index]

        print(f"Prediction: {predicted_label}, Confidence: {confidence}")
        return jsonify({
            'prediction': predicted_label,
            'confidence': round(confidence, 4)
        })

    except Exception as e:
        print("Error during prediction:", str(e))
        return jsonify({'error': str(e)}), 500

# Run the server
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

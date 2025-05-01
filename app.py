from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import io

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the trained model
model = tf.keras.models.load_model('defect_detection_model.h5')

# Set class names (based on alphabetical order of folders)
class_names = ['defective', 'normal']

def preprocess_image(image_bytes):
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = img.resize((128, 128))  # match model input size
    img_array = np.array(img) / 255.0  # normalize
    img_array = np.expand_dims(img_array, axis=0)  # batch dimension
    return img_array

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    print(f"✅ Received file: {file.filename}")

    try:
        img_array = preprocess_image(file.read())

        # Get prediction
        pred = model.predict(img_array)
        confidence = float(pred[0][0])

        # Use threshold to decide label
        if confidence < 0.5:
            label = class_names[0]  # defective
            confidence = 1 - confidence
        else:
            label = class_names[1]  # normal

        print(f"🔍 Prediction: {label}, Confidence: {confidence:.4f}")

        return jsonify({
            'prediction': label,
            'confidence': round(confidence, 4)
        })

    except Exception as e:
        print("❌ Error during prediction:", str(e))
        return jsonify({'error': 'Prediction failed'}), 500

if __name__ == '__main__':
    app.run(debug=True)

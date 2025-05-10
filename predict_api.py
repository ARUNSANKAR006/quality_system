from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import os
import cv2

app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": "http://localhost:5173"}})

# Load the model safely
try:
    MODEL_PATH = "fabric_model.h5"
    model = tf.keras.models.load_model(MODEL_PATH)
    print(f"✅ Model loaded successfully from: {MODEL_PATH}")
except Exception as e:
    print(f"❌ Error loading model: {str(e)}")
    model = None

# Define class names
class_names = ['defective', 'normal']

# Save folder
STATIC_FOLDER = 'static'
os.makedirs(STATIC_FOLDER, exist_ok=True)

def preprocess_image(image_bytes):
    try:
        img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        img = img.resize((224, 224))
        img_array = np.array(img) / 255.0
        return np.expand_dims(img_array, axis=0), img
    except Exception as e:
        raise ValueError(f"Error processing image: {e}")

def generate_gradcam(model, img_array, last_conv_layer_name="out_relu"):
    try:
        # Directly get the correct convolution layer from full model
        last_conv_layer = model.get_layer(last_conv_layer_name)

        grad_model = tf.keras.models.Model(
            [model.inputs], [last_conv_layer.output, model.output]
        )

        with tf.GradientTape() as tape:
            conv_outputs, predictions = grad_model(img_array)
            predicted_index = tf.argmax(predictions[0])
            predicted_output = predictions[:, predicted_index]

        grads = tape.gradient(predicted_output, conv_outputs)[0]
        pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))
        conv_outputs = conv_outputs[0]
        heatmap = conv_outputs @ pooled_grads[..., tf.newaxis]
        heatmap = tf.squeeze(heatmap)

        heatmap = np.maximum(heatmap, 0) / (tf.math.reduce_max(heatmap) + tf.keras.backend.epsilon())
        heatmap = cv2.resize(heatmap.numpy(), (224, 224))
        heatmap = np.uint8(255 * heatmap)
        heatmap = cv2.applyColorMap(heatmap, cv2.COLORMAP_JET)

        return heatmap
    except Exception as e:
        raise RuntimeError(f"Error generating Grad-CAM: {e}")

@app.route("/predict", methods=["POST"])
def predict():
    if model is None:
        return jsonify({"error": "Model not loaded properly"}), 500

    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    filename = file.filename
    image_bytes = file.read()
    print(f"🖼️ Received image: {filename}")

    try:
        img_tensor, original_img = preprocess_image(image_bytes)
        predictions = model.predict(img_tensor)
        predicted_index = np.argmax(predictions)
        confidence = float(np.max(predictions) * 100)

        # Save uploaded image
        image_path = os.path.join(STATIC_FOLDER, filename)
        original_img.save(image_path)

        # Generate Grad-CAM
        heatmap = generate_gradcam(model, img_tensor)
        heatmap_image = cv2.cvtColor(np.array(original_img.resize((224, 224))), cv2.COLOR_RGB2BGR)
        superimposed_img = cv2.addWeighted(heatmap_image, 0.6, heatmap, 0.4, 0)
        heatmap_path = os.path.join(STATIC_FOLDER, f"heatmap_{filename}")
        cv2.imwrite(heatmap_path, superimposed_img)

        result = {
            "filename": filename,
            "prediction": class_names[predicted_index],
            "confidence": round(confidence, 2),
            "image_path": f"/static/{filename}",
            "heatmap_path": f"/static/heatmap_{filename}"
        }

        print(f"🔍 Prediction: {result['prediction']}")
        print(f"📈 Confidence: {result['confidence']}%")

        return jsonify(result)

    except Exception as e:
        print(f"❌ Error in prediction: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)

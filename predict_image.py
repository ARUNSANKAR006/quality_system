import cv2
import numpy as np
from tensorflow.keras.models import load_model
import os
import json

# Load the trained model
model = load_model("defect_detection_model.h5")

# Load class indices
with open("class_indices.json", "r") as f:
    class_indices = json.load(f)
    class_names = {v: k for k, v in class_indices.items()}  # Reverse the dictionary

# Preprocess the image before prediction
def preprocess_image(img_path):
    if not os.path.exists(img_path):
        raise FileNotFoundError(f"❌ Image not found: {img_path}")
    
    img = cv2.imread(img_path)
    if img is None:
        raise ValueError(f"❌ Failed to read image: {img_path}. Ensure it is a valid image file.")
    
    img = cv2.resize(img, (128, 128))
    img = img.astype('float32') / 255.0  # Normalize pixel values
    img = np.expand_dims(img, axis=0)   # Add batch dimension
    return img

# Run prediction and show result
def predict(img_path):
    try:
        img = preprocess_image(img_path)
        prediction = model.predict(img)[0][0]
        print(f"[DEBUG] Raw prediction score: {prediction:.4f}")

        predicted_class = 1 if prediction > 0.5 else 0
        label = class_names[predicted_class]
        confidence = prediction if predicted_class == 1 else 1 - prediction
        
        print(f"🔍 Prediction: {label.upper()} (Confidence: {confidence:.2f})")
    
    except Exception as e:
        print(f"❌ Error: {e}")

# === Main ===
# Replace this with your image file path
test_image_path ="dataset/train/defective/defective_10.jpg"
predict(test_image_path)

import cv2
import numpy as np
from tensorflow.keras.models import load_model
import os
import json

model = load_model("defect_detection_model.h5")

with open("class_indices.json", "r") as f:
    class_indices = json.load(f)
    class_names = {v: k for k, v in class_indices.items()}

def preprocess_image(img_path):
    if not os.path.exists(img_path):
        raise FileNotFoundError(f"❌ Image not found: {img_path}")
    
    img = cv2.imread(img_path)
    if img is None:
        raise ValueError(f"❌ Failed to read image: {img_path}. Ensure it is a valid image file.")
    
    img = cv2.resize(img, (128, 128))
    img = img.astype('float32') / 255.0
    img = np.expand_dims(img, axis=0)
    return img

def predict(img_path):
    try:
        img = preprocess_image(img_path)
        prediction = model.predict(img)[0]

        if prediction.shape == ():  # Single value (binary sigmoid)
            predicted_class = 1 if prediction > 0.5 else 0
            confidence = prediction if predicted_class == 1 else 1 - prediction
        else:  # Multi-class (softmax)
            predicted_class = np.argmax(prediction)
            confidence = prediction[predicted_class]

        label = class_names[predicted_class]
        print(f"🔍 Prediction: {label.upper()} (Confidence: {confidence:.2f})")

    except Exception as e:
        print(f"❌ Error: {e}")

# === Main ===
test_image_path = "dataset/train/defective/defective_10.jpg"
predict(test_image_path)

import json
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# Path to your training dataset directory
train_data_dir = "dataset/train"

# ImageDataGenerator setup
datagen = ImageDataGenerator(rescale=1./255)

# Load images from directory (same parameters as training)
train_generator = datagen.flow_from_directory(
    train_data_dir,
    target_size=(128, 128),
    batch_size=32,
    class_mode='binary'  # or 'categorical' if you have more than 2 classes
)

# Get the class indices mapping
class_indices = train_generator.class_indices
print(f"[INFO] class_indices: {class_indices}")

# Save it as a JSON file
with open("class_indices.json", "w") as f:
    json.dump(class_indices, f)
    print("✅ Saved class_indices.json")

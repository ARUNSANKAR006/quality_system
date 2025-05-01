import os

base_path = "dataset"
folders = [
    "train/normal", "train/defective",
    "val/normal", "val/defective"
]

for folder in folders:
    os.makedirs(os.path.join(base_path, folder), exist_ok=True)

print("✅ Dataset folders created. Now add images to them.")

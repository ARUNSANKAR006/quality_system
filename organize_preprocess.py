import os
import shutil
import random
from tqdm import tqdm
from PIL import Image

# CONFIGURATION
RAW_DATASET_DIR = "dataset_raw"
OUTPUT_DIR = "dataset"
CLASSES = ["defective", "normal"]
SPLIT_RATIOS = {"train": 0.7, "val": 0.15, "test": 0.15}
IMAGE_SIZE = (224, 224)  # Resize image if needed
RESIZE_IMAGES = True     # Set to False if you don't want resizing

def create_dirs():
    for split in SPLIT_RATIOS:
        for cls in CLASSES:
            path = os.path.join(OUTPUT_DIR, split, cls)
            os.makedirs(path, exist_ok=True)

def split_data():
    create_dirs()

    for cls in CLASSES:
        files = os.listdir(os.path.join(RAW_DATASET_DIR, cls))
        files = [f for f in files if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
        random.shuffle(files)

        total = len(files)
        train_end = int(SPLIT_RATIOS['train'] * total)
        val_end = train_end + int(SPLIT_RATIOS['val'] * total)

        splits = {
            "train": files[:train_end],
            "val": files[train_end:val_end],
            "test": files[val_end:]
        }

        for split in splits:
            for i, filename in enumerate(tqdm(splits[split], desc=f"{cls} -> {split}")):
                src = os.path.join(RAW_DATASET_DIR, cls, filename)
                dst_filename = f"{cls}_{split}_{i+1}.jpg"
                dst = os.path.join(OUTPUT_DIR, split, cls, dst_filename)

                if RESIZE_IMAGES:
                    try:
                        img = Image.open(src)
                        img = img.resize(IMAGE_SIZE)
                        img.save(dst)
                    except Exception as e:
                        print(f"Failed to process {src}: {e}")
                else:
                    shutil.copy2(src, dst)

if __name__ == "__main__":
    split_data()
    print("✅ Dataset organized successfully!")

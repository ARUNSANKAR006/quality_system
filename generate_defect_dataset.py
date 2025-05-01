import cv2
import numpy as np
import os
import random

# Create folders
os.makedirs('dataset/normal', exist_ok=True)
os.makedirs('dataset/defective', exist_ok=True)

def generate_normal_image(path, index):
    img = np.ones((128, 128, 3), dtype=np.uint8) * random.randint(180, 255)
    cv2.imwrite(f"{path}/normal_{index}.jpg", img)

def generate_defective_image(path, index):
    img = np.ones((128, 128, 3), dtype=np.uint8) * random.randint(180, 255)
    
    # Draw random lines (scratches)
    for _ in range(random.randint(1, 4)):
        x1, y1 = random.randint(0, 127), random.randint(0, 127)
        x2, y2 = random.randint(0, 127), random.randint(0, 127)
        color = (random.randint(0, 50), random.randint(0, 50), random.randint(0, 50))
        cv2.line(img, (x1, y1), (x2, y2), color, thickness=random.randint(1, 3))
    
    # Add random circular spots
    for _ in range(random.randint(1, 3)):
        center = (random.randint(0, 127), random.randint(0, 127))
        radius = random.randint(3, 8)
        cv2.circle(img, center, radius, (0, 0, 0), -1)

    cv2.imwrite(f"{path}/defective_{index}.jpg", img)

# Generate 200 normal and 200 defective images
for i in range(200):
    generate_normal_image('dataset/normal', i)
    generate_defective_image('dataset/defective', i)

print(" Synthetic dataset created in 'dataset/' folder.")

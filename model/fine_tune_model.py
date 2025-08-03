import os
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import GlobalAveragePooling2D, Dense
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import ModelCheckpoint

# --- Paths and Constants ---
DATA_DIR = 'data/'  # Structure: data/eco/, data/non_eco/
MODEL_PATH = 'eco_model.h5'  # Previously trained model
IMG_SIZE = (224, 224)
BATCH_SIZE = 16
EPOCHS = 5  # Fine-tune for few epochs with low learning rate

# --- Data Preparation ---
datagen = ImageDataGenerator(rescale=1./255, validation_split=0.2)

train_gen = datagen.flow_from_directory(
    DATA_DIR,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='binary',
    subset='training'
)

val_gen = datagen.flow_from_directory(
    DATA_DIR,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='binary',
    subset='validation'
)

# --- Load and Unfreeze Model ---
print("🔁 Loading previously trained model...")
model = load_model(MODEL_PATH)

# Optional: Unfreeze some of the base model layers (fine-tune last blocks)
print("🔓 Unfreezing selected layers for fine-tuning...")
for layer in model.layers[0].layers[-20:]:  # last 20 layers
    layer.trainable = True

# --- Compile with Low LR ---
model.compile(
    optimizer=Adam(learning_rate=1e-5),  # Lower learning rate for fine-tuning
    loss='binary_crossentropy',
    metrics=['accuracy']
)

# --- Fine-tune ---
checkpoint = ModelCheckpoint(
    "eco_model_finetuned.h5",
    monitor="val_accuracy",
    save_best_only=True,
    verbose=1
)

print("🚀 Fine-tuning started...")
model.fit(
    train_gen,
    validation_data=val_gen,
    epochs=EPOCHS,
    callbacks=[checkpoint]
)

print("✅ Fine-tuning complete. Model saved as 'eco_model_finetuned.h5'")

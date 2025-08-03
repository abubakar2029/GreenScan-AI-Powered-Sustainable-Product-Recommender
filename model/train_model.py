from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import GlobalAveragePooling2D, Dense
from tensorflow.keras.optimizers import Adam

# Step 1: Set up data paths and basic preprocessing
datagen = ImageDataGenerator(
    rescale=1./255,          # Normalize pixel values
    validation_split=0.2     # 20% of data for validation
)

# Step 2: Load training images
train_gen = datagen.flow_from_directory(
    'data/',                 # This folder must contain eco/ and non_eco/
    target_size=(224, 224),  # Resize all images to 224x224
    batch_size=16,
    class_mode='binary',     # Because we have 2 classes
    subset='training'
)

# Step 3: Load validation images
val_gen = datagen.flow_from_directory(
    'data/',
    target_size=(224, 224),
    batch_size=16,
    class_mode='binary',
    subset='validation'
)

# Step 4: Load pre-trained MobileNetV2 (without the top classifier)
base_model = MobileNetV2(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
base_model.trainable = False  # Freeze all pre-trained layers

# Step 5: Add custom classification head
model = Sequential([
    base_model,
    GlobalAveragePooling2D(),
    Dense(1, activation='sigmoid')  # Binary classification
])

# Step 6: Compile the model
model.compile(optimizer=Adam(), loss='binary_crossentropy', metrics=['accuracy'])

# Step 7: Train the base model (frozen)
model.fit(train_gen, validation_data=val_gen, epochs=5)

# Step 8: Fine-tune top layers
base_model.trainable = True
for layer in base_model.layers[:-20]:  # Freeze all except last 20 layers
    layer.trainable = False

model.compile(optimizer=Adam(learning_rate=1e-5), loss='binary_crossentropy', metrics=['accuracy'])

# Step 9: Train again with fine-tuning
model.fit(train_gen, validation_data=val_gen, epochs=5)

# Step 10: Save the model
model.save('fine_tuned_mobilenetv2.h5')
print("✅ Model saved as fine_tuned_mobilenetv2.h5")

import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import sys

# Load the trained model
model = load_model('fine_tuned_mobilenetv2.h5')

# Function to predict
def predict_eco(img_path):
    # Load and preprocess the image
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    # Make prediction
    prediction = model.predict(img_array)[0][0]

    # Print result
    print(f"Eco Confidence Score: {prediction:.4f}")
    print("Eco Friendly ✅" if prediction >= 0.5 else "Not Eco Friendly ❌")

# Get image path from command-line argument or input
if __name__ == '__main__':
    if len(sys.argv) > 1:
        img_path = sys.argv[1]
    else:
        img_path = input("Enter path to image: ")

    predict_eco(img_path)

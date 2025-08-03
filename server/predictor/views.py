from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework import status
from PIL import Image
import random

@api_view(['POST'])
@parser_classes([MultiPartParser])
def predict_image(request):
    image = request.FILES.get('image')
    if not image:
        return Response({"error": "No image uploaded"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        img = Image.open(image)  # Optional: Validate it's a valid image
        # 🔮 TODO: Add real ML model prediction logic here

        # For demo, randomly decide eco-friendliness
        score = random.randint(30, 95)
        label = "Eco-Friendly" if score > 60 else "Not Eco-Friendly"
        suggestion = "Try to reduce plastic packaging." if score < 60 else "Keep it up!"

        return Response({
            "label": label,
            "score": score,
            "suggestion": suggestion
        })

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

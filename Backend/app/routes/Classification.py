from fastapi import APIRouter, File, UploadFile, HTTPException
from pydantic import BaseModel
from typing import List
from PIL import Image
import numpy as np
import tensorflow as tf
import json
import os
import io
import time

from tensorflow.keras.applications.resnet50 import preprocess_input

router = APIRouter()

# =========================
# 📦 Response Schemas
# =========================

class ModelPrediction(BaseModel):
    model_name: str
    prediction: str
    confidence: float
    inference_time_ms: float

class PredictResponse(BaseModel):
    filename: str
    results: List[ModelPrediction]


# =========================
# 📁 Load Models + Classes
# =========================

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

from .model_loader import download_model

cnn_path = download_model("eurosat_model.keras")
resnet_path = download_model("transferlearnig_model.keras")
class_path = download_model("class_names.json")

cnn_model = tf.keras.models.load_model(cnn_path)
resnet_model = tf.keras.models.load_model(resnet_path)

with open(class_path, "r") as f:
    class_names = json.load(f)


# =========================
# 🧠 Preprocessing Functions
# =========================

def preprocess_cnn(image: Image.Image):
    """Preprocessing for CNN (64x64, normalized)"""
    img = image.resize((64, 64))
    arr = np.array(img).astype("float32") / 255.0
    return np.expand_dims(arr, axis=0)


def preprocess_resnet(image: Image.Image):
    """Preprocessing for ResNet (160x160 + preprocess_input)"""
    img = image.resize((160, 160))
    arr = np.array(img).astype("float32")
    arr = np.expand_dims(arr, axis=0)
    return preprocess_input(arr)


# =========================
# 🔮 Prediction Function
# =========================

def predict(model, img_array):
    start = time.time()
    preds = model.predict(img_array, verbose=0)
    inference_time = (time.time() - start) * 1000
    
    idx = int(np.argmax(preds))
    confidence = float(np.max(preds))
    label = class_names[idx]

    return label, confidence, inference_time


# =========================
# 🌐 API Endpoint
# =========================

@router.post("/predict", response_model=PredictResponse)
async def predict_image(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Uploaded file must be an image")

    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid image file")

    results = []

    # CNN Prediction
    cnn_input = preprocess_cnn(image)
    label_cnn, conf_cnn, time_cnn = predict(cnn_model, cnn_input)
    results.append(ModelPrediction(
        model_name="CNN (64x64)",
        prediction=label_cnn,
        confidence=round(conf_cnn * 100, 2),
        inference_time_ms=round(time_cnn, 2)
    ))

    # ResNet Prediction
    resnet_input = preprocess_resnet(image)
    label_resnet, conf_resnet, time_resnet = predict(resnet_model, resnet_input)
    results.append(ModelPrediction(
        model_name="ResNet50 (Transfer Learning)",
        prediction=label_resnet,
        confidence=round(conf_resnet * 100, 2),
        inference_time_ms=round(time_resnet, 2)
    ))

    return {
        "filename": file.filename,
        "results": results
    }
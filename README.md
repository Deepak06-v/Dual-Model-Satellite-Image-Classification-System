# 🌍 Dual-Model Satellite Image Classification System

A full-stack machine learning application that classifies satellite images using two different deep learning approaches and compares their performance in real time.

---

## 🧠 Overview

This project demonstrates the difference between:

* A **Custom CNN model** trained from scratch
* A **Transfer Learning model (ResNet50)** fine-tuned on the same dataset

Instead of just predicting labels, the system **compares both models** to highlight:

* Confidence differences
* Speed (inference time)
* Agreement vs disagreement

---

## ⚙️ Tech Stack

### 🧠 Machine Learning

* TensorFlow / Keras
* Custom CNN
* ResNet50 (Transfer Learning)

### 🖥️ Backend

* FastAPI
* REST API for inference

### 🎨 Frontend

* React
* Dynamic UI with model comparison

---

## 🔄 How It Works

1. User uploads a satellite image

2. Image is processed through **two separate pipelines**:

   * CNN → resized to 64×64 + normalized
   * ResNet50 → resized to 160×160 + preprocess_input

3. Both models generate:

   * Predicted class
   * Confidence score
   * Inference time

4. Results are displayed side-by-side with:

   * Confidence visualization
   * Agreement/disagreement indicator
   * Insight summary

---

## 🧪 Features

* 🔁 **Dual-model comparison system**
* ⚡ Real-time inference using FastAPI
* 📊 Confidence-based visualization
* ⚠️ Agreement vs Disagreement detection
* 🧠 Insight generation (accuracy vs speed trade-off)
* 🎯 Clean and intuitive UI

---

## 📸 Example Output

* CNN Prediction: **Forest (99.17%)**
* ResNet50 Prediction: **Pasture (98.56%)**

⚠️ Models disagree → highlights real-world ambiguity in classification

---

## 🧠 Key Learnings

* Transfer learning improves feature extraction and generalization
* Different architectures behave differently on similar inputs
* Confidence does not always imply correctness
* Proper preprocessing is critical for each model
* UI plays a major role in making ML outputs interpretable

---

## ⚠️ Important Note

Each model uses a **different preprocessing pipeline**, and mixing them will lead to incorrect predictions.

---

## 📁 Project Structure

```
project/
│
├── backend/
│   ├── models/
│   ├── routes/
│   └── main.py
│
├── frontend/
│   ├── components/
│   ├── pages/
│   └── App.js
│
└── README.md
```

---

## 🚀 Run Locally

### Backend

```
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend

```
cd frontend
npm install
npm start
```

---

## 🌟 Future Improvements

* Grad-CAM visualization for explainability
* Model confidence calibration
* Support for more architectures
* Deployment with cloud inference

---

## 📌 Conclusion

This project goes beyond simple classification by building a **comparison system** that helps understand how different deep learning models behave on the same data.

---

## 👨‍💻 Author

Developed as part of hands-on learning in Machine Learning and Full-Stack AI systems.
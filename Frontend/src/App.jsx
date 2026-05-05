import React, { useState } from 'react'
import Header from './components/Header'
import UploadSection from './components/UploadSection'
import ImagePreview from './components/ImagePreview'
import ModelCard from './components/ModelCard'
import ComparisonResult from './components/ComparisonResult'
import ModelInfo from './components/ModelInfo'
import './App.css'

const App = () => {
  const [image, setImage] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  const [fileName, setFileName] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [predictions, setPredictions] = useState(null)
  const [error, setError] = useState(null)

  const handleImageSelect = async (file) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file')
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setImageUrl(e.target.result)
    }
    reader.readAsDataURL(file)

    setImage(file)
    setFileName(file.name)
    setError(null)

    // Send to API
    await sendPredictionRequest(file)
  }

  const sendPredictionRequest = async (file) => {
    setIsLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('http://localhost:8000/cnn/predict', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      // Transform the backend response to frontend format
      const transformedData = {
        cnn: null,
        resnet: null,
      }

      if (data.results && Array.isArray(data.results)) {
        data.results.forEach((result) => {
          if (result.model_name.includes('CNN')) {
            transformedData.cnn = {
              prediction: result.prediction,
              confidence: result.confidence,
              inference_time: result.inference_time_ms,
            }
          } else if (result.model_name.includes('ResNet')) {
            transformedData.resnet = {
              prediction: result.prediction,
              confidence: result.confidence,
              inference_time: result.inference_time_ms,
            }
          }
        })
      }

      setPredictions(transformedData)
    } catch (err) {
      console.error('Error:', err)
      setError('Failed to get predictions. Make sure the backend server is running at http://localhost:8000')
      setPredictions(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="app">
      <Header />

      <main className="container">
        <UploadSection onImageSelect={handleImageSelect} isLoading={isLoading} />

        {error && (
          <div className="error-message">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <p>{error}</p>
          </div>
        )}

        {imageUrl && <ImagePreview imageUrl={imageUrl} fileName={fileName} />}

        {imageUrl && (
          <section className="predictions-section">
            <div className="cards-grid">
              <ModelCard
                modelName="CNN Model"
                prediction={predictions?.cnn?.prediction || null}
                confidence={predictions?.cnn?.confidence || null}
                inferenceTime={predictions?.cnn?.inference_time || null}
                isLoading={isLoading}
              />
              <ModelCard
                modelName="ResNet50 Model"
                prediction={predictions?.resnet?.prediction || null}
                confidence={predictions?.resnet?.confidence || null}
                inferenceTime={predictions?.resnet?.inference_time || null}
                isLoading={isLoading}
              />
            </div>

            {predictions && (
              <ComparisonResult
                cnnData={predictions.cnn}
                resnetData={predictions.resnet}
              />
            )}
          </section>
        )}

        <ModelInfo />
      </main>
    </div>
  )
}

export default App
import React from 'react'

const ModelCard = ({ modelName, prediction, confidence, inferenceTime, isLoading }) => {
  const getConfidenceColor = (conf) => {
    if (conf >= 80) return 'high'
    if (conf >= 60) return 'medium'
    return 'low'
  }

  const getConfidenceLabel = (conf) => {
    if (conf >= 80) return 'High'
    if (conf >= 60) return 'Medium'
    return 'Low'
  }

  const confidenceColor = getConfidenceColor(confidence || 0)
  const confidenceLabel = getConfidenceLabel(confidence || 0)

  return (
    <div className="model-card">
      <div className="card-header">
        <h3 className="model-name">{modelName}</h3>
      </div>

      {isLoading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Analyzing image...</p>
        </div>
      ) : prediction ? (
        <div className="card-content">
          <div className="prediction-class">
            {prediction.toUpperCase()}
          </div>

          <div className="confidence-section">
            <div className="confidence-display">
              <span className="confidence-value">{confidence}%</span>
              <span className="confidence-label">Confidence</span>
            </div>
            <div className={`confidence-bar confidence-${confidenceColor}`}>
              <div className="confidence-fill" style={{ width: `${confidence}%` }}></div>
            </div>
            <div className="confidence-interpretation">
              {confidenceLabel}
            </div>
          </div>

          {inferenceTime && (
            <div className="inference-time">
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>{inferenceTime} ms</span>
            </div>
          )}
        </div>
      ) : (
        <div className="empty-state">
          <p>Upload an image to see predictions</p>
        </div>
      )}
    </div>
  )
}

export default ModelCard

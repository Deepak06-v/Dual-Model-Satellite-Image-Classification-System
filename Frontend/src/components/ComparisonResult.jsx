import React from 'react'

const ComparisonResult = ({ cnnData, resnetData }) => {
  if (!cnnData || !resnetData || !cnnData.prediction || !resnetData.prediction) {
    return null
  }

  const same = cnnData.prediction === resnetData.prediction
  const cnnConfidence = cnnData.confidence || 0
  const resnetConfidence = resnetData.confidence || 0
  const cnnTime = cnnData.inference_time || 0
  const resnetTime = resnetData.inference_time || 0

  const higherConfidence = cnnConfidence > resnetConfidence ? 'CNN' : resnetConfidence > cnnConfidence ? 'ResNet50' : 'equal'
  const fasterModel = cnnTime < resnetTime ? 'CNN' : resnetTime < cnnTime ? 'ResNet50' : 'equal'

  // Generate natural language insight based on logic
  let insightText = ''
  if (higherConfidence === 'CNN' && fasterModel === 'CNN') {
    insightText = 'CNN shows higher confidence and is faster.'
  } else if (higherConfidence === 'ResNet50' && fasterModel === 'ResNet50') {
    insightText = 'ResNet50 shows higher confidence and is faster.'
  } else if (higherConfidence === 'CNN' && fasterModel === 'ResNet50') {
    insightText = 'CNN shows higher confidence, while ResNet50 is faster.'
  } else if (higherConfidence === 'ResNet50' && fasterModel === 'CNN') {
    insightText = 'ResNet50 shows higher confidence, while CNN is faster.'
  } else if (higherConfidence === 'equal' && fasterModel !== 'equal') {
    insightText = fasterModel === 'CNN' ? 'Models have equal confidence, CNN is faster.' : 'Models have equal confidence, ResNet50 is faster.'
  } else if (fasterModel === 'equal' && higherConfidence !== 'equal') {
    insightText = higherConfidence === 'CNN' ? 'CNN shows higher confidence with equal speed.' : 'ResNet50 shows higher confidence with equal speed.'
  } else {
    insightText = 'Models show similar performance.'
  }

  return (
    <section className="comparison-section">
      <div className="comparison-card">
        {!same && (
          <div className="disagreement-alert">
            <svg className="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <div className="disagreement-content">
              <h4 className="disagreement-title">Models Disagree</h4>
              <p className="disagreement-detail">
                CNN predicts <strong>{cnnData.prediction.toUpperCase()}</strong>, while ResNet50 predicts <strong>{resnetData.prediction.toUpperCase()}</strong>
              </p>
            </div>
          </div>
        )}

        {same && (
          <div className="agreement-alert">
            <svg className="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <div className="agreement-content">
              <h4 className="agreement-title">Models Agree</h4>
              <p className="agreement-detail">
                Both models predict <strong>{cnnData.prediction.toUpperCase()}</strong>
              </p>
            </div>
          </div>
        )}

        <div className="comparison-insights">
          <p className="insights-text">{insightText}</p>
        </div>
      </div>
    </section>
  )
}

export default ComparisonResult

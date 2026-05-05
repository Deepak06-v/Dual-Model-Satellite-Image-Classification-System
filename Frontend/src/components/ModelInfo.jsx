import React from 'react'

const ModelInfo = () => {
  return (
    <section className="info-section">
      <div className="info-grid">
        <div className="info-card">
          <h4 className="info-title">CNN Model</h4>
          <ul className="info-list">
            <li>Built from scratch</li>
            <li>Input size: 64x64</li>
            <li>Faster inference</li>
            <li>Lightweight architecture</li>
          </ul>
        </div>

        <div className="info-card">
          <h4 className="info-title">ResNet50 Model</h4>
          <ul className="info-list">
            <li>Pretrained on ImageNet</li>
            <li>Transfer learning</li>
            <li>Better feature extraction</li>
            <li>Fine-tuned for satellite imagery</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default ModelInfo

import React from 'react'

const ImagePreview = ({ imageUrl, fileName }) => {
  if (!imageUrl) {
    return null
  }

  return (
    <section className="preview-section">
      <div className="preview-container">
        <img src={imageUrl} alt="Preview" className="preview-image" />
        {fileName && <p className="preview-filename">{fileName}</p>}
      </div>
    </section>
  )
}

export default ImagePreview

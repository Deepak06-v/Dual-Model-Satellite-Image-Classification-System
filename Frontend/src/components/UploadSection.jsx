import React, { useRef } from 'react'

const UploadSection = ({ onImageSelect, isLoading }) => {
  const fileInputRef = useRef(null)
  const dropAreaRef = useRef(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (dropAreaRef.current) {
      dropAreaRef.current.classList.add('drag-over')
    }
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (dropAreaRef.current) {
      dropAreaRef.current.classList.remove('drag-over')
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (dropAreaRef.current) {
      dropAreaRef.current.classList.remove('drag-over')
    }

    const files = e.dataTransfer.files
    if (files && files[0]) {
      onImageSelect(files[0])
    }
  }

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      onImageSelect(e.target.files[0])
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <section className="upload-section">
      <div
        className="upload-area"
        ref={dropAreaRef}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        role="button"
        tabIndex="0"
      >
        <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" y1="3" x2="12" y2="15"></line>
        </svg>
        <h3 className="upload-title">Upload Satellite Image</h3>
        <p className="upload-text">Drag and drop your image or click to browse</p>
        <p className="upload-hint">Supported formats: JPG, PNG</p>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/jpg"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
        disabled={isLoading}
      />
    </section>
  )
}

export default UploadSection

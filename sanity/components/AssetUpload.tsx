/**
 * Enhanced Asset Upload Component
 * 
 * Provides enhanced drag and drop functionality with:
 * - Visual feedback during drag operations
 * - File validation with clear error messages
 * - Upload progress indication
 * - File type and size validation
 */

import React, { useState, useCallback } from 'react'
import { validateAssetUpload, FILE_SIZE_LIMITS, SUPPORTED_MIME_TYPES } from '../lib/assetConfig'

interface AssetUploadProps {
  onUpload: (file: File) => void
  acceptedTypes: 'image' | 'audio' | 'video'
  maxSize?: number
  className?: string
  children?: React.ReactNode
}

export const AssetUpload: React.FC<AssetUploadProps> = ({
  onUpload,
  acceptedTypes,
  maxSize,
  className = '',
  children
}) => {
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    setUploadError(null)

    const files = Array.from(e.dataTransfer.files)
    if (files.length === 0) return

    const file = files[0] // Handle single file upload
    
    // Validate file
    const validation = validateAssetUpload(file, acceptedTypes)
    if (!validation.isValid) {
      setUploadError(validation.errors.join(', '))
      return
    }

    // Start upload
    setIsUploading(true)
    try {
      onUpload(file)
    } catch (error) {
      setUploadError('Upload failed. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }, [onUpload, acceptedTypes])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const file = files[0]
    
    // Validate file
    const validation = validateAssetUpload(file, acceptedTypes)
    if (!validation.isValid) {
      setUploadError(validation.errors.join(', '))
      return
    }

    // Start upload
    setIsUploading(true)
    setUploadError(null)
    try {
      onUpload(file)
    } catch (error) {
      setUploadError('Upload failed. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }, [onUpload, acceptedTypes])

  const getAcceptAttribute = () => {
    return SUPPORTED_MIME_TYPES[acceptedTypes].join(',')
  }

  const getMaxSizeText = () => {
    const sizeInMB = Math.round((maxSize || FILE_SIZE_LIMITS[acceptedTypes]) / (1024 * 1024))
    return `${sizeInMB}MB`
  }

  const getFileTypeText = () => {
    switch (acceptedTypes) {
      case 'image':
        return 'images (JPEG, PNG, WebP, GIF, SVG)'
      case 'audio':
        return 'audio files (MP3, WAV, AAC, FLAC)'
      case 'video':
        return 'video files (MP4, WebM, MOV)'
      default:
        return 'files'
    }
  }

  return (
    <div className={`asset-upload ${className}`}>
      <div
        className={`
          upload-zone
          ${isDragOver ? 'drag-over' : ''}
          ${isUploading ? 'uploading' : ''}
          ${uploadError ? 'error' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept={getAcceptAttribute()}
          onChange={handleFileSelect}
          className="file-input"
          disabled={isUploading}
        />
        
        <div className="upload-content">
          {isUploading ? (
            <div className="upload-progress">
              <div className="spinner" />
              <p>Uploading...</p>
            </div>
          ) : (
            <>
              <div className="upload-icon">
                {acceptedTypes === 'image' && '🖼️'}
                {acceptedTypes === 'audio' && '🎵'}
                {acceptedTypes === 'video' && '🎬'}
              </div>
              <p className="upload-text">
                Drag and drop {getFileTypeText()} here, or click to browse
              </p>
              <p className="upload-limit">
                Maximum file size: {getMaxSizeText()}
              </p>
            </>
          )}
        </div>

        {children}
      </div>

      {uploadError && (
        <div className="upload-error">
          <span className="error-icon">⚠️</span>
          <span className="error-text">{uploadError}</span>
        </div>
      )}

      <style jsx>{`
        .asset-upload {
          width: 100%;
        }

        .upload-zone {
          position: relative;
          border: 2px dashed #ccc;
          border-radius: 8px;
          padding: 2rem;
          text-align: center;
          transition: all 0.3s ease;
          background: #fafafa;
          cursor: pointer;
        }

        .upload-zone:hover {
          border-color: #007acc;
          background: #f0f8ff;
        }

        .upload-zone.drag-over {
          border-color: #007acc;
          background: #e6f3ff;
          transform: scale(1.02);
        }

        .upload-zone.uploading {
          border-color: #28a745;
          background: #f0fff4;
          cursor: not-allowed;
        }

        .upload-zone.error {
          border-color: #dc3545;
          background: #fff5f5;
        }

        .file-input {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
        }

        .file-input:disabled {
          cursor: not-allowed;
        }

        .upload-content {
          pointer-events: none;
        }

        .upload-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .upload-text {
          font-size: 1.1rem;
          font-weight: 500;
          color: #333;
          margin-bottom: 0.5rem;
        }

        .upload-limit {
          font-size: 0.9rem;
          color: #666;
        }

        .upload-progress {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .spinner {
          width: 2rem;
          height: 2rem;
          border: 3px solid #f3f3f3;
          border-top: 3px solid #007acc;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .upload-error {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 1rem;
          padding: 0.75rem;
          background: #fff5f5;
          border: 1px solid #fed7d7;
          border-radius: 4px;
          color: #c53030;
        }

        .error-icon {
          font-size: 1.2rem;
        }

        .error-text {
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  )
}

export default AssetUpload
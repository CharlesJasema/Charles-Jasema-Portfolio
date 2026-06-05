/**
 * Enhanced Asset Upload Configuration for Sanity CMS
 * 
 * This configuration enhances the asset upload capabilities with:
 * - Drag and drop support
 * - File size limits
 * - MIME type validation
 * - Automatic optimization settings
 */

// File size limits (in bytes)
export const FILE_SIZE_LIMITS = {
  // Images: 10MB limit for high-quality photos
  image: 10 * 1024 * 1024,
  
  // Audio: 50MB limit for high-quality audio files
  audio: 50 * 1024 * 1024,
  
  // Video: 500MB limit for video files (as specified in requirements)
  video: 500 * 1024 * 1024,
  
  // General files: 100MB limit
  file: 100 * 1024 * 1024
}

// Supported MIME types
export const SUPPORTED_MIME_TYPES = {
  image: [
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'image/webp',
    'image/gif',
    'image/svg+xml'
  ],
  audio: [
    'audio/mpeg',     // MP3
    'audio/wav',      // WAV
    'audio/mp4',      // M4A
    'audio/aac',      // AAC
    'audio/ogg',      // OGG
    'audio/flac'      // FLAC
  ],
  video: [
    'video/mp4',      // MP4
    'video/webm',     // WebM
    'video/quicktime', // MOV
    'video/x-msvideo', // AVI
    'video/mpeg'      // MPEG
  ]
}

// Asset validation function
export const validateAssetUpload = (file: File, type: 'image' | 'audio' | 'video') => {
  const errors: string[] = []
  
  // Check file size
  const maxSize = FILE_SIZE_LIMITS[type]
  if (file.size > maxSize) {
    const maxSizeMB = Math.round(maxSize / (1024 * 1024))
    errors.push(`File size must be less than ${maxSizeMB}MB`)
  }
  
  // Check MIME type
  const supportedTypes = SUPPORTED_MIME_TYPES[type]
  if (!supportedTypes.includes(file.type)) {
    errors.push(`File type ${file.type} is not supported. Supported types: ${supportedTypes.join(', ')}`)
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Enhanced image field configuration
export const enhancedImageField = {
  type: 'image' as const,
  options: {
    hotspot: true,
    metadata: ['blurhash', 'lqip', 'palette'] as ['blurhash', 'lqip', 'palette'],
    accept: SUPPORTED_MIME_TYPES.image.join(','),
    storeOriginalFilename: true
  },
  validation: (Rule: any) => Rule.custom((image: any) => {
    if (!image?.asset) return true
    
    // Additional validation can be added here
    return true
  })
}

// Enhanced audio field configuration  
export const enhancedAudioField = {
  type: 'file' as const,
  options: {
    accept: SUPPORTED_MIME_TYPES.audio.join(','),
    storeOriginalFilename: true
  },
  validation: (Rule: any) => Rule.custom((file: any) => {
    if (!file?.asset) return true
    
    // Additional validation can be added here
    return true
  })
}

// Enhanced video field configuration
export const enhancedVideoField = {
  type: 'file' as const,
  options: {
    accept: SUPPORTED_MIME_TYPES.video.join(','),
    storeOriginalFilename: true
  },
  validation: (Rule: any) => Rule.custom((file: any) => {
    if (!file?.asset) return true
    
    // Additional validation can be added here  
    return true
  })
}

// Asset optimization settings for Sanity CDN
export const imageOptimizationConfig = {
  // Default image quality (0-100)
  quality: 85,
  
  // Auto format selection (WebP/AVIF when supported)
  auto: 'format' as const,
  
  // Responsive image breakpoints
  breakpoints: [320, 640, 768, 1024, 1280, 1536, 1920],
  
  // Default blur placeholder settings
  blur: {
    amount: 50,
    brightness: 1
  }
}

// Helper function to generate responsive image URLs
export const generateResponsiveImageUrls = (imageUrl: string) => {
  const baseUrl = imageUrl.split('?')[0]
  
  return imageOptimizationConfig.breakpoints.map(width => ({
    width,
    url: `${baseUrl}?w=${width}&q=${imageOptimizationConfig.quality}&auto=${imageOptimizationConfig.auto}`
  }))
}

// Asset upload progress tracking
export interface UploadProgress {
  loaded: number
  total: number
  percentage: number
  status: 'uploading' | 'processing' | 'complete' | 'error'
  error?: string
}

// Enhanced asset upload configuration for Studio
export const studioAssetConfig = {
  // Enable drag and drop
  enableDragAndDrop: true,
  
  // Show upload progress
  showUploadProgress: true,
  
  // Auto-generate alt text for images
  autoGenerateAltText: false, // Keep false to encourage manual alt text
  
  // Asset source plugins (can be extended)
  sources: [
    // Default Sanity asset source
    {
      name: 'sanity-default',
      title: 'Upload'
    }
    // Additional sources like Unsplash, Pexels can be added here
  ]
}
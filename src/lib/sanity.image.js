// Sanity Image Utils - JavaScript Version
// Note: Sanity dependencies removed for initial build compatibility

// Mock image builder for build compatibility
const createMockImageBuilder = () => {
  const mockBuilder = {
    url: () => '/images/professional/charles-jasema-professional.jpg',
    width: () => mockBuilder,
    height: () => mockBuilder,
    auto: () => mockBuilder,
    quality: () => mockBuilder,
    format: () => mockBuilder,
    blur: () => mockBuilder
  }
  return mockBuilder
}

/**
 * Generate optimized image URL from Sanity image source
 */
function urlFor(source) {
  return createMockImageBuilder()
}

/**
 * Get responsive image URLs for different screen sizes
 */
function getResponsiveImageUrls(source, options = {}) {
  const fallback = '/images/professional/charles-jasema-professional.jpg'
  return {
    mobile: fallback,
    tablet: fallback,
    desktop: fallback,
    original: fallback
  }
}

/**
 * Generate optimized image with blur placeholder
 */
function getImageWithPlaceholder(source, options = {}) {
  const { width = 800, height } = options
  
  return {
    src: '/images/professional/charles-jasema-professional.jpg',
    placeholder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgdmlld0JveD0iMCAwIDgwMCA0NTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI0NTAiIGZpbGw9IiNGM0Y0RjYiLz48cGF0aCBkPSJNNDAwIDIyNUM0MDUuNTIzIDIyNSA0MTAgMjIwLjUyMyA0MTAgMjE1QzQxMCAyMDkuNDc3IDQwNS41MjMgMjA1IDQwMCAyMDVDMzk0LjQ3NyAyMDUgMzkwIDIwOS40NzcgMzkwIDIxNUMzOTAgMjIwLjUyMyAzOTQuNDc3IDIyNSA0MDAgMjI1WiIgZmlsbD0iIzlDQTNBRiIvPjwvc3ZnPg==',
    width: width,
    height: height || Math.round(width * 0.6)
  }
}

module.exports = {
  urlFor,
  getResponsiveImageUrls,
  getImageWithPlaceholder,
};
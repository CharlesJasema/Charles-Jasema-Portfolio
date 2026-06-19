import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { client } from './sanity.client'

// Check if we have a valid Sanity client before creating the builder
const hasValidSanityConfig = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && 
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== '' && 
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'dummy-project-id'

// Create builder only if we have valid Sanity configuration
const builder = hasValidSanityConfig ? imageUrlBuilder(client) : null

// Mock image builder for when Sanity is not configured
const createMockImageBuilder = () => {
  const mockBuilder = {
    url: () => '/images/placeholder-image.jpg',
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
export function urlFor(source: SanityImageSource) {
  if (!builder) {
    // Return a mock image builder when Sanity is not configured
    return createMockImageBuilder()
  }
  return builder.image(source)
}

/**
 * Alias for urlFor (for consistency with different naming conventions)
 */
export const urlForImage = urlFor;

/**
 * Generate responsive image URLs with srcset
 */
export function getResponsiveImageUrls(source: SanityImageSource, widths: number[] = [320, 640, 768, 1024, 1280, 1536]) {
  if (!builder) {
    return widths.map(width => ({
      url: '/images/placeholder-image.jpg',
      width
    }))
  }
  
  return widths.map(width => ({
    url: urlFor(source).width(width).auto('format').quality(85).url(),
    width
  }))
}

/**
 * Generate blur placeholder for image
 */
export function getBlurDataUrl(source: SanityImageSource): string {
  if (!builder) {
    return '/images/placeholder-image.jpg'
  }
  return urlFor(source).width(20).blur(50).quality(30).url()
}

/**
 * Generate optimized image with specific dimensions
 */
export function getOptimizedImage(
  source: SanityImageSource,
  options: {
    width?: number
    height?: number
    quality?: number
    format?: 'webp' | 'jpg' | 'png'
  } = {}
) {
  if (!builder) {
    return '/images/placeholder-image.jpg'
  }
  
  const { width, height, quality = 85, format } = options
  
  let imageBuilder = urlFor(source)
  
  if (width) imageBuilder = imageBuilder.width(width)
  if (height) imageBuilder = imageBuilder.height(height)
  if (format) imageBuilder = imageBuilder.format(format)
  
  return imageBuilder.auto('format').quality(quality).url()
}
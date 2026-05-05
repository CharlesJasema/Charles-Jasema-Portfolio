import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { client } from './sanity.client'

const builder = imageUrlBuilder(client)

/**
 * Generate optimized image URL from Sanity image source
 */
export function urlFor(source: SanityImageSource) {
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
  return widths.map(width => ({
    url: urlFor(source).width(width).auto('format').quality(85).url(),
    width
  }))
}

/**
 * Generate blur placeholder for image
 */
export function getBlurDataUrl(source: SanityImageSource): string {
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
  const { width, height, quality = 85, format } = options
  
  let imageBuilder = urlFor(source)
  
  if (width) imageBuilder = imageBuilder.width(width)
  if (height) imageBuilder = imageBuilder.height(height)
  if (format) imageBuilder = imageBuilder.format(format)
  
  return imageBuilder.auto('format').quality(quality).url()
}
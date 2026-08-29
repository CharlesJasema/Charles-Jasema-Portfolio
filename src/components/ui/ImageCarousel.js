'use client';

import { useState, useEffect, useCallback } from 'react';
import { HeroImage } from '@/components/HeroImage';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export function ImageCarousel({ images, alt, className = '', autoPlay = false, interval = 5000, showThumbnails = false }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // Ensure this runs only on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const nextImage = useCallback(() => {
    if (images && images.length > 0) {
      setCurrentIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % images.length;
        console.log('Next image:', newIndex, 'of', images.length); // Debug log
        return newIndex;
      });
    }
  }, [images]);

  const prevImage = useCallback(() => {
    if (images && images.length > 0) {
      setCurrentIndex((prevIndex) => {
        const newIndex = (prevIndex - 1 + images.length) % images.length;
        console.log('Previous image:', newIndex, 'of', images.length); // Debug log
        return newIndex;
      });
    }
  }, [images]);

  const goToImage = useCallback((index) => {
    if (index >= 0 && index < images.length) {
      console.log('Go to image:', index); // Debug log
      setCurrentIndex(index);
    }
  }, [images]);

  // Auto-play functionality with better error handling
  useEffect(() => {
    if (!isClient || !autoPlay || !images || images.length <= 1) {
      return;
    }

    console.log('Starting auto-play with interval:', interval, 'ms'); // Debug log
    const timer = setInterval(() => {
      nextImage();
    }, interval);

    return () => {
      console.log('Clearing auto-play timer'); // Debug log
      clearInterval(timer);
    };
  }, [isClient, autoPlay, interval, images, nextImage]);

  // Reset index if images change
  useEffect(() => {
    if (currentIndex >= images.length) {
      setCurrentIndex(0);
    }
  }, [images, currentIndex]);

  if (!isClient) {
    return (
      <div className={`bg-gray-200 dark:bg-gray-700 flex items-center justify-center ${className} h-64`}>
        <span className="text-gray-500 dark:text-gray-400">Loading...</span>
      </div>
    );
  }

  if (!images || images.length === 0) {
    return (
      <div className={`bg-gray-200 dark:bg-gray-700 flex items-center justify-center ${className} h-64`}>
        <span className="text-gray-500 dark:text-gray-400">No images available</span>
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div className={`relative ${className}`}>
        <HeroImage
          src={images[0]}
          alt={alt}
          className="w-full h-full object-cover object-center"
        />
      </div>
    );
  }

  const currentImage = images[currentIndex] || images[0];

  return (
    <div className={`relative group ${className} h-64 md:h-80 lg:h-96`}>
      {/* Main Image */}
      <HeroImage
        key={`${currentImage}-${currentIndex}`} // Force re-render on change
        src={currentImage}
        alt={`${alt} - Image ${currentIndex + 1} of ${images.length}`}
        className="w-full h-full object-cover object-center transition-opacity duration-500"
      />

      {/* Navigation Arrows */}
      <button
        onClick={prevImage}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#0B132B]/70 hover:bg-[#0B132B]/90 text-[#D4AF37] p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg border border-[#D4AF37]/30 z-10"
        aria-label="Previous image"
      >
        <FaChevronLeft size={18} />
      </button>
      
      <button
        onClick={nextImage}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#0B132B]/70 hover:bg-[#0B132B]/90 text-[#D4AF37] p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg border border-[#D4AF37]/30 z-10"
        aria-label="Next image"
      >
        <FaChevronRight size={18} />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToImage(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 border ${
              currentIndex === index 
                ? 'bg-[#D4AF37] border-[#D4AF37] scale-125 shadow-lg' 
                : 'bg-white/50 border-white/70 hover:bg-[#D4AF37]/50 hover:border-[#D4AF37] hover:scale-110'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {/* Image Counter */}
      <div className="absolute top-4 right-4 bg-[#0B132B]/70 text-[#D4AF37] px-3 py-1 rounded-full text-sm font-medium border border-[#D4AF37]/30 z-10">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Thumbnails (if enabled) */}
      {showThumbnails && images.length > 1 && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          {images.slice(0, 5).map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`w-12 h-8 rounded border-2 overflow-hidden transition-all duration-200 ${
                currentIndex === index 
                  ? 'border-[#D4AF37] scale-110' 
                  : 'border-white/50 hover:border-[#D4AF37]/70'
              }`}
            >
              <HeroImage
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
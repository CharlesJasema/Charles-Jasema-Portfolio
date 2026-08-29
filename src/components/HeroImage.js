'use client';

import { useState } from 'react';

export function HeroImage({ 
  src, 
  alt, 
  fallbackSrc = '/images/professional/charles-jasema-professional.jpg',
  className = ''
}) {
  const [imageSrc, setImageSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImageSrc(fallbackSrc);
    }
  };

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={handleError}
      loading="lazy"
    />
  );
}
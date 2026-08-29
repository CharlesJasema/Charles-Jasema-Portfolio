'use client';

import { clsx } from 'clsx';

export function AnimatedContainer({ 
  children, 
  className = '',
  animation = 'fadeIn',
  delay = 0,
  ...props 
}) {
  const animations = {
    fadeIn: 'animate-fadeIn',
    slideUp: 'animate-slideUp',
    slideDown: 'animate-slideDown',
    slideLeft: 'animate-slideLeft',
    slideRight: 'animate-slideRight',
    scaleIn: 'animate-scaleIn',
  };

  return (
    <div 
      className={clsx(
        animations[animation],
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </div>
  );
}
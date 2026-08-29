'use client';

import { clsx } from 'clsx';

export function LoadingSpinner({ size = 'md', color = 'primary-gold', className = '' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    'primary-gold': 'text-primary-gold',
    'tech-teal': 'text-tech-teal',
    'accent-red': 'text-accent-red',
    'gray': 'text-gray-400'
  };

  return (
    <div
      className={clsx(
        'animate-spin rounded-full border-2 border-gray-200',
        'border-t-current',
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      role="status"
      aria-label="Loading..."
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
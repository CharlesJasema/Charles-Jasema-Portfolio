/**
 * Loading Spinner Component
 * 
 * Accessible loading indicator with proper ARIA attributes and
 * reduced motion support for users with vestibular disorders.
 */

'use client';

import { clsx } from 'clsx';
import { motionUtils } from '@/lib/accessibility';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'white' | 'current';
  text?: string;
  className?: string;
  fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  text = 'Loading...',
  className,
  fullScreen = false,
}) => {
  const prefersReducedMotion = motionUtils.prefersReducedMotion();

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const colorClasses = {
    primary: 'text-primary-gold',
    secondary: 'text-gray-600 dark:text-gray-400',
    white: 'text-white',
    current: 'text-current',
  };

  const spinnerElement = (
    <div
      className={clsx(
        'inline-block border-2 border-current border-t-transparent rounded-full',
        sizeClasses[size],
        colorClasses[color],
        !prefersReducedMotion && 'animate-spin',
        className
      )}
      role="status"
      aria-label={text}
    >
      <span className="sr-only">{text}</span>
    </div>
  );

  if (fullScreen) {
    return (
      <div 
        className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50"
        role="dialog"
        aria-modal="true"
        aria-label="Loading"
      >
        <div className="text-center">
          {spinnerElement}
          {text && (
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              {text}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      {spinnerElement}
      {text && size !== 'sm' && (
        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
          {text}
        </span>
      )}
    </div>
  );
};

/**
 * Loading Skeleton Component for better perceived performance
 */
interface LoadingSkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: boolean;
  lines?: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  className,
  width = '100%',
  height = '1rem',
  rounded = false,
  lines = 1,
}) => {
  const prefersReducedMotion = motionUtils.prefersReducedMotion();

  const skeletonClass = clsx(
    'bg-gray-200 dark:bg-gray-700',
    !prefersReducedMotion && 'animate-pulse',
    rounded ? 'rounded-full' : 'rounded',
    className
  );

  if (lines === 1) {
    return (
      <div
        className={skeletonClass}
        style={{ width, height }}
        role="status"
        aria-label="Loading content"
      >
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <div role="status" aria-label="Loading content">
      <span className="sr-only">Loading...</span>
      {Array.from({ length: lines }, (_, index) => (
        <div
          key={index}
          className={clsx(
            skeletonClass,
            index < lines - 1 && 'mb-2',
            index === lines - 1 && 'w-3/4' // Last line is shorter
          )}
          style={{ 
            width: index === lines - 1 ? '75%' : width, 
            height 
          }}
        />
      ))}
    </div>
  );
};

export default LoadingSpinner;
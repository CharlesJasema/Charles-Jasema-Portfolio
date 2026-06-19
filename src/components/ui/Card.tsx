'use client';

import { HTMLAttributes, forwardRef, ReactNode } from 'react';
import { clsx } from 'clsx';
import Image from 'next/image';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated' | 'glass';
  hoverEffect?: 'lift' | 'glow' | 'scale' | 'none';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  isInteractive?: boolean;
  header?: ReactNode;
  footer?: ReactNode;
  image?: {
    src: string;
    alt: string;
    aspectRatio?: '16/9' | '4/3' | '1/1' | 'auto';
    priority?: boolean;
  };
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    variant = 'default', 
    hoverEffect = 'none',
    padding = 'md', 
    isLoading = false,
    isInteractive = false,
    header,
    footer,
    image,
    className, 
    children, 
    ...props 
  }, ref) => {
    const baseStyles = 'rounded-lg transition-all duration-300 ease-in-out overflow-hidden';
    
    const variantStyles = {
      default: 'bg-slate-800 dark:bg-background-dark',
      bordered: 'bg-slate-800 dark:bg-background-dark border-2 border-slate-700 dark:border-slate-600',
      elevated: 'bg-slate-800 dark:bg-background-dark shadow-lg',
      glass: 'bg-white/10 dark:bg-slate-800/50 backdrop-blur-md border border-white/20 dark:border-slate-700/50',
    };
    
    const hoverEffectStyles = {
      lift: 'hover:shadow-2xl hover:-translate-y-2',
      glow: 'hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:border-primary-gold',
      scale: 'hover:scale-105',
      none: '',
    };
    
    const paddingStyles = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    const interactiveStyles = isInteractive 
      ? 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-gold focus:ring-offset-2 focus:ring-offset-background-dark' 
      : '';

    // Aspect ratio classes for image
    const aspectRatioStyles = {
      '16/9': 'aspect-video',
      '4/3': 'aspect-[4/3]',
      '1/1': 'aspect-square',
      'auto': '',
    };

    if (isLoading) {
      return (
        <div
          ref={ref}
          className={clsx(
            baseStyles,
            variantStyles[variant],
            paddingStyles[padding],
            'animate-pulse',
            className
          )}
          aria-busy="true"
          aria-label="Loading content"
        >
          <CardSkeleton hasImage={!!image} hasHeader={!!header} hasFooter={!!footer} />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={clsx(
          baseStyles,
          variantStyles[variant],
          hoverEffectStyles[hoverEffect],
          interactiveStyles,
          className
        )}
        role={isInteractive ? 'button' : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        {...props}
      >
        {/* Image Section */}
        {image && (
          <div className={clsx(
            'relative w-full overflow-hidden',
            aspectRatioStyles[image.aspectRatio || 'auto']
          )}>
            <Image
              src={image.src}
              alt={image.alt}
              fill={image.aspectRatio !== 'auto'}
              width={image.aspectRatio === 'auto' ? 800 : undefined}
              height={image.aspectRatio === 'auto' ? 600 : undefined}
              className={clsx(
                'object-cover transition-transform duration-300',
                hoverEffect === 'scale' && 'group-hover:scale-110'
              )}
              priority={image.priority}
            />
          </div>
        )}

        {/* Header Section */}
        {header && (
          <div className={clsx(
            'border-b border-slate-700 dark:border-slate-600',
            image ? 'px-6 py-4' : paddingStyles[padding]
          )}>
            {header}
          </div>
        )}

        {/* Body Section */}
        <div className={clsx(
          (header || image) && !footer ? 'px-6 pb-6 pt-4' :
          (header || image) && footer ? 'px-6 py-4' :
          footer && !(header || image) ? 'px-6 pt-6 pb-4' :
          paddingStyles[padding]
        )}>
          {children}
        </div>

        {/* Footer Section */}
        {footer && (
          <div className={clsx(
            'border-t border-slate-700 dark:border-slate-600 bg-slate-900/50 dark:bg-slate-900/50',
            'px-6 py-4'
          )}>
            {footer}
          </div>
        )}
      </div>
    );
  }
);

Card.displayName = 'Card';

// Skeleton loading component
const CardSkeleton = ({ 
  hasImage, 
  hasHeader, 
  hasFooter 
}: { 
  hasImage: boolean; 
  hasHeader: boolean; 
  hasFooter: boolean; 
}) => {
  return (
    <>
      {hasImage && (
        <div className="w-full h-48 bg-slate-700 dark:bg-slate-700" />
      )}
      {hasHeader && (
        <div className="px-6 py-4 border-b border-slate-700">
          <div className="h-6 bg-slate-700 dark:bg-slate-700 rounded w-3/4" />
        </div>
      )}
      <div className="px-6 py-4 space-y-3">
        <div className="h-4 bg-slate-700 dark:bg-slate-700 rounded w-full" />
        <div className="h-4 bg-slate-700 dark:bg-slate-700 rounded w-5/6" />
        <div className="h-4 bg-slate-700 dark:bg-slate-700 rounded w-4/6" />
      </div>
      {hasFooter && (
        <div className="px-6 py-4 border-t border-slate-700 bg-slate-900/50">
          <div className="h-4 bg-slate-700 dark:bg-slate-700 rounded w-1/2" />
        </div>
      )}
    </>
  );
};

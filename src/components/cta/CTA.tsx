'use client';

import { forwardRef, ReactNode } from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';
import { createAccessibleButtonProps } from '@/lib/accessibility';
import { useAnalytics } from '@/hooks/useAnalytics';

export interface CTAProps {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type: 'book' | 'hire' | 'subscribe' | 'contact' | 'download' | 'follow' | 'custom';
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  ariaLabel?: string;
  tracking?: {
    name?: string;
    location?: string;
    category?: string;
    label?: string;
    value?: number;
  };
  external?: boolean;
}

export const CTA = forwardRef<HTMLButtonElement | HTMLAnchorElement, CTAProps>(
  ({ 
    variant = 'primary',
    size = 'md',
    type,
    href,
    onClick,
    children,
    icon,
    className,
    disabled = false,
    isLoading = false,
    loadingText,
    ariaLabel,
    tracking,
    external = false,
    ...props
  }, ref) => {
    
    const analytics = useAnalytics();
    
    const handleClick = () => {
      // Enhanced CTA tracking with new analytics system
      const ctaName = tracking?.name || (typeof children === 'string' ? children : type);
      const ctaLocation = tracking?.location || window.location.pathname;
      const ctaType = variant === 'primary' ? 'primary' : variant === 'secondary' ? 'secondary' : 'tertiary';
      
      // Track CTA click with enhanced analytics
      analytics.trackCTA(ctaName, ctaLocation, ctaType);
      
      // Track specific conversion events based on CTA type
      switch (type) {
        case 'book':
          analytics.trackConversion.booking('General Booking', 'CTA Click');
          break;
        case 'hire':
          analytics.trackConversion.hiring('General Project', 'CTA Click');
          break;
        case 'subscribe':
          analytics.trackConversion.newsletter(ctaLocation, 'CTA Click');
          break;
        case 'contact':
          analytics.trackConversion.lead('CTA Click', 'Contact Form');
          break;
        case 'follow':
          // Extract platform from href or tracking data
          const platform = tracking?.label || 'Unknown';
          analytics.trackSocial.follow(platform, ctaLocation);
          break;
        default:
          // Custom tracking handled by the main trackCTA call
          break;
      }
      
      onClick?.();
    };

    const baseStyles = 'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary-gold focus:ring-offset-2 focus:ring-offset-background-dark disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 min-h-[44px] min-w-[44px]';
    
    const variantStyles = {
      primary: 'bg-primary-gold text-background-dark hover:bg-primary-gold/90 active:bg-primary-gold/80 shadow-lg hover:shadow-xl',
      secondary: 'bg-accent-red text-white hover:bg-accent-red/90 active:bg-accent-red/80 shadow-lg hover:shadow-xl',
      outline: 'bg-transparent text-primary-gold border-2 border-primary-gold hover:bg-primary-gold hover:text-background-dark active:bg-primary-gold/90',
      ghost: 'bg-transparent text-primary-gold hover:bg-primary-gold/10 active:bg-primary-gold/20',
    };
    
    const sizeStyles = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    const iconSizes = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    };

    const combinedClassName = clsx(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      isLoading && 'cursor-wait',
      className
    );

    const accessibleProps = createAccessibleButtonProps(
      ariaLabel || (typeof children === 'string' ? children : `${type} button`),
      {
        disabled: disabled || isLoading,
        loading: isLoading,
      }
    );

    const content = (
      <>
        {isLoading ? (
          <>
            <svg
              className={clsx('animate-spin', iconSizes[size])}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span className="sr-only">{loadingText || 'Loading...'}</span>
          </>
        ) : (
          <>
            {icon && <span className={iconSizes[size]} aria-hidden="true">{icon}</span>}
            {children}
          </>
        )}
      </>
    );

    // If href is provided, render as Link or anchor
    if (href) {
      if (external) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={combinedClassName}
            onClick={handleClick}
            {...accessibleProps}
            {...props}
          >
            {content}
          </a>
        );
      }
      
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={combinedClassName}
          onClick={handleClick}
          {...accessibleProps}
          {...props}
        >
          {content}
        </Link>
      );
    }

    // Otherwise render as button
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={combinedClassName}
        onClick={handleClick}
        disabled={disabled || isLoading}
        {...accessibleProps}
        {...props}
      >
        {content}
      </button>
    );
  }
);

CTA.displayName = 'CTA';
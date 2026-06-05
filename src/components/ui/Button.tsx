'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';
import { createAccessibleButtonProps } from '@/lib/button-utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  loadingText?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaExpanded?: boolean;
  ariaPressed?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    isLoading = false, 
    loadingText = 'Loading...',
    ariaLabel,
    ariaDescribedBy,
    ariaExpanded,
    ariaPressed,
    className, 
    children, 
    disabled, 
    ...props 
  }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary-gold focus:ring-offset-2 focus:ring-offset-background-dark disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 min-h-[44px] min-w-[44px]';
    
    const variantStyles = {
      primary: 'bg-primary-gold text-background-dark hover:bg-primary-gold/90 active:bg-primary-gold/80',
      secondary: 'bg-accent-red text-white hover:bg-accent-red/90 active:bg-accent-red/80',
      ghost: 'bg-transparent text-primary-gold border-2 border-primary-gold hover:bg-primary-gold hover:text-background-dark active:bg-primary-gold/90',
    };
    
    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    // Generate accessible button props
    const accessibleProps = createAccessibleButtonProps(
      ariaLabel || (typeof children === 'string' ? children : 'Button'),
      {
        describedBy: ariaDescribedBy,
        expanded: ariaExpanded,
        pressed: ariaPressed,
        disabled: disabled || isLoading,
        loading: isLoading,
      }
    );

    return (
      <button
        ref={ref}
        className={clsx(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          isLoading && 'cursor-wait',
          className
        )}
        disabled={disabled || isLoading}
        {...accessibleProps}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
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
            <span className="sr-only">{loadingText}</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';
import { createAccessibleButtonProps } from '@/lib/button-utils';
import { useBrandContext, getBrandClasses } from './BrandContext';

export interface EnhancedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'gradient' | 'ministry' | 'professional';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  loadingText?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaExpanded?: boolean;
  ariaPressed?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  elevation?: 'none' | 'sm' | 'md' | 'lg';
}

export const EnhancedButton = forwardRef<HTMLButtonElement, EnhancedButtonProps>(
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
    icon,
    iconPosition = 'left',
    fullWidth = false,
    elevation = 'none',
    children, 
    disabled, 
    ...props 
  }, ref) => {
    const { currentMode } = useBrandContext();

    const baseStyles = clsx(
      'inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-lg',
      'focus:outline-none focus:ring-2 focus:ring-primary-gold focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95',
      'min-h-[44px] min-w-[44px] relative overflow-hidden',
      fullWidth && 'w-full'
    );
    
    const variantStyles = {
      primary: clsx(
        'bg-primary-gold text-background-dark hover:bg-primary-gold-light active:bg-primary-gold-dark',
        'shadow-md hover:shadow-lg'
      ),
      secondary: clsx(
        'bg-accent-red text-white hover:bg-accent-red-light active:bg-accent-red-dark',
        'shadow-md hover:shadow-lg'
      ),
      ghost: clsx(
        'bg-transparent text-primary-gold border border-primary-gold/20',
        'hover:bg-primary-gold/10 hover:border-primary-gold/40',
        'backdrop-blur-sm'
      ),
      outline: clsx(
        'bg-transparent border-2 border-primary-gold text-primary-gold',
        'hover:bg-primary-gold hover:text-background-dark'
      ),
      gradient: clsx(
        'bg-gradient-to-r from-primary-gold via-primary-gold-light to-tech-teal',
        'text-background-dark hover:from-primary-gold-light hover:to-primary-gold',
        'shadow-lg hover:shadow-xl'
      ),
      ministry: clsx(
        currentMode === 'ministry' 
          ? 'bg-ministry-burgundy text-ministry-ivory hover:bg-ministry-gold hover:text-ministry-burgundy'
          : 'bg-primary-gold text-background-dark hover:bg-primary-gold-light'
      ),
      professional: clsx(
        currentMode === 'professional'
          ? 'bg-professional-blue text-white hover:bg-professional-blue-light'
          : 'bg-primary-gold text-background-dark hover:bg-primary-gold-light'
      ),
    };
    
    const sizeStyles = {
      xs: 'px-2 py-1 text-xs',
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
      xl: 'px-8 py-4 text-xl',
    };

    const elevationStyles = {
      none: '',
      sm: 'shadow-sm hover:shadow-md',
      md: 'shadow-md hover:shadow-lg',
      lg: 'shadow-lg hover:shadow-xl',
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

    const LoadingSpinner = () => (
      <svg
        className="animate-spin h-4 w-4"
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
    );

    return (
      <button
        ref={ref}
        className={clsx(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          elevationStyles[elevation],
          isLoading && 'cursor-wait',
          className
        )}
        disabled={disabled || isLoading}
        {...accessibleProps}
        {...props}
      >
        {/* Background Animation Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
        
        {/* Content */}
        <div className="relative flex items-center space-x-2">
          {isLoading ? (
            <>
              <LoadingSpinner />
              <span className="sr-only">{loadingText}</span>
            </>
          ) : (
            <>
              {icon && iconPosition === 'left' && (
                <span className="flex-shrink-0">{icon}</span>
              )}
              {children && <span>{children}</span>}
              {icon && iconPosition === 'right' && (
                <span className="flex-shrink-0">{icon}</span>
              )}
            </>
          )}
        </div>
      </button>
    );
  }
);

EnhancedButton.displayName = 'EnhancedButton';

// Button Group Component for related actions
export interface ButtonGroupProps {
  children: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function ButtonGroup({ 
  children, 
  orientation = 'horizontal', 
  size = 'md',
  className = '' 
}: ButtonGroupProps) {
  return (
    <div 
      className={clsx(
        'flex',
        orientation === 'horizontal' ? 'flex-row space-x-2' : 'flex-col space-y-2',
        className
      )}
      role="group"
    >
      {children}
    </div>
  );
}

// Floating Action Button
export interface FABProps extends Omit<EnhancedButtonProps, 'size' | 'fullWidth'> {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

export function FloatingActionButton({ 
  position = 'bottom-right',
  className = '',
  ...props 
}: FABProps) {
  const positionStyles = {
    'bottom-right': 'fixed bottom-6 right-6',
    'bottom-left': 'fixed bottom-6 left-6',
    'top-right': 'fixed top-20 right-6',
    'top-left': 'fixed top-20 left-6',
  };

  return (
    <EnhancedButton
      {...props}
      size="lg"
      elevation="lg"
      className={clsx(
        positionStyles[position],
        'z-50 rounded-full w-14 h-14 min-w-0 shadow-2xl',
        'animate-bounce-gentle',
        className
      )}
    />
  );
}
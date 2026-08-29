'use client';

import { clsx } from 'clsx';
import { useState } from 'react';

export function DualIdentityLogo({ 
  className = '',
  showText = true,
  size = 'md',
  animated = true,
  ...props 
}) {
  const [currentBrand, setCurrentBrand] = useState('professional');

  const sizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
    xl: 'text-6xl',
  };

  const brandStyles = {
    professional: {
      primary: 'text-professional-blue',
      secondary: 'text-slate-600',
      background: 'bg-professional-blue',
    },
    ministry: {
      primary: 'text-primary-gold',
      secondary: 'text-ministry-burgundy',
      background: 'bg-primary-gold',
    },
  };

  const currentStyles = brandStyles[currentBrand];

  return (
    <div 
      className={clsx(
        'flex items-center space-x-2 cursor-pointer select-none',
        animated && 'transition-all duration-300',
        className
      )}
      onClick={() => setCurrentBrand(currentBrand === 'professional' ? 'ministry' : 'professional')}
      {...props}
    >
      {/* Logo Symbol */}
      <div className={clsx(
        'w-10 h-10 rounded-full flex items-center justify-center font-bold text-white',
        currentStyles.background,
        sizes[size],
        animated && 'transition-all duration-300 hover:scale-110'
      )}>
        CJ
      </div>
      
      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={clsx(
            'font-bold leading-none',
            currentStyles.primary,
            sizes[size]
          )}>
            Charles Jasema
          </span>
          <span className={clsx(
            'text-sm leading-none',
            currentStyles.secondary
          )}>
            {currentBrand === 'professional' 
              ? 'Software Engineer & Designer' 
              : 'Gospel Artist & Worship Leader'
            }
          </span>
        </div>
      )}
    </div>
  );
}

export function BrandModeSwitcher({ 
  currentBrand = 'professional',
  onBrandChange,
  className = '',
  ...props 
}) {
  return (
    <div 
      className={clsx(
        'flex items-center space-x-4 p-2 bg-gray-100 dark:bg-slate-800 rounded-lg',
        className
      )}
      {...props}
    >
      <button
        onClick={() => onBrandChange('professional')}
        className={clsx(
          'px-3 py-1 rounded text-sm font-medium transition-colors',
          currentBrand === 'professional'
            ? 'bg-professional-blue text-white'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700'
        )}
      >
        Professional
      </button>
      <button
        onClick={() => onBrandChange('ministry')}
        className={clsx(
          'px-3 py-1 rounded text-sm font-medium transition-colors',
          currentBrand === 'ministry'
            ? 'bg-primary-gold text-white'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700'
        )}
      >
        Music Ministry
      </button>
    </div>
  );
}
'use client';

import { clsx } from 'clsx';

export function EnhancedButton({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  className = '',
  onClick,
  type = 'button',
  ...props 
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-primary-gold hover:bg-primary-gold-dark text-white focus:ring-primary-gold',
    secondary: 'bg-slate-600 hover:bg-slate-700 text-white focus:ring-slate-500',
    outline: 'border-2 border-primary-gold text-primary-gold hover:bg-primary-gold hover:text-white',
    ghost: 'text-primary-gold hover:bg-primary-gold hover:bg-opacity-10',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
  };

  return (
    <button 
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={disabled}
      onClick={onClick}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonGroup({ children, className = '' }) {
  return (
    <div className={clsx('flex space-x-2', className)}>
      {children}
    </div>
  );
}

export function FloatingActionButton({ 
  children, 
  onClick, 
  className = '',
  position = 'bottom-right',
  ...props 
}) {
  const positions = {
    'bottom-right': 'fixed bottom-6 right-6',
    'bottom-left': 'fixed bottom-6 left-6',
    'top-right': 'fixed top-6 right-6',
    'top-left': 'fixed top-6 left-6',
  };

  return (
    <button
      className={clsx(
        'w-14 h-14 rounded-full bg-primary-gold hover:bg-primary-gold-dark text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-50',
        positions[position],
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
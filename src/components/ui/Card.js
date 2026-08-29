'use client';

import { clsx } from 'clsx';

export function Card({ 
  children, 
  className = '', 
  variant = 'default',
  padding = 'default',
  ...props 
}) {
  const baseStyles = 'bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700';
  
  const variants = {
    default: '',
    bordered: 'border-2',
    elevated: 'shadow-lg',
    flat: 'shadow-none border-0',
  };
  
  const paddings = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8',
  };

  return (
    <div 
      className={clsx(
        baseStyles,
        variants[variant],
        paddings[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
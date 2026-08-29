'use client';

import { clsx } from 'clsx';
import { forwardRef } from 'react';

export const Input = forwardRef(function Input({ 
  className = '', 
  type = 'text', 
  error = false,
  label,
  required = false,
  ...props 
}, ref) {
  const baseStyles = 'w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-primary-gold transition-colors';
  
  const errorStyles = error 
    ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
    : 'border-gray-300 dark:border-gray-600';

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className={clsx(
          baseStyles,
          errorStyles,
          'bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500',
          className
        )}
        {...props}
      />
    </div>
  );
});
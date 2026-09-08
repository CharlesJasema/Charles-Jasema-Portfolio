'use client';

import { clsx } from 'clsx';
import { forwardRef } from 'react';

export const Select = forwardRef(function Select({ 
  className = '', 
  children,
  error = false,
  label,
  required = false,
  placeholder = 'Select an option...',
  ...props 
}, ref) {
  const baseStyles = 'w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-primary-gold transition-colors appearance-none bg-no-repeat bg-right bg-[length:20px_20px] pr-10';
  
  const errorStyles = error 
    ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
    : 'border-gray-300 dark:border-gray-600';

  return (
    <div className="w-full relative">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        ref={ref}
        className={clsx(
          baseStyles,
          errorStyles,
          'bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100',
          className
        )}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`
        }}
        {...props}
      >
        {children}
      </select>
    </div>
  );
});
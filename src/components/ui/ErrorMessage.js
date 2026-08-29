'use client';

import { clsx } from 'clsx';

export function ErrorMessage({ 
  message, 
  className = '',
  variant = 'error',
  icon = true,
  ...props 
}) {
  if (!message) return null;

  const variants = {
    error: 'text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-900/20 dark:border-red-800',
    warning: 'text-yellow-600 bg-yellow-50 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-900/20 dark:border-yellow-800',
    info: 'text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-900/20 dark:border-blue-800',
    success: 'text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-900/20 dark:border-green-800',
  };

  const icons = {
    error: '⚠️',
    warning: '⚠️',
    info: 'ℹ️',
    success: '✅',
  };

  return (
    <div 
      className={clsx(
        'flex items-center p-3 text-sm border rounded-md',
        variants[variant],
        className
      )}
      role="alert"
      {...props}
    >
      {icon && (
        <span className="mr-2 text-base" aria-hidden="true">
          {icons[variant]}
        </span>
      )}
      <span>{message}</span>
    </div>
  );
}
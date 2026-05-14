'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';
import { createAccessibleFieldProps, generateId } from '@/lib/accessibility';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  ariaLabel?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, ariaLabel, className, id, ...props }, ref) => {
    const inputId = id || generateId('input');
    const errorId = error ? `${inputId}-error` : undefined;
    const helperId = helperText ? `${inputId}-helper` : undefined;
    const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;

    // Generate accessible field props
    const accessibleProps = createAccessibleFieldProps(
      ariaLabel || label || 'Input field',
      {
        required: props.required,
        invalid: !!error,
        describedBy,
        errorId,
      }
    );

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-text-secondary mb-2"
          >
            {label}
            {props.required && (
              <span className="text-accent-red ml-1" aria-label="required">
                *
              </span>
            )}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            'w-full bg-background-dark border rounded-sm px-4 py-2 text-text-primary placeholder-text-tertiary transition-all duration-300 min-h-[44px]',
            'focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent',
            error
              ? 'border-accent-red focus:ring-accent-red'
              : 'border-primary-gold border-opacity-30 focus:border-primary-gold',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            className
          )}
          {...accessibleProps}
          {...props}
        />
        {error && (
          <p 
            id={errorId} 
            className="mt-1 text-sm text-accent-red error-message"
            role="alert"
            aria-live="polite"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={helperId} className="mt-1 text-sm text-text-tertiary">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

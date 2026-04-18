'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const checkboxId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              ref={ref}
              type="checkbox"
              id={checkboxId}
              className={clsx(
                'w-4 h-4 rounded border transition-all duration-300',
                'focus:ring-2 focus:ring-primary-gold focus:ring-offset-2 focus:ring-offset-background-dark',
                error
                  ? 'border-accent-red text-accent-red'
                  : 'border-primary-gold border-opacity-30 text-primary-gold',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                className
              )}
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby={error ? `${checkboxId}-error` : undefined}
              {...props}
            />
          </div>
          {label && (
            <div className="ml-3">
              <label
                htmlFor={checkboxId}
                className="text-sm font-medium text-text-secondary cursor-pointer"
              >
                {label}
                {props.required && <span className="text-accent-red ml-1">*</span>}
              </label>
            </div>
          )}
        </div>
        {error && (
          <p id={`${checkboxId}-error`} className="mt-1 text-sm text-accent-red ml-7">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

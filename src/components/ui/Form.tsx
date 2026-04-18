'use client';

import { FormHTMLAttributes, ReactNode } from 'react';
import { clsx } from 'clsx';

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  error?: string;
  success?: string;
}

export function Form({ children, onSubmit, error, success, className, ...props }: FormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx('space-y-6', className)}
      {...props}
    >
      {error && (
        <div
          className="p-4 rounded-sm bg-accent-red bg-opacity-10 border border-accent-red text-accent-red"
          role="alert"
        >
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}
      {success && (
        <div
          className="p-4 rounded-sm bg-tech-teal bg-opacity-10 border border-tech-teal text-tech-teal"
          role="status"
        >
          <p className="text-sm font-medium">{success}</p>
        </div>
      )}
      {children}
    </form>
  );
}

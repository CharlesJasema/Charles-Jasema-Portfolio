'use client';

import { useEffect } from 'react';
import { Card, EnhancedButton } from '@/components/ui';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('About page error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="max-w-md w-full text-center" padding="xl">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Something went wrong
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          We encountered an error loading the about page.
        </p>
        <EnhancedButton onClick={reset} variant="primary" className="w-full">
          Try Again
        </EnhancedButton>
      </Card>
    </div>
  );
}
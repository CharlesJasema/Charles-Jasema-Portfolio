'use client';

import { useEffect } from 'react';
import { ErrorMessage } from '@/components/ui/ErrorMessage';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <ErrorMessage
      variant="page"
      title="Something went wrong"
      message="We encountered an unexpected error while loading this page. Please try again."
      onRetry={reset}
    />
  );
}
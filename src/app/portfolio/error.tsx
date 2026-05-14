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
    console.error('Portfolio page error:', error);
  }, [error]);

  return (
    <ErrorMessage
      variant="page"
      title="Unable to load Portfolio"
      message="We couldn't load the project portfolio. Please try refreshing the page."
      onRetry={reset}
    />
  );
}
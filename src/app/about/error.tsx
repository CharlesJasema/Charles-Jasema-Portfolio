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
    console.error('About page error:', error);
  }, [error]);

  return (
    <ErrorMessage
      variant="page"
      title="Unable to load About page"
      message="We couldn't load Charles' profile information. Please try refreshing the page."
      onRetry={reset}
    />
  );
}
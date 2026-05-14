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
    console.error('Music page error:', error);
  }, [error]);

  return (
    <ErrorMessage
      variant="page"
      title="Unable to load Music"
      message="We couldn't load the music collection. Please check your connection and try again."
      onRetry={reset}
    />
  );
}
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
    console.error('Blog page error:', error);
  }, [error]);

  return (
    <ErrorMessage
      variant="page"
      title="Unable to load Blog"
      message="We couldn't load the blog posts. Please check your connection and try again."
      onRetry={reset}
    />
  );
}
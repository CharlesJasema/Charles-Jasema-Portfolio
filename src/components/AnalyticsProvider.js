'use client';

import React, { Suspense, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { initializeAnalytics, trackPageView, isAnalyticsEnabled } from '@/lib/analytics';

function AnalyticsTracker({ children }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize analytics on mount
  useEffect(() => {
    initializeAnalytics();
  }, []);

  // Track page views
  useEffect(() => {
    if (!pathname) return;

    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
    trackPageView(url);
  }, [pathname, searchParams]);

  // Track errors
  useEffect(() => {
    if (!isAnalyticsEnabled()) return;

    const handleError = (event) => {
      const { error, filename, lineno, colno } = event;
      console.error('JavaScript Error:', {
        message: error?.message || 'Unknown error',
        filename,
        lineno,
        colno,
      });
    };

    const handleUnhandledRejection = (event) => {
      console.error('Unhandled Promise Rejection:', event.reason);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return children;
}

export function AnalyticsProvider({ children }) {
  return (
    <Suspense fallback={null}>
      <AnalyticsTracker>{children}</AnalyticsTracker>
    </Suspense>
  );
}

export default AnalyticsProvider;
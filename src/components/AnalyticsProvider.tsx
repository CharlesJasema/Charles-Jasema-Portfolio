'use client';

import { createContext, useContext, useEffect, ReactNode } from 'react';
import { initializeAnalytics, isGAEnabled } from '@/lib/analytics';

interface AnalyticsContextType {
  isEnabled: boolean;
}

const AnalyticsContext = createContext<AnalyticsContextType>({
  isEnabled: false,
});

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};

interface AnalyticsProviderProps {
  children: ReactNode;
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  useEffect(() => {
    if (isGAEnabled) {
      // Make initializeAnalytics available globally for the script
      (window as any).initializeAnalytics = initializeAnalytics;
      
      // Initialize analytics if gtag is already available
      if (typeof window !== 'undefined' && (window as any).gtag) {
        initializeAnalytics();
      }
    }
  }, []);

  return (
    <AnalyticsContext.Provider value={{ isEnabled: isGAEnabled }}>
      {children}
    </AnalyticsContext.Provider>
  );
}
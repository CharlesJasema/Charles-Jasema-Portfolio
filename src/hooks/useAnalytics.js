/**
 * Analytics Hook
 * React hook for easy analytics integration across components
 */

import { useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import {
  initializeAnalytics,
  trackPageView,
  trackEvent,
  trackSocialClick,
  trackProjectView,
  trackCVDownload,
  trackContactForm,
  trackCarouselInteraction,
  trackThemeToggle,
  isAnalyticsEnabled,
} from '@/lib/analytics';

export const useAnalytics = () => {
  const pathname = usePathname();

  // Initialize analytics on mount
  useEffect(() => {
    initializeAnalytics();
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (pathname) {
      trackPageView(pathname);
    }
  }, [pathname]);

  // Memoized tracking functions
  const trackSocial = useCallback((platform, url) => {
    trackSocialClick(platform, url);
  }, []);

  const trackProject = useCallback((projectName) => {
    trackProjectView(projectName);
  }, []);

  const trackCV = useCallback((format = 'pdf') => {
    trackCVDownload(format);
  }, []);

  const trackContact = useCallback((method) => {
    trackContactForm(method);
  }, []);

  const trackCarousel = useCallback((action, carouselName) => {
    trackCarouselInteraction(action, carouselName);
  }, []);

  const trackTheme = useCallback((theme) => {
    trackThemeToggle(theme);
  }, []);

  const trackCustomEvent = useCallback((action, category, label, value) => {
    trackEvent(action, category, label, value);
  }, []);

  return {
    // Status
    isEnabled: isAnalyticsEnabled(),
    currentPath: pathname,

    // Tracking methods
    trackSocial,
    trackProject,
    trackCV,
    trackContact,
    trackCarousel,
    trackTheme,
    trackCustomEvent,
  };
};

// HOC for automatic analytics integration
export const withAnalytics = (WrappedComponent) => {
  const WithAnalyticsComponent = (props) => {
    const analytics = useAnalytics();
    
    return (
      <WrappedComponent 
        {...props} 
        analytics={analytics} 
      />
    );
  };

  WithAnalyticsComponent.displayName = `withAnalytics(${WrappedComponent.displayName || WrappedComponent.name})`;
  
  return WithAnalyticsComponent;
};

export default useAnalytics;
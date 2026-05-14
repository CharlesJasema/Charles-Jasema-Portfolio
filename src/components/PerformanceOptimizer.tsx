'use client';

import { useEffect } from 'react';
import { 
  initializePerformanceOptimizations, 
  trackWebVital,
  trackPageLoadTime 
} from '@/lib/performance';

export function PerformanceOptimizer() {
  useEffect(() => {
    // Initialize all performance optimizations
    initializePerformanceOptimizations();
    
    // Enhanced Core Web Vitals measurement with analytics integration
    if (typeof window !== 'undefined') {
      // Measure and track LCP (Largest Contentful Paint)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        if (lastEntry) {
          const lcpValue = lastEntry.startTime;
          console.log('LCP:', lcpValue);
          
          // Track with enhanced analytics
          trackWebVital('LCP', lcpValue, 'lcp-measurement');
          
          // Send to GA4 if available
          if (typeof gtag !== 'undefined') {
            gtag('event', 'web_vitals', {
              name: 'LCP',
              value: Math.round(lcpValue),
              event_category: 'performance',
              custom_parameter_1: getPageCategory()
            });
          }
        }
      });
      
      try {
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        console.warn('LCP observer not supported');
      }

      // Measure and track FID (First Input Delay)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          const fidValue = entry.processingStart - entry.startTime;
          console.log('FID:', fidValue);
          
          // Track with enhanced analytics
          trackWebVital('FID', fidValue, 'fid-measurement');
          
          // Send to GA4 if available
          if (typeof gtag !== 'undefined') {
            gtag('event', 'web_vitals', {
              name: 'FID',
              value: Math.round(fidValue),
              event_category: 'performance',
              custom_parameter_1: getPageCategory()
            });
          }
        });
      });
      
      try {
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        console.warn('FID observer not supported');
      }

      // Measure and track CLS (Cumulative Layout Shift)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        
        console.log('CLS:', clsValue);
        
        // Track with enhanced analytics
        trackWebVital('CLS', clsValue, 'cls-measurement');
        
        // Send to GA4 if available
        if (typeof gtag !== 'undefined') {
          gtag('event', 'web_vitals', {
            name: 'CLS',
            value: Math.round(clsValue * 1000),
            event_category: 'performance',
            custom_parameter_1: getPageCategory()
          });
        }
      });
      
      try {
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        console.warn('CLS observer not supported');
      }

      // Track page load time
      const trackPageLoad = () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        if (loadTime > 0) {
          trackPageLoadTime(loadTime, getPageCategory());
          
          // Send to GA4 if available
          if (typeof gtag !== 'undefined') {
            gtag('event', 'page_load_time', {
              value: Math.round(loadTime),
              event_category: 'performance',
              page_type: getPageCategory()
            });
          }
        }
      };

      // Track when page is fully loaded
      if (document.readyState === 'complete') {
        trackPageLoad();
      } else {
        window.addEventListener('load', trackPageLoad);
      }

      // Track Time to First Byte (TTFB)
      const trackTTFB = () => {
        const ttfb = performance.timing.responseStart - performance.timing.requestStart;
        if (ttfb > 0) {
          trackWebVital('TTFB', ttfb, 'ttfb-measurement');
          
          // Send to GA4 if available
          if (typeof gtag !== 'undefined') {
            gtag('event', 'web_vitals', {
              name: 'TTFB',
              value: Math.round(ttfb),
              event_category: 'performance',
              custom_parameter_1: getPageCategory()
            });
          }
        }
      };

      // Track TTFB when navigation timing is available
      if (performance.timing.responseStart > 0) {
        trackTTFB();
      } else {
        window.addEventListener('load', trackTTFB);
      }

      // Enhanced error tracking with performance context
      const originalErrorHandler = window.onerror;
      window.onerror = (message, source, lineno, colno, error) => {
        // Track error with performance context
        if (typeof gtag !== 'undefined') {
          gtag('event', 'error_occurred', {
            error_type: 'JavaScript Error',
            error_message: message?.toString() || 'Unknown error',
            error_location: `${source}:${lineno}:${colno}`,
            page_category: getPageCategory(),
            user_agent: navigator.userAgent,
            connection_type: (navigator as any).connection?.effectiveType || 'unknown'
          });
        }
        
        // Call original handler if it exists
        if (originalErrorHandler) {
          return originalErrorHandler(message, source, lineno, colno, error);
        }
        return false;
      };

      // Track unhandled promise rejections
      window.addEventListener('unhandledrejection', (event) => {
        if (typeof gtag !== 'undefined') {
          gtag('event', 'error_occurred', {
            error_type: 'Unhandled Promise Rejection',
            error_message: event.reason?.toString() || 'Unknown promise rejection',
            error_location: window.location.href,
            page_category: getPageCategory()
          });
        }
      });

      // Track resource loading errors
      window.addEventListener('error', (event) => {
        if (event.target && event.target !== window) {
          const target = event.target as HTMLElement;
          if (typeof gtag !== 'undefined') {
            gtag('event', 'resource_error', {
              resource_type: target.tagName?.toLowerCase() || 'unknown',
              resource_url: (target as any).src || (target as any).href || 'unknown',
              error_message: 'Resource failed to load',
              page_category: getPageCategory()
            });
          }
        }
      }, true);

      // Cleanup function
      return () => {
        try {
          lcpObserver.disconnect();
          fidObserver.disconnect();
          clsObserver.disconnect();
        } catch (e) {
          // Observers might not be supported
        }
      };
    }
    
    // Report web vitals to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Performance monitoring initialized');
    }
    
    // Return empty cleanup function for non-browser environments
    return () => {};
  }, []);

  return null;
}

// Helper function to get page category
function getPageCategory(): string {
  if (typeof window === 'undefined') return 'unknown';
  
  const path = window.location.pathname;
  if (path === '/') return 'home';
  if (path.startsWith('/about')) return 'about';
  if (path.startsWith('/music')) return 'music';
  if (path.startsWith('/portfolio')) return 'portfolio';
  if (path.startsWith('/blog')) return 'blog';
  if (path.startsWith('/contact')) return 'contact';
  if (path.startsWith('/booking')) return 'booking';
  return 'other';
}

// Declare gtag for TypeScript
declare global {
  function gtag(...args: any[]): void;
}
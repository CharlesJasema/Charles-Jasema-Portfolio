/**
 * Analytics Integration Module
 * Supports Google Analytics 4, Vercel Analytics, and custom event tracking
 */

import { siteConfig } from './config';

// Google Analytics 4 Integration
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// Check if we're in production and GA ID is set
export const isAnalyticsEnabled = () => {
  return process.env.NODE_ENV === 'production' && GA_TRACKING_ID;
};

// Initialize Google Analytics
export const initGA = () => {
  if (!isAnalyticsEnabled()) {
    console.log('Analytics disabled in development or GA_ID not set');
    return;
  }

  // Load gtag script
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(script1);

  // Initialize gtag
  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_TRACKING_ID}', {
      page_title: document.title,
      page_location: window.location.href,
    });
  `;
  document.head.appendChild(script2);

  console.log('Google Analytics initialized');
};

// Page view tracking
export const trackPageView = (url) => {
  if (!isAnalyticsEnabled() || typeof window === 'undefined') return;

  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
    page_title: document.title,
  });
};

// Event tracking
export const trackEvent = (action, category = 'General', label = '', value = 0) => {
  if (!isAnalyticsEnabled() || typeof window === 'undefined') return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });

  console.log(`Event tracked: ${action} - ${category} - ${label}`);
};

// Social media click tracking
export const trackSocialClick = (platform, url) => {
  trackEvent('social_click', 'Social Media', platform);
  
  // Custom event for social engagement
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'social_engagement', {
      social_network: platform,
      social_action: 'click',
      social_target: url,
    });
  }
};

// Project view tracking
export const trackProjectView = (projectName) => {
  trackEvent('project_view', 'Portfolio', projectName);
};

// CV download tracking
export const trackCVDownload = (format = 'pdf') => {
  trackEvent('cv_download', 'Documents', format);
};

// Contact form tracking
export const trackContactForm = (method) => {
  trackEvent('contact_attempt', 'Contact', method);
};

// Performance tracking
export const trackPerformance = () => {
  if (!isAnalyticsEnabled() || typeof window === 'undefined') return;

  // Track Core Web Vitals
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    getCLS(({ value }) => {
      trackEvent('web_vitals', 'Performance', 'CLS', Math.round(value * 1000));
    });
    
    getFID(({ value }) => {
      trackEvent('web_vitals', 'Performance', 'FID', Math.round(value));
    });
    
    getFCP(({ value }) => {
      trackEvent('web_vitals', 'Performance', 'FCP', Math.round(value));
    });
    
    getLCP(({ value }) => {
      trackEvent('web_vitals', 'Performance', 'LCP', Math.round(value));
    });
    
    getTTFB(({ value }) => {
      trackEvent('web_vitals', 'Performance', 'TTFB', Math.round(value));
    });
  });
};

// Carousel interaction tracking
export const trackCarouselInteraction = (action, carouselName) => {
  trackEvent('carousel_interaction', 'UI', `${carouselName}_${action}`);
};

// Theme toggle tracking
export const trackThemeToggle = (theme) => {
  trackEvent('theme_toggle', 'UI', theme);
};

// Search tracking (for future blog functionality)
export const trackSearch = (query) => {
  trackEvent('search', 'Content', query);
};

// Error tracking
export const trackError = (error, context = '') => {
  if (!isAnalyticsEnabled()) return;
  
  trackEvent('javascript_error', 'Error', `${error.message} - ${context}`);
  
  // Send to error tracking service if available
  if (typeof window !== 'undefined' && window.Sentry) {
    window.Sentry.captureException(error);
  }
};

// Custom dimensions for enhanced tracking
export const setUserProperties = (properties) => {
  if (!isAnalyticsEnabled() || typeof window === 'undefined') return;

  window.gtag('config', GA_TRACKING_ID, {
    user_properties: properties,
  });
};

// Initialize analytics on app start
export const initializeAnalytics = () => {
  if (typeof window === 'undefined') return;

  // Initialize GA
  initGA();
  
  // Track performance metrics
  trackPerformance();
  
  // Set initial user properties
  setUserProperties({
    preferred_theme: localStorage.getItem('theme') || 'light',
    user_agent: navigator.userAgent,
    screen_resolution: `${screen.width}x${screen.height}`,
  });

  console.log('Analytics system initialized');
};

export default {
  initializeAnalytics,
  trackPageView,
  trackEvent,
  trackSocialClick,
  trackProjectView,
  trackCVDownload,
  trackContactForm,
  trackCarouselInteraction,
  trackThemeToggle,
  trackSearch,
  trackError,
  isAnalyticsEnabled,
};
/**
 * Google Analytics 4 Integration with Enhanced Tracking
 * 
 * Setup Instructions:
 * 1. Go to https://analytics.google.com
 * 2. Create account and property for Charles Jasema Portfolio
 * 3. Get your Measurement ID (G-XXXXXXXXXX)
 * 4. Add it to .env.local as NEXT_PUBLIC_GA_MEASUREMENT_ID
 * 5. Configure Enhanced Ecommerce for booking tracking
 * 6. Set up conversion goals in GA4 dashboard
 */

// Google Analytics Measurement ID
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

// Check if GA is enabled
export const isGAEnabled = !!GA_MEASUREMENT_ID && typeof window !== 'undefined';

// Enhanced page view tracking with custom parameters
export const pageview = (url: string, title?: string) => {
  if (!isGAEnabled || !window.gtag) return;
  
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
    page_title: title,
    custom_map: {
      custom_parameter_1: 'page_category'
    }
  });
};

// Enhanced event tracking with GA4 recommended events
type GTagEvent = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
};

export const event = ({ action, category, label, value, custom_parameters }: GTagEvent) => {
  if (!isGAEnabled || !window.gtag) return;
  
  const eventParams: Record<string, any> = {
    event_category: category,
    event_label: label,
    value: value,
    ...custom_parameters
  };

  // Remove undefined values
  Object.keys(eventParams).forEach(key => {
    if (eventParams[key] === undefined) {
      delete eventParams[key];
    }
  });
  
  window.gtag('event', action, eventParams);
};

// =============================================================================
// CORE TRACKING FUNCTIONS
// =============================================================================

// Page Views with Enhanced Data
export const trackPageView = (pageName: string, pageCategory: string) => {
  event({
    action: 'page_view',
    category: 'Navigation',
    label: pageName,
    custom_parameters: {
      page_category: pageCategory,
      timestamp: new Date().toISOString()
    }
  });
};

// CTA Interactions (Call-to-Action tracking)
export const trackCTAClick = (ctaName: string, ctaLocation: string, ctaType: 'primary' | 'secondary' | 'tertiary') => {
  event({
    action: 'cta_click',
    category: 'CTA',
    label: ctaName,
    custom_parameters: {
      cta_location: ctaLocation,
      cta_type: ctaType,
      page_url: window.location.href
    }
  });
};

// Social Media Interactions
export const trackSocialShare = (platform: string, contentType: string, contentTitle: string) => {
  event({
    action: 'share',
    category: 'Social',
    label: `${platform} - ${contentType}`,
    custom_parameters: {
      content_type: contentType,
      content_title: contentTitle,
      social_platform: platform
    }
  });
};

export const trackSocialFollow = (platform: string, location: string) => {
  event({
    action: 'social_follow',
    category: 'Social',
    label: platform,
    custom_parameters: {
      follow_location: location,
      social_platform: platform
    }
  });
};

// Download Tracking
export const trackDownload = (fileName: string, fileType: string, downloadLocation: string) => {
  event({
    action: 'file_download',
    category: 'Downloads',
    label: fileName,
    custom_parameters: {
      file_type: fileType,
      file_name: fileName,
      download_location: downloadLocation,
      file_size: 'unknown' // Can be enhanced with actual file size
    }
  });
};

// Form Submissions
export const trackFormSubmission = (formName: string, formLocation: string, success: boolean) => {
  event({
    action: success ? 'form_submit_success' : 'form_submit_error',
    category: 'Forms',
    label: formName,
    custom_parameters: {
      form_location: formLocation,
      form_name: formName,
      submission_status: success ? 'success' : 'error'
    }
  });
};

// Music Interactions
export const trackMusicPlay = (songTitle: string, artist: string, platform: string, duration?: number) => {
  event({
    action: 'music_play',
    category: 'Music',
    label: songTitle,
    custom_parameters: {
      song_title: songTitle,
      artist: artist,
      music_platform: platform,
      play_duration: duration
    }
  });
};

export const trackMusicPause = (songTitle: string, playTime: number) => {
  event({
    action: 'music_pause',
    category: 'Music',
    label: songTitle,
    value: Math.round(playTime),
    custom_parameters: {
      song_title: songTitle,
      play_time_seconds: playTime
    }
  });
};

export const trackMusicComplete = (songTitle: string, totalDuration: number) => {
  event({
    action: 'music_complete',
    category: 'Music',
    label: songTitle,
    value: Math.round(totalDuration),
    custom_parameters: {
      song_title: songTitle,
      total_duration: totalDuration,
      completion_rate: 100
    }
  });
};

// Portfolio Engagement
export const trackPortfolioView = (projectTitle: string, projectCategory: string, viewDuration?: number) => {
  event({
    action: 'portfolio_view',
    category: 'Portfolio',
    label: projectTitle,
    value: viewDuration,
    custom_parameters: {
      project_title: projectTitle,
      project_category: projectCategory,
      view_duration: viewDuration
    }
  });
};

export const trackPortfolioInteraction = (projectTitle: string, interactionType: string) => {
  event({
    action: 'portfolio_interaction',
    category: 'Portfolio',
    label: `${projectTitle} - ${interactionType}`,
    custom_parameters: {
      project_title: projectTitle,
      interaction_type: interactionType
    }
  });
};

// =============================================================================
// ENHANCED ECOMMERCE TRACKING (for booking/hiring)
// =============================================================================

// Begin Checkout (Booking Process)
export const trackBeginCheckout = (serviceType: string, serviceValue: number, currency: string = 'USD') => {
  if (!isGAEnabled || !window.gtag) return;
  
  window.gtag('event', 'begin_checkout', {
    currency: currency,
    value: serviceValue,
    items: [{
      item_id: `service_${serviceType.toLowerCase().replace(/\s+/g, '_')}`,
      item_name: serviceType,
      item_category: 'Professional Services',
      item_variant: 'Booking',
      quantity: 1,
      price: serviceValue
    }]
  });
};

// Purchase (Booking Confirmation)
export const trackPurchase = (
  transactionId: string, 
  serviceType: string, 
  serviceValue: number, 
  currency: string = 'USD'
) => {
  if (!isGAEnabled || !window.gtag) return;
  
  window.gtag('event', 'purchase', {
    transaction_id: transactionId,
    currency: currency,
    value: serviceValue,
    items: [{
      item_id: `service_${serviceType.toLowerCase().replace(/\s+/g, '_')}`,
      item_name: serviceType,
      item_category: 'Professional Services',
      item_variant: 'Booking',
      quantity: 1,
      price: serviceValue
    }]
  });
};

// Add to Cart (Service Interest)
export const trackAddToCart = (serviceType: string, serviceValue: number, currency: string = 'USD') => {
  if (!isGAEnabled || !window.gtag) return;
  
  window.gtag('event', 'add_to_cart', {
    currency: currency,
    value: serviceValue,
    items: [{
      item_id: `service_${serviceType.toLowerCase().replace(/\s+/g, '_')}`,
      item_name: serviceType,
      item_category: 'Professional Services',
      quantity: 1,
      price: serviceValue
    }]
  });
};

// =============================================================================
// CONVERSION GOALS TRACKING
// =============================================================================

// Lead Generation (Contact Form)
export const trackLead = (leadSource: string, leadType: string) => {
  event({
    action: 'generate_lead',
    category: 'Conversions',
    label: leadType,
    custom_parameters: {
      lead_source: leadSource,
      lead_type: leadType,
      conversion_type: 'contact'
    }
  });
};

// Booking Inquiry
export const trackBookingInquiry = (serviceType: string, inquiryMethod: string) => {
  event({
    action: 'booking_inquiry',
    category: 'Conversions',
    label: serviceType,
    custom_parameters: {
      service_type: serviceType,
      inquiry_method: inquiryMethod,
      conversion_type: 'booking'
    }
  });
};

// Hiring Inquiry
export const trackHiringInquiry = (projectType: string, inquiryMethod: string, estimatedBudget?: string) => {
  event({
    action: 'hiring_inquiry',
    category: 'Conversions',
    label: projectType,
    custom_parameters: {
      project_type: projectType,
      inquiry_method: inquiryMethod,
      estimated_budget: estimatedBudget,
      conversion_type: 'hiring'
    }
  });
};

// Newsletter Signup
export const trackNewsletterSignup = (location: string, source: string) => {
  event({
    action: 'newsletter_signup',
    category: 'Conversions',
    label: location,
    custom_parameters: {
      signup_location: location,
      signup_source: source,
      conversion_type: 'newsletter'
    }
  });
};

// =============================================================================
// PERFORMANCE METRICS TRACKING
// =============================================================================

// Core Web Vitals
export const trackWebVital = (name: string, value: number, id: string) => {
  event({
    action: 'web_vital',
    category: 'Performance',
    label: name,
    value: Math.round(value),
    custom_parameters: {
      metric_name: name,
      metric_value: value,
      metric_id: id
    }
  });
};

// Page Load Performance
export const trackPageLoadTime = (loadTime: number, pageType: string) => {
  event({
    action: 'page_load_time',
    category: 'Performance',
    label: pageType,
    value: Math.round(loadTime),
    custom_parameters: {
      load_time_ms: loadTime,
      page_type: pageType
    }
  });
};

// Error Tracking
export const trackError = (errorType: string, errorMessage: string, errorLocation: string) => {
  event({
    action: 'error_occurred',
    category: 'Errors',
    label: errorType,
    custom_parameters: {
      error_type: errorType,
      error_message: errorMessage,
      error_location: errorLocation,
      user_agent: navigator.userAgent
    }
  });
};

// =============================================================================
// USER ENGAGEMENT TRACKING
// =============================================================================

// Scroll Depth
export const trackScrollDepth = (percentage: number, pageType: string) => {
  event({
    action: 'scroll_depth',
    category: 'Engagement',
    label: `${percentage}%`,
    value: percentage,
    custom_parameters: {
      scroll_percentage: percentage,
      page_type: pageType
    }
  });
};

// Time on Page
export const trackTimeOnPage = (timeSpent: number, pageType: string) => {
  event({
    action: 'time_on_page',
    category: 'Engagement',
    label: pageType,
    value: Math.round(timeSpent),
    custom_parameters: {
      time_spent_seconds: timeSpent,
      page_type: pageType
    }
  });
};

// Search Functionality
export const trackSearch = (searchQuery: string, searchLocation: string, resultsCount: number) => {
  event({
    action: 'search',
    category: 'Search',
    label: searchQuery,
    value: resultsCount,
    custom_parameters: {
      search_term: searchQuery,
      search_location: searchLocation,
      results_count: resultsCount
    }
  });
};

// =============================================================================
// LEGACY FUNCTIONS (maintained for backward compatibility)
// =============================================================================

export const trackContact = (method: string) => {
  trackLead(method, 'contact_form');
};

export const trackBooking = (serviceType: string) => {
  trackBookingInquiry(serviceType, 'booking_form');
};

export const trackDonation = (amount: number, method: string) => {
  event({
    action: 'donation',
    category: 'Monetization',
    label: method,
    value: amount,
    custom_parameters: {
      donation_amount: amount,
      donation_method: method
    }
  });
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

// Initialize enhanced tracking
export const initializeAnalytics = () => {
  if (!isGAEnabled) {
    console.log('Google Analytics is not configured. Add NEXT_PUBLIC_GA_MEASUREMENT_ID to your environment variables.');
    return;
  }

  // Track initial page load
  trackPageView(document.title, getPageCategory());
  
  // Set up scroll depth tracking
  setupScrollTracking();
  
  // Set up time on page tracking
  setupTimeTracking();
  
  // Set up error tracking
  setupErrorTracking();
};

// Get page category based on URL
const getPageCategory = (): string => {
  const path = window.location.pathname;
  if (path === '/') return 'Home';
  if (path.startsWith('/about')) return 'About';
  if (path.startsWith('/music')) return 'Music';
  if (path.startsWith('/portfolio')) return 'Portfolio';
  if (path.startsWith('/blog')) return 'Blog';
  if (path.startsWith('/contact')) return 'Contact';
  if (path.startsWith('/booking')) return 'Booking';
  return 'Other';
};

// Set up scroll depth tracking
const setupScrollTracking = () => {
  let maxScroll = 0;
  const milestones = [25, 50, 75, 90, 100];
  const tracked = new Set<number>();

  const handleScroll = () => {
    const scrollPercent = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );
    
    maxScroll = Math.max(maxScroll, scrollPercent);
    
    milestones.forEach(milestone => {
      if (maxScroll >= milestone && !tracked.has(milestone)) {
        tracked.add(milestone);
        trackScrollDepth(milestone, getPageCategory());
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
};

// Set up time on page tracking
const setupTimeTracking = () => {
  const startTime = Date.now();
  
  const trackTime = () => {
    const timeSpent = (Date.now() - startTime) / 1000;
    trackTimeOnPage(timeSpent, getPageCategory());
  };

  // Track time when user leaves page
  window.addEventListener('beforeunload', trackTime);
  
  // Track time at intervals for long sessions
  setInterval(() => {
    const timeSpent = (Date.now() - startTime) / 1000;
    if (timeSpent > 30 && timeSpent % 30 === 0) { // Every 30 seconds after first 30 seconds
      trackTimeOnPage(timeSpent, getPageCategory());
    }
  }, 1000);
};

// Set up error tracking
const setupErrorTracking = () => {
  window.addEventListener('error', (event) => {
    trackError(
      'JavaScript Error',
      event.message,
      `${event.filename}:${event.lineno}:${event.colno}`
    );
  });

  window.addEventListener('unhandledrejection', (event) => {
    trackError(
      'Unhandled Promise Rejection',
      event.reason?.toString() || 'Unknown error',
      window.location.href
    );
  });
};

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}

/**
 * Analytics Integration Module
 * 
 * Provides comprehensive analytics tracking including:
 * - Google Analytics 4 (GA4)
 * - Custom event tracking
 * - Performance monitoring
 * - User behavior analytics
 * - Privacy-compliant tracking
 */

// Analytics configuration
interface AnalyticsConfig {
  gaId?: string;
  debug?: boolean;
  anonymizeIp?: boolean;
  cookieConsent?: boolean;
}

// Event tracking interface
interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  customParameters?: Record<string, any>;
}

// User properties interface
interface UserProperties {
  userId?: string;
  userType?: 'visitor' | 'returning' | 'subscriber';
  preferredTheme?: 'light' | 'dark' | 'system';
  deviceType?: 'mobile' | 'tablet' | 'desktop';
  connectionType?: string;
}

class AnalyticsManager {
  private config: AnalyticsConfig;
  private isInitialized = false;
  private eventQueue: AnalyticsEvent[] = [];

  constructor(config: AnalyticsConfig) {
    this.config = config;
  }

  // Initialize analytics
  async initialize(): Promise<void> {
    if (this.isInitialized || typeof window === 'undefined') {
      return;
    }

    try {
      // Check for cookie consent if required
      if (this.config.cookieConsent && !this.hasCookieConsent()) {
        console.log('Analytics: Waiting for cookie consent');
        return;
      }

      // Initialize Google Analytics 4
      if (this.config.gaId) {
        await this.initializeGA4();
      }

      // Process queued events
      this.processEventQueue();
      
      this.isInitialized = true;
      
      if (this.config.debug) {
        console.log('Analytics initialized successfully');
      }
    } catch (error) {
      console.error('Analytics initialization failed:', error);
    }
  }

  // Initialize Google Analytics 4
  private async initializeGA4(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        // Load gtag script
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${this.config.gaId}`;
        
        script.onload = () => {
          // Initialize gtag
          (window as any).dataLayer = (window as any).dataLayer || [];
          (window as any).gtag = function() {
            (window as any).dataLayer.push(arguments);
          };

          const gtag = (window as any).gtag;
          
          gtag('js', new Date());
          gtag('config', this.config.gaId, {
            anonymize_ip: this.config.anonymizeIp,
            debug_mode: this.config.debug,
            send_page_view: false, // We'll handle page views manually
          });

          resolve();
        };

        script.onerror = () => {
          reject(new Error('Failed to load Google Analytics script'));
        };

        document.head.appendChild(script);
      } catch (error) {
        reject(error);
      }
    });
  }

  // Track page view
  trackPageView(path?: string, title?: string): void {
    const pageData = {
      page_path: path || (typeof window !== 'undefined' ? window.location.pathname : ''),
      page_title: title || (typeof document !== 'undefined' ? document.title : ''),
      page_location: typeof window !== 'undefined' ? window.location.href : '',
    };

    if (this.isInitialized && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', pageData);
    }

    if (this.config.debug) {
      console.log('Analytics: Page view tracked', pageData);
    }
  }

  // Track custom event
  trackEvent(event: AnalyticsEvent): void {
    if (!this.isInitialized) {
      // Queue event for later processing
      this.eventQueue.push(event);
      return;
    }

    const eventData = {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
      ...event.customParameters,
    };

    if ((window as any).gtag) {
      (window as any).gtag('event', event.action, eventData);
    }

    if (this.config.debug) {
      console.log('Analytics: Event tracked', event.action, eventData);
    }
  }

  // Set user properties
  setUserProperties(properties: UserProperties): void {
    if (!this.isInitialized || !(window as any).gtag) {
      return;
    }

    (window as any).gtag('config', this.config.gaId, {
      user_properties: properties,
    });

    if (this.config.debug) {
      console.log('Analytics: User properties set', properties);
    }
  }

  // Track conversion
  trackConversion(conversionId: string, value?: number, currency: string = 'USD'): void {
    const conversionData: any = {
      send_to: conversionId,
    };

    if (value !== undefined) {
      conversionData.value = value;
      conversionData.currency = currency;
    }

    if (this.isInitialized && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', conversionData);
    }

    if (this.config.debug) {
      console.log('Analytics: Conversion tracked', conversionData);
    }
  }

  // Process queued events
  private processEventQueue(): void {
    while (this.eventQueue.length > 0) {
      const event = this.eventQueue.shift();
      if (event) {
        this.trackEvent(event);
      }
    }
  }

  // Check cookie consent
  private hasCookieConsent(): boolean {
    if (typeof localStorage === 'undefined') {
      return false;
    }
    
    return localStorage.getItem('cookie_consent') === 'accepted';
  }

  // Enable analytics after consent
  enableWithConsent(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('cookie_consent', 'accepted');
    }
    
    if (!this.isInitialized) {
      this.initialize();
    }
  }

  // Disable analytics
  disable(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('cookie_consent', 'rejected');
    }

    // Disable GA4 tracking
    if ((window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: 'denied',
      });
    }

    this.isInitialized = false;
  }
}

// Create analytics instance
const analyticsConfig: AnalyticsConfig = {
  gaId: process.env.NEXT_PUBLIC_GA_ID,
  debug: process.env.NODE_ENV === 'development',
  anonymizeIp: true,
  cookieConsent: true,
};

export const analytics = new AnalyticsManager(analyticsConfig);

// Predefined event tracking functions
export const trackingEvents = {
  // Navigation events
  pageView: (path?: string, title?: string) => {
    analytics.trackPageView(path, title);
  },

  // User interaction events
  buttonClick: (buttonName: string, location: string) => {
    analytics.trackEvent({
      action: 'click',
      category: 'engagement',
      label: `${buttonName}_${location}`,
    });
  },

  linkClick: (url: string, linkText: string) => {
    analytics.trackEvent({
      action: 'click',
      category: 'outbound_link',
      label: linkText,
      customParameters: { link_url: url },
    });
  },

  // Content engagement
  videoPlay: (videoTitle: string, videoId: string) => {
    analytics.trackEvent({
      action: 'play',
      category: 'video',
      label: videoTitle,
      customParameters: { video_id: videoId },
    });
  },

  musicPlay: (songTitle: string, artist: string) => {
    analytics.trackEvent({
      action: 'play',
      category: 'music',
      label: songTitle,
      customParameters: { artist },
    });
  },

  downloadCV: () => {
    analytics.trackEvent({
      action: 'download',
      category: 'engagement',
      label: 'cv_download',
    });
  },

  // Contact and conversion events
  contactFormSubmit: (formType: string) => {
    analytics.trackEvent({
      action: 'submit',
      category: 'contact',
      label: formType,
    });
  },

  socialFollow: (platform: string) => {
    analytics.trackEvent({
      action: 'follow',
      category: 'social',
      label: platform,
    });
  },

  // Portfolio events
  projectView: (projectName: string, category: string) => {
    analytics.trackEvent({
      action: 'view',
      category: 'portfolio',
      label: projectName,
      customParameters: { project_category: category },
    });
  },

  // Search and filtering
  portfolioFilter: (filterType: string, filterValue: string) => {
    analytics.trackEvent({
      action: 'filter',
      category: 'portfolio',
      label: `${filterType}_${filterValue}`,
    });
  },

  // Performance tracking
  performanceMetric: (metricName: string, value: number) => {
    analytics.trackEvent({
      action: 'performance',
      category: 'technical',
      label: metricName,
      value: Math.round(value),
    });
  },

  // Error tracking
  errorOccurred: (errorType: string, errorMessage: string) => {
    analytics.trackEvent({
      action: 'error',
      category: 'technical',
      label: errorType,
      customParameters: { error_message: errorMessage },
    });
  },
};

// Export individual tracking functions for useAnalytics hook
export const trackCTAClick = (ctaName: string, location: string, type: 'primary' | 'secondary' | 'tertiary' = 'primary') => {
  analytics.trackEvent({
    action: 'cta_click',
    category: 'engagement',
    label: `${ctaName}_${location}_${type}`,
    customParameters: { cta_name: ctaName, location, type },
  });
};

export const trackSocialShare = (platform: string, contentType: string, contentTitle: string) => {
  analytics.trackEvent({
    action: 'share',
    category: 'social',
    label: `${platform}_${contentType}`,
    customParameters: { platform, content_type: contentType, content_title: contentTitle },
  });
};

export const trackSocialFollow = (platform: string, location: string) => {
  analytics.trackEvent({
    action: 'follow',
    category: 'social',
    label: `${platform}_${location}`,
    customParameters: { platform, location },
  });
};

export const trackDownload = (fileName: string, fileType: string, location: string) => {
  analytics.trackEvent({
    action: 'download',
    category: 'engagement',
    label: `${fileName}_${fileType}`,
    customParameters: { file_name: fileName, file_type: fileType, location },
  });
};

export const trackFormSubmission = (formName: string, location: string, success: boolean) => {
  analytics.trackEvent({
    action: success ? 'form_submit_success' : 'form_submit_error',
    category: 'engagement',
    label: `${formName}_${location}`,
    customParameters: { form_name: formName, location, success },
  });
};

export const trackMusicPlay = (songTitle: string, artist: string, platform: string, duration?: number) => {
  analytics.trackEvent({
    action: 'music_play',
    category: 'music',
    label: `${songTitle}_${artist}`,
    customParameters: { song_title: songTitle, artist, platform, duration },
  });
};

export const trackMusicPause = (songTitle: string, playTime: number) => {
  analytics.trackEvent({
    action: 'music_pause',
    category: 'music',
    label: songTitle,
    customParameters: { song_title: songTitle, play_time: playTime },
  });
};

export const trackMusicComplete = (songTitle: string, totalDuration: number) => {
  analytics.trackEvent({
    action: 'music_complete',
    category: 'music',
    label: songTitle,
    customParameters: { song_title: songTitle, total_duration: totalDuration },
  });
};

export const trackPortfolioView = (projectTitle: string, category: string, duration?: number) => {
  analytics.trackEvent({
    action: 'portfolio_view',
    category: 'portfolio',
    label: `${projectTitle}_${category}`,
    customParameters: { project_title: projectTitle, project_category: category, duration },
  });
};

export const trackPortfolioInteraction = (projectTitle: string, interactionType: string) => {
  analytics.trackEvent({
    action: 'portfolio_interaction',
    category: 'portfolio',
    label: `${projectTitle}_${interactionType}`,
    customParameters: { project_title: projectTitle, interaction_type: interactionType },
  });
};

export const trackLead = (source: string, type: string) => {
  analytics.trackEvent({
    action: 'generate_lead',
    category: 'conversion',
    label: `${source}_${type}`,
    customParameters: { source, lead_type: type },
  });
};

export const trackBookingInquiry = (serviceType: string, method: string) => {
  analytics.trackEvent({
    action: 'booking_inquiry',
    category: 'conversion',
    label: `${serviceType}_${method}`,
    customParameters: { service_type: serviceType, method },
  });
};

export const trackHiringInquiry = (projectType: string, method: string, budget?: string) => {
  analytics.trackEvent({
    action: 'hiring_inquiry',
    category: 'conversion',
    label: `${projectType}_${method}`,
    customParameters: { project_type: projectType, method, budget },
  });
};

export const trackNewsletterSignup = (location: string, source: string) => {
  analytics.trackEvent({
    action: 'newsletter_signup',
    category: 'conversion',
    label: `${location}_${source}`,
    customParameters: { location, source },
  });
};

export const trackBeginCheckout = (serviceType: string, value: number, currency: string = 'USD') => {
  analytics.trackEvent({
    action: 'begin_checkout',
    category: 'ecommerce',
    label: serviceType,
    value,
    customParameters: { service_type: serviceType, currency },
  });
};

export const trackPurchase = (transactionId: string, serviceType: string, value: number, currency: string = 'USD') => {
  analytics.trackEvent({
    action: 'purchase',
    category: 'ecommerce',
    label: serviceType,
    value,
    customParameters: { transaction_id: transactionId, service_type: serviceType, currency },
  });
};

export const trackAddToCart = (serviceType: string, value: number, currency: string = 'USD') => {
  analytics.trackEvent({
    action: 'add_to_cart',
    category: 'ecommerce',
    label: serviceType,
    value,
    customParameters: { service_type: serviceType, currency },
  });
};

export const trackSearch = (query: string, location: string, resultsCount: number) => {
  analytics.trackEvent({
    action: 'search',
    category: 'engagement',
    label: `${query}_${location}`,
    customParameters: { search_query: query, location, results_count: resultsCount },
  });
};

export const trackDonation = (amount: number, method: string, currency: string = 'USD') => {
  analytics.trackEvent({
    action: 'donation',
    category: 'conversion',
    label: `${method}_${currency}`,
    value: amount,
    customParameters: { amount, method, currency },
  });
};

export const trackError = (type: string, message: string, location: string) => {
  analytics.trackEvent({
    action: 'error',
    category: 'technical',
    label: `${type}_${location}`,
    customParameters: { error_type: type, error_message: message, location },
  });
};

export const isGAEnabled = !!process.env.NEXT_PUBLIC_GA_ID;
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

// Initialize analytics function for external use
export const initializeAnalytics = () => {
  if (typeof window !== 'undefined') {
    analytics.initialize();
  }
};

// React hook for analytics
export const useAnalytics = () => {
  const trackEvent = (event: AnalyticsEvent) => {
    analytics.trackEvent(event);
  };

  const trackPageView = (path?: string, title?: string) => {
    analytics.trackPageView(path, title);
  };

  const setUserProperties = (properties: UserProperties) => {
    analytics.setUserProperties(properties);
  };

  return {
    trackEvent,
    trackPageView,
    setUserProperties,
    ...trackingEvents,
  };
};

// Initialize analytics on import (client-side only)
if (typeof window !== 'undefined') {
  analytics.initialize();
}

export default analytics;
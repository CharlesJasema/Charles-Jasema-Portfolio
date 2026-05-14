'use client';

import { useCallback } from 'react';
import {
  trackCTAClick,
  trackSocialShare,
  trackSocialFollow,
  trackDownload,
  trackFormSubmission,
  trackMusicPlay,
  trackMusicPause,
  trackMusicComplete,
  trackPortfolioView,
  trackPortfolioInteraction,
  trackBeginCheckout,
  trackPurchase,
  trackAddToCart,
  trackLead,
  trackBookingInquiry,
  trackHiringInquiry,
  trackNewsletterSignup,
  trackSearch,
  trackError,
  isGAEnabled
} from '@/lib/analytics';

export interface UseAnalyticsReturn {
  // Core tracking functions
  trackCTA: (ctaName: string, location: string, type?: 'primary' | 'secondary' | 'tertiary') => void;
  trackSocial: {
    share: (platform: string, contentType: string, contentTitle: string) => void;
    follow: (platform: string, location: string) => void;
  };
  trackDownload: (fileName: string, fileType: string, location: string) => void;
  trackForm: (formName: string, location: string, success: boolean) => void;
  
  // Music tracking
  trackMusic: {
    play: (songTitle: string, artist: string, platform: string, duration?: number) => void;
    pause: (songTitle: string, playTime: number) => void;
    complete: (songTitle: string, totalDuration: number) => void;
  };
  
  // Portfolio tracking
  trackPortfolio: {
    view: (projectTitle: string, category: string, duration?: number) => void;
    interact: (projectTitle: string, interactionType: string) => void;
  };
  
  // Conversion tracking
  trackConversion: {
    lead: (source: string, type: string) => void;
    booking: (serviceType: string, method: string) => void;
    hiring: (projectType: string, method: string, budget?: string) => void;
    newsletter: (location: string, source: string) => void;
  };
  
  // Ecommerce tracking
  trackEcommerce: {
    beginCheckout: (serviceType: string, value: number, currency?: string) => void;
    purchase: (transactionId: string, serviceType: string, value: number, currency?: string) => void;
    addToCart: (serviceType: string, value: number, currency?: string) => void;
  };
  
  // Utility functions
  trackSearch: (query: string, location: string, resultsCount: number) => void;
  trackError: (type: string, message: string, location: string) => void;
  isEnabled: boolean;
}

export function useAnalytics(): UseAnalyticsReturn {
  // CTA tracking
  const handleCTAClick = useCallback((ctaName: string, location: string, type: 'primary' | 'secondary' | 'tertiary' = 'primary') => {
    trackCTAClick(ctaName, location, type);
  }, []);

  // Social media tracking
  const handleSocialShare = useCallback((platform: string, contentType: string, contentTitle: string) => {
    trackSocialShare(platform, contentType, contentTitle);
  }, []);

  const handleSocialFollow = useCallback((platform: string, location: string) => {
    trackSocialFollow(platform, location);
  }, []);

  // Download tracking
  const handleDownload = useCallback((fileName: string, fileType: string, location: string) => {
    trackDownload(fileName, fileType, location);
  }, []);

  // Form tracking
  const handleFormSubmission = useCallback((formName: string, location: string, success: boolean) => {
    trackFormSubmission(formName, location, success);
  }, []);

  // Music tracking
  const handleMusicPlay = useCallback((songTitle: string, artist: string, platform: string, duration?: number) => {
    trackMusicPlay(songTitle, artist, platform, duration);
  }, []);

  const handleMusicPause = useCallback((songTitle: string, playTime: number) => {
    trackMusicPause(songTitle, playTime);
  }, []);

  const handleMusicComplete = useCallback((songTitle: string, totalDuration: number) => {
    trackMusicComplete(songTitle, totalDuration);
  }, []);

  // Portfolio tracking
  const handlePortfolioView = useCallback((projectTitle: string, category: string, duration?: number) => {
    trackPortfolioView(projectTitle, category, duration);
  }, []);

  const handlePortfolioInteraction = useCallback((projectTitle: string, interactionType: string) => {
    trackPortfolioInteraction(projectTitle, interactionType);
  }, []);

  // Conversion tracking
  const handleLead = useCallback((source: string, type: string) => {
    trackLead(source, type);
  }, []);

  const handleBookingInquiry = useCallback((serviceType: string, method: string) => {
    trackBookingInquiry(serviceType, method);
  }, []);

  const handleHiringInquiry = useCallback((projectType: string, method: string, budget?: string) => {
    trackHiringInquiry(projectType, method, budget);
  }, []);

  const handleNewsletterSignup = useCallback((location: string, source: string) => {
    trackNewsletterSignup(location, source);
  }, []);

  // Ecommerce tracking
  const handleBeginCheckout = useCallback((serviceType: string, value: number, currency: string = 'USD') => {
    trackBeginCheckout(serviceType, value, currency);
  }, []);

  const handlePurchase = useCallback((transactionId: string, serviceType: string, value: number, currency: string = 'USD') => {
    trackPurchase(transactionId, serviceType, value, currency);
  }, []);

  const handleAddToCart = useCallback((serviceType: string, value: number, currency: string = 'USD') => {
    trackAddToCart(serviceType, value, currency);
  }, []);

  // Search tracking
  const handleSearch = useCallback((query: string, location: string, resultsCount: number) => {
    trackSearch(query, location, resultsCount);
  }, []);

  // Error tracking
  const handleError = useCallback((type: string, message: string, location: string) => {
    trackError(type, message, location);
  }, []);

  return {
    // Core tracking
    trackCTA: handleCTAClick,
    trackSocial: {
      share: handleSocialShare,
      follow: handleSocialFollow,
    },
    trackDownload: handleDownload,
    trackForm: handleFormSubmission,
    
    // Music tracking
    trackMusic: {
      play: handleMusicPlay,
      pause: handleMusicPause,
      complete: handleMusicComplete,
    },
    
    // Portfolio tracking
    trackPortfolio: {
      view: handlePortfolioView,
      interact: handlePortfolioInteraction,
    },
    
    // Conversion tracking
    trackConversion: {
      lead: handleLead,
      booking: handleBookingInquiry,
      hiring: handleHiringInquiry,
      newsletter: handleNewsletterSignup,
    },
    
    // Ecommerce tracking
    trackEcommerce: {
      beginCheckout: handleBeginCheckout,
      purchase: handlePurchase,
      addToCart: handleAddToCart,
    },
    
    // Utility functions
    trackSearch: handleSearch,
    trackError: handleError,
    isEnabled: isGAEnabled,
  };
}
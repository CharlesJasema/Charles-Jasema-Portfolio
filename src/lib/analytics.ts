/**
 * Google Analytics 4 Integration
 * 
 * Setup Instructions:
 * 1. Go to https://analytics.google.com
 * 2. Create account and property
 * 3. Get your Measurement ID (G-XXXXXXXXXX)
 * 4. Add it to .env.local as NEXT_PUBLIC_GA_MEASUREMENT_ID
 */

// Google Analytics Measurement ID
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

// Check if GA is enabled
export const isGAEnabled = !!GA_MEASUREMENT_ID;

// Page view tracking
export const pageview = (url: string) => {
  if (!isGAEnabled) return;
  
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

// Event tracking
type GTagEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

export const event = ({ action, category, label, value }: GTagEvent) => {
  if (!isGAEnabled) return;
  
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Custom events for your website
export const trackDownload = (songTitle: string, format: string) => {
  event({
    action: 'download',
    category: 'Lyrics',
    label: `${songTitle} - ${format}`,
  });
};

export const trackMusicPlay = (songTitle: string, platform: string) => {
  event({
    action: 'play',
    category: 'Music',
    label: `${songTitle} - ${platform}`,
  });
};

export const trackSearch = (searchQuery: string) => {
  event({
    action: 'search',
    category: 'Lyrics',
    label: searchQuery,
  });
};

export const trackBooking = (serviceType: string) => {
  event({
    action: 'booking_request',
    category: 'Booking',
    label: serviceType,
  });
};

export const trackContact = (method: string) => {
  event({
    action: 'contact',
    category: 'Contact',
    label: method,
  });
};

export const trackDonation = (amount: number, method: string) => {
  event({
    action: 'donation',
    category: 'Monetization',
    label: method,
    value: amount,
  });
};

export const trackNewsletterSignup = (location: string) => {
  event({
    action: 'newsletter_signup',
    category: 'Engagement',
    label: location,
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

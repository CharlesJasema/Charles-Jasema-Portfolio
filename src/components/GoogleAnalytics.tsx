'use client';

import Script from 'next/script';
import { GA_MEASUREMENT_ID, isGAEnabled } from '@/lib/analytics';

export default function GoogleAnalytics() {
  if (!isGAEnabled) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // Enhanced GA4 Configuration
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              page_title: document.title,
              send_page_view: true,
              // Enhanced ecommerce
              allow_enhanced_conversions: true,
              // Privacy settings
              anonymize_ip: true,
              // Custom parameters
              custom_map: {
                'custom_parameter_1': 'page_category',
                'custom_parameter_2': 'user_type'
              }
            });
            
            // Initialize enhanced tracking after GA loads
            gtag('event', 'page_view', {
              page_title: document.title,
              page_location: window.location.href,
              page_path: window.location.pathname
            });
          `,
        }}
      />
      <Script
        id="analytics-init"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            // Initialize enhanced analytics tracking
            if (typeof window !== 'undefined' && window.gtag) {
              // Wait for GA to be fully loaded
              setTimeout(() => {
                if (window.initializeAnalytics) {
                  window.initializeAnalytics();
                }
              }, 1000);
            }
          `,
        }}
      />
    </>
  );
}

'use client';

import { useEffect } from 'react';
import Script from 'next/script';

// Tawk.to Configuration
const TAWK_TO_PROPERTY_ID = process.env.NEXT_PUBLIC_TAWK_TO_PROPERTY_ID || '';
const TAWK_TO_WIDGET_ID = process.env.NEXT_PUBLIC_TAWK_TO_WIDGET_ID || 'default';

// Check if Tawk.to is enabled
export const isTawkToEnabled = !!TAWK_TO_PROPERTY_ID && typeof window !== 'undefined';

interface TawkToAPI {
  maximize: () => void;
  minimize: () => void;
  toggle: () => void;
  popup: () => void;
  getWindowType: () => string;
  showWidget: () => void;
  hideWidget: () => void;
  toggleVisibility: () => void;
  getStatus: () => string;
  isChatMaximized: () => boolean;
  isChatMinimized: () => boolean;
  isChatHidden: () => boolean;
  isChatOngoing: () => boolean;
  isChatOnline: () => boolean;
  isVisitorEngaged: () => boolean;
  onLoaded: () => void;
  onBeforeLoaded: () => void;
  onLoad: () => void;
  onChatStarted: () => void;
  onChatEnded: () => void;
  onChatMaximized: () => void;
  onChatMinimized: () => void;
  onOfflineSubmit: () => void;
  widgetPosition: () => string;
  visitor: {
    name: string;
    email: string;
  };
  setAttributes: (attributes: Record<string, any>, callback?: () => void) => void;
  addEvent: (event: string, metadata?: Record<string, any>, callback?: () => void) => void;
  removeEvent: (event: string) => void;
  addTags: (tags: string[]) => void;
  removeTags: (tags: string[]) => void;
  getUnreadCount: () => number;
}

declare global {
  interface Window {
    Tawk_API?: TawkToAPI;
    Tawk_LoadStart?: Date;
  }
}

export default function TawkToChat() {
  useEffect(() => {
    if (!isTawkToEnabled) {
      console.log('Tawk.to is not configured. Add NEXT_PUBLIC_TAWK_TO_PROPERTY_ID to your environment variables.');
      return;
    }

    // Initialize Tawk.to API
    window.Tawk_API = window.Tawk_API || ({} as TawkToAPI);
    window.Tawk_LoadStart = new Date();

    // Configure Tawk.to settings
    if (window.Tawk_API) {
      window.Tawk_API.onLoaded = function() {
        console.log('Tawk.to chat widget loaded successfully');
        
        // Set visitor attributes if available
        const visitorInfo = getVisitorInfo();
        if (visitorInfo) {
          window.Tawk_API?.setAttributes(visitorInfo);
        }

        // Track chat widget load in analytics
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'chat_widget_loaded', {
            event_category: 'Chat',
            event_label: 'Tawk.to Widget'
          });
        }
      };

      // Track chat events
      window.Tawk_API.onChatMaximized = function() {
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'chat_maximized', {
            event_category: 'Chat',
            event_label: 'User opened chat'
          });
        }
      };

      window.Tawk_API.onChatMinimized = function() {
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'chat_minimized', {
            event_category: 'Chat',
            event_label: 'User minimized chat'
          });
        }
      };

      window.Tawk_API.onChatStarted = function() {
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'chat_started', {
            event_category: 'Chat',
            event_label: 'User started conversation'
          });
        }
      };

      window.Tawk_API.onChatEnded = function() {
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'chat_ended', {
            event_category: 'Chat',
            event_label: 'Conversation ended'
          });
        }
      };

      // Set custom visitor attributes
      window.Tawk_API.onBeforeLoaded = function() {
        // Set page-specific context
        const pageContext = getPageContext();
        window.Tawk_API?.addEvent('page_context', pageContext);
      };
    }

  }, []);

  if (!isTawkToEnabled) {
    return null;
  }

  return (
    <Script
      id="tawk-to-script"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{
        __html: `
          var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
          (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/${TAWK_TO_PROPERTY_ID}/${TAWK_TO_WIDGET_ID}';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
          })();
        `,
      }}
    />
  );
}

// Helper function to get visitor information
function getVisitorInfo() {
  if (typeof window === 'undefined') return null;

  return {
    'Page URL': window.location.href,
    'Page Title': document.title,
    'Referrer': document.referrer || 'Direct',
    'User Agent': navigator.userAgent,
    'Screen Resolution': `${screen.width}x${screen.height}`,
    'Timestamp': new Date().toISOString(),
  };
}

// Helper function to get page context
function getPageContext() {
  if (typeof window === 'undefined') return {};

  const path = window.location.pathname;
  let context = {
    page_type: 'general',
    service_interest: 'unknown',
    content_category: 'general'
  };

  if (path === '/') {
    context = {
      page_type: 'homepage',
      service_interest: 'general_inquiry',
      content_category: 'overview'
    };
  } else if (path.startsWith('/music')) {
    context = {
      page_type: 'music',
      service_interest: 'performance_booking',
      content_category: 'music'
    };
  } else if (path.startsWith('/portfolio')) {
    context = {
      page_type: 'portfolio',
      service_interest: 'development_services',
      content_category: 'portfolio'
    };
  } else if (path.startsWith('/about')) {
    context = {
      page_type: 'about',
      service_interest: 'general_inquiry',
      content_category: 'personal'
    };
  } else if (path.startsWith('/blog')) {
    context = {
      page_type: 'blog',
      service_interest: 'content_engagement',
      content_category: 'blog'
    };
  } else if (path.startsWith('/contact')) {
    context = {
      page_type: 'contact',
      service_interest: 'direct_contact',
      content_category: 'contact'
    };
  }

  return context;
}

// Utility functions for programmatic chat control
export const TawkToUtils = {
  maximize: () => {
    if (window.Tawk_API) {
      window.Tawk_API.maximize();
    }
  },
  
  minimize: () => {
    if (window.Tawk_API) {
      window.Tawk_API.minimize();
    }
  },
  
  toggle: () => {
    if (window.Tawk_API) {
      window.Tawk_API.toggle();
    }
  },
  
  showWidget: () => {
    if (window.Tawk_API) {
      window.Tawk_API.showWidget();
    }
  },
  
  hideWidget: () => {
    if (window.Tawk_API) {
      window.Tawk_API.hideWidget();
    }
  },
  
  setVisitorName: (name: string) => {
    if (window.Tawk_API) {
      window.Tawk_API.visitor = {
        ...window.Tawk_API.visitor,
        name: name
      };
    }
  },
  
  setVisitorEmail: (email: string) => {
    if (window.Tawk_API) {
      window.Tawk_API.visitor = {
        ...window.Tawk_API.visitor,
        email: email
      };
    }
  },
  
  addEvent: (event: string, metadata?: Record<string, any>) => {
    if (window.Tawk_API) {
      window.Tawk_API.addEvent(event, metadata);
    }
  },
  
  getStatus: () => {
    return window.Tawk_API?.getStatus() || 'offline';
  },
  
  isOnline: () => {
    const status = window.Tawk_API?.getStatus();
    return status === 'online';
  }
};
/**
 * Mobile Optimizations Component
 * 
 * Provides mobile-specific enhancements including touch gestures,
 * viewport management, and performance optimizations.
 */

'use client';

import { useEffect, useState, useCallback } from 'react';

interface TouchGestureProps {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number;
  children: React.ReactNode;
  className?: string;
}

/**
 * Touch Gesture Handler Component
 */
export const TouchGestureHandler: React.FC<TouchGestureProps> = ({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  threshold = 50,
  children,
  className,
}) => {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
    setTouchEnd(null);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchEnd({ x: touch.clientX, y: touch.clientY });
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;

    const deltaX = touchStart.x - touchEnd.x;
    const deltaY = touchStart.y - touchEnd.y;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // Determine if it's a horizontal or vertical swipe
    if (absDeltaX > absDeltaY) {
      // Horizontal swipe
      if (absDeltaX > threshold) {
        if (deltaX > 0) {
          onSwipeLeft?.();
        } else {
          onSwipeRight?.();
        }
      }
    } else {
      // Vertical swipe
      if (absDeltaY > threshold) {
        if (deltaY > 0) {
          onSwipeUp?.();
        } else {
          onSwipeDown?.();
        }
      }
    }

    setTouchStart(null);
    setTouchEnd(null);
  }, [touchStart, touchEnd, threshold, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown]);

  return (
    <div
      className={className}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </div>
  );
};

/**
 * Mobile Viewport Manager
 */
export const MobileViewportManager: React.FC = () => {
  useEffect(() => {
    // Set viewport meta tag for mobile optimization
    const setViewportMeta = () => {
      let viewport = document.querySelector('meta[name="viewport"]') as HTMLMetaElement;
      
      if (!viewport) {
        viewport = document.createElement('meta');
        viewport.name = 'viewport';
        document.head.appendChild(viewport);
      }

      // Prevent zoom on input focus for iOS
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const baseViewport = 'width=device-width, initial-scale=1.0';
      
      if (isIOS) {
        viewport.content = `${baseViewport}, maximum-scale=1.0, user-scalable=no`;
      } else {
        viewport.content = baseViewport;
      }
    };

    // Handle orientation change
    const handleOrientationChange = () => {
      // Force viewport recalculation on orientation change
      setTimeout(() => {
        window.scrollTo(0, 1);
        window.scrollTo(0, 0);
      }, 100);
    };

    // Handle resize for mobile browsers
    const handleResize = () => {
      // Update CSS custom property for viewport height
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setViewportMeta();
    handleResize();

    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return null;
};

/**
 * Touch Target Optimizer
 */
interface TouchTargetProps {
  children: React.ReactNode;
  minSize?: number;
  className?: string;
}

export const TouchTarget: React.FC<TouchTargetProps> = ({
  children,
  minSize = 44, // WCAG recommended minimum
  className,
}) => {
  return (
    <div
      className={className}
      style={{
        minWidth: `${minSize}px`,
        minHeight: `${minSize}px`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </div>
  );
};

/**
 * Mobile Performance Monitor
 */
export const MobilePerformanceMonitor: React.FC = () => {
  const [performanceMetrics, setPerformanceMetrics] = useState<{
    connectionType?: string;
    effectiveType?: string;
    downlink?: number;
    rtt?: number;
  }>({});

  useEffect(() => {
    // Check for Network Information API support
    const connection = (navigator as any).connection || 
                      (navigator as any).mozConnection || 
                      (navigator as any).webkitConnection;

    if (connection) {
      const updateConnectionInfo = () => {
        setPerformanceMetrics({
          connectionType: connection.type,
          effectiveType: connection.effectiveType,
          downlink: connection.downlink,
          rtt: connection.rtt,
        });
      };

      updateConnectionInfo();
      connection.addEventListener('change', updateConnectionInfo);

      return () => {
        connection.removeEventListener('change', updateConnectionInfo);
      };
    }
    
    return undefined;
  }, []);

  useEffect(() => {
    // Adjust performance based on connection
    const { effectiveType, downlink } = performanceMetrics;
    
    if (effectiveType === 'slow-2g' || effectiveType === '2g' || (downlink && downlink < 0.5)) {
      // Disable animations for slow connections
      document.documentElement.classList.add('reduce-motion');
      
      // Reduce image quality
      const images = document.querySelectorAll('img[data-src]');
      images.forEach((img) => {
        const lowQualitySrc = img.getAttribute('data-src-low');
        if (lowQualitySrc) {
          img.setAttribute('src', lowQualitySrc);
        }
      });
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
  }, [performanceMetrics]);

  return null;
};

/**
 * Mobile Navigation Helper
 */
interface MobileNavProps {
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export const MobileNavigation: React.FC<MobileNavProps> = ({
  isOpen,
  onToggle,
  children,
}) => {
  useEffect(() => {
    // Prevent body scroll when mobile nav is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onToggle();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onToggle]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onToggle}
        aria-hidden="true"
      />
      
      {/* Navigation panel */}
      <TouchGestureHandler
        onSwipeLeft={onToggle}
        className="fixed inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-gray-900 shadow-xl"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Navigation
            </h2>
            <TouchTarget>
              <button
                onClick={onToggle}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                aria-label="Close navigation"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </TouchTarget>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </div>
      </TouchGestureHandler>
    </div>
  );
};

/**
 * Mobile-specific CSS utilities
 */
export const MobileStyles: React.FC = () => {
  useEffect(() => {
    // Add mobile-specific CSS
    const style = document.createElement('style');
    style.textContent = `
      /* Mobile-specific styles */
      @media (max-width: 768px) {
        /* Improve touch targets */
        button, a, input, select, textarea {
          min-height: 44px;
          min-width: 44px;
        }
        
        /* Prevent zoom on input focus */
        input, select, textarea {
          font-size: 16px;
        }
        
        /* Smooth scrolling for mobile */
        html {
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
        }
        
        /* Reduce motion for users who prefer it */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        /* High contrast mode support */
        @media (prefers-contrast: high) {
          * {
            border-color: currentColor !important;
          }
        }
        
        /* Dark mode optimizations */
        @media (prefers-color-scheme: dark) {
          img {
            opacity: 0.8;
          }
        }
      }
      
      /* Screen reader only class */
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
      
      .sr-only:focus {
        position: static;
        width: auto;
        height: auto;
        padding: inherit;
        margin: inherit;
        overflow: visible;
        clip: auto;
        white-space: normal;
      }
      
      /* Focus visible for better keyboard navigation */
      .focus-visible:focus {
        outline: 2px solid #D4AF37;
        outline-offset: 2px;
      }
      
      /* Reduce motion class */
      .reduce-motion * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    `;
    
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
};

/**
 * Main Mobile Optimizations Component
 */
export const MobileOptimizations: React.FC = () => {
  return (
    <>
      <MobileViewportManager />
      <MobilePerformanceMonitor />
      <MobileStyles />
    </>
  );
};

export default MobileOptimizations;
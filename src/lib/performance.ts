/**
 * Performance Optimization Utilities
 * Core Web Vitals and loading performance optimizations
 */

// Image optimization configurations
export const imageOptimization = {
  // Above-the-fold images (hero sections, etc.)
  priority: {
    priority: true,
    placeholder: 'blur' as const,
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    quality: 90,
  },
  
  // Regular images
  standard: {
    placeholder: 'blur' as const,
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    quality: 85,
    loading: 'lazy' as const,
  },
  
  // Thumbnail images
  thumbnail: {
    sizes: '(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 200px',
    quality: 80,
    loading: 'lazy' as const,
  },
  
  // Profile/avatar images
  profile: {
    sizes: '(max-width: 768px) 200px, 300px',
    quality: 90,
    loading: 'lazy' as const,
  },
};

// Lazy loading configuration
export const lazyLoadConfig = {
  threshold: 0.1,
  rootMargin: '50px',
  triggerOnce: true,
};

// Intersection Observer for lazy loading
export function createIntersectionObserver(
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = lazyLoadConfig
): IntersectionObserver | null {
  if (typeof window === 'undefined') return null;
  
  return new IntersectionObserver(callback, options);
}

// Preload critical resources
export function preloadCriticalResources() {
  if (typeof window === 'undefined') return;
  
  // Preload critical fonts
  const fontPreloads = [
    '/fonts/inter-var.woff2',
    '/fonts/montserrat-var.woff2',
  ];
  
  fontPreloads.forEach(font => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = font;
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
}

// Optimize bundle loading
export function optimizeBundleLoading() {
  if (typeof window === 'undefined') return;
  
  // Prefetch next page resources on hover
  const links = document.querySelectorAll('a[href^="/"]');
  
  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      const href = link.getAttribute('href');
      if (href && !document.querySelector(`link[rel="prefetch"][href="${href}"]`)) {
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = href;
        document.head.appendChild(prefetchLink);
      }
    }, { once: true });
  });
}

// Core Web Vitals measurement
export function measureCoreWebVitals() {
  if (typeof window === 'undefined') return;
  
  // Largest Contentful Paint (LCP)
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    
    console.log('LCP:', lastEntry.startTime);
    
    // Send to analytics if needed
    if (typeof gtag !== 'undefined') {
      gtag('event', 'web_vitals', {
        name: 'LCP',
        value: Math.round(lastEntry.startTime),
        event_category: 'performance',
      });
    }
  });
  
  observer.observe({ entryTypes: ['largest-contentful-paint'] });
  
  // First Input Delay (FID)
  const fidObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry) => {
      const fidEntry = entry as any; // Cast to access processingStart
      console.log('FID:', fidEntry.processingStart - fidEntry.startTime);
      
      if (typeof gtag !== 'undefined') {
        gtag('event', 'web_vitals', {
          name: 'FID',
          value: Math.round(fidEntry.processingStart - fidEntry.startTime),
          event_category: 'performance',
        });
      }
    });
  });
  
  fidObserver.observe({ entryTypes: ['first-input'] });
  
  // Cumulative Layout Shift (CLS)
  let clsValue = 0;
  const clsObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry: any) => {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
      }
    });
    
    console.log('CLS:', clsValue);
    
    if (typeof gtag !== 'undefined') {
      gtag('event', 'web_vitals', {
        name: 'CLS',
        value: Math.round(clsValue * 1000),
        event_category: 'performance',
      });
    }
  });
  
  clsObserver.observe({ entryTypes: ['layout-shift'] });
}

// Service Worker registration for caching
export function registerServiceWorker() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;
  
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Resource hints for better loading
export function addResourceHints() {
  if (typeof window === 'undefined') return;
  
  // DNS prefetch for external domains
  const domains = [
    'cdn.sanity.io',
    'fonts.googleapis.com',
    'fonts.gstatic.com',
  ];
  
  domains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = `//${domain}`;
    document.head.appendChild(link);
  });
  
  // Preconnect to critical domains
  const criticalDomains = [
    'cdn.sanity.io',
    'fonts.gstatic.com',
  ];
  
  criticalDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = `https://${domain}`;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
}

// Initialize all performance optimizations
export function initializePerformanceOptimizations() {
  if (typeof window === 'undefined') return;
  
  // Run on page load
  window.addEventListener('load', () => {
    preloadCriticalResources();
    optimizeBundleLoading();
    measureCoreWebVitals();
    addResourceHints();
    
    // Register service worker in production
    if (process.env.NODE_ENV === 'production') {
      registerServiceWorker();
    }
  });
}

// Track web vitals to analytics
export const trackWebVital = (name: string, value: number, id: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'web_vital', {
      name: name,
      value: Math.round(value),
      metric_id: id,
      event_category: 'performance'
    });
  }
};

// Track page load time
export const trackPageLoadTime = (loadTime: number, pageType: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'page_load_time', {
      value: Math.round(loadTime),
      page_type: pageType,
      event_category: 'performance'
    });
  }
};

// Debounce utility for performance
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle utility for performance
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
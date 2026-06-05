/**
 * Performance Monitoring and Optimization Utilities
 * 
 * This module provides comprehensive performance monitoring,
 * Core Web Vitals tracking, and optimization utilities.
 */

// Performance metrics interface
export interface PerformanceMetrics {
  // Core Web Vitals
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  fcp?: number; // First Contentful Paint
  ttfb?: number; // Time to First Byte
  
  // Custom metrics
  pageLoadTime?: number;
  domContentLoaded?: number;
  resourceLoadTime?: number;
  
  // User context
  userAgent?: string;
  connectionType?: string;
  deviceMemory?: number;
  
  // Page context
  url?: string;
  referrer?: string;
  timestamp?: number;
}

// Performance observer for Core Web Vitals
class PerformanceMonitor {
  private metrics: PerformanceMetrics = {};
  private observers: PerformanceObserver[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeObservers();
      this.collectBasicMetrics();
    }
  }

  private initializeObservers() {
    // Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          this.metrics.lcp = lastEntry.startTime;
          this.reportMetric('LCP', lastEntry.startTime);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        this.observers.push(lcpObserver);
      } catch (e) {
        console.warn('LCP observer not supported');
      }

      // First Input Delay (FID)
      try {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            this.metrics.fid = entry.processingStart - entry.startTime;
            this.reportMetric('FID', this.metrics.fid);
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
        this.observers.push(fidObserver);
      } catch (e) {
        console.warn('FID observer not supported');
      }

      // Cumulative Layout Shift (CLS)
      try {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
              this.metrics.cls = clsValue;
            }
          });
          this.reportMetric('CLS', clsValue);
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
        this.observers.push(clsObserver);
      } catch (e) {
        console.warn('CLS observer not supported');
      }

      // Navigation timing
      try {
        const navigationObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            this.metrics.fcp = entry.firstContentfulPaint;
            this.metrics.domContentLoaded = entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart;
            this.metrics.pageLoadTime = entry.loadEventEnd - entry.loadEventStart;
          });
        });
        navigationObserver.observe({ entryTypes: ['navigation'] });
        this.observers.push(navigationObserver);
      } catch (e) {
        console.warn('Navigation observer not supported');
      }
    }
  }

  private collectBasicMetrics() {
    // Collect basic performance metrics
    if (typeof window !== 'undefined' && window.performance) {
      const navigation = performance.getEntriesByType('navigation')[0] as any;
      if (navigation) {
        this.metrics.ttfb = navigation.responseStart - navigation.requestStart;
        this.metrics.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
        this.metrics.pageLoadTime = navigation.loadEventEnd - navigation.loadEventStart;
      }

      // Collect user context
      this.metrics.userAgent = navigator.userAgent;
      this.metrics.connectionType = (navigator as any).connection?.effectiveType || 'unknown';
      this.metrics.deviceMemory = (navigator as any).deviceMemory || 0;
      this.metrics.url = window.location.href;
      this.metrics.referrer = document.referrer;
      this.metrics.timestamp = Date.now();
    }
  }

  private reportMetric(name: string, value: number) {
    // Report to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Performance Metric - ${name}:`, value);
    }

    // Here you could send to analytics service
    // Example: analytics.track('performance_metric', { name, value, ...this.metrics });
  }

  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  public disconnect() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Singleton instance
let performanceMonitor: PerformanceMonitor | null = null;

export const initializePerformanceMonitoring = (): PerformanceMonitor => {
  if (!performanceMonitor && typeof window !== 'undefined') {
    performanceMonitor = new PerformanceMonitor();
  }
  return performanceMonitor!;
};

export const getPerformanceMetrics = (): PerformanceMetrics => {
  return performanceMonitor?.getMetrics() || {};
};

// Performance optimization utilities
export const performanceUtils = {
  // Lazy load images with intersection observer
  lazyLoadImage: (img: HTMLImageElement, src: string) => {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            img.src = src;
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        });
      });
      observer.observe(img);
    } else {
      // Fallback for browsers without IntersectionObserver
      img.src = src;
    }
  },

  // Preload critical resources
  preloadResource: (href: string, as: string = 'script') => {
    if (typeof document !== 'undefined') {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = as;
      document.head.appendChild(link);
    }
  },

  // Measure function execution time
  measureFunction: <T extends (...args: any[]) => any>(
    fn: T,
    name: string
  ): T => {
    return ((...args: Parameters<T>) => {
      const start = performance.now();
      const result = fn(...args);
      const end = performance.now();
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`Function ${name} took ${end - start} milliseconds`);
      }
      
      return result;
    }) as T;
  },

  // Debounce function for performance
  debounce: <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): T => {
    let timeout: NodeJS.Timeout;
    return ((...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    }) as T;
  },

  // Throttle function for performance
  throttle: <T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): T => {
    let inThrottle: boolean;
    return ((...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }) as T;
  },

  // Check if user prefers reduced motion
  prefersReducedMotion: (): boolean => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  },

  // Get connection quality
  getConnectionQuality: (): 'slow' | 'fast' | 'unknown' => {
    if (typeof navigator !== 'undefined' && (navigator as any).connection) {
      const connection = (navigator as any).connection;
      const effectiveType = connection.effectiveType;
      
      if (effectiveType === 'slow-2g' || effectiveType === '2g') {
        return 'slow';
      } else if (effectiveType === '3g' || effectiveType === '4g') {
        return 'fast';
      }
    }
    return 'unknown';
  },

  // Memory usage monitoring
  getMemoryUsage: (): { used: number; total: number } | null => {
    if (typeof performance !== 'undefined' && (performance as any).memory) {
      const memory = (performance as any).memory;
      return {
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize
      };
    }
    return null;
  }
};

// Performance budget checker
interface PerformanceThresholds {
  lcp: { good: number; poor: number };
  fid: { good: number; poor: number };
  cls: { good: number; poor: number };
  fcp: { good: number; poor: number };
  ttfb: { good: number; poor: number };
}

interface PerformanceBudgetChecker {
  thresholds: PerformanceThresholds;
  checkMetric: (metric: keyof PerformanceThresholds, value: number) => 'good' | 'needs-improvement' | 'poor';
  generateReport: (metrics: PerformanceMetrics) => Record<string, any>;
}

export const performanceBudget: PerformanceBudgetChecker = {
  // Core Web Vitals thresholds (good/needs improvement/poor)
  thresholds: {
    lcp: { good: 2500, poor: 4000 }, // milliseconds
    fid: { good: 100, poor: 300 },   // milliseconds
    cls: { good: 0.1, poor: 0.25 },  // score
    fcp: { good: 1800, poor: 3000 }, // milliseconds
    ttfb: { good: 800, poor: 1800 }  // milliseconds
  },

  checkMetric: (metric: keyof PerformanceThresholds, value: number): 'good' | 'needs-improvement' | 'poor' => {
    const threshold = performanceBudget.thresholds[metric];
    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  },

  generateReport: (metrics: PerformanceMetrics): Record<string, any> => {
    const report: Record<string, any> = {};
    
    Object.entries(metrics).forEach(([key, value]) => {
      if (typeof value === 'number' && key in performanceBudget.thresholds) {
        report[key] = {
          value,
          status: performanceBudget.checkMetric(key as keyof PerformanceThresholds, value),
          threshold: performanceBudget.thresholds[key as keyof PerformanceThresholds]
        };
      }
    });
    
    return report;
  }
};

// Export aliases for backward compatibility
export const initializePerformanceOptimizations = initializePerformanceMonitoring;

export const trackWebVital = (name: string, value: number, location: string) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`Web Vital - ${name}:`, value, 'at', location);
  }
  
  // Here you could send to analytics service
  // Example: analytics.track('web_vital', { name, value, location });
};

export const trackPageLoadTime = (loadTime: number, pageCategory: string) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`Page Load Time:`, loadTime, 'for', pageCategory);
  }
  
  // Here you could send to analytics service
  // Example: analytics.track('page_load_time', { loadTime, pageCategory });
};

// Export default performance monitor
export default PerformanceMonitor;
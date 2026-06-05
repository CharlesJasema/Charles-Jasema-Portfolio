/**
 * Advanced Performance Monitoring System
 * 
 * Provides comprehensive performance tracking, Core Web Vitals monitoring,
 * and real-time performance analytics for the Charles Jasema Portfolio.
 */

import { analytics } from './analytics';

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

// Performance thresholds for scoring
const PERFORMANCE_THRESHOLDS = {
  lcp: { good: 2500, poor: 4000 },
  fid: { good: 100, poor: 300 },
  cls: { good: 0.1, poor: 0.25 },
  fcp: { good: 1800, poor: 3000 },
  ttfb: { good: 800, poor: 1800 }
};

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {};
  private observers: PerformanceObserver[] = [];
  private isInitialized = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initialize();
    }
  }

  private initialize() {
    if (this.isInitialized) return;

    this.collectBasicMetrics();
    this.initializeObservers();
    this.setupErrorTracking();
    this.isInitialized = true;

    // Report initial metrics after page load
    if (document.readyState === 'complete') {
      this.reportInitialMetrics();
    } else {
      window.addEventListener('load', () => this.reportInitialMetrics());
    }
  }

  private collectBasicMetrics() {
    if (typeof window === 'undefined' || !window.performance) return;

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
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

  private initializeObservers() {
    if (!('PerformanceObserver' in window)) return;

    // Largest Contentful Paint (LCP)
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        if (lastEntry) {
          this.metrics.lcp = lastEntry.startTime;
          this.reportMetric('LCP', lastEntry.startTime);
          analytics.trackEvent({
            action: 'web_vital',
            category: 'performance',
            label: 'LCP',
            value: Math.round(lastEntry.startTime),
            customParameters: {
              score: this.getMetricScore('lcp', lastEntry.startTime),
              url: window.location.pathname
            }
          });
        }
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
          const fidValue = entry.processingStart - entry.startTime;
          this.metrics.fid = fidValue;
          this.reportMetric('FID', fidValue);
          analytics.trackEvent({
            action: 'web_vital',
            category: 'performance',
            label: 'FID',
            value: Math.round(fidValue),
            customParameters: {
              score: this.getMetricScore('fid', fidValue),
              url: window.location.pathname
            }
          });
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
        
        if (clsValue > 0) {
          this.reportMetric('CLS', clsValue);
          analytics.trackEvent({
            action: 'web_vital',
            category: 'performance',
            label: 'CLS',
            value: Math.round(clsValue * 1000),
            customParameters: {
              score: this.getMetricScore('cls', clsValue),
              url: window.location.pathname
            }
          });
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(clsObserver);
    } catch (e) {
      console.warn('CLS observer not supported');
    }

    // First Contentful Paint (FCP)
    try {
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (entry.name === 'first-contentful-paint') {
            this.metrics.fcp = entry.startTime;
            this.reportMetric('FCP', entry.startTime);
          }
        });
      });
      fcpObserver.observe({ entryTypes: ['paint'] });
      this.observers.push(fcpObserver);
    } catch (e) {
      console.warn('FCP observer not supported');
    }
  }

  private setupErrorTracking() {
    // Track JavaScript errors
    window.addEventListener('error', (event) => {
      analytics.trackEvent({
        action: 'javascript_error',
        category: 'performance',
        label: 'runtime_error',
        customParameters: {
          message: event.message,
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
          url: window.location.pathname
        }
      });
    });

    // Track unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      analytics.trackEvent({
        action: 'promise_rejection',
        category: 'performance',
        label: 'unhandled_rejection',
        customParameters: {
          reason: event.reason?.toString() || 'Unknown',
          url: window.location.pathname
        }
      });
    });

    // Track resource loading errors
    window.addEventListener('error', (event) => {
      if (event.target && event.target !== window) {
        const target = event.target as HTMLElement;
        analytics.trackEvent({
          action: 'resource_error',
          category: 'performance',
          label: 'resource_load_failed',
          customParameters: {
            resource_type: target.tagName?.toLowerCase() || 'unknown',
            resource_url: (target as any).src || (target as any).href || 'unknown',
            url: window.location.pathname
          }
        });
      }
    }, true);
  }

  private reportMetric(name: string, value: number) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`Performance Metric - ${name}:`, value, 'Score:', this.getMetricScore(name.toLowerCase() as keyof typeof PERFORMANCE_THRESHOLDS, value));
    }
  }

  private reportInitialMetrics() {
    // Report TTFB
    if (this.metrics.ttfb) {
      analytics.trackEvent({
        action: 'web_vital',
        category: 'performance',
        label: 'TTFB',
        value: Math.round(this.metrics.ttfb),
        customParameters: {
          score: this.getMetricScore('ttfb', this.metrics.ttfb),
          url: window.location.pathname
        }
      });
    }

    // Report page load time
    if (this.metrics.pageLoadTime) {
      analytics.trackEvent({
        action: 'page_load_time',
        category: 'performance',
        label: 'full_page_load',
        value: Math.round(this.metrics.pageLoadTime),
        customParameters: {
          url: window.location.pathname,
          connection_type: this.metrics.connectionType,
          device_memory: this.metrics.deviceMemory
        }
      });
    }
  }

  private getMetricScore(metric: keyof typeof PERFORMANCE_THRESHOLDS, value: number): 'good' | 'needs-improvement' | 'poor' {
    const threshold = PERFORMANCE_THRESHOLDS[metric];
    if (!threshold) return 'good';
    
    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  }

  // Public methods
  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  public generateReport(): Record<string, any> {
    const report: Record<string, any> = {};
    
    Object.entries(this.metrics).forEach(([key, value]) => {
      if (typeof value === 'number' && key in PERFORMANCE_THRESHOLDS) {
        report[key] = {
          value,
          score: this.getMetricScore(key as keyof typeof PERFORMANCE_THRESHOLDS, value),
          threshold: PERFORMANCE_THRESHOLDS[key as keyof typeof PERFORMANCE_THRESHOLDS]
        };
      }
    });
    
    return report;
  }

  public trackCustomMetric(name: string, value: number, category: string = 'custom') {
    analytics.trackEvent({
      action: 'custom_metric',
      category: 'performance',
      label: name,
      value: Math.round(value),
      customParameters: {
        metric_category: category,
        url: window.location.pathname
      }
    });
  }

  public measureFunction<T extends (...args: any[]) => any>(
    fn: T,
    name: string
  ): T {
    return ((...args: Parameters<T>) => {
      const start = performance.now();
      const result = fn(...args);
      const end = performance.now();
      const duration = end - start;
      
      this.trackCustomMetric(`function_${name}`, duration, 'function_performance');
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`Function ${name} took ${duration.toFixed(2)}ms`);
      }
      
      return result;
    }) as T;
  }

  public disconnect() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    this.isInitialized = false;
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

export const trackCustomMetric = (name: string, value: number, category?: string) => {
  performanceMonitor?.trackCustomMetric(name, value, category);
};

export const measureFunction = <T extends (...args: any[]) => any>(fn: T, name: string): T => {
  return performanceMonitor?.measureFunction(fn, name) || fn;
};

// Auto-initialize on import
if (typeof window !== 'undefined') {
  initializePerformanceMonitoring();
}

export default PerformanceMonitor;
'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { FaExclamationTriangle, FaRedo, FaHome, FaBug } from 'react-icons/fa';
import { Button } from '@/components/ui';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  showDetails?: boolean;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  errorId?: string;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
      errorId: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error details
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });

    // Report error to monitoring service
    this.reportError(error, errorInfo);
  }

  private reportError = (error: Error, errorInfo: ErrorInfo) => {
    // In production, you would send this to your error reporting service
    const errorReport = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : 'unknown',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
      errorId: this.state.errorId
    };

    if (process.env.NODE_ENV === 'development') {
      console.group('🚨 Error Boundary Report');
      console.error('Error:', error);
      console.error('Error Info:', errorInfo);
      console.error('Full Report:', errorReport);
      console.groupEnd();
    }

    // TODO: Send to error reporting service (Sentry, LogRocket, etc.)
    // Example: errorReportingService.captureException(error, errorReport);
  };

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  private handleReload = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  private handleGoHome = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-slate-50 dark:bg-slate-900">
          <div className="max-w-md w-full text-center">
            {/* Error Icon */}
            <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaExclamationTriangle className="text-red-600 dark:text-red-400 text-3xl" />
            </div>

            {/* Error Message */}
            <h1 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              Oops! Something went wrong
            </h1>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We encountered an unexpected error. Don't worry, our team has been notified and we're working on a fix.
            </p>

            {/* Error Details (Development Only) */}
            {this.props.showDetails && process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6 text-left">
                <div className="flex items-center gap-2 mb-3">
                  <FaBug className="text-red-600 dark:text-red-400" />
                  <h3 className="font-semibold text-red-800 dark:text-red-200">
                    Development Error Details
                  </h3>
                </div>
                <div className="text-sm text-red-700 dark:text-red-300 space-y-2">
                  <div>
                    <strong>Error:</strong> {this.state.error.message}
                  </div>
                  {this.state.errorId && (
                    <div>
                      <strong>Error ID:</strong> {this.state.errorId}
                    </div>
                  )}
                  {this.state.error.stack && (
                    <details className="mt-2">
                      <summary className="cursor-pointer font-medium">Stack Trace</summary>
                      <pre className="mt-2 text-xs bg-red-100 dark:bg-red-900/40 p-2 rounded overflow-auto max-h-32">
                        {this.state.error.stack}
                      </pre>
                    </details>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={this.handleRetry}
                variant="primary"
                size="md"
                className="flex items-center gap-2"
              >
                <FaRedo className="text-sm" />
                Try Again
              </Button>
              
              <Button
                onClick={this.handleReload}
                variant="secondary"
                size="md"
                className="flex items-center gap-2"
              >
                <FaRedo className="text-sm" />
                Reload Page
              </Button>
              
              <Button
                onClick={this.handleGoHome}
                variant="ghost"
                size="md"
                className="flex items-center gap-2"
              >
                <FaHome className="text-sm" />
                Go Home
              </Button>
            </div>

            {/* Error ID for Support */}
            {this.state.errorId && (
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Error ID: <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">{this.state.errorId}</code>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Please include this ID when contacting support.
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Higher-order component for easier usage
export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<Props, 'children'>
) => {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
};

// Hook for error reporting in functional components
export const useErrorHandler = () => {
  const reportError = (error: Error, errorInfo?: any) => {
    console.error('Manual error report:', error, errorInfo);
    
    // Report to monitoring service
    const errorReport = {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : 'unknown',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
      additionalInfo: errorInfo
    };

    // TODO: Send to error reporting service
    if (process.env.NODE_ENV === 'development') {
      console.error('Error Report:', errorReport);
    }
  };

  return { reportError };
};

export default ErrorBoundary;
import { FaExclamationTriangle, FaRedo, FaWifi, FaServer, FaLock } from 'react-icons/fa';
import { Button } from './Button';

interface ErrorMessageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  variant?: 'page' | 'inline' | 'card';
  errorType?: 'network' | 'server' | 'permission' | 'generic';
}

export function ErrorMessage({
  title,
  message,
  onRetry,
  variant = 'inline',
  errorType = 'generic'
}: ErrorMessageProps) {
  // Determine icon and default messages based on error type
  const getErrorConfig = () => {
    switch (errorType) {
      case 'network':
        return {
          icon: FaWifi,
          defaultTitle: 'Connection Problem',
          defaultMessage: 'Please check your internet connection and try again.',
        };
      case 'server':
        return {
          icon: FaServer,
          defaultTitle: 'Server Error',
          defaultMessage: 'Our servers are experiencing issues. Please try again in a moment.',
        };
      case 'permission':
        return {
          icon: FaLock,
          defaultTitle: 'Access Denied',
          defaultMessage: 'You don\'t have permission to access this content.',
        };
      default:
        return {
          icon: FaExclamationTriangle,
          defaultTitle: 'Oops! Something went wrong',
          defaultMessage: 'We couldn\'t load this content. Please try again.',
        };
    }
  };

  const config = getErrorConfig();
  const Icon = config.icon;
  const displayTitle = title || config.defaultTitle;
  const displayMessage = message || config.defaultMessage;

  if (variant === 'page') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md animate-fadeIn">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full mb-4">
            <Icon className="text-3xl text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-2">
            {displayTitle}
          </h2>
          <p className="text-gray-600 dark:text-text-secondary mb-6">
            {displayMessage}
          </p>
          {onRetry && (
            <Button onClick={onRetry} variant="primary" className="inline-flex items-center gap-2">
              <FaRedo />
              <span>Try Again</span>
            </Button>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-6 animate-fadeIn">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <Icon className="text-2xl text-red-600 dark:text-red-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-red-900 dark:text-red-200 mb-1">
              {displayTitle}
            </h3>
            <p className="text-red-700 dark:text-red-300 mb-4">
              {displayMessage}
            </p>
            {onRetry && (
              <Button onClick={onRetry} variant="secondary" size="sm" className="inline-flex items-center gap-2">
                <FaRedo />
                <span>Try Again</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // inline variant
  return (
    <div className="flex items-center justify-center py-12 animate-fadeIn">
      <div className="text-center max-w-md">
        <Icon className="text-4xl text-red-600 dark:text-red-400 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {displayTitle}
        </h3>
        <p className="text-gray-600 dark:text-text-secondary mb-4">
          {displayMessage}
        </p>
        {onRetry && (
          <Button onClick={onRetry} variant="secondary" size="sm" className="inline-flex items-center gap-2">
            <FaRedo />
            <span>Try Again</span>
          </Button>
        )}
      </div>
    </div>
  );
}

export function EmptyState({
  title = 'No results found',
  message = 'Try adjusting your search or filters.',
  icon: Icon = FaExclamationTriangle,
  action
}: {
  title?: string;
  message?: string;
  icon?: React.ComponentType<{ className?: string }>;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center max-w-md">
        <Icon className="text-4xl text-gray-400 dark:text-gray-600 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-text-secondary mb-4">
          {message}
        </p>
        {action}
      </div>
    </div>
  );
}

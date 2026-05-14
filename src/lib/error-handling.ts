import { showToast } from './toast';

export type ErrorType = 'network' | 'server' | 'permission' | 'validation' | 'generic';

export interface AppError extends Error {
  type?: ErrorType;
  statusCode?: number;
  retryable?: boolean;
}

export function createError(
  message: string,
  type: ErrorType = 'generic',
  statusCode?: number,
  retryable: boolean = true
): AppError {
  const error = new Error(message) as AppError;
  error.type = type;
  error.statusCode = statusCode;
  error.retryable = retryable;
  return error;
}

export function handleError(error: unknown, context?: string): AppError {
  let appError: AppError;

  if (error instanceof Error) {
    appError = error as AppError;
  } else if (typeof error === 'string') {
    appError = createError(error);
  } else {
    appError = createError('An unexpected error occurred');
  }

  // Log error for debugging
  console.error(`Error in ${context || 'unknown context'}:`, appError);

  // Determine error type based on status code or message
  if (!appError.type) {
    if (appError.statusCode) {
      if (appError.statusCode >= 400 && appError.statusCode < 500) {
        appError.type = appError.statusCode === 403 ? 'permission' : 'validation';
        appError.retryable = false;
      } else if (appError.statusCode >= 500) {
        appError.type = 'server';
        appError.retryable = true;
      }
    } else if (appError.message.toLowerCase().includes('network')) {
      appError.type = 'network';
      appError.retryable = true;
    } else if (appError.message.toLowerCase().includes('fetch')) {
      appError.type = 'network';
      appError.retryable = true;
    }
  }

  return appError;
}

export function showErrorToast(error: AppError | Error | string) {
  let message: string;

  if (typeof error === 'string') {
    message = error;
  } else if (error instanceof Error) {
    const appError = error as AppError;
    switch (appError.type) {
      case 'network':
        message = 'Connection problem. Please check your internet and try again.';
        break;
      case 'server':
        message = 'Server error. Please try again in a moment.';
        break;
      case 'permission':
        message = 'You don\'t have permission to perform this action.';
        break;
      case 'validation':
        message = appError.message || 'Please check your input and try again.';
        break;
      default:
        message = appError.message || 'Something went wrong. Please try again.';
    }
  } else {
    message = 'An unexpected error occurred.';
  }

  showToast.error(message);
}

export async function withErrorHandling<T>(
  operation: () => Promise<T>,
  context?: string,
  showToastOnError: boolean = true
): Promise<T | null> {
  try {
    return await operation();
  } catch (error) {
    const appError = handleError(error, context);
    
    if (showToastOnError) {
      showErrorToast(appError);
    }
    
    return null;
  }
}

export function getRetryDelay(attempt: number, baseDelay: number = 1000): number {
  // Exponential backoff with jitter
  const delay = Math.min(baseDelay * Math.pow(2, attempt), 10000);
  return delay + Math.random() * 1000;
}

export async function retryOperation<T>(
  operation: () => Promise<T>,
  maxAttempts: number = 3,
  context?: string
): Promise<T> {
  let lastError: AppError;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = handleError(error, context);
      
      if (!lastError.retryable || attempt === maxAttempts - 1) {
        throw lastError;
      }
      
      const delay = getRetryDelay(attempt);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError!;
}
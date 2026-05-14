import { clsx } from 'clsx';

interface LoadingSkeletonProps {
  variant?: 'card' | 'text' | 'image' | 'list';
  count?: number;
  className?: string;
}

export function LoadingSkeleton({ 
  variant = 'card', 
  count = 1,
  className 
}: LoadingSkeletonProps) {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  if (variant === 'card') {
    return (
      <>
        {skeletons.map((i) => (
          <div
            key={i}
            className={clsx(
              'animate-pulse bg-slate-200 dark:bg-slate-800 rounded-lg p-6',
              className
            )}
          >
            <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-3/4 mb-4"></div>
            <div className="h-3 bg-slate-300 dark:bg-slate-700 rounded w-1/2 mb-3"></div>
            <div className="h-3 bg-slate-300 dark:bg-slate-700 rounded w-full mb-2"></div>
            <div className="h-3 bg-slate-300 dark:bg-slate-700 rounded w-5/6"></div>
          </div>
        ))}
      </>
    );
  }

  if (variant === 'text') {
    return (
      <>
        {skeletons.map((i) => (
          <div key={i} className={clsx('animate-pulse space-y-2', className)}>
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-4/6"></div>
          </div>
        ))}
      </>
    );
  }

  if (variant === 'image') {
    return (
      <>
        {skeletons.map((i) => (
          <div
            key={i}
            className={clsx(
              'animate-pulse bg-slate-200 dark:bg-slate-800 rounded-lg aspect-video',
              className
            )}
          ></div>
        ))}
      </>
    );
  }

  if (variant === 'list') {
    return (
      <div className="space-y-4">
        {skeletons.map((i) => (
          <div key={i} className="animate-pulse flex items-center space-x-4">
            <div className="h-12 w-12 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
              <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
}

export function LoadingSpinner({ size = 'md', className }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-3'
  };

  return (
    <div
      className={clsx(
        'inline-block animate-spin rounded-full border-accent-red border-t-transparent',
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export function LoadingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" className="mx-auto mb-4" />
        <p className="text-gray-600 dark:text-text-secondary text-lg">Loading...</p>
      </div>
    </div>
  );
}

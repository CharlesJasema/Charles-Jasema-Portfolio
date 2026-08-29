import { LoadingSpinner } from '@/components/ui';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="text-center">
        <LoadingSpinner size="lg" color="primary-gold" />
        <p className="mt-4 text-gray-600 dark:text-gray-300">Loading music ministry content...</p>
      </div>
    </div>
  );
}
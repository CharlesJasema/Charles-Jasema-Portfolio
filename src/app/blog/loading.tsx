import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header skeleton */}
        <div className="text-center mb-12">
          <LoadingSkeleton variant="text" count={2} className="max-w-2xl mx-auto" />
        </div>
        
        {/* Blog posts skeleton */}
        <div className="space-y-8">
          <LoadingSkeleton variant="card" count={5} />
        </div>
      </div>
    </div>
  );
}
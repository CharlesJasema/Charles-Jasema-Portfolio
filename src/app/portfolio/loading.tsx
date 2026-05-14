import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header skeleton */}
        <div className="text-center mb-12">
          <LoadingSkeleton variant="text" count={2} className="max-w-2xl mx-auto" />
        </div>
        
        {/* Filter skeleton */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <LoadingSkeleton variant="text" count={4} className="w-24 h-8" />
        </div>
        
        {/* Portfolio grid skeleton */}
        <div className="grid md:grid-cols-2 gap-8">
          <LoadingSkeleton variant="card" count={4} />
        </div>
      </div>
    </div>
  );
}
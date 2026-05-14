import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero section skeleton */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-1">
            <LoadingSkeleton variant="image" className="aspect-square rounded-full" />
          </div>
          <div className="md:col-span-2 space-y-4">
            <LoadingSkeleton variant="text" count={4} />
          </div>
        </div>
        
        {/* Timeline skeleton */}
        <div className="mb-12">
          <LoadingSkeleton variant="text" count={1} className="w-1/3 mb-6" />
          <LoadingSkeleton variant="list" count={5} />
        </div>
        
        {/* Skills skeleton */}
        <div className="grid md:grid-cols-3 gap-6">
          <LoadingSkeleton variant="card" count={3} />
        </div>
      </div>
    </div>
  );
}
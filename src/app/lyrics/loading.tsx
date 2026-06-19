export default function LyricsLoading() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Skeleton */}
          <div className="text-center mb-12">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-64 mx-auto mb-4 animate-pulse" />
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-96 mx-auto mb-2 animate-pulse" />
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-80 mx-auto animate-pulse" />
          </div>

          {/* Search Bar Skeleton */}
          <div className="mb-8">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg max-w-2xl mx-auto animate-pulse" />
          </div>

          {/* Lyrics Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md animate-pulse"
              >
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

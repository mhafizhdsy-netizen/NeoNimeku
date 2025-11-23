import { Skeleton } from "@/src/components/ui/Skeleton/Skeleton";

function WatchlistLoader() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a] pt-24 max-md:pt-20 px-4 max-md:px-3 pb-12 max-md:pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section Skeleton */}
        <div className="mb-8 max-md:mb-6">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-4 max-md:gap-3">
            <div className="flex items-center gap-4 max-md:gap-3">
              <Skeleton className="w-2 h-12 rounded-full max-md:h-10" />
              <div>
                <Skeleton className="w-48 h-10 mb-2 rounded-lg max-md:w-40 max-md:h-8 max-md:mb-1.5" />
                <Skeleton className="w-64 h-4 rounded-lg max-md:w-48 max-md:h-3" />
              </div>
            </div>
            <div className="flex items-center gap-3 max-md:gap-2">
              <Skeleton className="w-32 h-10 rounded-lg max-md:w-28 max-md:h-9" />
              <Skeleton className="w-28 h-10 rounded-lg max-md:w-24 max-md:h-9" />
            </div>
          </div>
        </div>

        {/* Watchlist Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-md:gap-4">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="group relative">
              <div className="relative bg-gradient-to-br from-[#141414] to-[#0f0f0f] rounded-2xl overflow-hidden border border-white/5">
                {/* Poster Skeleton */}
                <Skeleton className="w-full aspect-[2/3] rounded-none" />
                
                {/* Info Section Skeleton */}
                <div className="p-4 max-md:p-3">
                  <Skeleton className="w-full h-12 mb-2 rounded-lg max-md:h-10 max-md:mb-1.5" />
                  <div className="flex items-center gap-3 mb-3 max-md:gap-2 max-md:mb-2">
                    <Skeleton className="w-24 h-4 rounded-lg max-md:w-20 max-md:h-3" />
                    <Skeleton className="w-20 h-4 rounded-lg max-md:w-16 max-md:h-3" />
                  </div>
                  <Skeleton className="w-full h-10 rounded-lg max-md:h-9" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WatchlistLoader;

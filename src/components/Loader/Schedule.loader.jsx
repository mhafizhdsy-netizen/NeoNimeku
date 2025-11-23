import { Skeleton } from "../ui/Skeleton/Skeleton";

function ScheduleLoader() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a] pt-24 pb-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Content Container with Black Background and Rounded Edges */}
        <div className="bg-black/40 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-white/5 shadow-2xl">
          {/* Header Skeleton */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Skeleton className="w-2 h-12 rounded-full" />
              <div className="flex-1">
                <Skeleton className="w-64 h-10 mb-2 rounded-xl" />
                <Skeleton className="w-48 h-4 rounded-xl" />
              </div>
            </div>
            
            {/* Current Time Display Skeleton - Responsive */}
            <Skeleton className="w-auto inline-flex h-10 md:h-12 rounded-xl min-w-[280px]" />
          </div>

          {/* Date Selector Skeleton - Ultra Compact */}
          <div className="relative mb-8 px-12 max-md:px-10">
            <div className="flex gap-1 overflow-hidden">
              {[...Array(10)].map((_, index) => (
                <div
                  key={index}
                  className="relative px-3 py-2 rounded-lg bg-[#1a1a1a] border border-white/10 flex-shrink-0"
                  style={{ width: 'auto' }}
                >
                  {/* Content Skeleton */}
                  <div className="relative z-10 text-center whitespace-nowrap space-y-1">
                    {/* Day Name Skeleton */}
                    <Skeleton className="h-3 w-8 rounded mx-auto" />
                    {/* Date Skeleton */}
                    <Skeleton className="h-2.5 w-12 rounded mx-auto" />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Navigation Buttons Skeleton */}
            <Skeleton className="absolute top-1/2 left-0 transform -translate-y-1/2 w-10 h-10 rounded-lg" />
            <Skeleton className="absolute top-1/2 right-0 transform -translate-y-1/2 w-10 h-10 rounded-lg" />
          </div>

          {/* Schedule List Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(12)].map((_, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-[#141414] to-[#0f0f0f] rounded-xl overflow-hidden border border-white/5 hover:border-[#e91e63]/30 transition-all p-3"
              >
                <div className="flex gap-3">
                  {/* Cover Skeleton with Rounded Edges */}
                  <Skeleton className="w-20 h-28 rounded-xl flex-shrink-0" />

                  {/* Info Skeleton */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      {/* Title */}
                      <Skeleton className="w-full h-3.5 rounded-xl" />
                      <Skeleton className="w-3/4 h-3.5 rounded-xl" />
                      
                      {/* Time Badge with Rounded Full */}
                      <Skeleton className="w-20 h-6 rounded-full" />

                      {/* Episode & Type Badges - Rounded Full */}
                      <div className="flex items-center gap-1">
                        <Skeleton className="w-14 h-5 rounded-full" />
                        <Skeleton className="w-10 h-5 rounded-full" />
                        <Skeleton className="w-10 h-5 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScheduleLoader;

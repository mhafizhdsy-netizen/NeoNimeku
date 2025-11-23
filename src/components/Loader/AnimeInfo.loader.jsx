import { Skeleton } from "@/src/components/ui/Skeleton/Skeleton";
import CategoryCardLoader from "./CategoryCard.loader";

const VoiceActorLoader = () => (
  <div>
    <Skeleton className="h-8 w-48 mb-6" />
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex items-center gap-3 bg-white/5 p-2 rounded-lg">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SeasonsLoader = () => (
  <div>
    <Skeleton className="h-8 w-48 mb-6" />
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[...Array(2)].map((_, i) => (
        <Skeleton key={i} className="aspect-[3/1] rounded-lg" />
      ))}
    </div>
  </div>
);

function AnimeInfoLoader() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a]">
      {/* Skeleton for Hero Banner */}
      <Skeleton className="w-full h-[500px] max-md:h-[350px]" />

      {/* Skeleton for Overlapping Content */}
      <div className="relative -mt-40 max-md:-mt-28 z-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex gap-8 max-md:flex-col max-md:items-center">
            {/* Poster Skeleton */}
            <div className="flex-shrink-0">
              <Skeleton className="w-[240px] aspect-[2/3] rounded-2xl max-md:w-[200px]" />
              <div className="mt-4 flex items-center justify-center gap-2">
                <Skeleton className="w-24 h-6" />
                <Skeleton className="w-12 h-8" />
              </div>
            </div>

            {/* Info Skeleton */}
            <div className="flex-1 space-y-5 max-md:text-center max-md:space-y-4">
              {/* Title Skeleton */}
              <div className="space-y-3">
                <Skeleton className="h-10 w-3/4 max-md:mx-auto" />
                <Skeleton className="h-5 w-1/2 max-md:mx-auto" />
              </div>

              {/* Badges Skeleton */}
              <div className="flex items-center gap-2 max-md:justify-center flex-wrap">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-8 w-20 rounded-full" />
                ))}
              </div>

              {/* Action Buttons Skeleton */}
              <div className="flex gap-3 max-md:justify-center flex-wrap">
                <Skeleton className="w-36 h-12 rounded-xl" />
                <Skeleton className="w-12 h-12 rounded-xl" />
                <Skeleton className="w-12 h-12 rounded-xl" />
              </div>

              {/* Synopsis Skeleton */}
              <div className="space-y-2 max-w-4xl max-md:mx-auto">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>

              {/* Genre Tags Skeleton */}
              <div className="flex flex-wrap gap-2 max-md:justify-center">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-7 w-24 rounded-full" />
                ))}
              </div>

              {/* Detailed Info Box Skeleton */}
              <div className="bg-white/5 rounded-2xl border border-white/5 mt-6">
                <div className="p-6">
                  <Skeleton className="h-7 w-56 mb-6" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="space-y-2">
                        <Skeleton className="h-3 w-1/4" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skeletons for Lower Sections */}
      <div className="container mx-auto px-4 py-12 max-w-7xl space-y-16">
        <SeasonsLoader />
        <VoiceActorLoader />
        <CategoryCardLoader label="Recommended for you" />
      </div>
    </div>
  );
}

export default AnimeInfoLoader;

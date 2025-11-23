import { Skeleton } from "@/src/components/ui/Skeleton/Skeleton";
import SpotlightLoader from "./Spotlight.loader";
import TrendingLoader from "./Trending.loader";
import CategoryCardLoader from "./CategoryCard.loader";

const GenreLoader = () => (
  <div className="px-4 sm:px-6">
    <div className="flex gap-3 overflow-x-auto no-scrollbar">
      {[...Array(10)].map((_, i) => (
        <Skeleton key={i} className="h-10 w-28 rounded-lg flex-shrink-0" />
      ))}
    </div>
  </div>
);

const ContinueWatchingLoader = () => (
  <div className="px-4 sm:px-6 mt-8">
    <Skeleton className="h-8 w-64 mb-4" />
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="relative">
          <Skeleton className="w-full aspect-video rounded-lg" />
          <div className="mt-2 space-y-2">
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-3 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TabbedAnimeSectionLoader = ({ className }) => (
  <div className={className}>
    <div className="flex items-center border-b border-white/10 mb-6">
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} className="h-10 w-32 mr-4" />
      ))}
    </div>
    <CategoryCardLoader 
      showLabelSkeleton={false} 
      gridClass="grid-cols-4 max-[1400px]:grid-cols-3 max-[758px]:grid-cols-2 max-[478px]:grid-cols-2"
      cardCount={8}
    />
  </div>
);

const ToptenLoader = ({ className }) => (
  <div className={className}>
    <Skeleton className="h-8 w-48 mb-6" />
    <div className="space-y-4">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton className="w-16 h-20 rounded-md flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

function HomeLoader() {
  return (
    <div className="pt-16 w-full bg-[#0a0a0a]">
      <SpotlightLoader />
      
      <div className="mt-6">
        <GenreLoader />
      </div>

      <ContinueWatchingLoader />

      <div className="w-full grid grid-cols-[minmax(0,75%),minmax(0,25%)] gap-x-6 px-4 sm:px-6 mt-8 max-[1200px]:flex flex-col">
        <div>
          <CategoryCardLoader
            label="Latest Episode"
            className="mt-[60px]"
            gridClass="grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2"
            cardCount={12}
          />
          <TabbedAnimeSectionLoader className="mt-8" />
        </div>
        <div className="w-full mt-[60px]">
          <TrendingLoader />
          <ToptenLoader className="mt-12" />
        </div>
      </div>
    </div>
  );
}

export default HomeLoader;

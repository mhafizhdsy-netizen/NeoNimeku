import { Skeleton } from "../ui/Skeleton/Skeleton";
import CategoryCardLoader from "./CategoryCard.loader";

function SearchLoader() {
  const searchGridClass = "grid-cols-8 max-[1600px]:grid-cols-6 max-[1200px]:grid-cols-4 max-[758px]:grid-cols-3 max-[478px]:grid-cols-3 max-[478px]:gap-x-2";

  return (
    <div className="max-w-[1600px] mx-auto flex flex-col mt-[64px] max-md:mt-[50px] px-4 max-md:px-3">
      <div className="w-full flex flex-col gap-y-8 max-md:gap-y-6 mt-6 max-md:mt-4">
        <div className="flex flex-col gap-y-4 max-md:gap-y-3">
          {/* Search Results Title Skeleton */}
          <div className="flex items-center gap-3 mb-2">
            <Skeleton className="w-48 h-8 rounded-lg max-md:w-40 max-md:h-7" />
          </div>
          
          {/* Category Card Grid Skeleton */}
          <CategoryCardLoader 
            showLabelSkeleton={false}
            className="mt-0"
            gridClass={searchGridClass}
          />
          
          {/* Pagination Skeleton */}
          <div className="flex justify-center items-center gap-2 mt-8 max-md:mt-6 flex-wrap">
            {[...Array(5)].map((_, index) => (
              <Skeleton
                key={index}
                className="w-10 h-10 rounded-lg max-md:w-9 max-md:h-9"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchLoader;

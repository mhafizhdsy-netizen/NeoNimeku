import { Skeleton } from "../ui/Skeleton/Skeleton";
import CategoryCardLoader from "./CategoryCard.loader";

const PaginationLoader = () => (
  <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
    <Skeleton className="w-24 h-10 rounded-lg" /> 
    {[...Array(5)].map((_, index) => (
      <Skeleton key={index} className="w-10 h-10 rounded-lg" />
    ))}
    <Skeleton className="w-24 h-10 rounded-lg" />
  </div>
);

function AtoZLoader() {
  return (
    <div className="max-w-[1600px] mx-auto flex flex-col mt-[74px] px-4 sm:px-6">
      <div className="flex flex-col gap-y-4 mt-6">
        <Skeleton className="w-48 h-8" />
        <div className="flex gap-2 flex-wrap">
          {[...Array(29)].map((_, index) => (
            <Skeleton
              key={index}
              className="h-9 w-12 rounded-md"
            />
          ))}
        </div>
      </div>
      <div className="mt-8">
        <CategoryCardLoader 
          showLabelSkeleton={false}
          cardStyle="grid-cols-8 max-[1600px]:grid-cols-6 max-[1200px]:grid-cols-4 max-[758px]:grid-cols-3 max-[478px]:grid-cols-3 max-[478px]:gap-x-2"
          cardCount={16} // A more realistic number for a full page
        />
        <PaginationLoader />
      </div>
    </div>
  );
}

export default AtoZLoader;

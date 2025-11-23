import { Skeleton } from "../ui/Skeleton/Skeleton";

const PaginationLoader = () => (
  <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
    <Skeleton className="w-24 h-10 rounded-lg" />
    {[...Array(5)].map((_, index) => (
      <Skeleton key={index} className="w-10 h-10 rounded-lg" />
    ))}
    <Skeleton className="w-24 h-10 rounded-lg" />
  </div>
);

const TitleBoxLoader = () => (
  <div className="bg-gradient-to-br from-[#141414] to-[#0f0f0f] rounded-xl p-6 border border-white/5 shadow-xl">
    <div className="flex items-center gap-3">
      <Skeleton className="w-1.5 h-8 rounded-full" />
      <Skeleton className="h-8 w-64" />
    </div>
    <div className="mt-2 flex items-center gap-2">
      <Skeleton className="h-4 w-32" />
    </div>
  </div>
);

function CategoryCardLoader({ 
  className, 
  showLabelSkeleton = true, 
  gridClass, 
  cardCount = 24,
  showTitleBox = false,
  showPagination = false
}) {
  return (
    <div className={`w-full ${className}`}>
      {showTitleBox && <TitleBoxLoader />}
      
      {showLabelSkeleton && !showTitleBox && (
        <Skeleton className="w-48 h-6 mb-6" />
      )}

      <div className={`grid ${gridClass || "grid-cols-6 max-[1400px]:grid-cols-4 max-[758px]:grid-cols-3 max-[478px]:grid-cols-3"} gap-x-3 gap-y-8 mt-6 max-[478px]:gap-x-2 max-[478px]:gap-y-6`}>
        {[...Array(cardCount)].map((_, index) => (
          <div key={index} className="flex flex-col">
            <Skeleton className="w-full pb-[140%] rounded-2xl" />
            <Skeleton className="mt-3 w-3/4 h-5 rounded-lg" />
          </div>
        ))}
      </div>

      {showPagination && <PaginationLoader />}
    </div>
  );
}

export default CategoryCardLoader;

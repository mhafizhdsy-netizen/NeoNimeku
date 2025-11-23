import { Skeleton } from "@/src/components/ui/Skeleton/Skeleton";

function ContactLoader() {
  return (
    <div className="max-w-6xl mx-auto pt-16 max-md:pt-12 pb-12 max-md:pb-8 px-4 max-md:px-3">
      {/* Hero Section Skeleton */}
      <div className="bg-gradient-to-br from-[#141414] via-[#1a1a1a] to-[#141414] rounded-2xl p-8 md:p-12 max-md:p-6 border border-white/5 shadow-2xl mb-12 max-md:mb-8">
        <div className="flex items-center gap-3 mb-6 max-md:mb-4">
          <Skeleton className="w-1.5 h-12 rounded-full max-md:h-10" />
          <Skeleton className="w-64 h-12 rounded-lg max-md:w-48 max-md:h-10" />
        </div>
        <Skeleton className="w-full h-6 mb-3 rounded-lg max-md:h-5 max-md:mb-2" />
        <Skeleton className="w-full h-6 mb-3 rounded-lg max-md:h-5 max-md:mb-2" />
        <Skeleton className="w-3/4 h-6 mb-6 rounded-lg max-md:h-5 max-md:mb-4 max-md:w-full" />
        <Skeleton className="w-full h-5 mb-2 rounded-lg max-md:h-4 max-md:mb-1.5" />
        <Skeleton className="w-full h-5 mb-2 rounded-lg max-md:h-4 max-md:mb-1.5" />
        <Skeleton className="w-2/3 h-5 rounded-lg max-md:h-4 max-md:w-full" />
      </div>

      {/* Features Grid Skeleton */}
      <div className="mb-12 max-md:mb-8">
        <div className="flex items-center gap-3 mb-6 max-md:mb-4">
          <Skeleton className="w-1 h-8 rounded-full max-md:h-7" />
          <Skeleton className="w-80 h-9 rounded-lg max-md:w-64 max-md:h-8" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-md:gap-3">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[#141414] to-[#0f0f0f] rounded-xl p-6 max-md:p-4 border border-white/5"
            >
              <Skeleton className="w-12 h-12 rounded-lg mb-4 max-md:w-10 max-md:h-10 max-md:mb-3" />
              <Skeleton className="w-32 h-6 mb-2 rounded-lg max-md:w-28 max-md:h-5 max-md:mb-1.5" />
              <Skeleton className="w-full h-4 mb-2 rounded-lg max-md:h-3 max-md:mb-1.5" />
              <Skeleton className="w-3/4 h-4 rounded-lg max-md:h-3 max-md:w-full" />
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section Skeleton */}
      <div className="mb-12 max-md:mb-8">
        <div className="flex items-center gap-3 mb-6 max-md:mb-4">
          <Skeleton className="w-1 h-8 rounded-full max-md:h-7" />
          <Skeleton className="w-96 h-9 rounded-lg max-md:w-72 max-md:h-8" />
        </div>
        <div className="space-y-3 max-md:space-y-2">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[#141414] to-[#0f0f0f] rounded-xl border border-white/5 overflow-hidden"
            >
              <div className="px-6 py-4 max-md:px-4 max-md:py-3">
                <Skeleton className="w-full h-6 rounded-lg max-md:h-5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section Skeleton */}
      <div className="bg-gradient-to-br from-[#141414] via-[#1a1a1a] to-[#141414] rounded-2xl p-8 max-md:p-6 border border-white/5 shadow-2xl">
        <div className="flex items-center gap-3 mb-6 max-md:mb-4">
          <Skeleton className="w-1 h-8 rounded-full max-md:h-7" />
          <Skeleton className="w-48 h-9 rounded-lg max-md:w-40 max-md:h-8" />
        </div>
        <Skeleton className="w-full h-5 mb-2 rounded-lg max-md:h-4 max-md:mb-1.5" />
        <Skeleton className="w-3/4 h-5 mb-6 rounded-lg max-md:h-4 max-md:mb-4 max-md:w-full" />
        <div className="flex flex-wrap gap-4 max-md:gap-3">
          <Skeleton className="w-64 h-12 rounded-lg max-md:w-full max-md:h-11" />
          <Skeleton className="w-40 h-12 rounded-lg max-md:w-32 max-md:h-11" />
          <Skeleton className="w-32 h-12 rounded-lg max-md:w-28 max-md:h-11" />
        </div>
      </div>
    </div>
  );
}

export default ContactLoader;

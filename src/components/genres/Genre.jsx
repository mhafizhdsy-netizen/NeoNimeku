import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

function Genre({ data }) {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Instant scroll on mount without animation
  useEffect(() => {
    if (scrollContainerRef.current) {
      // Direct manipulation of scrollLeft for instant scroll
      scrollContainerRef.current.scrollLeft = 300;
    }
  }, []);

  return (
    <div className="relative pt-[20px] max-sm:pt-[15px]">
      <div className="relative flex items-center min-h-[36px] max-sm:min-h-[32px]">
        {/* Content first for proper stacking */}
        <div 
          ref={scrollContainerRef}
          className="absolute inset-0 overflow-x-auto no-scrollbar scroll-smooth"
          style={{
            msOverflowStyle: 'none',
            scrollbarWidth: 'none'
          }}
        >
          <div className="flex gap-2.5 h-9 max-sm:h-8 items-center min-w-max px-24 max-sm:px-16">
            {data && data.map((item, index) => {
              const colors = [
                'bg-[#0a0a0a] hover:bg-[#1a1a1a]',
                'bg-[#1a1a1a] hover:bg-[#252525]',
                'bg-[#0f0f0f] hover:bg-[#1f1f1f]',
                'bg-[#141414] hover:bg-[#242424]'
              ];
              const colorClass = colors[index % colors.length];
              
              return (
                <Link
                  to={`/genre/${item}`}
                  key={index}
                  className={`px-5 max-sm:px-4 h-9 max-sm:h-8 flex items-center ${colorClass} rounded-full transition-all duration-300 ease-in-out group border border-white/5 hover:border-white/10`}
                >
                  <div className="text-white/90 group-hover:text-white font-medium whitespace-nowrap text-[13px] max-sm:text-xs tracking-wide transition-colors duration-300">
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Left button and gradient */}
        <div className="relative z-20 flex items-center">
          <button 
            onClick={() => scroll('left')}
            className="bg-[#1a1a1a] hover:bg-[#252525] border border-white/10 hover:border-white/20 h-9 max-sm:h-8 w-9 max-sm:w-8 flex items-center justify-center rounded-xl transition-all duration-300 ease-in-out focus:outline-none active:scale-95 shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 max-sm:h-3.5 w-4 max-sm:w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="h-9 max-sm:h-8 w-20 max-sm:w-12 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent max-sm:from-[#0a0a0a]/60 max-sm:via-[#0a0a0a]/40 pointer-events-none"></div>
        </div>

        {/* Spacer for content */}
        <div className="flex-1"></div>

        {/* Right button and gradient */}
        <div className="relative z-20 flex items-center">
          <div className="h-9 max-sm:h-8 w-20 max-sm:w-12 bg-gradient-to-l from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent max-sm:from-[#0a0a0a]/60 max-sm:via-[#0a0a0a]/40 pointer-events-none"></div>
          <button 
            onClick={() => scroll('right')}
            className="bg-[#1a1a1a] hover:bg-[#252525] border border-white/10 hover:border-white/20 h-9 max-sm:h-8 w-9 max-sm:w-8 flex items-center justify-center rounded-xl transition-all duration-300 ease-in-out focus:outline-none active:scale-95 shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 max-sm:h-3.5 w-4 max-sm:w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Genre);

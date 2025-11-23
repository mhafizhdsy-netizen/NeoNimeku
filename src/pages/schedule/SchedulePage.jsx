import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import getSchedInfo from "@/src/utils/getScheduleInfo.utils";
import getAnimeInfo from "@/src/utils/getAnimeInfo.utils";
import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaChevronLeft, FaChevronRight, FaPlay, FaClock } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClosedCaptioning, faMicrophone } from "@fortawesome/free-solid-svg-icons";
import ScheduleLoader from "@/src/components/Loader/Schedule.loader";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./SchedulePage.css";

const SchedulePage = () => {
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentActiveIndex, setCurrentActiveIndex] = useState(null);
  const [todayIndex, setTodayIndex] = useState(null);
  const [scheduleData, setScheduleData] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const cardRefs = useRef([]);
  const swiperRef = useRef(null);
  
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString("default", { month: "short" });
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const GMTOffset = `GMT ${
    new Date().getTimezoneOffset() > 0 ? "-" : "+"
  }${String(Math.floor(Math.abs(new Date().getTimezoneOffset()) / 60)).padStart(2, "0")}:${String(Math.abs(new Date().getTimezoneOffset()) % 60).padStart(2, "0")}`;

  useEffect(() => {
    const months = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayname = date.toLocaleString("default", { weekday: "long" }); // Full day name
      const yearr = date.getFullYear();
      const monthh = String(date.getMonth() + 1).padStart(2, "0");
      const dayy = String(date.getDate()).padStart(2, "0");
      const fulldate = `${yearr}-${monthh}-${dayy}`;
      months.push({ day, monthName, dayname, fulldate });
    }
    setDates(months);

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const todayIdx = dates.findIndex(
      (date) =>
        date.fulldate ===
        `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`
    );

    if (todayIdx !== -1) {
      setTodayIndex(todayIdx);
      setCurrentActiveIndex(todayIdx);
      toggleActive(todayIdx);
    }
  }, [dates]);

  const fetchSched = async (date) => {
    try {
      setLoading(true);
      const data = await getSchedInfo(date);
      
      // Set initial data first for faster display
      if (Array.isArray(data)) {
        setScheduleData(data);
        
        // Then fetch posters in background if not available
        const itemsNeedingPosters = data.filter(item => !item.poster);
        
        if (itemsNeedingPosters.length > 0) {
          // Fetch posters in batches of 5 to avoid overwhelming the API
          const batchSize = 5;
          const batches = [];
          
          for (let i = 0; i < itemsNeedingPosters.length; i += batchSize) {
            batches.push(itemsNeedingPosters.slice(i, i + batchSize));
          }
          
          // Process batches sequentially
          for (const batch of batches) {
            const batchResults = await Promise.all(
              batch.map(async (item) => {
                try {
                  const animeInfo = await getAnimeInfo(item.id, false);
                  return {
                    id: item.id,
                    poster: animeInfo?.data?.poster || null
                  };
                } catch (error) {
                  console.error(`Failed to fetch poster for ${item.id}:`, error);
                  return { id: item.id, poster: null };
                }
              })
            );
            
            // Update state with new posters
            setScheduleData(prevData => 
              prevData.map(item => {
                const result = batchResults.find(r => r.id === item.id);
                return result ? { ...item, poster: result.poster } : item;
              })
            );
          }
        }
      } else {
        setScheduleData([]);
      }
    } catch (err) {
      console.error("Error fetching schedule info:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = (index) => {
    cardRefs.current.forEach((card) => {
      if (card) card.classList.remove("active");
    });
    
    if (cardRefs.current[index]) {
      cardRefs.current[index].classList.add("active");
      if (dates[index] && dates[index].fulldate) {
        fetchSched(dates[index].fulldate);
      }
      setCurrentActiveIndex(index);
    }
  };

  useEffect(() => {
    if (currentActiveIndex !== null && swiperRef.current && swiperRef.current.initialized) {
      // Scroll to active index with smooth animation
      swiperRef.current.slideTo(currentActiveIndex, 500);
    }
  }, [currentActiveIndex]);

  useEffect(() => {
    // Auto scroll to today's badge when component mounts
    if (todayIndex !== null && swiperRef.current) {
      // Wait for Swiper to be fully initialized
      const scrollToToday = () => {
        if (swiperRef.current && swiperRef.current.initialized) {
          swiperRef.current.slideTo(todayIndex, 800);
        } else {
          // Retry if not initialized yet
          setTimeout(scrollToToday, 100);
        }
      };
      
      setTimeout(scrollToToday, 200);
    }
  }, [todayIndex]);

  if (loading && scheduleData.length === 0) {
    return <ScheduleLoader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a] pt-24 pb-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Content Container with Black Background and Rounded Edges */}
        <div className="bg-black/40 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-white/5 shadow-2xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="w-2 h-12 bg-gradient-to-b from-[#e91e63] to-[#00bcd4] rounded-full"></span>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">Anime Schedule</h1>
                <p className="text-white/50 text-sm">Track upcoming anime episodes</p>
              </div>
            </div>
            
            {/* Current Time Display - Responsive */}
            <div className="inline-flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 bg-gradient-to-r from-[#141414] to-[#0f0f0f] rounded-xl border border-white/5">
              <FaClock className="text-[#e91e63] text-sm md:text-lg flex-shrink-0" />
              <span className="text-white/70 text-xs md:text-sm font-medium whitespace-nowrap">
                {GMTOffset} • {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
              </span>
            </div>
          </div>

        {/* Date Selector - Ultra Compact Design with 1px Gap */}
        <div className="relative mb-8 px-12 max-md:px-10">
          <Swiper
            slidesPerView="auto"
            spaceBetween={1}
            freeMode={false}
            centeredSlides={false}
            modules={[Pagination, Navigation]}
            navigation={{
              nextEl: ".schedule-next",
              prevEl: ".schedule-prev",
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              // Auto scroll to today
              if (todayIndex !== null) {
                setTimeout(() => {
                  swiper.slideTo(todayIndex, 0);
                }, 50);
              }
            }}
            onInit={(swiper) => {
              // Auto scroll with animation
              if (todayIndex !== null) {
                setTimeout(() => {
                  swiper.slideTo(todayIndex, 800);
                }, 100);
              }
            }}
          >
            {dates.map((date, index) => {
              const isToday = index === todayIndex;
              const isActive = currentActiveIndex === index;
              
              return (
                <SwiperSlide key={index} style={{ width: 'auto' }}>
                  <div
                    ref={(el) => (cardRefs.current[index] = el)}
                    onClick={() => toggleActive(index)}
                    className={`relative px-3 py-2 rounded-lg cursor-pointer transition-all duration-300 group ${
                      isActive
                        ? "bg-gradient-to-br from-[#e91e63] to-[#00bcd4] shadow-lg shadow-[#e91e63]/30"
                        : isToday
                        ? "bg-gradient-to-br from-[#e91e63]/30 to-[#00bcd4]/30 hover:from-[#e91e63]/40 hover:to-[#00bcd4]/40"
                        : "bg-[#1a1a1a] hover:bg-[#1f1f1f]"
                    }`}
                  >
                    {/* Border */}
                    <div className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                      isActive
                        ? "border-2 border-white/20"
                        : isToday
                        ? "border-2 border-[#e91e63]/50 group-hover:border-[#e91e63]/70"
                        : "border border-white/10 group-hover:border-[#e91e63]/30"
                    }`}></div>
                    
                    {/* Today Indicator Dot */}
                    {isToday && !isActive && (
                      <div className="absolute -top-0.5 -right-0.5 z-20">
                        <div className="w-2 h-2 bg-[#e91e63] rounded-full animate-pulse shadow-lg shadow-[#e91e63]/50"></div>
                      </div>
                    )}
                    
                    {/* Content */}
                    <div className="relative z-10 text-center whitespace-nowrap">
                      <div className={`text-xs font-bold mb-0.5 transition-all ${
                        isActive ? "text-white" : isToday ? "text-white" : "text-white/90 group-hover:text-white"
                      }`}>
                        {date.dayname.substring(0, 3)}
                      </div>
                      <div className={`text-[10px] font-medium transition-all ${
                        isActive ? "text-white/90" : isToday ? "text-white/80" : "text-white/50 group-hover:text-white/70"
                      }`}>
                        {date.monthName} {date.day}
                      </div>
                    </div>
                    
                    {/* Active Indicator */}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/40"></div>
                    )}
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          
          {/* Navigation Buttons */}
          <button className="schedule-prev absolute top-1/2 left-0 transform -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-[#1a1a1a] hover:bg-gradient-to-br hover:from-[#e91e63] hover:to-[#00bcd4] border border-white/10 hover:border-white/20 rounded-lg transition-all shadow-lg hover:shadow-[#e91e63]/30">
            <FaChevronLeft className="text-sm text-white/70 hover:text-white" />
          </button>
          <button className="schedule-next absolute top-1/2 right-0 transform -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-[#1a1a1a] hover:bg-gradient-to-br hover:from-[#e91e63] hover:to-[#00bcd4] border border-white/10 hover:border-white/20 rounded-lg transition-all shadow-lg hover:shadow-[#e91e63]/30">
            <FaChevronRight className="text-sm text-white/70 hover:text-white" />
          </button>
        </div>

        {/* Schedule List */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, idx) => (
              <div key={idx} className="bg-[#141414] rounded-xl p-4 border border-white/5 animate-pulse">
                <div className="flex gap-4">
                  <div className="w-24 h-32 bg-white/5 rounded-lg"></div>
                  <div className="flex-1 space-y-3">
                    <div className="h-4 bg-white/5 rounded w-3/4"></div>
                    <div className="h-3 bg-white/5 rounded w-1/2"></div>
                    <div className="h-3 bg-white/5 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : !scheduleData || scheduleData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#e91e63]/20 to-[#00bcd4]/20 flex items-center justify-center mb-4">
              <span className="text-4xl">📅</span>
            </div>
            <p className="text-white/50 text-lg">No schedule available for this date</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
              <span className="text-4xl">⚠️</span>
            </div>
            <p className="text-white/50 text-lg">Something went wrong</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {scheduleData.map((item, idx) => (
              <Link
                to={`/${item.id}`}
                key={idx}
                className="group bg-gradient-to-br from-[#141414] to-[#0f0f0f] rounded-xl overflow-hidden border border-white/5 hover:border-[#e91e63]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#e91e63]/10 hover:scale-[1.02]"
              >
                <div className="flex gap-3 p-3">
                  {/* Anime Cover with Rounded Edges */}
                  <div className="relative w-20 h-28 flex-shrink-0 rounded-xl overflow-hidden">
                    <img
                      src={item.poster || "/placeholder.jpg"}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.target.src = "/logo.png";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    
                    {/* Play Icon Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-8 h-8 rounded-full bg-[#e91e63]/90 flex items-center justify-center shadow-lg">
                        <FaPlay className="text-white text-xs ml-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div className="space-y-2">
                      <h3 className="text-white font-semibold text-sm line-clamp-2 group-hover:text-[#e91e63] transition-colors leading-tight">
                        {item.title || "N/A"}
                      </h3>
                      
                      {/* Time Badge with Rounded Edges */}
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#e91e63]/20 border border-[#e91e63]/30 rounded-full w-fit">
                        <FaClock className="text-[#e91e63] text-[10px]" />
                        <span className="text-white/90 text-[10px] font-medium">{item.time || "N/A"}</span>
                      </div>

                      {/* Episode & Type Badges - Compact Layout */}
                      <div className="flex items-center gap-1 flex-wrap">
                        <div className="flex items-center gap-1 px-2 py-1 bg-white/5 rounded-full border border-white/10">
                          <FaPlay className="text-white/70 text-[7px]" />
                          <span className="text-white/70 text-[10px] font-medium">EP {item.episode_no || "?"}</span>
                        </div>
                        
                        {item.sub && (
                          <div className="flex items-center gap-1 px-2 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full">
                            <FontAwesomeIcon icon={faClosedCaptioning} className="text-emerald-400 text-[7px]" />
                            <span className="text-emerald-400 text-[10px] font-medium">SUB</span>
                          </div>
                        )}
                        
                        {item.dub && (
                          <div className="flex items-center gap-1 px-2 py-1 bg-orange-500/20 border border-orange-500/30 rounded-full">
                            <FontAwesomeIcon icon={faMicrophone} className="text-orange-400 text-[7px]" />
                            <span className="text-orange-400 text-[10px] font-medium">DUB</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        </div>
        {/* End of Main Content Container */}
      </div>
    </div>
  );
};

export default SchedulePage;

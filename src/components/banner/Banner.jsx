import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faClosedCaptioning,
  faMicrophone,
  faCalendar,
  faClock,
  faInfo,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useLanguage } from "@/src/context/LanguageContext";
import { Play, Info, Star } from "lucide-react";
import "./Banner.css";

function Banner({ item, index }) {
  const { language } = useLanguage();
  return (
    <section className="spotlight-modern w-full h-full relative rounded-2xl overflow-hidden group">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={`${item.poster}`}
          alt={item.title}
          className="spotlight-image w-full h-full object-cover scale-105 transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      
      {/* Dots Pattern Overlay - Always on top of image */}
      <div className="spotlight-dots-pattern absolute inset-0 z-[1]"></div>
      
      {/* Enhanced Gradient Overlay with Stronger Shading */}
      <div className="spotlight-overlay-modern absolute inset-0 z-[2]"></div>
      
      {/* Twinkling Stars */}
      <div className="spotlight-stars absolute inset-0 z-[2]"></div>
      
      {/* Vignette Effect */}
      <div className="spotlight-vignette absolute inset-0 z-[2]"></div>
      
      {/* Content Container */}
      <div className="absolute flex flex-col left-0 bottom-0 w-[55%] p-8 z-[2] max-[1390px]:w-[50%] max-[1300px]:w-[600px] max-[1120px]:w-[65%] max-md:w-[90%] max-md:p-6 max-[300px]:w-full">
        {/* Spotlight Badge with Animation */}
        <div key={`spotlight-badge-${item.id}`} className="flex items-center gap-3 mb-4 animate-fade-in">
          <div className="spotlight-badge">
            <Star className="w-4 h-4 fill-current" />
            <span className="font-bold text-sm">#{index + 1} SPOTLIGHT</span>
          </div>
          {item.tvInfo?.rating && (
            <div className="px-3 py-1 rounded-full bg-brand-primary/20 border border-brand-primary/40 backdrop-blur-sm">
              <span className="text-brand-primary text-xs font-bold">{item.tvInfo.rating}</span>
            </div>
          )}
        </div>

        {/* Title with Gradient */}
        <h3 key={`title-${item.id}`} className="spotlight-title text-white line-clamp-2 text-5xl font-bold text-left max-[1390px]:text-[45px] max-[1300px]:text-3xl max-md:text-2xl max-[575px]:text-[22px] max-sm:leading-6 max-sm:w-[80%] max-[320px]:w-full">
          {language === "EN" ? item.title : item.japanese_title}
        </h3>
        
        {/* Mobile Buttons */}
        <div className="hidden max-md:flex max-md:mt-4 max-md:gap-x-3 max-md:w-full">
          <Link
            to={`/watch/${item.id}`}
            className="spotlight-btn-primary flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
          >
            <Play className="w-4 h-4" />
            <span>Watch Now</span>
          </Link>
          <Link
            to={`/${item.id}`}
            className="spotlight-btn-secondary flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
          >
            <Info className="w-4 h-4" />
          </Link>
        </div>

        {/* Info Tags - Clean Transparent with Color Indicators & Fade Up Animation */}
        <div key={`badges-${item.id}`} className="flex h-fit justify-start items-center flex-wrap gap-2 mt-5 max-[1300px]:mt-4 max-md:hidden opacity-0 animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
          {item.tvInfo && (
            <>
              {/* Show Type */}
              {item.tvInfo.showType && (
                <div className="flex items-center gap-1.5 h-8 px-3 bg-[#e91e63]/10 backdrop-blur-sm rounded-full border-l-2 border-l-[#e91e63] border-y border-r border-white/20">
                  <FontAwesomeIcon icon={faPlay} className="text-[10px] text-[#e91e63]" />
                  <span className="text-xs font-semibold text-white">{item.tvInfo.showType}</span>
                </div>
              )}

              {/* Duration */}
              {item.tvInfo.duration && (
                <div className="flex items-center gap-1.5 h-8 px-3 bg-[#00bcd4]/10 backdrop-blur-sm rounded-full border-l-2 border-l-[#00bcd4] border-y border-r border-white/20">
                  <FontAwesomeIcon icon={faClock} className="text-[10px] text-[#00bcd4]" />
                  <span className="text-xs font-semibold text-white">{item.tvInfo.duration}</span>
                </div>
              )}

              {/* Release Date */}
              {item.tvInfo.releaseDate && (
                <div className="flex items-center gap-1.5 h-8 px-3 bg-[#9c27b0]/10 backdrop-blur-sm rounded-full border-l-2 border-l-[#9c27b0] border-y border-r border-white/20">
                  <FontAwesomeIcon icon={faCalendar} className="text-[10px] text-[#9c27b0]" />
                  <span className="text-xs font-semibold text-white">{item.tvInfo.releaseDate}</span>
                </div>
              )}

              {/* Quality Badge */}
              {item.tvInfo.quality && (
                <div className="flex items-center h-8 px-3 bg-[#FFD93D]/10 backdrop-blur-sm rounded-full border-l-2 border-l-[#FFD93D] border-y border-r border-white/20">
                  <span className="text-xs font-semibold text-white uppercase tracking-wide">{item.tvInfo.quality}</span>
                </div>
              )}

              {/* Sub Episodes */}
              {item.tvInfo.episodeInfo?.sub && (
                <div className="flex items-center gap-1.5 h-8 px-3 bg-[#4caf50]/10 backdrop-blur-sm rounded-full border-l-2 border-l-[#4caf50] border-y border-r border-white/20">
                  <FontAwesomeIcon icon={faClosedCaptioning} className="text-[10px] text-[#4caf50]" />
                  <span className="text-xs font-semibold text-white">{item.tvInfo.episodeInfo.sub}</span>
                </div>
              )}

              {/* Dub Episodes */}
              {item.tvInfo.episodeInfo?.dub && (
                <div className="flex items-center gap-1.5 h-8 px-3 bg-[#ff9800]/10 backdrop-blur-sm rounded-full border-l-2 border-l-[#ff9800] border-y border-r border-white/20">
                  <FontAwesomeIcon icon={faMicrophone} className="text-[10px] text-[#ff9800]" />
                  <span className="text-xs font-semibold text-white">{item.tvInfo.episodeInfo.dub}</span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Description */}
        <p key={`description-${item.id}`} className="spotlight-description text-white/80 text-base mt-4 text-left line-clamp-3 max-[1200px]:line-clamp-2 max-[1300px]:w-[500px] max-[1120px]:w-[90%] max-md:hidden leading-relaxed">
          {item.description}
        </p>
      </div>

      {/* Desktop Action Buttons */}
      <div className="absolute bottom-[50px] right-[40px] flex gap-x-4 z-[2] max-md:hidden">
        <Link
          to={`/watch/${item.id}`}
          className="spotlight-btn-primary flex items-center gap-3 px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-2xl"
        >
          <Play className="w-5 h-5" />
          <span>Watch Now</span>
        </Link>
        <Link
          to={`/${item.id}`}
          className="spotlight-btn-secondary flex items-center gap-3 px-8 py-3 rounded-xl font-semibold transition-all duration-300"
        >
          <Info className="w-5 h-5" />
          <span>Details</span>
        </Link>
      </div>
    </section>
  );
}

export default Banner;
import getAnimeInfo from "@/src/utils/getAnimeInfo.utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faClosedCaptioning,
  faMicrophone,
  faStar,
  faInfo,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import website_name from "@/src/config/website";
import CategoryCard from "@/src/components/categorycard/CategoryCard";
import Sidecard from "@/src/components/sidecard/Sidecard";
import Loader from "@/src/components/Loader/Loader";
import Error from "@/src/components/error/Error";
import { useLanguage } from "@/src/context/LanguageContext";
import { useHomeInfo } from "@/src/context/HomeInfoContext";
import { useWatchlist } from "@/src/context/WatchlistContext";
import { useNotification } from "@/src/context/NotificationContext";
import { useToast } from "@/src/context/ToastContext";
import Voiceactor from "@/src/components/voiceactor/Voiceactor";
import "./AnimeInfo.css";

function InfoItem({ label, value, isProducer = true }) {
  return (
    value && (
      <div className="text-[11px] sm:text-[14px] font-medium transition-all duration-300">
        <span className="text-gray-400">{`${label}: `}</span>
        <span className="font-light text-white/90">
          {Array.isArray(value) ? (
            value.map((item, index) =>
              isProducer ? (
                <Link
                  to={`/producer/${item
                    .replace(/[&'"^%$#@!()+=<>:;,.?/\\|{}[\]`~*_]/g, "")
                    .split(" ")
                    .join("-")
                    .replace(/-+/g, "-")}`}
                  key={index}
                  className="cursor-pointer transition-colors duration-300 hover:text-gray-300"
                >
                  {item}
                  {index < value.length - 1 && ", "}
                </Link>
              ) : (
                <span key={index}>
                  {item}
                  {index < value.length - 1 && ", "}
                </span>
              )
            )
          ) : isProducer ? (
            <Link
              to={`/producer/${value
                .replace(/[&'"^%$#@!()+=<>:;,.?/\\|{}[\]`~*_]/g, "")
                .split(" ")
                .join("-")
                .replace(/-+/g, "-")}`}
              className="cursor-pointer transition-colors duration-300 hover:text-gray-300"
            >
              {value}
            </Link>
          ) : (
            <span>{value}</span>
          )}
        </span>
      </div>
    )
  );
}

function Tag({ bgColor, index, icon, text }) {
  return (
    <div
      className="flex space-x-1 justify-center items-center px-2 sm:px-3 py-0.5 sm:py-1 text-white backdrop-blur-md bg-white/10 font-medium text-[10px] sm:text-[13px] rounded-md sm:rounded-full transition-all duration-300 hover:bg-white/20"
    >
      {icon && <FontAwesomeIcon icon={icon} className="text-[10px] sm:text-[12px] mr-1" />}
      <p className="text-[10px] sm:text-[12px]">{text}</p>
    </div>
  );
}

function AnimeInfo({ random = false }) {
  const { language } = useLanguage();
  const { id: paramId } = useParams();
  const id = random ? null : paramId;
  const [isFull, setIsFull] = useState(false);
  const [animeInfo, setAnimeInfo] = useState(null);
  const [seasons, setSeasons] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInfoExpanded, setIsInfoExpanded] = useState(false);
  const { homeInfo } = useHomeInfo();
  const { id: currentId } = useParams();
  const navigate = useNavigate();
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const { addNotification, removeNotification, isSubscribed } = useNotification();
  const { success, info: showInfo, error: showError } = useToast();
  useEffect(() => {
    if (id === "404-not-found-page") {
      console.log("404 got!");
      return null;
    } else {
      const fetchAnimeInfo = async () => {
        setLoading(true);
        try {
          const data = await getAnimeInfo(id, random);
          setSeasons(data?.seasons);
          setAnimeInfo(data.data);
        } catch (err) {
          console.error("Error fetching anime info:", err);
          setError(err);
        } finally {
          setLoading(false);
        }
      };
      fetchAnimeInfo();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [id, random]);
  useEffect(() => {
    if (animeInfo && location.pathname === `/${animeInfo.id}`) {
      document.title = `Watch ${animeInfo.title} English Sub/Dub online Free on ${website_name}`;
    }
    return () => {
      document.title = `${website_name} | Free anime streaming platform`;
    };
  }, [animeInfo]);
  if (loading) return <Loader type="animeInfo" />;
  if (error) {
    return <Error />;
  }
  if (!animeInfo) {
    navigate("/404-not-found-page");
    return undefined;
  }
  const { title, japanese_title, poster, animeInfo: info } = animeInfo;
  const tags = [
    {
      condition: info.tvInfo?.rating,
      bgColor: "#ffffff",
      text: info.tvInfo.rating,
    },
    {
      condition: info.tvInfo?.quality,
      bgColor: "#FFBADE",
      text: info.tvInfo.quality,
    },
    {
      condition: info.tvInfo?.sub,
      icon: faClosedCaptioning,
      bgColor: "#B0E3AF",
      text: info.tvInfo.sub,
    },
    {
      condition: info.tvInfo?.dub,
      icon: faMicrophone,
      bgColor: "#B9E7FF",
      text: info.tvInfo.dub,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a] text-white">
      {/* Hero Banner - Enhanced Modern Design */}
      <div className="cover-banner relative w-full h-[500px] max-md:h-[350px] overflow-hidden group">
        {/* Background Image with Scale Effect */}
        <div className="absolute inset-0">
          <img
            src={poster}
            alt={`${title} Backdrop`}
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        
        {/* Breathing Glow Effect */}
        <div className="cover-breathing-glow"></div>
        
        {/* Border Glow Effect */}
        <div className="cover-border-glow"></div>
        
        {/* Dots Pattern Overlay - Always on top of image */}
        <div 
          className="absolute inset-0 z-[1]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.04) 0.5px, transparent 0.5px), radial-gradient(circle, rgba(255, 255, 255, 0.03) 0.5px, transparent 0.5px)',
            backgroundSize: '12px 12px, 24px 24px',
            backgroundPosition: '0 0, 6px 6px',
            pointerEvents: 'none'
          }}
        ></div>
        
        {/* Stronger Dark Gradient Overlay - Left to Right */}
        <div 
          className="absolute inset-0 z-[2]"
          style={{
            background: 'linear-gradient(to right, rgba(10, 10, 10, 0.98) 0%, rgba(10, 10, 10, 0.92) 25%, rgba(10, 10, 10, 0.75) 50%, rgba(10, 10, 10, 0.45) 75%, rgba(10, 10, 10, 0.15) 100%)'
          }}
        ></div>
        
        {/* Enhanced Bottom Fade */}
        <div 
          className="absolute inset-0 z-[3]"
          style={{
            background: 'linear-gradient(to bottom, rgba(10, 10, 10, 0) 0%, rgba(10, 10, 10, 0.3) 50%, rgba(10, 10, 10, 0.95) 100%)'
          }}
        ></div>
        
        {/* Animated Glow Effect */}
        <div 
          className="absolute inset-0 z-[1] opacity-0 hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'radial-gradient(circle at 30% 50%, rgba(233, 30, 99, 0.15) 0%, rgba(0, 188, 212, 0.1) 50%, transparent 100%)'
          }}
        ></div>
      </div>

      {/* Anime Info Section - Overlapping Hero */}
      <div className="relative -mt-40 max-md:-mt-28 z-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex gap-8 max-md:flex-col max-md:items-center">
            {/* Poster */}
            <div className="flex-shrink-0">
              <div className="relative w-[240px] aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10 max-md:w-[200px]">
                <img
                  src={poster}
                  alt={`${title} Poster`}
                  className="w-full h-full object-cover"
                />
                {animeInfo.adultContent && (
                  <div className="absolute top-3 left-3 px-3 py-1.5 bg-red-500 rounded-lg text-xs font-bold shadow-lg">
                    18+
                  </div>
                )}
              </div>
              
              {/* Rating */}
              {info?.["MAL Score"] && (
                <div className="mt-4 flex items-center justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      className={`text-base ${i < Math.floor(parseFloat(info["MAL Score"]) / 2) ? 'text-yellow-500' : 'text-gray-700'}`}
                    />
                  ))}
                  <span className="text-xl font-bold ml-2">{info["MAL Score"]}</span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 space-y-5 max-md:text-center max-md:space-y-4">
              {/* Title */}
              <div className="space-y-3">
                <h1 className="text-3xl font-bold leading-tight">
                  {language === "EN" ? title : japanese_title}
                </h1>
                {japanese_title && language === "EN" && (
                  <p className="text-sm text-white/50 max-md:text-center">{japanese_title}</p>
                )}
                
                {/* Info Badges - Clean Transparent with Color Indicators */}
                <div className="flex items-center gap-2 max-md:justify-center flex-wrap">
                  {info.tvInfo?.rating && (
                    <div className="flex items-center h-8 px-3 bg-[#e91e63]/10 backdrop-blur-sm rounded-full border-l-2 border-l-[#e91e63] border-y border-r border-white/20 text-white text-xs font-semibold">
                      {info.tvInfo.rating}
                    </div>
                  )}
                  {info.tvInfo?.quality && (
                    <div className="flex items-center h-8 px-3 bg-[#FFD93D]/10 backdrop-blur-sm rounded-full border-l-2 border-l-[#FFD93D] border-y border-r border-white/20 text-white text-xs font-semibold uppercase tracking-wide">
                      {info.tvInfo.quality}
                    </div>
                  )}
                  {(info.tvInfo?.sub || info.tvInfo?.episodeInfo?.sub) && (
                    <div className="flex items-center gap-1.5 h-8 px-3 bg-[#4caf50]/10 backdrop-blur-sm rounded-full border-l-2 border-l-[#4caf50] border-y border-r border-white/20 text-white text-xs font-semibold">
                      <FontAwesomeIcon icon={faClosedCaptioning} className="text-[10px] text-[#4caf50]" />
                      <span>{info.tvInfo?.sub || info.tvInfo?.episodeInfo?.sub}</span>
                    </div>
                  )}
                  {(info.tvInfo?.dub || info.tvInfo?.episodeInfo?.dub) && (
                    <div className="flex items-center gap-1.5 h-8 px-3 bg-[#ff9800]/10 backdrop-blur-sm rounded-full border-l-2 border-l-[#ff9800] border-y border-r border-white/20 text-white text-xs font-semibold">
                      <FontAwesomeIcon icon={faMicrophone} className="text-[10px] text-[#ff9800]" />
                      <span>{info.tvInfo?.dub || info.tvInfo?.episodeInfo?.dub}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 max-md:justify-center flex-wrap">
                {/* Watch Now Button */}
                {animeInfo?.animeInfo?.Status?.toLowerCase() !== "not-yet-aired" ? (
                  <Link
                    to={`/watch/${animeInfo.id}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#e91e63] hover:bg-[#e91e63]/90 rounded-xl text-white font-semibold transition-all hover:scale-105"
                  >
                    <FontAwesomeIcon icon={faPlay} className="text-sm" />
                    <span>Watch Now</span>
                  </Link>
                ) : (
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-700/50 rounded-xl text-white/70 font-semibold">
                    <span>Not Yet Aired</span>
                  </div>
                )}
                
                {/* Notification Bell Button */}
                <button 
                  onClick={async () => {
                    const subscribed = isSubscribed(animeInfo.id);
                    if (subscribed) {
                      removeNotification(animeInfo.id);
                      showInfo(`Notifications disabled for ${animeInfo.title}`, 3000);
                    } else {
                      const notifSuccess = await addNotification({
                        id: animeInfo.id,
                        title: animeInfo.title,
                        poster: animeInfo.poster
                      });
                      
                      if (notifSuccess) {
                        success(`You'll be notified about ${animeInfo.title}!`, 3000);
                      } else {
                        showError('Please enable notifications in your browser settings', 4000);
                      }
                    }
                  }}
                  className={`w-12 h-12 flex items-center justify-center border rounded-xl transition-all hover:scale-105 relative ${
                    isSubscribed(animeInfo.id)
                      ? 'bg-[#e91e63]/20 border-[#e91e63]/50 text-[#e91e63] animate-pulse'
                      : 'bg-white/5 hover:bg-white/10 border-white/20 text-white'
                  }`}
                  title={isSubscribed(animeInfo.id) ? 'Click to disable notifications' : 'Get notified when new episodes release'}
                >
                  {isSubscribed(animeInfo.id) && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#e91e63] rounded-full animate-ping"></span>
                  )}
                  <svg className="w-5 h-5" fill={isSubscribed(animeInfo.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>

                {/* Add to Watchlist Button */}
                <button 
                  onClick={() => {
                    const inList = isInWatchlist(animeInfo.id);
                    if (inList) {
                      removeFromWatchlist(animeInfo.id);
                    } else {
                      addToWatchlist({
                        id: animeInfo.id,
                        title: animeInfo.title,
                        poster: animeInfo.poster,
                        episodeId: null,
                        episodeNum: 1
                      });
                    }
                  }}
                  className={`w-12 h-12 flex items-center justify-center border rounded-xl transition-all hover:scale-105 ${
                    isInWatchlist(animeInfo.id)
                      ? 'bg-[#00bcd4]/20 border-[#00bcd4]/50 text-[#00bcd4]'
                      : 'bg-white/5 hover:bg-white/10 border-white/20 text-white'
                  }`}
                  title={isInWatchlist(animeInfo.id) ? 'Remove from watchlist' : 'Add to watchlist'}
                >
                  <svg className="w-5 h-5" fill={isInWatchlist(animeInfo.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
              </div>

              {/* Synopsis */}
              {info?.Overview && (
                <div className="space-y-3">
                  <p className="text-white/60 leading-relaxed text-sm line-clamp-3 max-w-4xl">
                    {info.Overview}
                  </p>
                  {/* Genre Tags */}
                  {info?.Genres && (
                    <div className="flex flex-wrap gap-2 max-md:justify-center">
                      {info.Genres.slice(0, 5).map((genre, index) => (
                        <Link
                          key={index}
                          to={`/genre/${genre.split(" ").join("-")}`}
                          className="px-3 py-1 bg-[#e91e63]/20 hover:bg-[#e91e63]/30 border border-[#e91e63]/40 rounded-full text-xs font-medium text-white/90 transition-all"
                        >
                          {genre}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Detailed Info Section - Collapsible - Moved here below genres */}
              <div className="mt-6 max-md:mt-4">
            <div className="bg-gradient-to-br from-[#141414] to-[#0f0f0f] rounded-2xl border border-white/5 shadow-xl overflow-hidden">
              <button
                onClick={() => setIsInfoExpanded(!isInfoExpanded)}
                className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <span className="w-1 h-6 bg-gradient-to-b from-[#e91e63] to-[#00bcd4] rounded-full"></span>
                  <h2 className="text-xl font-bold text-white">Anime Information</h2>
                </div>
                <svg
                  className={`w-6 h-6 text-white/70 group-hover:text-white transition-all duration-300 ${
                    isInfoExpanded ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div
                className={`transition-all duration-500 ease-in-out ${
                  isInfoExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                } overflow-hidden`}
              >
                <div className="px-6 pb-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  {info?.Japanese && (
                    <div className="flex flex-col gap-1">
                      <span className="text-white/40 text-xs font-medium uppercase tracking-wider">Japanese Title</span>
                      <span className="text-white text-sm">{info.Japanese}</span>
                    </div>
                  )}
                  {info?.Synonyms && (
                    <div className="flex flex-col gap-1">
                      <span className="text-white/40 text-xs font-medium uppercase tracking-wider">Synonyms</span>
                      <span className="text-white text-sm">{info.Synonyms}</span>
                    </div>
                  )}
                  {info?.Aired && (
                    <div className="flex flex-col gap-1">
                      <span className="text-white/40 text-xs font-medium uppercase tracking-wider">Aired</span>
                      <span className="text-white text-sm">{info.Aired}</span>
                    </div>
                  )}
                  {info?.Premiered && (
                    <div className="flex flex-col gap-1">
                      <span className="text-white/40 text-xs font-medium uppercase tracking-wider">Premiered</span>
                      <span className="text-white text-sm">{info.Premiered}</span>
                    </div>
                  )}
                  {info?.Duration && (
                    <div className="flex flex-col gap-1">
                      <span className="text-white/40 text-xs font-medium uppercase tracking-wider">Duration</span>
                      <span className="text-white text-sm">{info.Duration}</span>
                    </div>
                  )}
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  {info?.Status && (
                    <div className="flex flex-col gap-1">
                      <span className="text-white/40 text-xs font-medium uppercase tracking-wider">Status</span>
                      <span className="text-white text-sm">{info.Status}</span>
                    </div>
                  )}
                  {info?.["MAL Score"] && (
                    <div className="flex flex-col gap-1">
                      <span className="text-white/40 text-xs font-medium uppercase tracking-wider">MAL Score</span>
                      <div className="flex items-center gap-2">
                        <span className="text-white text-sm font-semibold">{info["MAL Score"]}</span>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <FontAwesomeIcon
                              key={i}
                              icon={faStar}
                              className={`text-xs ${i < Math.floor(parseFloat(info["MAL Score"]) / 2) ? 'text-yellow-500' : 'text-gray-700'}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  {info?.Studios && (
                    <div className="flex flex-col gap-1">
                      <span className="text-white/40 text-xs font-medium uppercase tracking-wider">Studios</span>
                      <div className="text-white text-sm">
                        {Array.isArray(info.Studios) ? (
                          info.Studios.map((studio, index) => (
                            <Link
                              key={index}
                              to={`/producer/${studio.replace(/[&'"^%$#@!()+=<>:;,.?/\\|{}[\]`~*_]/g, "").split(" ").join("-").replace(/-+/g, "-")}`}
                              className="hover:text-[#e91e63] transition-colors"
                            >
                              {studio}{index < info.Studios.length - 1 && ", "}
                            </Link>
                          ))
                        ) : (
                          <Link
                            to={`/producer/${info.Studios.replace(/[&'"^%$#@!()+=<>:;,.?/\\|{}[\]`~*_]/g, "").split(" ").join("-").replace(/-+/g, "-")}`}
                            className="hover:text-[#e91e63] transition-colors"
                          >
                            {info.Studios}
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                  {info?.Producers && (
                    <div className="flex flex-col gap-1">
                      <span className="text-white/40 text-xs font-medium uppercase tracking-wider">Producers</span>
                      <div className="text-white text-sm">
                        {Array.isArray(info.Producers) ? (
                          info.Producers.map((producer, index) => (
                            <Link
                              key={index}
                              to={`/producer/${producer.replace(/[&'"^%$#@!()+=<>:;,.?/\\|{}[\]`~*_]/g, "").split(" ").join("-").replace(/-+/g, "-")}`}
                              className="hover:text-[#e91e63] transition-colors"
                            >
                              {producer}{index < info.Producers.length - 1 && ", "}
                            </Link>
                          ))
                        ) : (
                          <Link
                            to={`/producer/${info.Producers.replace(/[&'"^%$#@!()+=<>:;,.?/\\|{}[\]`~*_]/g, "").split(" ").join("-").replace(/-+/g, "-")}`}
                            className="hover:text-[#e91e63] transition-colors"
                          >
                            {info.Producers}
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

                  {/* Full Genre List */}
                  {info?.Genres && info.Genres.length > 5 && (
                    <div className="mt-6 pt-6 border-t border-white/10">
                      <span className="text-white/40 text-xs font-medium uppercase tracking-wider block mb-3">All Genres</span>
                      <div className="flex flex-wrap gap-2">
                        {info.Genres.map((genre, index) => (
                          <Link
                            key={index}
                            to={`/genre/${genre.split(" ").join("-")}`}
                            className="px-3 py-1.5 bg-white/5 hover:bg-[#e91e63]/20 border border-white/10 hover:border-[#e91e63]/40 rounded-lg text-xs font-medium text-white/80 hover:text-white transition-all"
                          >
                            {genre}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 pt-8 pb-12 max-w-7xl">
          {/* Additional Details - Hidden for now since info is in hero */}
          <div className="hidden">
            <div className="flex flex-row gap-4">
              {/* Poster Section */}
              <div className="flex-shrink-0">
                <div className="relative w-[130px] xs:w-[150px] aspect-[2/3] rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                  <img
                    src={`${poster}`}
                    alt={`${title} Poster`}
                    className="w-full h-full object-cover"
                  />
                  {animeInfo.adultContent && (
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-red-500/90 backdrop-blur-sm rounded-md text-[10px] font-medium">
                      18+
                    </div>
                  )}
                </div>
              </div>

              {/* Basic Info Section */}
              <div className="flex-1 min-w-0 space-y-2">
                {/* Title */}
                <div className="space-y-0.5">
                  <h1 className="text-lg xs:text-xl font-bold tracking-tight truncate">
                    {language === "EN" ? title : japanese_title}
                  </h1>
                  {language === "EN" && japanese_title && (
                    <p className="text-white/50 text-[11px] xs:text-xs truncate">JP Title: {japanese_title}</p>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {tags.map(({ condition, icon, text }, index) =>
                    condition && (
                      <Tag
                        key={index}
                        index={index}
                        icon={icon}
                        text={text}
                      />
                    )
                  )}
                </div>

                {/* Overview - Limited for mobile */}
                {info?.Overview && (
                  <div className="text-gray-300 leading-relaxed text-xs">
                    {info.Overview.length > 150 ? (
                      <>
                        {isFull ? (
                          info.Overview
                        ) : (
                          <div className="line-clamp-3">{info.Overview}</div>
                        )}
                        <button
                          className="mt-1 text-white/70 hover:text-white transition-colors text-[10px] font-medium"
                          onClick={() => setIsFull(!isFull)}
                        >
                          {isFull ? "Show Less" : "Read More"}
                        </button>
                      </>
                    ) : (
                      info.Overview
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Watch Button - Full Width on Mobile */}
            <div className="mt-6">
              {animeInfo?.animeInfo?.Status?.toLowerCase() !== "not-yet-aired" ? (
                <Link
                  to={`/watch/${animeInfo.id}`}
                  className="flex justify-center items-center w-full px-4 py-3 bg-white/10 backdrop-blur-md rounded-lg text-white transition-all duration-300 hover:bg-white/20 group"
                >
                  <FontAwesomeIcon
                    icon={faPlay}
                    className="mr-2 text-xs group-hover:text-white"
                  />
                  <span className="font-medium text-sm">Watch Now</span>
                </Link>
              ) : (
                <div className="flex justify-center items-center w-full px-4 py-3 bg-gray-700/50 rounded-lg">
                  <span className="font-medium text-sm">Not released</span>
                </div>
              )}
            </div>

            {/* Details Section - Full Width on Mobile */}
            <div className="mt-6 space-y-3 py-3 backdrop-blur-md bg-white/5 rounded-lg px-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Japanese", value: info?.Japanese },
                  { label: "Synonyms", value: info?.Synonyms },
                  { label: "Aired", value: info?.Aired },
                  { label: "Premiered", value: info?.Premiered },
                  { label: "Duration", value: info?.Duration },
                  { label: "Status", value: info?.Status },
                  { label: "MAL Score", value: info?.["MAL Score"] },
                ].map((item, index) => (
                  <InfoItem
                    key={index}
                    label={item.label}
                    value={item.value}
                    isProducer={false}
                  />
                ))}
              </div>

              {/* Genres */}
              {info?.Genres && (
                <div className="pt-2 border-t border-white/10">
                  <p className="text-gray-400 text-xs mb-1.5">Genres</p>
                  <div className="flex flex-wrap gap-1">
                    {info.Genres.map((genre, index) => (
                      <Link
                        to={`/genre/${genre.split(" ").join("-")}`}
                        key={index}
                        className="px-2 py-0.5 text-[10px] bg-white/5 rounded-md hover:bg-white/10 transition-colors"
                      >
                        {genre}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Studios & Producers */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                {[
                  { label: "Studios", value: info?.Studios },
                  { label: "Producers", value: info?.Producers },
                ].map((item, index) => (
                  <InfoItem
                    key={index}
                    label={item.label}
                    value={item.value}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Layout - Hidden */}
          <div className="hidden">
            <div className="flex flex-row gap-6 lg:gap-10">
              {/* Poster Section */}
              <div className="flex-shrink-0">
                <div className="relative w-[220px] lg:w-[260px] aspect-[2/3] rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                  <img
                    src={`${poster}`}
                    alt={`${title} Poster`}
                    className="w-full h-full object-cover"
                  />
                  {animeInfo.adultContent && (
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 bg-red-500/90 backdrop-blur-sm rounded-lg text-xs font-medium">
                      18+
                    </div>
                  )}
                </div>
              </div>

              {/* Info Section */}
              <div className="flex-1 space-y-4 lg:space-y-5 min-w-0">
                {/* Title */}
                <div className="space-y-1">
                  <h1 className="text-3xl lg:text-4xl font-bold tracking-tight truncate">
                    {language === "EN" ? title : japanese_title}
                  </h1>
                  {language === "EN" && japanese_title && (
                    <p className="text-white/50 text-sm lg:text-base truncate">JP Title: {japanese_title}</p>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {tags.map(({ condition, icon, text }, index) =>
                    condition && (
                      <Tag
                        key={index}
                        index={index}
                        icon={icon}
                        text={text}
                      />
                    )
                  )}
                </div>

                {/* Overview */}
                {info?.Overview && (
                  <div className="text-gray-300 leading-relaxed max-w-3xl text-sm lg:text-base">
                    {info.Overview.length > 270 ? (
                      <>
                        {isFull
                          ? info.Overview
                          : `${info.Overview.slice(0, 270)}...`}
                        <button
                          className="ml-2 text-white/70 hover:text-white transition-colors text-sm font-medium"
                          onClick={() => setIsFull(!isFull)}
                        >
                          {isFull ? "Show Less" : "Read More"}
                        </button>
                      </>
                    ) : (
                      info.Overview
                    )}
                  </div>
                )}

                {/* Watch Button */}
                {animeInfo?.animeInfo?.Status?.toLowerCase() !== "not-yet-aired" ? (
                  <Link
                    to={`/watch/${animeInfo.id}`}
                    className="inline-flex items-center px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-xl text-white transition-all duration-300 hover:bg-white/20 hover:scale-[1.02] group"
                  >
                    <FontAwesomeIcon
                      icon={faPlay}
                      className="mr-2 text-sm group-hover:text-white"
                    />
                    <span className="font-medium">Watch Now</span>
                  </Link>
                ) : (
                  <div className="inline-flex items-center px-5 py-2.5 bg-gray-700/50 rounded-xl">
                    <span className="font-medium">Not released</span>
                  </div>
                )}

                {/* Details Section */}
                <div className="space-y-4 py-4 backdrop-blur-md bg-white/5 rounded-xl px-5">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Japanese", value: info?.Japanese },
                      { label: "Synonyms", value: info?.Synonyms },
                      { label: "Aired", value: info?.Aired },
                      { label: "Premiered", value: info?.Premiered },
                      { label: "Duration", value: info?.Duration },
                      { label: "Status", value: info?.Status },
                      { label: "MAL Score", value: info?.["MAL Score"] },
                    ].map((item, index) => (
                      <InfoItem
                        key={index}
                        label={item.label}
                        value={item.value}
                        isProducer={false}
                      />
                    ))}
                  </div>

                  {/* Genres */}
                  {info?.Genres && (
                    <div className="pt-3 border-t border-white/10">
                      <p className="text-gray-400 text-sm mb-2">Genres</p>
                      <div className="flex flex-wrap gap-1.5">
                        {info.Genres.map((genre, index) => (
                          <Link
                            to={`/genre/${genre.split(" ").join("-")}`}
                            key={index}
                            className="px-3 py-1 text-xs bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                          >
                            {genre}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Studios & Producers */}
                  <div className="space-y-3 pt-3 border-t border-white/10">
                    {[
                      { label: "Studios", value: info?.Studios },
                      { label: "Producers", value: info?.Producers },
                    ].map((item, index) => (
                      <InfoItem
                        key={index}
                        label={item.label}
                        value={item.value}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seasons Section */}
      {seasons?.length > 0 && (
        <div className="container mx-auto px-4 py-8 sm:py-12 max-w-7xl">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <span className="w-1 h-8 bg-gradient-to-b from-[#e91e63] to-[#00bcd4] rounded-full"></span>
            <h2 className="text-2xl font-bold">More Seasons</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
            {seasons.map((season, index) => (
              <Link
                to={`/${season.id}`}
                key={index}
                className={`relative w-full aspect-[3/1] sm:aspect-[3/1] rounded-lg overflow-hidden cursor-pointer group ${
                  currentId === String(season.id)
                    ? "ring-2 ring-white/40 shadow-lg shadow-white/10"
                    : ""
                }`}
              >
                <img
                  src={season.season_poster}
                  alt={season.season}
                  className={`w-full h-full object-cover scale-150 ${
                    currentId === String(season.id)
                      ? "opacity-50"
                      : "opacity-40"
                  }`}
                />
                {/* Dots Pattern Overlay */}
                <div 
                  className="absolute inset-0 z-10" 
                  style={{ 
                    backgroundImage: `url('data:image/svg+xml,<svg width="3" height="3" viewBox="0 0 3 3" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="1.5" cy="1.5" r="0.5" fill="white" fill-opacity="0.25"/></svg>')`,
                    backgroundSize: '3px 3px'
                  }}
                />
                {/* Dark Gradient Overlay */}
                <div className={`absolute inset-0 z-20 bg-gradient-to-r ${
                  currentId === String(season.id)
                    ? "from-black/50 to-transparent"
                    : "from-black/40 to-transparent"
                }`} />
                {/* Title Container */}
                <div className="absolute inset-0 z-30 flex items-center justify-center">
                  <p className={`text-[14px] sm:text-[16px] md:text-[18px] font-bold text-center px-2 sm:px-4 transition-colors duration-300 ${
                    currentId === String(season.id)
                      ? "text-white"
                      : "text-white/90 group-hover:text-white"
                  }`}>
                    {season.season}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Voice Actors Section */}
      {animeInfo?.charactersVoiceActors.length > 0 && (
        <div className="container mx-auto px-4 py-8 sm:py-12 max-w-7xl">
          <Voiceactor animeInfo={animeInfo} />
        </div>
      )}

      {/* Recommendations Section */}
      {animeInfo.recommended_data.length > 0 && (
        <div className="container mx-auto px-4 py-8 sm:py-12 max-w-7xl">
          <CategoryCard
            label="Recommended for you"
            data={animeInfo.recommended_data}
            limit={animeInfo.recommended_data.length}
            showViewMore={false}
          />
        </div>
      )}
    </div>
  );
}

export default AnimeInfo;

import { useWatchlist } from '@/src/context/WatchlistContext';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlay, faClock, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import Loader from '@/src/components/Loader/Loader';
import { getLastWatchedEpisode, formatTime } from '@/src/utils/watchProgress';
import './Watchlist.css';

function Watchlist() {
  const { watchlist, removeFromWatchlist, clearWatchlist } = useWatchlist();
  const [loading, setLoading] = useState(true);
  const [watchProgress, setWatchProgress] = useState({});

  useEffect(() => {
    // Simulate loading to allow context to load
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Get watch progress for each anime in the watchlist
    const progress = {};
    watchlist.forEach((item) => {
      const lastWatched = getLastWatchedEpisode(item.id);
      if (lastWatched) {
        progress[item.id] = lastWatched;
      }
    });
    setWatchProgress(progress);
  }, [watchlist]);

  if (loading) return <Loader type="watchlist" />;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (watchlist.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a] pt-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden bg-gradient-to-br from-[#141414] to-[#0f0f0f] rounded-2xl p-12 border border-white/5 shadow-2xl text-center">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#e91e63]/10 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#00bcd4]/10 to-transparent rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#e91e63]/20 to-[#00bcd4]/20 flex items-center justify-center border border-white/10 shadow-xl">
                <span className="text-5xl">📌</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">Your Watchlist is Empty</h2>
              <p className="text-white/60 text-lg mb-8 max-w-md mx-auto">Start adding anime episodes to watch later and never miss your favorite shows!</p>
              <Link 
                to="/home"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#e91e63] to-[#00bcd4] rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-[#e91e63]/30 transition-all hover:scale-105"
              >
                <FontAwesomeIcon icon={faPlay} />
                Browse Anime
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a] pt-24 px-4 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <span className="w-2 h-12 bg-gradient-to-b from-[#e91e63] to-[#00bcd4] rounded-full block"></span>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-1">My Watchlist</h1>
                <p className="text-white/50 text-sm">Keep track of episodes you want to watch</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-gradient-to-r from-[#e91e63]/20 to-[#00bcd4]/20 border border-[#e91e63]/30 rounded-xl">
                <span className="text-white/70 text-sm font-medium">{watchlist.length} {watchlist.length === 1 ? 'Episode' : 'Episodes'}</span>
              </div>
              {watchlist.length > 0 && (
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to clear all items from your watchlist?')) {
                      clearWatchlist();
                    }
                  }}
                  className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 hover:border-red-500/50 rounded-xl text-white font-medium transition-all flex items-center gap-2 group"
                >
                  <FontAwesomeIcon icon={faTrash} className="text-sm group-hover:scale-110 transition-transform" />
                  <span className="max-sm:hidden">Clear All</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Watchlist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {watchlist.map((item) => (
            <div
              key={item.id}
              className="watchlist-card group relative"
            >
              {/* Card */}
              <div className="relative bg-gradient-to-br from-[#141414] to-[#0f0f0f] rounded-2xl overflow-hidden border border-white/5 hover:border-[#e91e63]/30 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-[#e91e63]/10">
                {/* Poster Section */}
                <div className="relative aspect-[2/3] overflow-hidden">
                  <img
                    src={item.poster}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                  {/* Dark Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300"></div>
                  
                  {/* Episode Badge - Show Last Watched if Available */}
                  <div className="absolute top-3 left-3 px-3 py-1.5 bg-gradient-to-r from-[#e91e63] to-[#00bcd4] rounded-xl shadow-lg">
                    <span className="text-white text-xs font-bold">
                      EP {watchProgress[item.id]?.episodeNum || item.episodeNum}
                    </span>
                  </div>
                  
                  {/* Watching Indicator if has progress */}
                  {watchProgress[item.id] && watchProgress[item.id].leftAt > 0 && (
                    <div className="absolute top-3 left-20 px-2.5 py-1 bg-black/80 backdrop-blur-sm rounded-lg border border-[#e91e63]/30">
                      <span className="text-[#e91e63] text-[10px] font-bold">WATCHING</span>
                    </div>
                  )}

                  {/* Delete Button */}
                  <button
                    onClick={() => removeFromWatchlist(item.id)}
                    className="absolute top-3 right-3 w-9 h-9 bg-black/80 hover:bg-red-500/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 border border-white/10 hover:border-red-500/50 hover:scale-110"
                    title="Remove from watchlist"
                  >
                    <FontAwesomeIcon icon={faTrash} className="text-sm" />
                  </button>

                  {/* Play Overlay */}
                  <Link
                    to={`/watch/${item.id}?ep=${item.episodeId}`}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#e91e63] to-[#00bcd4] flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                      <FontAwesomeIcon icon={faPlay} className="text-white text-xl ml-1" />
                    </div>
                  </Link>
                </div>

                {/* Info Section */}
                <div className="p-4">
                  <Link
                    to={`/watch/${item.id}?ep=${item.episodeId}`}
                    className="block"
                  >
                    <h3 className="text-white font-bold text-base mb-2 line-clamp-2 group-hover:text-[#e91e63] transition-colors leading-tight">
                      {item.title}
                    </h3>
                  </Link>
                  
                  {/* Meta Info */}
                  <div className="flex items-center gap-3 text-white/50 text-xs mb-3">
                    <div className="flex items-center gap-1.5">
                      <FontAwesomeIcon icon={faClock} className="text-[10px]" />
                      <span>
                        {watchProgress[item.id] 
                          ? `Watching EP ${watchProgress[item.id].episodeNum}`
                          : `Episode ${item.episodeNum}`
                        }
                      </span>
                    </div>
                    {item.addedAt && (
                      <>
                        <span className="text-white/20">•</span>
                        <div className="flex items-center gap-1.5">
                          <FontAwesomeIcon icon={faCalendar} className="text-[10px]" />
                          <span>{formatDate(item.addedAt)}</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Last Watched Info & Progress */}
                  {watchProgress[item.id] && (
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-xs text-white/60 mb-2">
                        <span>Last watched:</span>
                        <span className="text-[#e91e63] font-semibold">EP {watchProgress[item.id].episodeNum}</span>
                      </div>
                      {watchProgress[item.id].leftAt > 0 && (
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-[#e91e63] to-[#00bcd4] rounded-full transition-all duration-300"
                              style={{ width: '100%' }}
                              title={`Watched: ${formatTime(watchProgress[item.id].leftAt)}`}
                            ></div>
                          </div>
                          <span className="text-[10px] text-white/50 font-medium min-w-[45px] text-right">
                            {formatTime(watchProgress[item.id].leftAt)}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Action Button */}
                  <Link
                    to={watchProgress[item.id] 
                      ? `/watch/${item.id}?ep=${watchProgress[item.id].episodeId}`
                      : `/watch/${item.id}?ep=${item.episodeId}`
                    }
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#e91e63]/10 to-[#00bcd4]/10 hover:from-[#e91e63]/20 hover:to-[#00bcd4]/20 border border-[#e91e63]/30 hover:border-[#e91e63]/50 rounded-xl text-white text-sm font-semibold transition-all group/btn"
                  >
                    <FontAwesomeIcon icon={faPlay} className="text-xs group-hover/btn:scale-110 transition-transform" />
                    <span>{watchProgress[item.id] ? 'Continue Watching' : 'Start Watching'}</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Watchlist;

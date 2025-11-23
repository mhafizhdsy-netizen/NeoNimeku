import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useWatchlist } from '@/src/context/WatchlistContext';
import { useToast } from '@/src/context/ToastContext';

function WatchlistButton({ anime }) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const { success, info } = useToast();
  const inWatchlist = isInWatchlist(anime.id);

  const handleClick = () => {
    if (inWatchlist) {
      removeFromWatchlist(anime.id);
      info('Removed from Watchlist', 2500);
    } else {
      addToWatchlist(anime);
      success('Added to Watchlist!', 2500);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-300 group ${
        inWatchlist
          ? 'bg-gradient-to-r from-[#e91e63]/20 to-[#00bcd4]/20 border-[#e91e63]/50 hover:from-[#e91e63]/30 hover:to-[#00bcd4]/30'
          : 'bg-[#1a1a1a] hover:bg-[#252525] border-white/10 hover:border-white/20'
      }`}
      title={inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
    >
      <FontAwesomeIcon 
        icon={inWatchlist ? faCheck : faBookmark}
        className={`transition-colors ${
          inWatchlist ? 'text-[#e91e63]' : 'text-white group-hover:text-[#e91e63]'
        }`}
      />
      <span className="text-white font-medium text-sm">
        {inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
      </span>
    </button>
  );
}

export default WatchlistButton;

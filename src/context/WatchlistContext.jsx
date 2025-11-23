import { createContext, useContext, useState, useEffect } from 'react';

const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState([]);

  // Load watchlist from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('watchlist');
    if (saved) {
      setWatchlist(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage whenever watchlist changes
  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (anime) => {
    setWatchlist(prev => {
      // Check if already exists
      const exists = prev.find(item => item.id === anime.id);
      if (exists) return prev;
      
      return [...prev, {
        id: anime.id,
        title: anime.title,
        poster: anime.poster,
        episodeId: anime.episodeId,
        episodeNum: anime.episodeNum,
        addedAt: new Date().toISOString()
      }];
    });
  };

  const removeFromWatchlist = (id) => {
    setWatchlist(prev => prev.filter(item => item.id !== id));
  };

  const isInWatchlist = (id) => {
    return watchlist.some(item => item.id === id);
  };

  const clearWatchlist = () => {
    setWatchlist([]);
  };

  return (
    <WatchlistContext.Provider value={{
      watchlist,
      addToWatchlist,
      removeFromWatchlist,
      isInWatchlist,
      clearWatchlist
    }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error('useWatchlist must be used within WatchlistProvider');
  }
  return context;
}

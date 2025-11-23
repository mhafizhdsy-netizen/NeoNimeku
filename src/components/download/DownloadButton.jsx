import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faChevronDown, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from 'react';

function DownloadButton({ streamUrl, episodeNum, animeTitle, serverName, episodeId }) {
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [qualities, setQualities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowQualityMenu(false);
      }
    };

    if (showQualityMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showQualityMenu]);

  const fetchQualities = async () => {
    if (qualities.length > 0) return; // Already fetched
    
    setLoading(true);
    setError(null);

    // Due to CORS restrictions, directly use current stream URL
    // External APIs (Consumet, Anify) require proxy server
    setQualities([
      {
        quality: 'Default',
        url: streamUrl,
        size: 'Unknown'
      }
    ]);
    setLoading(false);

    // Note: To enable multiple quality options, you need to:
    // 1. Set up a backend proxy server
    // 2. Make API calls through your proxy
    // 3. See DOWNLOAD_API_SUGGESTIONS.md for implementation guide
  };

  const handleDownload = (quality, url) => {
    if (!url) {
      alert('Download link not available');
      return;
    }

    // Open in new tab for download
    window.open(url, '_blank', 'noopener,noreferrer');
    setShowQualityMenu(false);
  };

  const handleButtonClick = () => {
    if (!showQualityMenu) {
      fetchQualities();
    }
    setShowQualityMenu(!showQualityMenu);
  };

  return (
    <div className="relative flex-1" ref={menuRef}>
      <button
        onClick={handleButtonClick}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1a1a1a] hover:bg-[#252525] rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 group"
        title="Download Episode"
      >
        <FontAwesomeIcon 
          icon={faDownload} 
          className="text-white group-hover:text-[#00bcd4] transition-colors" 
        />
        <span className="text-white font-medium text-sm">Download</span>
        <FontAwesomeIcon 
          icon={faChevronDown} 
          className={`text-white/50 text-xs transition-transform duration-300 ${showQualityMenu ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Quality Selection Menu */}
      {showQualityMenu && (
        <div className="absolute top-full mt-2 right-0 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-white/10 rounded-xl shadow-2xl min-w-[220px] z-50 overflow-hidden">
          <div className="p-2">
            <div className="px-3 py-2 border-b border-white/5">
              <p className="text-xs text-white/50 font-semibold uppercase tracking-wider">Select Quality</p>
            </div>
            
            {loading ? (
              <div className="px-3 py-6 flex flex-col items-center justify-center gap-2">
                <FontAwesomeIcon icon={faSpinner} className="text-[#00bcd4] text-xl animate-spin" />
                <p className="text-xs text-white/50">Loading qualities...</p>
              </div>
            ) : error ? (
              <div className="px-3 py-4 text-center">
                <p className="text-xs text-red-400 mb-2">{error}</p>
                <button
                  onClick={() => handleDownload('default', streamUrl)}
                  className="text-xs text-[#00bcd4] hover:underline"
                >
                  Download current stream
                </button>
              </div>
            ) : qualities.length > 0 ? (
              <>
                <div className="max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                  {qualities.map((source, index) => (
                    <button
                      key={index}
                      onClick={() => handleDownload(source.quality, source.url)}
                      className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-white/10 transition-all text-left group rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#00bcd4] group-hover:scale-125 transition-transform"></div>
                        <span className="text-white font-medium text-sm">{source.quality}</span>
                      </div>
                      <span className="text-white/40 text-xs">{source.size}</span>
                    </button>
                  ))}
                </div>
                <div className="px-3 py-2 border-t border-white/5 bg-white/5">
                  <p className="text-[10px] text-white/40 text-center leading-relaxed">
                    💡 Multiple quality options require proxy server. See docs for setup.
                  </p>
                </div>
              </>
            ) : (
              <div className="px-3 py-4 text-center">
                <p className="text-xs text-white/50">No qualities available</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default DownloadButton;

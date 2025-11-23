import logoTitle from "@/src/config/logoTitle.js";
import website_name from "@/src/config/website.js";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Footer() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDateTime = () => {
    return currentDateTime.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  return (
    <footer className="w-full mt-24 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#e91e63]/5 to-transparent pointer-events-none"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#e91e63]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00bcd4]/10 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Main Footer Content */}
      <div className="relative bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a] border-t-2 border-[#e91e63]/20">
        <div className="max-w-[1920px] mx-auto px-6 py-16">
          {/* Top Section - Logo & Description */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {/* Logo Column - Full Width on Mobile */}
            <div className="flex flex-col items-center md:items-start md:col-span-1 col-span-1">
              <div className="relative group mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-[#e91e63]/30 to-[#00bcd4]/30 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img
                  src="/footer.png"
                  alt={logoTitle}
                  className="h-[120px] w-[240px] object-contain relative z-10 drop-shadow-2xl"
                />
              </div>
              <p className="text-white/70 text-center md:text-left leading-relaxed max-w-sm">
                Your ultimate destination for streaming anime. Watch thousands of titles with HD quality, no ads, completely free.
              </p>
              <div className="flex gap-4 mt-6">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#e91e63]/20 border border-white/10 hover:border-[#e91e63]/50 flex items-center justify-center transition-all duration-300 group">
                  <span className="text-white/60 group-hover:text-white text-lg">📱</span>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#e91e63]/20 border border-white/10 hover:border-[#e91e63]/50 flex items-center justify-center transition-all duration-300 group">
                  <span className="text-white/60 group-hover:text-white text-lg">💬</span>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#e91e63]/20 border border-white/10 hover:border-[#e91e63]/50 flex items-center justify-center transition-all duration-300 group">
                  <span className="text-white/60 group-hover:text-white text-lg">🐙</span>
                </a>
              </div>
            </div>

            {/* Quick Links & Browse - 2 Columns on Mobile */}
            <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-8 md:gap-12">
              {/* Quick Links Column */}
              <div className="flex flex-col items-start">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 max-md:text-base">
                  <span className="w-1 h-6 bg-gradient-to-b from-[#e91e63] to-[#00bcd4] rounded-full max-md:h-5"></span>
                  Quick Links
                </h3>
                <div className="flex flex-col gap-3 max-md:gap-2">
                  <Link to="/home" className="text-white/60 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group max-md:text-sm">
                    <span className="text-[#e91e63] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    Home
                  </Link>
                  <Link to="/most-popular" className="text-white/60 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group max-md:text-sm">
                    <span className="text-[#e91e63] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    Popular Anime
                  </Link>
                  <Link to="/recently-added" className="text-white/60 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group max-md:text-sm">
                    <span className="text-[#e91e63] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    Recently Added
                  </Link>
                  <Link to="/about" className="text-white/60 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group max-md:text-sm">
                    <span className="text-[#e91e63] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    About Us
                  </Link>
                </div>
              </div>

              {/* Browse Column */}
              <div className="flex flex-col items-start">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 max-md:text-base">
                  <span className="w-1 h-6 bg-gradient-to-b from-[#e91e63] to-[#00bcd4] rounded-full max-md:h-5"></span>
                  Browse
                </h3>
                <div className="flex flex-col gap-3 max-md:gap-2">
                  <Link to="/movie" className="text-white/60 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group max-md:text-sm">
                    <span className="text-[#e91e63] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    Movies
                  </Link>
                  <Link to="/tv" className="text-white/60 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group max-md:text-sm">
                    <span className="text-[#e91e63] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    TV Series
                  </Link>
                  <Link to="/subbed-anime" className="text-white/60 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group max-md:text-sm">
                    <span className="text-[#e91e63] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    Subbed Anime
                  </Link>
                  <Link to="/dubbed-anime" className="text-white/60 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group max-md:text-sm">
                    <span className="text-[#e91e63] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    Dubbed Anime
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* A-Z List Section */}
          <div className="mb-12 pb-12 border-b border-white/5">
            <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
              <span className="w-1 h-6 bg-gradient-to-b from-[#e91e63] to-[#00bcd4] rounded-full"></span>
              <h3 className="text-lg font-bold text-white">Browse A-Z</h3>
            </div>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {["All", "#", "0-9", ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))].map((item, index) => (
                <Link
                  to={`az-list/${item === "All" ? "" : item}`}
                  key={index}
                  className="w-10 h-10 flex items-center justify-center text-sm bg-white/5 hover:bg-gradient-to-br hover:from-[#e91e63]/30 hover:to-[#00bcd4]/30 text-white/60 hover:text-white rounded-lg transition-all duration-300 border border-white/5 hover:border-[#e91e63]/50 font-semibold hover:scale-110"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-white/40 text-sm leading-relaxed max-w-2xl mb-2">
                {website_name} does not host any files. We aggregate streams from 3rd party services. All legal issues should be directed to the file hosts and providers.
              </p>
              <div className="flex flex-col items-center md:items-start gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-[#e91e63] text-lg">©</span>
                  <span className="font-bold bg-gradient-to-r from-[#e91e63] to-[#00bcd4] bg-clip-text text-transparent">{website_name}</span>
                  <span className="text-white/40">•</span>
                  <span className="text-white/40">{currentDateTime.getFullYear()}</span>
                  <span className="text-white/40">•</span>
                  <span className="text-white/40">All rights reserved</span>
                </div>
                <div className="text-xs text-white/30 font-mono">
                  {formatDateTime()}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/40">
              <span>Made with</span>
              <span className="text-[#e91e63] animate-pulse">❤️</span>
              <span>for anime fans</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

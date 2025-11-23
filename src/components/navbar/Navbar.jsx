import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faRandom,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "@/src/context/LanguageContext";
import { useTheme } from "@/src/context/ThemeContext";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import { SearchProvider } from "@/src/context/SearchContext";
import WebSearch from "../searchbar/WebSearch";
import MobileSearch from "../searchbar/MobileSearch";
import ThemeToggle from "../theme-toggle/ThemeToggle";
import "../sidebar/Sidebar.css";

function Navbar() {
  const location = useLocation();
  const { language, toggleLanguage } = useLanguage();
  const { theme } = useTheme();
  const [isNotHomePage, setIsNotHomePage] = useState(
    location.pathname !== "/" && location.pathname !== "/home"
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleHamburgerClick = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleRandomClick = () => {
    if (location.pathname === "/random") {
      window.location.reload();
    }
  };

  useEffect(() => {
    setIsNotHomePage(
      location.pathname !== "/" && location.pathname !== "/home"
    );
  }, [location.pathname]);

  return (
    <SearchProvider>
      <nav
        role="navigation"
        aria-label="Main navigation"
        className={`fixed top-0 left-0 w-full z-[1000000] transition-all duration-300 ease-in-out
          ${isScrolled 
            ? "bg-[#0A0A0A]/95 backdrop-blur-xl shadow-2xl shadow-black/50 border-b border-white/5" 
            : "bg-gradient-to-b from-[#121212] to-[#0A0A0A]"
          }`}
      >
        {/* Skip to content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[1000001] focus:bg-brand-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-xl"
        >
          Skip to content
        </a>
        <div className="max-w-[1920px] mx-auto px-6 h-20 flex items-center justify-between max-md:h-16 max-md:px-4">
          {/* Left Section */}
          <div className="flex items-center gap-6">
            <button
              onClick={handleHamburgerClick}
              className="group relative text-xl text-gray-300 cursor-pointer hover:text-white transition-all duration-300 p-2.5 rounded-xl hover:bg-gradient-to-br hover:from-brand-primary/20 hover:to-brand-secondary/20 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 hover:shadow-lg hover:shadow-brand-primary/20"
              aria-label="Open navigation menu"
              aria-expanded={isSidebarOpen}
            >
              <FontAwesomeIcon icon={faBars} className="transition-transform duration-300 group-hover:scale-110" />
            </button>
            <Link 
              to="/home" 
              className="flex items-center focus:outline-none focus:ring-2 focus:ring-brand-primary/50 rounded-xl transition-all duration-300 hover:scale-105"
            >
              <img 
                src="/logo.png" 
                alt="NeoNime - Anime Streaming Platform" 
                className="h-10 w-auto max-md:h-8 drop-shadow-2xl" 
              />
            </Link>
          </div>

          {/* Center Section - Search */}
          <div className="flex-1 flex justify-center items-center max-w-none mx-8 hidden md:flex">
            <div className="flex items-center gap-3 w-[650px]">
              <WebSearch />
              <Link
                to={location.pathname === "/random" ? "#" : "/random"}
                onClick={handleRandomClick}
                className="group relative p-3 aspect-square bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] text-white/60 hover:text-white rounded-xl transition-all duration-300 flex items-center justify-center hover:shadow-lg hover:shadow-brand-primary/20 hover:from-brand-primary/20 hover:to-brand-secondary/20 border border-white/5 hover:border-brand-primary/30"
                title="Random Anime"
              >
                <FontAwesomeIcon icon={faRandom} className="text-lg transition-transform duration-300 group-hover:rotate-180 group-hover:scale-110" />
              </Link>
            </div>
          </div>

          {/* Language Toggle - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <div className="language-switcher-pill" role="group" aria-label="Language selection">
              {/* Sliding Background */}
              <div 
                className="language-slider-pill"
                style={{
                  transform: language === 'EN' ? 'translateX(0)' : 'translateX(100%)',
                }}
              />
              {["EN", "JP"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => toggleLanguage(lang)}
                  className={`lang-button-pill ${language === lang ? 'active' : ''}`}
                  aria-label={`Switch to ${lang === 'EN' ? 'English' : 'Japanese'}`}
                  aria-pressed={language === lang}
                >
                  <span className="font-bold text-xs">{lang}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Controls - Search Only */}
          <div className="md:hidden flex items-center gap-2">
            {/* Search Icon - Mobile */}
            <button
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="group p-2.5 aspect-square bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] text-white/60 hover:text-white rounded-xl transition-all duration-300 flex items-center justify-center w-[38px] h-[38px] border border-white/5 hover:border-brand-primary/30 hover:shadow-lg hover:shadow-brand-primary/20"
              title={isMobileSearchOpen ? "Close Search" : "Search Anime"}
            >
              <FontAwesomeIcon 
                icon={isMobileSearchOpen ? faXmark : faMagnifyingGlass} 
                className="w-[16px] h-[16px] transition-all duration-300 group-hover:scale-110"
                style={{ transform: isMobileSearchOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
              />
            </button>
          </div>
        </div>

        {/* Mobile Search Dropdown */}
        {isMobileSearchOpen && (
          <div className="md:hidden bg-gradient-to-b from-[#1A1A1A] to-[#0A0A0A] shadow-2xl shadow-black/50 border-t border-white/5">
            <MobileSearch onClose={() => setIsMobileSearchOpen(false)} />
        </div>
        )}

        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
      </nav>
    </SearchProvider>
  );
}

export default Navbar;

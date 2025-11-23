import { FaChevronLeft } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm, faRandom, faHome, faClock, faFire, faTv, faPlay, faCirclePlay, faFilePen, faBookmark, faCalendarAlt, faClosedCaptioning, faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "@/src/context/LanguageContext";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

const MENU_ITEMS = [
  { name: "Home", path: "/home", icon: faHome },
  { name: "My Watchlist", path: "/watchlist", icon: faBookmark },
  { name: "Schedule", path: "/schedule", icon: faCalendarAlt },
  { name: "Recently Added", path: "/recently-added", icon: faClock },
  { name: "Top Upcoming", path: "/top-upcoming", icon: faFire },
  { name: "Subbed Anime", path: "/subbed-anime", icon: faClosedCaptioning },
  { name: "Dubbed Anime", path: "/dubbed-anime", icon: faMicrophone },
  { name: "Most Popular", path: "/most-popular", icon: faFire },
  { name: "Movies", path: "/movie", icon: faFilm },
  { name: "TV Series", path: "/tv", icon: faTv },
  { name: "OVAs", path: "/ova", icon: faCirclePlay },
  { name: "ONAs", path: "/ona", icon: faPlay },
  { name: "Specials", path: "/special", icon: faFilePen },
];

const Sidebar = ({ isOpen, onClose }) => {
  const { language, toggleLanguage } = useLanguage();
  const location = useLocation();
  const scrollPosition = useRef(0);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!isOpen) {
        scrollPosition.current = window.scrollY;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      scrollPosition.current = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPosition.current}px`;
      document.body.style.width = '100%';
    } else {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollPosition.current);
    }

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  useEffect(() => {
    onClose();
  }, [location]);

  return (
    <div className="sidebar-container" aria-hidden={!isOpen}>
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
        />
      )}

      <aside
        className={`sidebar-main ${isOpen ? 'sidebar-open' : ''}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="sidebar-content">
          {/* Header with Logo */}
          <div className="sidebar-header">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg">NeoNime</span>
                <span className="text-white/50 text-xs">Anime Streaming</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="close-button"
            >
              <FaChevronLeft className="text-sm" />
              <span className="text-sm font-semibold">Close Menu</span>
            </button>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-3 px-2">Quick Access</h3>
            <div className="quick-actions-grid">
              <Link
                to="/random"
                className="quick-action-item"
              >
                <div className="quick-action-icon">
                  <FontAwesomeIcon icon={faRandom} className="text-lg" />
                </div>
                <span className="text-xs font-semibold">Random</span>
              </Link>
              <Link
                to="/movie"
                className="quick-action-item"
              >
                <div className="quick-action-icon">
                  <FontAwesomeIcon icon={faFilm} className="text-lg" />
                </div>
                <span className="text-xs font-semibold">Movies</span>
              </Link>
              <Link
                to="/most-popular"
                className="quick-action-item"
              >
                <div className="quick-action-icon">
                  <FontAwesomeIcon icon={faFire} className="text-lg" />
                </div>
                <span className="text-xs font-semibold">Popular</span>
              </Link>
            </div>
          </div>

          {/* Language Selector - Hidden on Desktop */}
          <div className="language-section md:hidden">
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-3 px-2">Language</h3>
            <div className="language-switcher-container">
              <div className="language-switcher-pill">
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
                  >
                    <span className="font-bold text-xs">{lang}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="menu-items">
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-3 px-2">Browse</h3>
            {MENU_ITEMS.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
              >
                <div className="menu-icon">
                  <FontAwesomeIcon icon={item.icon} className="text-base" />
                </div>
                <span className="font-semibold text-sm">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="sidebar-footer">
            <div className="footer-content">
              <p className="text-xs text-white/40">© {currentDateTime.getFullYear()} NeoNime</p>
              <p className="text-[10px] text-white/30">All rights reserved</p>
              <p className="text-[9px] text-white/20 font-mono mt-1">
                {currentDateTime.toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: true
                })}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;

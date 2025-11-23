import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClosedCaptioning,
  faMicrophone,
  faPlay,
  faStar,
  faFire,
} from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '@/src/context/LanguageContext';
import { cn } from '@/lib/utils';
import './AnimeCard.css';

function AnimeCard({ item, path = '', className }) {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleClick = () => {
    navigate(
      path === 'top-upcoming' ? `/${item.id}` : `/watch/${item.id}`
    );
  };

  return (
    <div className={cn('neon-card-container', className)}>
      {/* Card with Neon Effect */}
      <div
        ref={cardRef}
        className="neon-card group"
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
      >
        {/* Spotlight Effect */}
        <div 
          className="neon-spotlight"
          style={{
            background: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, rgba(233, 30, 99, 0.15), transparent)`,
          }}
        />

        {/* Image Container */}
        <div className="neon-image-wrapper">
          <img
            src={item.poster}
            alt={item.title}
            className="neon-image"
            loading="lazy"
          />
          
          {/* Animated Border */}
          <div className="neon-border" />
          
          {/* Gradient Overlay */}
          <div className="neon-overlay" />
        </div>

        {/* Floating Badges */}
        <div className="neon-badges-top">
          {(item.tvInfo?.rating === '18+' || item?.adultContent === true) && (
            <div className="neon-badge neon-badge-adult">
              <span>18+</span>
            </div>
          )}
          {item.rating && (
            <div className="neon-badge neon-badge-rating">
              <FontAwesomeIcon icon={faStar} className="text-[9px]" />
              <span>{item.rating}</span>
            </div>
          )}
        </div>

        {/* Play Button with Pulse */}
        <div className="neon-play-button">
          <div className="neon-play-pulse" />
          <div className="neon-play-icon">
            <FontAwesomeIcon icon={faPlay} />
          </div>
        </div>

        {/* Info Badges - Bottom */}
        <div className="neon-info-section">
          <div className="neon-info-badges">
            {item.tvInfo?.sub && (
              <div className="neon-info-badge neon-badge-sub">
                <FontAwesomeIcon icon={faClosedCaptioning} />
                <span>{item.tvInfo.sub}</span>
              </div>
            )}
            {item.tvInfo?.dub && (
              <div className="neon-info-badge neon-badge-dub">
                <FontAwesomeIcon icon={faMicrophone} />
                <span>{item.tvInfo.dub}</span>
              </div>
            )}
            {item.tvInfo?.showType && (
              <div className="neon-info-badge neon-badge-type">
                <FontAwesomeIcon icon={faFire} />
                <span>{item.tvInfo.showType.split(' ').shift()}</span>
              </div>
            )}
            {item.releaseDate && (
              <div className="neon-info-badge neon-badge-date">
                <span>{item.releaseDate}</span>
              </div>
            )}
            {!item.tvInfo?.showType && item.type && (
              <div className="neon-info-badge neon-badge-type">
                <span>{item.type}</span>
              </div>
            )}
          </div>
        </div>

        {/* Glow Effect */}
        <div className="neon-glow" />
      </div>

      {/* Title Outside Card */}
      <Link
        to={`/${item.id}`}
        className="neon-title"
        onClick={(e) => e.stopPropagation()}
      >
        {language === 'EN' ? item.title : item.japanese_title}
      </Link>
    </div>
  );
}

export default AnimeCard;

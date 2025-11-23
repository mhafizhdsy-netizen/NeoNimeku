import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faPlay, faCalendar, faClock } from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '@/src/context/LanguageContext';
import './AnimeHoverCard.css';

function AnimeHoverCard({ item, position, onClose }) {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    console.log('AnimeHoverCard mounted with item:', item?.title);
    // Trigger animation after mount
    setTimeout(() => setIsVisible(true), 10);
  }, [item]);

  if (!item) {
    console.log('AnimeHoverCard: No item provided');
    return null;
  }

  // Calculate position to keep card in viewport
  const cardWidth = 350;
  const cardHeight = 400;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  let left = position.x + 20;
  let top = position.y;

  // Adjust if card goes off right edge
  if (left + cardWidth > viewportWidth - 20) {
    left = position.x - cardWidth - 20;
  }

  // Adjust if card goes off bottom edge
  if (top + cardHeight > viewportHeight - 20) {
    top = viewportHeight - cardHeight - 20;
  }

  // Adjust if card goes off top edge
  if (top < 20) {
    top = 20;
  }

  const content = (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-[9998]"
        onClick={onClose}
      />
      
      {/* Hover Card */}
      <div
        className={`anime-hover-card ${isVisible ? 'visible' : ''}`}
        style={{
          position: 'fixed',
          left: `${left}px`,
          top: `${top}px`,
          zIndex: 9999,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background Image with Overlay */}
        <div className="hover-card-bg">
          <img src={item.poster} alt={item.title} />
          <div className="hover-card-overlay"></div>
          {/* Dots Pattern */}
          <div className="hover-card-dots"></div>
        </div>

        {/* Content */}
        <div className="hover-card-content">
          {/* Header */}
          <div className="hover-card-header">
            {/* Rating */}
            {item.rating && (
              <div className="hover-card-rating">
                <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                <span>{item.rating}</span>
              </div>
            )}
          </div>

          {/* Meta Info */}
          <div className="hover-card-meta">
            {item.tvInfo?.showType && (
              <span className="meta-badge">
                {item.tvInfo.showType}
              </span>
            )}
            {item.releaseDate && (
              <span className="meta-badge">
                <FontAwesomeIcon icon={faCalendar} className="text-xs" />
                {item.releaseDate}
              </span>
            )}
            {item.tvInfo?.duration && (
              <span className="meta-badge">
                <FontAwesomeIcon icon={faClock} className="text-xs" />
                {item.tvInfo.duration}
              </span>
            )}
          </div>

          {/* Episodes Info */}
          {(item.tvInfo?.sub || item.tvInfo?.dub) && (
            <div className="hover-card-episodes">
              {item.tvInfo?.sub && (
                <span className="episode-badge sub">
                  SUB: {item.tvInfo.sub}
                </span>
              )}
              {item.tvInfo?.dub && (
                <span className="episode-badge dub">
                  DUB: {item.tvInfo.dub}
                </span>
              )}
            </div>
          )}

          {/* Action Button */}
          <Link
            to={`/watch/${item.id}`}
            className="hover-card-button"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faPlay} />
            <span>Watch Now</span>
          </Link>
        </div>

        {/* Glow Effect */}
        <div className="hover-card-glow"></div>
      </div>
    </>
  );

  // Use portal to render at document body level
  return createPortal(content, document.body);
}

export default AnimeHoverCard;

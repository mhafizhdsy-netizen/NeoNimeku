import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClosedCaptioning,
  faMicrophone,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FaChevronRight } from "react-icons/fa";
import "./CategoryCard.css";
import { useLanguage } from "@/src/context/LanguageContext";
import { Link, useNavigate } from "react-router-dom";

const CategoryCard = React.memo(
  ({
    label,
    data,
    showViewMore = true,
    className,
    categoryPage = false,
    cardStyle,
    path,
    limit,
  }) => {
    const { language } = useLanguage();
    const navigate = useNavigate();
    
    if (limit) {
      data = data.slice(0, limit);
    }

    const [itemsToRender, setItemsToRender] = useState({
      firstRow: [],
      remainingItems: [],
    });

    const getItemsToRender = useCallback(() => {
      if (categoryPage) {
        const firstRow =
          window.innerWidth > 758 && data.length > 4 ? data.slice(0, 4) : [];
        const remainingItems =
          window.innerWidth > 758 && data.length > 4
            ? data.slice(4)
            : data.slice(0);
        return { firstRow, remainingItems };
      }
      return { firstRow: [], remainingItems: data.slice(0) };
    }, [categoryPage, data]);

    useEffect(() => {
      const handleResize = () => {
        setItemsToRender(getItemsToRender());
      };
      const newItems = getItemsToRender();
      setItemsToRender((prev) => {
        if (
          JSON.stringify(prev.firstRow) !== JSON.stringify(newItems.firstRow) ||
          JSON.stringify(prev.remainingItems) !==
            JSON.stringify(newItems.remainingItems)
        ) {
          return newItems;
        }
        return prev;
      });

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, [getItemsToRender]);

    return (
      <div className={`w-full ${className}`}>
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-semibold text-2xl text-white max-[478px]:text-[18px] capitalize tracking-wide">
            {label}
          </h1>
          {showViewMore && (
            <Link
              to={`/${path}`}
              className="flex items-center gap-x-1 py-1 px-2 -mr-2 rounded-md
                text-[13px] font-medium text-[#ffffff80] hover:text-white
                transition-all duration-300 group"
            >
              View all
              <FaChevronRight className="text-[10px] transform transition-transform duration-300 
                group-hover:translate-x-0.5" />
            </Link>
          )}
        </div>
        <>
          {categoryPage && (
            <div
              className={`grid grid-cols-4 gap-x-3 gap-y-8 transition-all duration-300 ease-in-out ${
                categoryPage && itemsToRender.firstRow.length > 0
                  ? "mt-8 max-[758px]:hidden"
                  : ""
              }`}
            >
              {itemsToRender.firstRow.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col transition-transform duration-300 ease-in-out hover:scale-[1.02]"
                  style={{ height: "fit-content" }}
                >
                  <div className="w-full h-auto pb-[140%] relative inline-block overflow-hidden rounded-2xl shadow-lg group">
                    <div
                      className="inline-block bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] absolute left-0 top-0 w-full h-full group hover:cursor-pointer"
                      onClick={() =>
                        navigate(
                          `${
                            path === "top-upcoming"
                              ? `/${item.id}`
                              : `/watch/${item.id}`
                          }`
                        )
                      }
                    >
                      <img
                        src={`${item.poster}`}
                        alt={item.title}
                        className="block w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-110"
                        loading="lazy"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none" />
                      
                      {/* Glow Effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-brand-primary/20 via-transparent to-transparent pointer-events-none" />
                      
                      {/* Shimmer Effect */}
                      <div className="card-shine pointer-events-none"></div>
                      
                      {/* Radial Glow */}
                      <div className="corner-glow pointer-events-none"></div>
                      
                      {/* Simple Play Icon - No Background */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <FontAwesomeIcon
                          icon={faPlay}
                          className="text-white text-5xl max-[450px]:text-4xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
                        />
                      </div>
                    </div>
                    
                    {/* 18+ Badge with Enhanced Styling */}
                    {(item.tvInfo?.rating === "18+" || item?.adultContent === true) && (
                      <div className="absolute top-3 left-3 z-10 px-3 py-1.5 bg-gradient-to-r from-red-600 to-red-500 backdrop-blur-md rounded-full text-white text-xs font-bold shadow-2xl border border-red-400/50 animate-pulse">
                        18+
                      </div>
                    )}
                    
                    {/* Info Badges - Always Visible */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
                      <div className="flex items-center justify-start w-full gap-2 flex-wrap">
                        {item.tvInfo?.sub && (
                          <div className="flex items-center gap-1 h-6 px-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg hover:bg-white/15 hover:scale-105 transition-all duration-300">
                            <FontAwesomeIcon icon={faClosedCaptioning} className="text-[8px] text-white/90 drop-shadow-lg" />
                            <span className="text-[9px] font-semibold text-white/90 drop-shadow-lg">{item.tvInfo.sub}</span>
                          </div>
                        )}
                        {item.tvInfo?.dub && (
                          <div className="flex items-center gap-1 h-6 px-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg hover:bg-white/15 hover:scale-105 transition-all duration-300">
                            <FontAwesomeIcon icon={faMicrophone} className="text-[8px] text-white/90 drop-shadow-lg" />
                            <span className="text-[9px] font-semibold text-white/90 drop-shadow-lg">{item.tvInfo.dub}</span>
                          </div>
                        )}
                        {item.tvInfo?.showType && (
                          <div className="h-6 px-2.5 flex items-center bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg hover:bg-white/15 hover:scale-105 transition-all duration-300 max-[478px]:hidden">
                            <span className="text-[9px] font-semibold text-white/90 drop-shadow-lg">{item.tvInfo.showType.split(" ").shift()}</span>
                          </div>
                        )}
                        {item.releaseDate && (
                          <div className="h-6 px-2.5 flex items-center bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg hover:bg-white/15 hover:scale-105 transition-all duration-300">
                            <span className="text-[9px] font-semibold text-white/90 drop-shadow-lg">{item.releaseDate}</span>
                          </div>
                        )}
                        {!item.tvInfo?.showType && item.type && (
                          <div className="h-6 px-2.5 flex items-center bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg hover:bg-white/15 hover:scale-105 transition-all duration-300">
                            <span className="text-[9px] font-semibold text-white/90 drop-shadow-lg">{item.type}</span>
                          </div>
                        )}
                        {(item.tvInfo?.duration || item.duration) && (
                          <div className="h-6 px-2.5 flex items-center bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg hover:bg-white/15 hover:scale-105 transition-all duration-300 max-[478px]:hidden">
                            <span className="text-[9px] font-semibold text-white/90 drop-shadow-lg">
                              {item.tvInfo?.duration === "m" || item.tvInfo?.duration === "?" || item.duration === "m" || item.duration === "?" ? "N/A" : item.tvInfo?.duration || item.duration || "N/A"}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Animated Border Glow */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#E91E63]/50 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(233,30,99,0.5)] pointer-events-none" />
                    
                    {/* Corner Accents */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-transparent group-hover:border-[#E91E63]/60 rounded-tl-2xl transition-all duration-500 opacity-0 group-hover:opacity-100 pointer-events-none"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-transparent group-hover:border-[#F06292]/60 rounded-tr-2xl transition-all duration-500 opacity-0 group-hover:opacity-100 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-transparent group-hover:border-[#ec4899]/60 rounded-bl-2xl transition-all duration-500 opacity-0 group-hover:opacity-100 pointer-events-none"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-transparent group-hover:border-[#FF4081]/60 rounded-br-2xl transition-all duration-500 opacity-0 group-hover:opacity-100 pointer-events-none"></div>
                  </div>
                  
                  {/* Title Outside Card */}
                  <div
                    onClick={() =>
                      navigate(
                        `${
                          path === "top-upcoming"
                            ? `/${item.id}`
                            : `/watch/${item.id}`
                        }`
                      )
                    }
                    className="text-white font-semibold mt-4 line-clamp-2 text-sm tracking-wide cursor-pointer hover:text-[#E91E63] transition-colors duration-300"
                  >
                    {language === "EN" ? item.title : item.japanese_title}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className={`grid ${cardStyle || 'grid-cols-6 max-[1400px]:grid-cols-4 max-[758px]:grid-cols-3 max-[478px]:grid-cols-3'} gap-x-3 gap-y-8 mt-6 transition-all duration-300 ease-in-out max-[478px]:gap-x-2`}>
            {itemsToRender.remainingItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col transition-transform duration-300 ease-in-out hover:scale-[1.02]"
                style={{ height: "fit-content" }}
              >
                <div className="w-full h-auto pb-[140%] relative inline-block overflow-hidden rounded-2xl shadow-lg group">
                  <div
                    className="inline-block bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] absolute left-0 top-0 w-full h-full group hover:cursor-pointer"
                    onClick={() =>
                      navigate(
                        `${
                          path === "top-upcoming"
                            ? `/${item.id}`
                            : `/watch/${item.id}`
                        }`
                      )
                    }
                  >
                    <img
                      src={`${item.poster}`}
                      alt={item.title}
                      className="block w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-110"
                      loading="lazy"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none" />
                    
                    {/* Glow Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-brand-primary/20 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Shimmer Effect */}
                    <div className="card-shine pointer-events-none"></div>
                    
                    {/* Radial Glow */}
                    <div className="corner-glow pointer-events-none"></div>
                    
                    {/* Simple Play Icon - No Background */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <FontAwesomeIcon
                        icon={faPlay}
                        className="text-white text-5xl max-[450px]:text-4xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
                      />
                    </div>
                  </div>
                  
                  {/* 18+ Badge with Enhanced Styling */}
                  {(item.tvInfo?.rating === "18+" || item?.adultContent === true) && (
                    <div className="absolute top-3 left-3 z-10 px-3 py-1.5 bg-gradient-to-r from-red-600 to-red-500 backdrop-blur-md rounded-full text-white text-xs font-bold shadow-2xl border border-red-400/50 animate-pulse">
                      18+
                    </div>
                  )}
                  
                  {/* Info Badges - Always Visible */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
                    <div className="flex items-center justify-start w-full gap-2 flex-wrap">
                      {item.tvInfo?.sub && (
                        <div className="flex items-center gap-1 h-5 px-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-md hover:bg-white/15 hover:scale-105 transition-all duration-300">
                          <FontAwesomeIcon icon={faClosedCaptioning} className="text-[7px] text-white/90 drop-shadow-lg" />
                          <span className="text-[8px] font-semibold text-white/90 drop-shadow-lg">{item.tvInfo.sub}</span>
                        </div>
                      )}
                      {item.tvInfo?.dub && (
                        <div className="flex items-center gap-1 h-5 px-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-md hover:bg-white/15 hover:scale-105 transition-all duration-300">
                          <FontAwesomeIcon icon={faMicrophone} className="text-[7px] text-white/90 drop-shadow-lg" />
                          <span className="text-[8px] font-semibold text-white/90 drop-shadow-lg">{item.tvInfo.dub}</span>
                        </div>
                      )}
                      {item.tvInfo?.showType && (
                        <div className="h-5 px-2 flex items-center bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-md hover:bg-white/15 hover:scale-105 transition-all duration-300 max-[478px]:hidden">
                          <span className="text-[8px] font-semibold text-white/90 drop-shadow-lg">{item.tvInfo.showType.split(" ").shift()}</span>
                        </div>
                      )}
                      {item.releaseDate && (
                        <div className="h-5 px-2 flex items-center bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-md hover:bg-white/15 hover:scale-105 transition-all duration-300">
                          <span className="text-[8px] font-semibold text-white/90 drop-shadow-lg">{item.releaseDate}</span>
                        </div>
                      )}
                      {!item.tvInfo?.showType && item.type && (
                        <div className="h-5 px-2 flex items-center bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-md hover:bg-white/15 hover:scale-105 transition-all duration-300">
                          <span className="text-[8px] font-semibold text-white/90 drop-shadow-lg">{item.type}</span>
                        </div>
                      )}
                      {(item.tvInfo?.duration || item.duration) && (
                        <div className="h-5 px-2 flex items-center bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-md hover:bg-white/15 hover:scale-105 transition-all duration-300 max-[478px]:hidden">
                          <span className="text-[8px] font-semibold text-white/90 drop-shadow-lg">
                            {item.tvInfo?.duration === "m" || item.tvInfo?.duration === "?" || item.duration === "m" || item.duration === "?" ? "N/A" : item.tvInfo?.duration || item.duration || "N/A"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Animated Border Glow */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#E91E63]/50 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(233,30,99,0.5)] pointer-events-none" />
                  
                  {/* Corner Accents */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-transparent group-hover:border-[#E91E63]/60 rounded-tl-2xl transition-all duration-500 opacity-0 group-hover:opacity-100 pointer-events-none"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-transparent group-hover:border-[#F06292]/60 rounded-tr-2xl transition-all duration-500 opacity-0 group-hover:opacity-100 pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-transparent group-hover:border-[#ec4899]/60 rounded-bl-2xl transition-all duration-500 opacity-0 group-hover:opacity-100 pointer-events-none"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-transparent group-hover:border-[#FF4081]/60 rounded-br-2xl transition-all duration-500 opacity-0 group-hover:opacity-100 pointer-events-none"></div>
                </div>
                
                {/* Title Outside Card */}
                <div
                  onClick={() =>
                    navigate(
                      `${
                        path === "top-upcoming"
                          ? `/${item.id}`
                          : `/watch/${item.id}`
                      }`
                    )
                  }
                  className="text-white font-semibold mt-4 line-clamp-2 text-sm tracking-wide cursor-pointer hover:text-[#E91E63] transition-colors duration-300"
                >
                  {language === "EN" ? item.title : item.japanese_title}
                </div>
              </div>
            ))}
          </div>
        </>
      </div>
    );
  }
);

CategoryCard.displayName = "CategoryCard";

export default CategoryCard;



import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClosedCaptioning,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "@/src/context/LanguageContext";
import { Link, useNavigate } from "react-router-dom";

function Topten({ data, className }) {
  const { language } = useLanguage();
  const [activePeriod, setActivePeriod] = useState("today");
  const navigate = useNavigate();

  const handlePeriodChange = (period) => {
    setActivePeriod(period);
  };

  const handleNavigate = (id) => {
    navigate(`/${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentData =
    activePeriod === "today"
      ? data.today
      : activePeriod === "week"
      ? data.week
      : data.month;

  return (
    <div className={`bg-gradient-to-br from-[#141414] to-[#0f0f0f] rounded-xl p-5 border border-white/5 shadow-xl ${className}`}>
      <div className="flex flex-col gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#e91e63]/20 to-[#00bcd4]/20 flex items-center justify-center border border-[#e91e63]/30">
            <span className="text-xl font-bold text-[#e91e63]">🏆</span>
          </div>
          <h2 className="text-xl font-bold text-white">Top 10</h2>
        </div>
        <div className="flex gap-1.5 w-full">
          {["today", "week", "month"].map((period) => (
            <button
              key={period}
              className={`flex-1 relative px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                activePeriod === period
                  ? "bg-gradient-to-r from-[#e91e63] to-[#00bcd4] text-white shadow-lg shadow-[#e91e63]/20 scale-[1.02]"
                  : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10"
              }`}
              onClick={() => handlePeriodChange(period)}
            >
              {activePeriod === period && (
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#e91e63]/30 to-[#00bcd4]/30 blur-lg -z-10"></div>
              )}
              <span className="relative z-10">{period.charAt(0).toUpperCase() + period.slice(1)}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col space-y-2 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-white/5 scrollbar-track-rounded-xl scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20 scrollbar-thumb-rounded-xl">
        {currentData &&
          currentData.map((item, index) => (
            <div key={index} className="group">
              <Link
                to={`/${item.id}`}
                onClick={() => handleNavigate(item.id)}
                className="block"
              >
                <div className="flex items-start gap-3 p-2 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-[#e91e63]/10 hover:to-[#00bcd4]/10 hover:border hover:border-[#e91e63]/20">
                  <div className="relative">
                    <img
                      src={`${item.poster}`}
                      alt={item.title}
                      className="w-[50px] h-[70px] rounded-xl object-cover cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/watch/${item.id}`);
                      }}
                    />
                    <div className={`absolute top-0 left-0 bg-gradient-to-r ${
                      index < 3 
                        ? "from-[#e91e63] to-[#00bcd4]" 
                        : "from-white/80 to-white/60"
                    } text-white text-xs font-bold px-1.5 py-0.5 rounded-br-xl shadow-lg`}>
                      #{index + 1}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                    <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors line-clamp-2">
                      {language === "EN" ? item.title : item.japanese_title}
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      {item.tvInfo?.sub && (
                        <div className="flex items-center gap-1 px-1.5 py-0.5 bg-gradient-to-r from-white/10 to-white/5 border border-white/10 rounded-xl text-gray-300">
                          <FontAwesomeIcon
                            icon={faClosedCaptioning}
                            className="text-[10px]"
                          />
                          <span className="text-[10px] font-medium">
                            {item.tvInfo.sub}
                          </span>
                        </div>
                      )}
                      {item.tvInfo?.dub && (
                        <div className="flex items-center gap-1 px-1.5 py-0.5 bg-gradient-to-r from-white/10 to-white/5 border border-white/10 rounded-xl text-gray-300">
                          <FontAwesomeIcon
                            icon={faMicrophone}
                            className="text-[10px]"
                          />
                          <span className="text-[10px] font-medium">
                            {item.tvInfo.dub}
                          </span>
                        </div>
                      )}
                      {item.tvInfo?.showType && (
                        <span className="text-xs text-gray-400">
                          {item.tvInfo.showType}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

export default React.memo(Topten);


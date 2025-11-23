import { useLanguage } from "@/src/context/LanguageContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClosedCaptioning,
  faMicrophone,
  faFire
} from "@fortawesome/free-solid-svg-icons";

const Trending = ({ trending, className }) => {
  const { language } = useLanguage();

  return (
    <div className={`bg-gradient-to-br from-[#141414] to-[#0f0f0f] rounded-xl p-5 border border-white/5 shadow-xl ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#e91e63]/20 to-[#00bcd4]/20 flex items-center justify-center border border-[#e91e63]/30">
          <FontAwesomeIcon icon={faFire} className="text-[#e91e63]" />
        </div>
        <h2 className="text-xl font-bold text-white">Trending Now</h2>
      </div>
      <div className="flex flex-col space-y-2 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-white/5 scrollbar-track-rounded-xl scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20 scrollbar-thumb-rounded-xl">
        {trending &&
          trending.map((item, index) => (
            <div key={index} className="group">
              <Link
                to={`/${item.id}`}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="block"
              >
                <div className="flex items-start gap-3 p-2 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-[#e91e63]/10 hover:to-[#00bcd4]/10 hover:border hover:border-[#e91e63]/20">
                  <div className="relative">
                    <img
                      src={item.poster}
                      alt={item.title}
                      className="w-[50px] h-[70px] rounded-xl object-cover"
                    />
                    <div className="absolute top-0 left-0 bg-gradient-to-r from-[#e91e63] to-[#00bcd4] text-white text-xs font-bold px-1.5 py-0.5 rounded-br-xl shadow-lg">
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
};

export default Trending;


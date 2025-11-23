import { useState, useEffect } from "react";
import fetchVoiceActorInfo from "@/src/utils/getVoiceActor.utils";
import VoiceActorlistLoader from "../Loader/VoiceActorlist.loader";
import { useNavigate } from "react-router-dom";
import Error from "../error/Error";
import {
  cleanupScrollbar,
  toggleScrollbar,
} from "@/src/helper/toggleScrollbar";
import PageSlider from "../pageslider/PageSlider";

function VoiceactorList({ id, isOpen, onClose }) {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const [VoiceactorList, setVoiceactorList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    toggleScrollbar(isOpen);
    return () => {
      cleanupScrollbar();
    };
  }, [isOpen]);

  useEffect(() => {
    const fetchCategoryInfo = async () => {
      setLoading(true);
      try {
        const data = await fetchVoiceActorInfo(id, page);
        setVoiceactorList(data.data);
        setTotalPages(data.totalPages);
        setLoading(false);
      } catch (err) {
        setError(err);
        console.error("Error fetching category info:", err);
      }
    };
    fetchCategoryInfo();
  }, [page]);

  if (error) {
    navigate("/error-page");
    return <Error />;
  }
  if (!VoiceactorList) {
    navigate("/404-not-found-page");
    return null;
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/95 backdrop-blur-md z-[1000000]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="min-h-screen w-full py-4 sm:py-8 px-2 sm:px-4 flex items-center justify-center">
        <div
          className="w-full max-w-[920px] bg-gradient-to-br from-[#141414] to-[#0f0f0f] backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl max-h-[85vh] flex flex-col mx-auto max-sm:max-h-[80vh] max-sm:w-[92%] max-sm:my-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative flex items-center justify-between p-4 sm:p-6 border-b border-white/10 flex-shrink-0 bg-gradient-to-r from-[#e91e63]/5 to-[#00bcd4]/5">
            {!loading && (
              <div className="flex items-center gap-3">
                <span className="w-1 h-8 bg-gradient-to-b from-[#e91e63] to-[#00bcd4] rounded-full"></span>
                <h2 className="text-lg sm:text-2xl font-bold text-white">
                  Characters & Voice Actors
                </h2>
              </div>
            )}
            <button
              onClick={onClose}
              className="absolute right-3 sm:right-5 top-3 sm:top-5 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white hover:rotate-90 transition-all duration-300"
            >
              <span className="text-xl sm:text-2xl leading-none">&times;</span>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-6 scrollbar-thin scrollbar-track-transparent scrollbar-track-rounded-xl scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20 scrollbar-thumb-rounded-xl">
            {loading ? (
              <VoiceActorlistLoader />
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {VoiceactorList.map((item, index) => (
                  <div
                    key={index}
                    className="relative group"
                  >
                    {/* Card Container */}
                    <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#141414] rounded-2xl p-4 border border-white/5 hover:border-[#e91e63]/30 transition-all duration-300 overflow-hidden">
                      {/* Decorative Background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#e91e63]/0 via-[#e91e63]/5 to-[#00bcd4]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Content Grid */}
                      <div className="relative z-10 grid grid-cols-2 gap-4">
                        {/* Character Section */}
                        <div className="flex items-center gap-4 group/char">
                          <div className="relative">
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#e91e63]/30 to-[#00bcd4]/30 rounded-2xl blur-xl opacity-0 group-hover/char:opacity-100 transition-opacity duration-300"></div>
                            {/* Avatar */}
                            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-white/10 group-hover/char:border-[#e91e63]/50 transition-all duration-300">
                              <img
                                src={item.character.poster}
                                alt={item.character.name}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                onError={(e) => {
                                  e.target.src = "https://i.postimg.cc/HnHKvHpz/no-avatar.jpg";
                                }}
                              />
                              {/* Overlay on hover */}
                              <div className="absolute inset-0 bg-gradient-to-t from-[#e91e63]/50 to-transparent opacity-0 group-hover/char:opacity-100 transition-opacity"></div>
                            </div>
                            {/* Character Badge */}
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-[#e91e63] to-[#00bcd4] flex items-center justify-center text-white text-xs font-bold shadow-lg">
                              C
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm sm:text-base font-bold text-white mb-1 line-clamp-2">
                              {item.character.name}
                            </h3>
                            {item.character.cast && (
                              <p className="text-xs text-white/50 font-medium px-2 py-0.5 bg-white/5 rounded-full inline-block">
                                {item.character.cast}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Voice Actors Section */}
                        {item.voiceActors && item.voiceActors.length > 0 && (
                          <div className="flex items-center justify-end">
                            {item.voiceActors.length > 1 ? (
                              <div className="flex flex-wrap items-center justify-end gap-2">
                                {item.voiceActors.map((actor, idx) => (
                                  <div
                                    key={idx}
                                    className="relative group/actor"
                                    title={actor.name}
                                  >
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#00bcd4]/30 to-[#e91e63]/30 rounded-xl blur-lg opacity-0 group-hover/actor:opacity-100 transition-opacity"></div>
                                    <div className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-white/10 group-hover/actor:border-[#00bcd4]/50 transition-all">
                                      <img
                                        src={actor.poster}
                                        alt={actor.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                          e.target.src = "https://i.postimg.cc/HnHKvHpz/no-avatar.jpg";
                                        }}
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="flex items-center gap-4 group/actor flex-row-reverse">
                                <div className="relative">
                                  <div className="absolute inset-0 bg-gradient-to-br from-[#00bcd4]/30 to-[#e91e63]/30 rounded-2xl blur-xl opacity-0 group-hover/actor:opacity-100 transition-opacity duration-300"></div>
                                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-white/10 group-hover/actor:border-[#00bcd4]/50 transition-all duration-300">
                                    <img
                                      src={item.voiceActors[0].poster}
                                      alt={item.voiceActors[0].name}
                                      className="w-full h-full object-cover"
                                      onError={(e) => {
                                        e.target.src = "https://i.postimg.cc/HnHKvHpz/no-avatar.jpg";
                                      }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#00bcd4]/50 to-transparent opacity-0 group-hover/actor:opacity-100 transition-opacity"></div>
                                  </div>
                                  <div className="absolute -bottom-2 -left-2 w-8 h-8 rounded-full bg-gradient-to-br from-[#00bcd4] to-[#e91e63] flex items-center justify-center text-white text-xs font-bold shadow-lg">
                                    VA
                                  </div>
                                </div>
                                <div className="flex-1 min-w-0 text-right">
                                  <h3 className="text-sm sm:text-base font-bold text-white mb-1 line-clamp-2">
                                    {item.voiceActors[0].name}
                                  </h3>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Connection Line */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-px h-12 bg-gradient-to-b from-[#e91e63] via-white/20 to-[#00bcd4] opacity-30 group-hover:opacity-60 transition-opacity"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="p-4 sm:p-6 border-t border-white/10 flex-shrink-0 bg-gradient-to-r from-[#e91e63]/5 to-[#00bcd4]/5">
            <PageSlider
              page={page}
              totalPages={totalPages}
              handlePageChange={setPage}
              start={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoiceactorList;

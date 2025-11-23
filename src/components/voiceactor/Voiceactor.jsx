import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import VoiceactorList from "../voiceactorlist/VoiceactorList";

function Voiceactor({ animeInfo, className }) {
  const [showVoiceActors, setShowVoiceActors] = useState(false);
  return (
    <div className={`w-full flex flex-col gap-y-6 ${className}`}>
      <div className="flex justify-between items-center px-4">
        <div className="flex items-center gap-3">
          <span className="w-1 h-8 bg-gradient-to-b from-[#e91e63] to-[#00bcd4] rounded-full"></span>
          <h1 className="font-bold text-3xl text-white max-[478px]:text-xl">
            Characters & Voice Actors
          </h1>
        </div>
        <button 
          onClick={() => setShowVoiceActors(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#e91e63]/20 to-[#00bcd4]/20 hover:from-[#e91e63]/30 hover:to-[#00bcd4]/30 border border-[#e91e63]/30 hover:border-[#e91e63]/50 transition-all duration-300 group"
        >
          <span className="text-white text-sm font-semibold">
            View All
          </span>
          <FaChevronRight className="text-white text-xs group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1 px-4">
        {animeInfo.charactersVoiceActors.slice(0, 6).map((character, index) => (
          <div
            key={index}
            className="relative flex justify-between items-center p-4 rounded-xl bg-gradient-to-br from-[#141414] to-[#0f0f0f] hover:from-[#1a1a1a] hover:to-[#141414] transition-all duration-300 border border-white/5 hover:border-[#e91e63]/30 shadow-lg hover:shadow-xl group overflow-hidden"
          >
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#e91e63]/0 via-[#e91e63]/5 to-[#00bcd4]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {character.character && (
              <div className="relative w-[50%] overflow-hidden max-[350px]:w-[45%] z-10">
                <div className="w-full flex gap-x-3 items-center">
                  {character.character.poster && (
                    <div className="relative group/img">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#e91e63]/20 to-[#00bcd4]/20 rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 blur-md"></div>
                      <img
                        src={character.character.poster}
                        title={character.character.name || "Character"}
                        alt={character.character.name || "Character"}
                        onError={(e) => {
                          e.target.src = "https://i.postimg.cc/HnHKvHpz/no-avatar.jpg";
                        }}
                        className="relative w-[56px] h-[56px] flex-shrink-0 rounded-full object-cover border-2 border-white/10 group-hover/img:border-[#e91e63]/50 transition-all duration-300 max-[480px]:w-[44px] max-[480px]:h-[44px] group-hover/img:scale-110"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="flex justify-center flex-col min-w-0">
                    {character.character.name && (
                      <p className="text-[14px] text-white font-semibold leading-snug mb-1 overflow-hidden line-clamp-2">
                        {character.character.name}
                      </p>
                    )}
                    {character.character.cast && (
                      <p className="text-[11px] text-white/50 font-medium">
                        {character.character.cast}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
            {character.voiceActors.length > 0 && character.voiceActors[0] && (
              <div className="relative w-[50%] overflow-hidden max-[350px]:w-[45%] z-10">
                <div className="w-full flex justify-end gap-x-3 items-center">
                  <div className="flex flex-col justify-center min-w-0">
                    {character.voiceActors[0].name && (
                      <p className="text-[14px] text-white/90 font-medium text-right leading-snug overflow-hidden line-clamp-2">
                        {character.voiceActors[0].name}
                      </p>
                    )}
                  </div>
                  {character.voiceActors[0].poster && (
                    <div className="relative group/img">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#00bcd4]/20 to-[#e91e63]/20 rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 blur-md"></div>
                      <img
                        src={character.voiceActors[0].poster}
                        title={character.voiceActors[0].name || "Voice Actor"}
                        alt={character.voiceActors[0].name || "Voice Actor"}
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = "https://i.postimg.cc/HnHKvHpz/no-avatar.jpg";
                        }}
                        className="relative w-[56px] h-[56px] rounded-full object-cover flex-shrink-0 transition-all duration-300 border-2 border-white/10 group-hover/img:border-[#00bcd4]/50 max-[480px]:w-[44px] max-[480px]:h-[44px] group-hover/img:scale-110"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {showVoiceActors && (
        <VoiceactorList
          id={animeInfo.id}
          isOpen={showVoiceActors}
          onClose={() => setShowVoiceActors(false)}
        />
      )}
    </div>
  );
}

export default Voiceactor;

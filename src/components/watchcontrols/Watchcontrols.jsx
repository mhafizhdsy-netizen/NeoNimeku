import { faBackward, faForward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const ToggleButton = ({ label, isActive, onClick }) => (
  <button 
    className="flex items-center text-xs px-3 py-1.5 rounded-xl transition-all duration-300 hover:bg-[#2a2a2a] border border-transparent hover:border-white/10" 
    onClick={onClick}
  >
    <span className="text-gray-300 font-medium">{label}</span>
    <span
      className={`ml-2 font-bold ${
        isActive ? "text-[#00bcd4]" : "text-gray-500"
      }`}
    >
      {isActive ? "ON" : "OFF"}
    </span>
  </button>
);

export default function WatchControls({
  autoPlay,
  setAutoPlay,
  autoSkipIntro,
  setAutoSkipIntro,
  autoNext,
  setAutoNext,
  episodeId,
  episodes = [],
  onButtonClick,
}) {
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(
    episodes?.findIndex(
      (episode) => episode.id.match(/ep=(\d+)/)?.[1] === episodeId
    )
  );

  useEffect(() => {
    if (episodes?.length > 0) {
      const newIndex = episodes.findIndex(
        (episode) => episode.id.match(/ep=(\d+)/)?.[1] === episodeId
      );
      setCurrentEpisodeIndex(newIndex);
    }
  }, [episodeId, episodes]);

  return (
    <div className="w-full flex justify-between items-center px-4 py-3 border-b border-gray-800/50 bg-gradient-to-r from-[#1a1a1a] to-[#0f0f0f]">
      <div className="flex gap-x-2">
        <ToggleButton
          label="Auto Play"
          isActive={autoPlay}
          onClick={() => setAutoPlay((prev) => !prev)}
        />
        <ToggleButton
          label="Skip Intro"
          isActive={autoSkipIntro}
          onClick={() => setAutoSkipIntro((prev) => !prev)}
        />
        <ToggleButton
          label="Auto Next"
          isActive={autoNext}
          onClick={() => setAutoNext((prev) => !prev)}
        />
      </div>
      <div className="flex items-center gap-x-2">
        <button
          onClick={() => {
            if (currentEpisodeIndex > 0) {
              onButtonClick(
                episodes[currentEpisodeIndex - 1].id.match(/ep=(\d+)/)?.[1]
              );
            }
          }}
          disabled={currentEpisodeIndex <= 0}
          className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-300 border ${
            currentEpisodeIndex <= 0 
              ? "text-gray-600 cursor-not-allowed border-transparent bg-[#1a1a1a]" 
              : "text-gray-300 hover:text-white border-white/10 hover:border-[#00bcd4]/50 hover:bg-[#2a2a2a]"
          }`}
        >
          <FontAwesomeIcon icon={faBackward} className="text-[14px]" />
        </button>
        <button
          onClick={() => {
            if (currentEpisodeIndex < episodes?.length - 1) {
              onButtonClick(
                episodes[currentEpisodeIndex + 1].id.match(/ep=(\d+)/)?.[1]
              );
            }
          }}
          disabled={currentEpisodeIndex >= episodes?.length - 1}
          className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-300 border ${
            currentEpisodeIndex >= episodes?.length - 1 
              ? "text-gray-600 cursor-not-allowed border-transparent bg-[#1a1a1a]" 
              : "text-gray-300 hover:text-white border-white/10 hover:border-[#00bcd4]/50 hover:bg-[#2a2a2a]"
          }`}
        >
          <FontAwesomeIcon icon={faForward} className="text-[14px]" />
        </button>
      </div>
    </div>
  );
}

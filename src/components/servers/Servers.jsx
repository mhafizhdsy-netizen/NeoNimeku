/* eslint-disable react/prop-types */
import {
  faClosedCaptioning,
  faFile,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BouncingLoader from "../ui/bouncingloader/Bouncingloader";
import "./Servers.css";
import { useEffect } from "react";

function Servers({
  servers,
  activeEpisodeNum,
  activeServerId,
  setActiveServerId,
  serverLoading,
  setActiveServerType,
  setActiveServerName,
}) {
  const subServers =
    servers?.filter((server) => server.type === "sub") || [];
  const dubServers =
    servers?.filter((server) => server.type === "dub") || [];
  const rawServers =
    servers?.filter((server) => server.type === "raw") || [];

  useEffect(() => {
    const savedServerName = localStorage.getItem("server_name");
    if (savedServerName) {
      const matchingServer = servers?.find(
        (server) => server.serverName === savedServerName,
      );

      if (matchingServer) {
        setActiveServerId(matchingServer.data_id);
        setActiveServerType(matchingServer.type);
      } else if (servers && servers.length > 0) {
        setActiveServerId(servers[0].data_id);
        setActiveServerType(servers[0].type);
      }
    } else if (servers && servers.length > 0) {
      setActiveServerId(servers[0].data_id);
      setActiveServerType(servers[0].type);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [servers]);

  const handleServerSelect = (server) => {
    setActiveServerId(server.data_id);
    setActiveServerType(server.type);
    setActiveServerName(server.serverName);
    localStorage.setItem("server_name", server.serverName);
    localStorage.setItem("server_type", server.type);
  };

  return (
    <div className="relative bg-[#111111] p-4 w-full min-h-[100px] flex justify-center items-center max-[1200px]:bg-[#151515] max-[600px]:p-2">
      {serverLoading ? (
        <div className="w-full h-full rounded-lg flex justify-center items-center max-[600px]:rounded-none">
          <BouncingLoader />
        </div>
      ) : servers ? (
        <div className="w-full h-full rounded-lg overflow-hidden max-[600px]:rounded-none">
          {/* Modern Info Banner */}
          <div className="w-full bg-gradient-to-r from-[#1a1a1a] via-[#252525] to-[#1a1a1a] border-b border-white/10 px-4 py-3 max-[600px]:px-3 max-[600px]:py-2">
            <div className="flex items-center justify-between gap-4 max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-2">
              {/* Episode Info */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-[#e91e63]/20 to-[#00bcd4]/20 border border-[#e91e63]/30 rounded-xl backdrop-blur-sm shadow-lg shadow-[#e91e63]/10">
                  <span className="text-[#e91e63] text-sm">▶</span>
                  <span className="text-white text-sm font-semibold">Episode {activeEpisodeNum}</span>
                </div>
                <div className="h-6 w-px bg-white/20 max-[600px]:hidden"></div>
                <span className="text-white/70 text-sm font-medium max-[600px]:hidden">Now Playing</span>
              </div>
              
              {/* Server Info */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10 max-[600px]:w-full max-[600px]:justify-center">
                <svg className="w-4 h-4 text-[#00bcd4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-white/60 text-xs font-medium">Server not working? Try another below</span>
              </div>
            </div>
          </div>
          
          {/* Servers Grid - Clean & Modern with Rounded Edges */}
          <div className="bg-gradient-to-b from-[#1a1a1a] to-[#151515] p-4 space-y-3 max-[600px]:p-3 max-[600px]:space-y-2">
            {rawServers.length > 0 && (
              <div className="server-section">
                <div className="flex items-center gap-2 mb-2 px-1">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 flex items-center justify-center">
                    <FontAwesomeIcon icon={faFile} className="text-purple-400 text-xs" />
                  </div>
                  <span className="text-white/90 text-sm font-semibold tracking-wide">RAW</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-purple-500/20 to-transparent"></div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {rawServers.map((item, index) => (
                    <button
                      key={index}
                      className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
                        activeServerId === item?.data_id
                          ? "bg-gradient-to-r from-[#e91e63] to-[#00bcd4] text-white shadow-lg shadow-[#e91e63]/30 scale-105"
                          : "bg-white/5 text-white/80 hover:bg-white/10 hover:text-white border border-white/10 hover:border-white/20"
                      }`}
                      onClick={() => handleServerSelect(item)}
                    >
                      {item.serverName}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {subServers.length > 0 && (
              <div className="server-section">
                <div className="flex items-center gap-2 mb-2 px-1">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30 flex items-center justify-center">
                    <FontAwesomeIcon icon={faClosedCaptioning} className="text-emerald-400 text-xs" />
                  </div>
                  <span className="text-white/90 text-sm font-semibold tracking-wide">SUBTITLE</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-emerald-500/20 to-transparent"></div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {subServers.map((item, index) => (
                    <button
                      key={index}
                      className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
                        activeServerId === item?.data_id
                          ? "bg-gradient-to-r from-[#e91e63] to-[#00bcd4] text-white shadow-lg shadow-[#e91e63]/30 scale-105"
                          : "bg-white/5 text-white/80 hover:bg-white/10 hover:text-white border border-white/10 hover:border-white/20"
                      }`}
                      onClick={() => handleServerSelect(item)}
                    >
                      {item.serverName}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {dubServers.length > 0 && (
              <div className="server-section">
                <div className="flex items-center gap-2 mb-2 px-1">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 flex items-center justify-center">
                    <FontAwesomeIcon icon={faMicrophone} className="text-orange-400 text-xs" />
                  </div>
                  <span className="text-white/90 text-sm font-semibold tracking-wide">DUBBED</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-orange-500/20 to-transparent"></div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {dubServers.map((item, index) => (
                    <button
                      key={index}
                      className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
                        activeServerId === item?.data_id
                          ? "bg-gradient-to-r from-[#e91e63] to-[#00bcd4] text-white shadow-lg shadow-[#e91e63]/30 scale-105"
                          : "bg-white/5 text-white/80 hover:bg-white/10 hover:text-white border border-white/10 hover:border-white/20"
                      }`}
                      onClick={() => handleServerSelect(item)}
                    >
                      {item.serverName}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center font-medium text-[15px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
          Could not load servers <br />
          Either reload or try again after sometime
        </p>
      )}
    </div>
  );
}

export default Servers;

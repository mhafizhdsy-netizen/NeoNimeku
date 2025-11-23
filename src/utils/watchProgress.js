/**
 * Utility functions untuk mengelola watch progress
 */

/**
 * Get last watched episode untuk anime tertentu dari continueWatching
 * @param {string} animeId - ID anime
 * @returns {object|null} - Episode terakhir yang ditonton atau null
 */
export const getLastWatchedEpisode = (animeId) => {
  try {
    const continueWatching = JSON.parse(localStorage.getItem("continueWatching")) || [];
    const entry = continueWatching.find((item) => item.id === animeId);
    return entry || null;
  } catch (error) {
    console.error("Error getting last watched episode:", error);
    return null;
  }
};

/**
 * Get watch progress percentage
 * @param {number} currentTime - Waktu saat ini (detik)
 * @param {number} duration - Total durasi (detik)
 * @returns {number} - Persentase progress (0-100)
 */
export const getWatchProgress = (currentTime, duration) => {
  if (!duration || duration === 0) return 0;
  return Math.min(Math.round((currentTime / duration) * 100), 100);
};

/**
 * Format waktu dari detik ke format MM:SS atau HH:MM:SS
 * @param {number} seconds - Waktu dalam detik
 * @returns {string} - Waktu terformat
 */
export const formatTime = (seconds) => {
  if (!seconds || seconds < 0) return "0:00";
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Check apakah episode sudah selesai ditonton (>90%)
 * @param {number} currentTime - Waktu saat ini (detik)
 * @param {number} duration - Total durasi (detik)
 * @returns {boolean} - True jika sudah selesai
 */
export const isEpisodeCompleted = (currentTime, duration) => {
  if (!duration || duration === 0) return false;
  return (currentTime / duration) >= 0.9;
};

/**
 * Update atau tambah entry ke continueWatching
 * @param {object} episodeData - Data episode yang akan disimpan
 * @returns {boolean} - True jika berhasil
 */
export const updateContinueWatching = (episodeData) => {
  try {
    const continueWatching = JSON.parse(localStorage.getItem("continueWatching")) || [];
    const existingIndex = continueWatching.findIndex((item) => item.data_id === episodeData.data_id);
    
    if (existingIndex !== -1) {
      // Update existing entry
      continueWatching[existingIndex] = {
        ...continueWatching[existingIndex],
        ...episodeData,
        updatedAt: new Date().toISOString()
      };
    } else {
      // Add new entry
      continueWatching.push({
        ...episodeData,
        addedAt: new Date().toISOString()
      });
    }
    
    localStorage.setItem("continueWatching", JSON.stringify(continueWatching));
    return true;
  } catch (error) {
    console.error("Error updating continue watching:", error);
    return false;
  }
};

/**
 * Update episode saat user pindah episode (tanpa leftAt)
 * Digunakan saat navigasi antar episode
 * @param {string} animeId - ID anime
 * @param {string} episodeId - ID episode baru
 * @param {number} episodeNum - Nomor episode baru
 * @param {object} animeInfo - Info anime (poster, title, dll)
 * @returns {boolean} - True jika berhasil
 */
export const updateCurrentEpisode = (animeId, episodeId, episodeNum, animeInfo = {}) => {
  try {
    const continueWatching = JSON.parse(localStorage.getItem("continueWatching")) || [];
    const existingIndex = continueWatching.findIndex((item) => item.data_id === animeInfo.data_id || item.id === animeId);
    
    const newEntry = {
      id: animeId,
      data_id: animeInfo.data_id || animeId,
      episodeId,
      episodeNum,
      leftAt: 0, // Reset durasi untuk episode baru
      poster: animeInfo.poster,
      title: animeInfo.title,
      japanese_title: animeInfo.japanese_title,
      adultContent: animeInfo.adultContent,
      updatedAt: new Date().toISOString()
    };
    
    if (existingIndex !== -1) {
      continueWatching[existingIndex] = newEntry;
    } else {
      continueWatching.push({
        ...newEntry,
        addedAt: new Date().toISOString()
      });
    }
    
    localStorage.setItem("continueWatching", JSON.stringify(continueWatching));
    console.log(`✅ Updated to Episode ${episodeNum}`);
    return true;
  } catch (error) {
    console.error("Error updating current episode:", error);
    return false;
  }
};

/**
 * Get semua anime yang ada di continueWatching
 * @returns {array} - Array of continue watching entries
 */
export const getAllContinueWatching = () => {
  try {
    return JSON.parse(localStorage.getItem("continueWatching")) || [];
  } catch (error) {
    console.error("Error getting continue watching:", error);
    return [];
  }
};

/**
 * Remove entry dari continueWatching
 * @param {string} episodeId - ID episode yang akan dihapus
 */
export const removeContinueWatching = (episodeId) => {
  try {
    const continueWatching = JSON.parse(localStorage.getItem("continueWatching")) || [];
    const updated = continueWatching.filter((item) => item.episodeId !== episodeId);
    localStorage.setItem("continueWatching", JSON.stringify(updated));
  } catch (error) {
    console.error("Error removing continue watching:", error);
  }
};

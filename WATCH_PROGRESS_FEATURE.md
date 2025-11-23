# Watch Progress Feature

## Overview
Sistem untuk menyimpan dan melanjutkan progress menonton anime dengan fitur:
- Menyimpan durasi terakhir yang ditonton
- Melanjutkan dari durasi terakhir saat play
- Menampilkan episode terakhir di watchlist
- Progress bar visual

## Fitur Utama

### 1. Continue Watching
- **Lokasi**: `src/components/continue/ContinueWatching.jsx`
- **Fungsi**: Menampilkan daftar anime yang sedang ditonton
- **Data disimpan**: 
  - `id`: ID anime
  - `data_id`: Data ID anime
  - `episodeId`: ID episode
  - `episodeNum`: Nomor episode
  - `leftAt`: Durasi terakhir (detik)
  - `poster`, `title`, `japanese_title`: Info anime

### 2. Player Auto-Resume
- **Lokasi**: `src/components/player/Player.jsx`
- **Fungsi**: 
  - Load durasi terakhir saat player ready
  - Simpan durasi saat player destroy
  - Update durasi setiap timeupdate
- **Kode**:
  ```javascript
  // Load dari localStorage
  const currentEntry = continueWatchingList.find((item) => item.episodeId === episodeId);
  if (currentEntry?.leftAt) art.currentTime = currentEntry.leftAt;
  
  // Simpan saat destroy
  localStorage.setItem("continueWatching", JSON.stringify(continueWatching));
  ```

### 3. Watchlist dengan Last Watched
- **Lokasi**: `src/pages/watchlist/Watchlist.jsx`
- **Fungsi**:
  - Menampilkan episode terakhir yang ditonton
  - Progress bar visual
  - Button "Continue Watching" ke episode terakhir
- **Fitur**:
  - Deteksi episode terakhir dari `continueWatching`
  - Format waktu (MM:SS atau HH:MM:SS)
  - Progress bar dengan gradient pink-cyan

### 4. Utility Functions
- **Lokasi**: `src/utils/watchProgress.js`
- **Functions**:
  - `getLastWatchedEpisode(animeId)` - Get episode terakhir
  - `formatTime(seconds)` - Format detik ke MM:SS
  - `getWatchProgress(currentTime, duration)` - Hitung persentase
  - `isEpisodeCompleted(currentTime, duration)` - Check jika selesai (>90%)
  - `updateContinueWatching(episodeData)` - Update localStorage dengan timestamp
  - `updateCurrentEpisode(animeId, episodeId, episodeNum, animeInfo)` - Update saat pindah episode (NEW!)
  - `getAllContinueWatching()` - Get semua data
  - `removeContinueWatching(episodeId)` - Hapus entry

## Data Structure

### localStorage: `continueWatching`
```json
[
  {
    "id": "anime-id",
    "data_id": "data-id",
    "episodeId": "episode-id",
    "episodeNum": 1,
    "leftAt": 120,
    "poster": "url",
    "title": "Anime Title",
    "japanese_title": "日本語タイトル",
    "adultContent": false
  }
]
```

## User Flow

### Menonton Episode
1. User play episode
2. Player load durasi terakhir dari `continueWatching`
3. Saat user pause/close, durasi disimpan
4. Episode muncul di "Continue Watching" section

### Pindah Episode (NEW!)
1. User klik episode lain di episode list
2. Player component re-mount dengan episodeId baru
3. System deteksi perubahan episode
4. Update `continueWatching` dengan episode baru (leftAt: 0)
5. Console log: "✅ Switched to Episode X"
6. Watchlist dan Continue Watching otomatis update

### Dari Watchlist
1. User buka Watchlist
2. System cek `continueWatching` untuk setiap anime
3. Tampilkan episode terakhir + progress bar
4. Button "Continue Watching" arahkan ke episode terakhir dengan durasi tersimpan

### Dari Continue Watching
1. User klik card di Continue Watching
2. Redirect ke player dengan episode dan durasi terakhir
3. Player auto-resume dari durasi tersimpan

## Visual Elements

### Watchlist Card
- **Last Watched Badge**: Menampilkan "EP X" episode terakhir
- **Progress Bar**: 
  - Gradient pink-cyan
  - Menampilkan waktu (MM:SS)
  - Width berdasarkan progress (jika ada durasi total)
- **Button**: 
  - "Continue Watching" jika ada progress
  - "Start Watching" jika belum ada progress

### Continue Watching Card
- **Enhanced Hover Effects**: Sama dengan CategoryCard
- **Play Button**: Gradient pink dengan glow
- **Corner Accents**: Border gradient di 4 sudut
- **Shimmer Effect**: Breathing border animation

## Technical Notes

### Performance
- Data disimpan di localStorage (client-side)
- Update hanya saat player destroy (tidak real-time)
- Efficient lookup dengan `findIndex`

### Edge Cases
- Jika episode tidak ada di `continueWatching`, fallback ke episode di watchlist
- Jika durasi < 0 atau invalid, set ke 0
- Format waktu handle hours jika > 3600 detik

### Future Improvements
- [ ] Sync dengan backend/database
- [ ] Progress percentage jika ada durasi total
- [ ] Mark as completed jika >90%
- [ ] Auto-remove dari Continue Watching jika completed
- [ ] Multi-device sync
- [ ] Watch history dengan timestamp

## Usage Example

```javascript
import { getLastWatchedEpisode, formatTime } from '@/src/utils/watchProgress';

// Get last watched episode
const lastEp = getLastWatchedEpisode('anime-123');
console.log(lastEp); // { episodeId: 'ep-5', episodeNum: 5, leftAt: 120, ... }

// Format time
const time = formatTime(125); // "2:05"
const longTime = formatTime(3665); // "1:01:05"
```

## Dependencies
- React (useState, useEffect)
- localStorage API
- Artplayer (untuk player)
- React Router (untuk navigation)

## Files Modified/Created
1. ✅ `src/utils/watchProgress.js` - NEW (with updateCurrentEpisode function)
2. ✅ `src/pages/watchlist/Watchlist.jsx` - UPDATED (episode tracking + clean UI)
3. ✅ `src/components/continue/ContinueWatching.jsx` - UPDATED (visual effects)
4. ✅ `src/components/player/Player.jsx` - UPDATED (auto-update on episode change)
5. ✅ `WATCH_PROGRESS_FEATURE.md` - NEW (this file)

## Changelog

### v1.1 - Episode Change Detection
- ✅ Auto-detect saat user pindah episode
- ✅ Update continueWatching dengan episode baru
- ✅ Reset leftAt ke 0 untuk episode baru
- ✅ Console log untuk debugging
- ✅ Timestamp (addedAt, updatedAt) untuk tracking

### v1.0 - Initial Release
- ✅ Save/load watch progress
- ✅ Continue watching section
- ✅ Watchlist integration
- ✅ Progress bar visualization

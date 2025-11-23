# 📥 Anime Download API - Suggestions & Implementation Guide

## 🎯 Recommended APIs for Anime Download with Quality Selection

### 1. **Consumet API** (Recommended) ⭐
**URL**: `https://github.com/consumet/api.consumet.org`

**Features:**
- Multiple quality options (360p, 480p, 720p, 1080p)
- Direct download links
- Support for multiple anime sources (GogoAnime, Zoro, etc.)
- Free and open-source

**Example Endpoint:**
```javascript
GET https://api.consumet.org/anime/gogoanime/watch/{episodeId}

Response:
{
  "headers": {...},
  "sources": [
    {
      "url": "https://...",
      "quality": "1080p",
      "isM3U8": false
    },
    {
      "url": "https://...",
      "quality": "720p",
      "isM3U8": false
    },
    {
      "url": "https://...",
      "quality": "480p",
      "isM3U8": false
    }
  ],
  "download": "https://..."
}
```

**Implementation:**
```javascript
const getDownloadLinks = async (episodeId) => {
  const response = await fetch(
    `https://api.consumet.org/anime/gogoanime/watch/${episodeId}`
  );
  const data = await response.json();
  
  return {
    qualities: data.sources.map(source => ({
      quality: source.quality,
      url: source.url,
      size: source.size || 'Unknown'
    })),
    downloadUrl: data.download
  };
};
```

---

### 2. **Anify API**
**URL**: `https://anify.tv/`

**Features:**
- Multiple quality streams
- Episode metadata
- Download links with quality selection

**Example:**
```javascript
GET https://api.anify.tv/sources?id={animeId}&episodeNumber={ep}

Response:
{
  "sources": [
    {
      "quality": "1080p",
      "url": "...",
      "type": "mp4"
    }
  ]
}
```

---

### 3. **Custom Implementation with HLS Downloader**

For M3U8/HLS streams, you can implement a custom downloader:

```javascript
// utils/downloadAnime.js
export const downloadHLS = async (m3u8Url, quality, animeTitle, episodeNum) => {
  // Option 1: Use ffmpeg.wasm (client-side)
  const ffmpeg = createFFmpeg({ log: true });
  await ffmpeg.load();
  
  // Download and convert
  await ffmpeg.run(
    '-i', m3u8Url,
    '-c', 'copy',
    '-bsf:a', 'aac_adtstoasc',
    `${animeTitle}_EP${episodeNum}_${quality}.mp4`
  );
  
  // Option 2: Server-side with Node.js
  // Use fluent-ffmpeg or similar
};
```

---

## 🛠️ Implementation in Your App

### Update DownloadButton Component:

```javascript
// src/components/download/DownloadButton.jsx
import { useState } from 'react';
import { Download, ChevronDown } from 'lucide-react';

export default function DownloadButton({ episodeId, animeTitle, episodeNum }) {
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [qualities, setQualities] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchQualities = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.consumet.org/anime/gogoanime/watch/${episodeId}`
      );
      const data = await response.json();
      setQualities(data.sources);
    } catch (error) {
      console.error('Failed to fetch qualities:', error);
    }
    setLoading(false);
  };

  const handleDownload = (quality, url) => {
    // Create download link
    const link = document.createElement('a');
    link.href = url;
    link.download = `${animeTitle}_EP${episodeNum}_${quality}.mp4`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative">
      <button
        onClick={() => {
          if (!showQualityMenu) fetchQualities();
          setShowQualityMenu(!showQualityMenu);
        }}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#e91e63] to-[#00bcd4] rounded-xl text-white font-semibold hover:shadow-lg transition-all"
      >
        <Download className="w-4 h-4" />
        <span>Download</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${showQualityMenu ? 'rotate-180' : ''}`} />
      </button>

      {/* Quality Selection Menu */}
      {showQualityMenu && (
        <div className="absolute top-full mt-2 right-0 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl min-w-[200px] z-50">
          <div className="p-2">
            <p className="text-xs text-white/50 px-3 py-2">Select Quality</p>
            {loading ? (
              <div className="px-3 py-4 text-center text-white/50">Loading...</div>
            ) : (
              qualities.map((source, index) => (
                <button
                  key={index}
                  onClick={() => handleDownload(source.quality, source.url)}
                  className="w-full flex items-center justify-between px-3 py-2 hover:bg-white/10 rounded-lg transition-all text-left"
                >
                  <span className="text-white font-medium">{source.quality}</span>
                  <span className="text-white/50 text-xs">{source.size || 'Unknown'}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
```

---

## 🔒 Important Notes:

1. **CORS Issues**: You may need a proxy server for API calls
2. **Rate Limiting**: Implement caching and rate limiting
3. **Legal**: Ensure compliance with copyright laws
4. **Server-side**: For production, implement download on server-side
5. **Progress**: Add download progress indicator for better UX

---

## 📦 Alternative: Server-Side Download Service

```javascript
// backend/routes/download.js
app.post('/api/download', async (req, res) => {
  const { episodeId, quality } = req.body;
  
  // Fetch stream URL
  const streamData = await getStreamUrl(episodeId);
  const selectedStream = streamData.sources.find(s => s.quality === quality);
  
  // Stream to client
  const response = await fetch(selectedStream.url);
  res.setHeader('Content-Disposition', `attachment; filename="episode.mp4"`);
  response.body.pipe(res);
});
```

---

## 🎨 UI Enhancement Suggestions:

1. **Quality Badge**: Show available qualities before clicking
2. **File Size**: Display estimated file size
3. **Download Progress**: Show progress bar
4. **Queue System**: Allow multiple downloads
5. **Format Selection**: MP4, MKV, etc.

---

## 📚 Resources:

- Consumet API Docs: https://docs.consumet.org/
- FFmpeg.wasm: https://github.com/ffmpegwasm/ffmpeg.wasm
- HLS Downloader: https://github.com/puemos/hls-downloader

---

**Note**: Always respect copyright laws and terms of service of the streaming platforms.

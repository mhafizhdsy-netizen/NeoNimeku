# NemoNime 🎬

Modern anime streaming platform built with React, Vite, and Tailwind CSS. Watch your favorite anime with a beautiful, responsive interface and powerful features.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mhafizhdsy-netizen/NemoNime)

## ✨ Features

### 🎥 Watch Experience
- **HD Streaming** - High-quality video playback with HLS support
- **Multiple Servers** - Backup options for uninterrupted viewing
- **Sub & Dub** - Watch in your preferred language
- **Auto Play** - Seamless episode transitions
- **Skip Intro/Outro** - Jump straight to the action
- **Continue Watching** - Resume where you left off
- **Picture-in-Picture** - Watch while browsing

### 📱 User Features
- **Watchlist** - Save anime to watch later
- **Push Notifications** - Get notified of new episodes
- **Language Toggle** - Switch between English and Japanese titles
- **Dark Mode** - Optimized for comfortable viewing
- **Responsive Design** - Perfect on any device
- **PWA Support** - Install as a native app

### 🔍 Content Discovery
- **Search** - Find anime by title with real-time suggestions
- **Trending** - See what's popular right now
- **Top 100** - Daily, weekly, and monthly rankings
- **Genres** - Browse by your favorite categories
- **A-Z List** - Alphabetical browsing
- **Random** - Discover something new
- **Schedule** - Track upcoming episode releases

### 📊 Information
- **Detailed Pages** - Complete anime information
- **Character Profiles** - Character and voice actor details
- **Studio Info** - Browse by production studio
- **Episode Schedule** - Know when new episodes air
- **Ratings** - MAL scores and community ratings

## 🚀 Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **React Router** - Navigation
- **Artplayer** - Video player
- **Axios** - HTTP client
- **HLS.js** - Video streaming
- **Swiper** - Touch slider
- **Vercel Analytics** - Performance monitoring

## 📦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/mhafizhdsy-netizen/NemoNime.git
cd NemoNime
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

Edit `.env` with your API configuration:
```env
VITE_API_URL=your_api_url
VITE_WORKER_URL=your_worker_url
```

4. Start development server
```bash
npm run dev
```

5. Open http://localhost:5173

### Build for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

## 🌐 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mhafizhdsy-netizen/NemoNime)

1. Click the button above
2. Connect your GitHub account
3. Configure environment variables
4. Deploy!

### Deploy to Other Platforms

The app can be deployed to any static hosting service:
- Netlify
- Cloudflare Pages
- GitHub Pages
- Railway
- Render

## 📁 Project Structure

```
NemoNime/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── ui/         # UI components
│   │   ├── Loader/     # Loading skeletons
│   │   ├── player/     # Video player
│   │   └── ...
│   ├── pages/          # Page components
│   ├── context/        # React context
│   ├── hooks/          # Custom hooks
│   ├── utils/          # Utility functions
│   ├── config/         # Configuration
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Entry point
├── .env.example        # Environment variables template
├── vite.config.js      # Vite configuration
└── tailwind.config.js  # Tailwind configuration
```

## 🎨 Features in Detail

### Progressive Web App (PWA)
Install NemoNime as a native app on your device for offline access and push notifications.

### Watch Progress Tracking
Your watch progress is automatically saved and synced across devices.

### Smart Search
Real-time search with suggestions as you type.

### Episode Schedule
Never miss a new episode with the built-in schedule tracker.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [ANIME API](https://github.com/itzzzme/anime-api) - For providing the anime data
- All contributors who have helped improve this project
- The anime community for their support

## 📧 Support

- **Website**: [NemoNime.vercel.app](https://NeoNime.vercel.app)
- **Issues**: [Report bugs](https://github.com/mhafizhdsy-netizen/NemoNime/issues)

---

Made with ❤️ by the NemoNime Team
# NeoNimeku

import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { HomeInfoProvider } from "./context/HomeInfoContext";
import { ToastProvider } from "./context/ToastContext";
import Home from "./pages/Home/Home";
import AnimeInfo from "./pages/animeInfo/AnimeInfo";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Error from "./components/error/Error";
import Category from "./pages/category/Category";
import AtoZ from "./pages/a2z/AtoZ";
import { azRoute, categoryRoutes } from "./utils/category.utils";
import "./App.css";
import Search from "./pages/search/Search";
import Watch from "./pages/watch/Watch";
import Producer from "./components/producer/Producer";
import AboutUs from "./pages/contact/Contact";
import FeedbackButton from "./components/feedback/FeedbackButton";
import Watchlist from "./pages/watchlist/Watchlist";
import SchedulePage from "./pages/schedule/SchedulePage";
import InstallPWA from "./components/InstallPWA/InstallPWA";

function App() {
  const location = useLocation();

  // Scroll to top on location change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <ToastProvider>
      <HomeInfoProvider>
        <div className="app-container px-4 lg:px-10">
          <main className="content max-w-[2048px] mx-auto w-full">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/:id" element={<AnimeInfo />} />
              <Route path="/watch/:id" element={<Watch />} />
              <Route path="/random" element={<AnimeInfo random={true} />} />
              <Route path="/404-not-found-page" element={<Error error="404" />} />
              <Route path="/error-page" element={<Error />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/schedule" element={<SchedulePage />} />
              {/* Render category routes */}
              {categoryRoutes.map((path) => (
                <Route
                  key={path}
                  path={`/${path}`}
                  element={
                    <Category path={path} label={path.split("-").join(" ")} />
                  }
                />
              ))}
              {/* Render A to Z routes */}
              {azRoute.map((path) => (
                <Route
                  key={path}
                  path={`/${path}`}
                  element={<AtoZ path={path} />}
                />
              ))}
              <Route path="/producer/:id" element={<Producer />} />
              <Route path="/search" element={<Search />} />
              {/* Catch-all route for 404 */}
              <Route path="*" element={<Error error="404" />} />
            </Routes>
            <Footer />
            <Analytics />
            <SpeedInsights />
            <FeedbackButton />
            <InstallPWA />
          </main>
        </div>
      </HomeInfoProvider>
    </ToastProvider>
  );
}

export default App;

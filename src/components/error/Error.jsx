import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Home, Search, RefreshCw } from "lucide-react";

function Error({ error }) {
    const navigate = useNavigate();
    
    const errorConfig = {
        "404": {
            title: "404 - Page Not Found",
            message: "Oops! The page you're looking for doesn't exist.",
            suggestions: "Try searching for anime or return to the homepage.",
        },
        "500": {
            title: "500 - Server Error",
            message: "Something went wrong on our end.",
            suggestions: "Please try again later or contact support if the issue persists.",
        },
        default: {
            title: "Error",
            message: "An unexpected error occurred.",
            suggestions: "Please try refreshing the page or return to the homepage.",
        }
    };

    const config = errorConfig[error] || errorConfig.default;

    return (
        <div className="w-full min-h-screen flex justify-center items-center px-4 pt-16">
            <div className="flex flex-col w-full max-w-2xl items-center justify-center text-center">
                {/* Error Image */}
                <div className="w-[300px] h-[300px] max-[500px]:w-[200px] max-[500px]:h-[200px] relative overflow-hidden rounded-2xl shadow-2xl mb-8">
                    <img 
                        src="https://64.media.tumblr.com/tumblr_lhnjv52vzw1qcrzkko1_500.gif" 
                        alt={config.title}
                        className="w-full h-full object-cover grayscale" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                        <span className="text-white font-bold text-4xl drop-shadow-lg">
                            {error || "Error"}
                        </span>
                    </div>
                </div>

                {/* Error Content */}
                <h1 className="font-bold text-white text-4xl md:text-5xl mb-4 tracking-tight">
                    {config.title}
                </h1>
                <p className="text-gray-400 text-lg md:text-xl mb-2 max-w-md">
                    {config.message}
                </p>
                <p className="text-gray-500 text-sm md:text-base mb-8 max-w-lg">
                    {config.suggestions}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <button 
                        onClick={() => navigate('/home')} 
                        className="group bg-brand-primary hover:bg-[#FF5252] transition-all duration-200 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                        aria-label="Go to homepage"
                    >
                        <Home className="w-5 h-5" />
                        <span className="text-base font-medium">Back to Homepage</span>
                    </button>
                    
                    <button 
                        onClick={() => navigate('/search')} 
                        className="group bg-white/10 hover:bg-white/20 transition-all duration-200 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-3 border border-white/20 hover:border-white/40 hover:scale-105 active:scale-95"
                        aria-label="Search anime"
                    >
                        <Search className="w-5 h-5" />
                        <span className="text-base font-medium">Search Anime</span>
                    </button>
                </div>

                {/* Retry Button for Server Errors */}
                {error === "500" && (
                    <button 
                        onClick={() => window.location.reload()} 
                        className="mt-4 text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm"
                        aria-label="Retry"
                    >
                        <RefreshCw className="w-4 h-4" />
                        <span>Try Again</span>
                    </button>
                )}
            </div>
        </div>
    );
}

export default Error;
import AnimeInfoLoader from "./AnimeInfo.loader";
import HomeLoader from "./Home.loader";
import CategoryLoader from "./Category.loader";
import AtoZLoader from "./AtoZ.loader";
import ProducerLoader from "./Producer.loader";
import WatchlistLoader from "./Watchlist.loader";
import ContactLoader from "./Contact.loader";
import ScheduleLoader from "./Schedule.loader";
import SearchLoader from "./Search.loader";
import WatchLoader from "./Watch.loader";

const Loader = ({ type }) => {
  switch (type) {
    case "home":
      return <HomeLoader />;
    case "animeInfo":
      return <AnimeInfoLoader />;
    case "category":
      return <CategoryLoader />;
    case "producer":
      return <ProducerLoader />;
    case "AtoZ":
      return <AtoZLoader />;
    case "watchlist":
      return <WatchlistLoader />;
    case "contact":
      return <ContactLoader />;
    case "schedule":
      return <ScheduleLoader />;
    case "search":
      return <SearchLoader />;
    case "watch":
      return <WatchLoader />;
    default:
      return <div className="loading-skeleton default-skeleton"></div>;
  }
};

export default Loader;

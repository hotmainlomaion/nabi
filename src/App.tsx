import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashPage from "./pages/SplashPage";
import LoginPage from "./pages/LoginPage";
import SelectArtistPage from "./pages/SelectArtistPage";
import FeedPage from "./pages/FeedPage";
import BookmarksPage from "./pages/BookmarksPage";
import SearchPage from "./pages/SearchPage";
import NotificationsPage from "./pages/NotificationsPage";
import ProfilePage from "./pages/ProfilePage";
import useThemeStore from "./stores/useThemeStore";

// ShopPage는 숨김 처리 (나중에 필요시 복원)
// import ShopPage from "./pages/ShopPage";

function App() {
  const { theme } = useThemeStore();

  return (
    <div className={theme === "light" ? "light-theme" : ""}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/select" element={<SelectArtistPage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/bookmarks" element={<BookmarksPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          {/* <Route path="/shop" element={<ShopPage />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
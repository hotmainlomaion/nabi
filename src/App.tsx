import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashPage from "./pages/SplashPage";
import LoginPage from "./pages/LoginPage";
import SelectArtistPage from "./pages/SelectArtistPage";
import FeedPage from "./pages/FeedPage";
import useThemeStore from "./stores/useThemeStore";

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
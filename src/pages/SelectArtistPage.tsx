import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import artists from "../data/artists";
import ArtistCard from "../components/ArtistCard";
import useArtistStore from "../stores/useArtistStore";
import useAuthStore from "../stores/useAuthStore";
import useThemeStore from "../stores/useThemeStore";
import ThemeToggle from "../components/ThemeToggle";

export default function SelectArtistPage() {
  const { t } = useTranslation();
  const { selectedArtists, toggleArtist, saveToFirestore } = useArtistStore();
  const { user } = useAuthStore();
  const { theme } = useThemeStore();
  const navigate = useNavigate();

  const isDark = theme === "dark";

  const handleContinue = async () => {
    if (user) {
      await saveToFirestore(user.uid);
    }
    navigate("/feed");
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDark ? "bg-black text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="px-5 pt-12 pb-4 flex items-start justify-between animate-fade-in-down">
        <div>
          <h1 className="text-2xl font-bold">{t("select.title")}</h1>
          <p className={`text-sm mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            {t("select.subtitle")}
          </p>
        </div>
        <ThemeToggle />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-28 scrollbar-hide">
        <div className="grid grid-cols-3 gap-3">
          {artists.map((artist, i) => (
            <ArtistCard
              key={artist.id}
              artist={artist}
              selected={selectedArtists.includes(artist.id)}
              onToggle={toggleArtist}
              index={i}
            />
          ))}
        </div>
      </div>

      <div
        className={`fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t ${
          isDark ? "from-black via-black/95 to-transparent" : "from-white via-white/95 to-transparent"
        }`}
      >
        <button
          disabled={selectedArtists.length === 0}
          onClick={handleContinue}
          className={`w-full py-4 rounded-2xl text-base font-bold transition-all duration-300 ${
            selectedArtists.length > 0
              ? "bg-purple-600 text-white active:scale-95 shadow-lg shadow-purple-500/20"
              : isDark
              ? "bg-gray-800 text-gray-600 cursor-not-allowed"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          {selectedArtists.length === 0
            ? t("select.button_empty")
            : t("select.button_active", { count: selectedArtists.length })}
        </button>
      </div>
    </div>
  );
}
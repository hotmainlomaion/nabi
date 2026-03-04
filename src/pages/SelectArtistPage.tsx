import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import artists from "../data/artists";
import ArtistCard from "../components/ArtistCard";
import useArtistStore from "../stores/useArtistStore";
import useAuthStore from "../stores/useAuthStore";
import useThemeStore from "../stores/useThemeStore";

export default function SelectArtistPage() {
  const { t } = useTranslation();
  const { selectedArtists, toggleArtist, saveToFirestore } = useArtistStore();
  const { user } = useAuthStore();
  const { theme } = useThemeStore();
  const navigate = useNavigate();
  const isDark = theme === "dark";

  const handleContinue = async () => {
    if (user) await saveToFirestore(user.uid);
    navigate("/feed");
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? "dark-vars bg-[#0A0A0F]" : "bg-white"}`}>
      {/* 헤더 */}
      <div className="px-6 pt-14 pb-4 animate-fade-in-down">
        <div className="flex justify-center mb-3">
          <span className="text-3xl">✦</span>
        </div>
        <h1 className={`text-2xl font-black text-center ${isDark ? "text-white" : "text-gray-900"}`}>
          Who do you stan?
        </h1>
        <p className={`text-sm text-center mt-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
          {t("select.subtitle")}
        </p>
      </div>

      {/* 아티스트 그리드 (2열) */}
      <div className="flex-1 overflow-y-auto px-5 pb-28 scrollbar-hide">
        <div className="grid grid-cols-2 gap-3">
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

      {/* Continue 버튼 */}
      <div className={`fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t ${isDark ? "from-[#0A0A0F] via-[#0A0A0F]/95 to-transparent" : "from-white via-white/95 to-transparent"}`}>
        <button
          disabled={selectedArtists.length === 0}
          onClick={handleContinue}
          className={`w-full py-4 rounded-full text-base font-bold transition-all duration-300 ${
            selectedArtists.length > 0
              ? "bg-[#E91E63] text-white active:scale-[0.97] shadow-lg shadow-pink-500/20"
              : isDark
              ? "bg-gray-800 text-gray-600 cursor-not-allowed"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
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
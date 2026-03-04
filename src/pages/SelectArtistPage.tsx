import { useNavigate } from "react-router-dom";
import artists from "../data/artists";
import ArtistCard from "../components/ArtistCard";
import useArtistStore from "../stores/useArtistStore";
import useAuthStore from "../stores/useAuthStore";
import useThemeStore from "../stores/useThemeStore";
import ThemeToggle from "../components/ThemeToggle";

export default function SelectArtistPage() {
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
      {/* 헤더 */}
      <div className="px-5 pt-12 pb-4 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Pick your artists 🦋</h1>
          <p className={`text-sm mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            Choose 1 or more to build your feed
          </p>
        </div>
        <ThemeToggle />
      </div>

      {/* 아티스트 그리드 */}
      <div className="flex-1 overflow-y-auto px-5 pb-28">
        <div className="grid grid-cols-3 gap-3">
          {artists.map((artist) => (
            <ArtistCard
              key={artist.id}
              artist={artist}
              selected={selectedArtists.includes(artist.id)}
              onToggle={toggleArtist}
            />
          ))}
        </div>
      </div>

      {/* 하단 버튼 */}
      <div
        className={`fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t ${
          isDark
            ? "from-black via-black/95 to-transparent"
            : "from-white via-white/95 to-transparent"
        }`}
      >
        <button
          disabled={selectedArtists.length === 0}
          onClick={handleContinue}
          className={`
            w-full py-4 rounded-2xl text-base font-bold transition-all
            ${
              selectedArtists.length > 0
                ? "bg-purple-600 text-white active:scale-95"
                : isDark
                ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }
          `}
        >
          {selectedArtists.length === 0
            ? "Select at least 1 artist"
            : `Continue with ${selectedArtists.length} artist${selectedArtists.length > 1 ? "s" : ""}`}
        </button>
      </div>
    </div>
  );
}
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { fetchNewsForArtists } from "../services/newsApi";
import artists from "../data/artists";
import FeedCard from "../components/FeedCard";
import useArtistStore from "../stores/useArtistStore";
import useAuthStore from "../stores/useAuthStore";
import useThemeStore from "../stores/useThemeStore";
import ThemeToggle from "../components/ThemeToggle";

export default function FeedPage() {
  const navigate = useNavigate();
  const { selectedArtists } = useArtistStore();
  const { user, clearUser } = useAuthStore();
  const { theme } = useThemeStore();

  const isDark = theme === "dark";

  const selectedArtistInfo = artists
    .filter((a) => selectedArtists.includes(a.id))
    .map((a) => ({ id: a.id, name: a.name }));

  const { data: newsItems, isLoading, isError, refetch } = useQuery({
    queryKey: ["news", selectedArtists],
    queryFn: () => fetchNewsForArtists(selectedArtistInfo),
    enabled: selectedArtists.length > 0,
    staleTime: 5 * 60 * 1000,
  });

  const handleLogout = async () => {
    await signOut(auth);
    clearUser();
    navigate("/");
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDark ? "bg-black text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* 헤더 */}
      <div
        className={`sticky top-0 z-10 backdrop-blur-sm px-5 py-4 flex items-center justify-between border-b ${
          isDark
            ? "bg-black/90 border-gray-800"
            : "bg-white/90 border-gray-200"
        }`}
      >
        <h1 className="text-xl font-bold">🦋 NABI</h1>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => navigate("/select")}
            className="text-xs text-purple-400 border border-purple-400/30 px-3 py-1.5 rounded-full"
          >
            Edit Artists
          </button>

          {user ? (
            <button onClick={handleLogout}>
              <img
                src={user.photoURL || ""}
                alt="profile"
                className="w-8 h-8 rounded-full border-2 border-purple-500"
              />
            </button>
          ) : (
            <button
              onClick={() => navigate("/")}
              className="text-xs text-gray-500"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* 새로고침 버튼 */}
      <div className="px-4 pt-3">
        <button
          onClick={() => refetch()}
          className={`text-xs px-3 py-1.5 rounded-full active:scale-95 transition-all border ${
            isDark
              ? "text-gray-500 border-gray-800"
              : "text-gray-500 border-gray-300"
          }`}
        >
          🔄 Refresh news
        </button>
      </div>

      {/* 피드 */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4 pb-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="text-4xl animate-spin">🦋</div>
            <p className="text-sm text-gray-400">Loading latest news...</p>
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <span className="text-4xl">⚠️</span>
            <p className="text-sm text-gray-400">
              Failed to load news. Please try again.
            </p>
            <button
              onClick={() => refetch()}
              className="text-xs text-purple-400 border border-purple-400/30 px-4 py-2 rounded-full"
            >
              Retry
            </button>
          </div>
        ) : newsItems && newsItems.length > 0 ? (
          newsItems.map((item) => (
            <FeedCard key={item.id} item={item} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-20">
            <span className="text-4xl mb-4">🔍</span>
            <p className="text-gray-400 text-sm">
              No news found for your selected artists.
            </p>
            <p className="text-gray-600 text-xs mt-1">
              Try adding more artists!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
import useBookmarkStore from "../stores/useBookmarkStore";
import useThemeStore from "../stores/useThemeStore";
import FeedCard from "../components/FeedCard";
import BottomNav from "../components/BottomNav";

export default function BookmarksPage() {
  const { bookmarks } = useBookmarkStore();
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDark ? "bg-black text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* 헤더 */}
      <div
        className={`sticky top-0 z-10 backdrop-blur-sm px-5 py-4 flex items-center justify-between border-b ${
          isDark ? "bg-black/90 border-gray-800" : "bg-white/90 border-gray-200"
        }`}
      >
        <h1 className="text-xl font-bold">🔖 Saved Articles</h1>
        <span className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>
          {bookmarks.length} saved
        </span>
      </div>

      {/* 북마크 목록 */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4 pb-24">
        {bookmarks.length > 0 ? (
          bookmarks.map((item) => (
            <FeedCard key={item.id} item={item} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-20">
            <span className="text-4xl mb-4">🔖</span>
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              No saved articles yet.
            </p>
            <p className={`text-xs mt-1 ${isDark ? "text-gray-600" : "text-gray-400"}`}>
              Tap the ☆ on any article to save it here!
            </p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
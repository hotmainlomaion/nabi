import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useBookmarkStore from "../stores/useBookmarkStore";
import useThemeStore from "../stores/useThemeStore";
import FeedCard from "../components/FeedCard";
import BottomNav from "../components/BottomNav";

export default function BookmarksPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { bookmarks } = useBookmarkStore();
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? "dark-vars bg-[#0A0A0F] text-white" : "bg-white text-gray-900"}`}>
      {/* 헤더 */}
      <div className={`sticky top-0 z-10 backdrop-blur-md px-5 pt-12 pb-4 border-b ${isDark ? "bg-[#0A0A0F]/95 border-[#1E1E2E]" : "bg-white/95 border-gray-100"}`}>
        <div className="flex items-center gap-2">
          <span className="text-[#E91E63]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#E91E63" stroke="#E91E63" strokeWidth="1.5">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </span>
          <h1 className="text-2xl font-black">Saved Stories</h1>
        </div>
      </div>

      {/* 목록 */}
      <div className="flex-1 overflow-y-auto pb-24 scrollbar-hide">
        {bookmarks.length > 0 ? (
          bookmarks.map((item, i) => <FeedCard key={item.id} item={item} index={i} />)
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-24 animate-fade-in-up">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${isDark ? "bg-[#111118]" : "bg-gray-100"}`}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={isDark ? "#4B5563" : "#D1D5DB"} strokeWidth="1.5">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <p className={`text-base font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
              No saved stories yet
            </p>
            <p className={`text-sm mb-5 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
              {t("bookmarks.empty_sub")}
            </p>
            <button
              onClick={() => navigate("/feed")}
              className="btn-pink text-sm px-6 py-3"
            >
              Browse News
            </button>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
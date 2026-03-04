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
    <div className={`min-h-screen flex flex-col ${isDark ? "dark-vars bg-[#0A0A0F] text-white" : "bg-[#FAFAFA] text-gray-900"}`}>
      {/* 헤더 */}
      <div className={`sticky top-0 z-10 backdrop-blur-md px-5 pt-14 pb-5 border-b ${isDark ? "bg-[#0A0A0F]/95 border-[#1E1E2E]" : "bg-white/95 border-gray-100"}`}>
        <div className="flex items-center gap-3">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#E91E63" stroke="#E91E63" strokeWidth="1.5">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
          <h1 className="text-[26px] font-black">Saved Stories</h1>
        </div>
      </div>

      {/* 목록 */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-28 flex flex-col gap-4 scrollbar-hide">
        {bookmarks.length > 0 ? (
          bookmarks.map((item, i) => <FeedCard key={item.id} item={item} index={i} />)
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-28 animate-fade-in-up">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-5 ${isDark ? "bg-[#111118]" : "bg-gray-100"}`}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={isDark ? "#4B5563" : "#D1D5DB"} strokeWidth="1.5">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <p className={`text-[17px] font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>No saved stories yet</p>
            <p className={`text-[14px] mb-6 leading-relaxed ${isDark ? "text-gray-500" : "text-gray-400"}`}>
              Tap the bookmark icon on any article<br />to save it for later reading.
            </p>
            <button onClick={() => navigate("/feed")} className="bg-gray-900 text-white text-[14px] font-bold px-8 py-3.5 rounded-full active:scale-95 transition-all">
              Browse News
            </button>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
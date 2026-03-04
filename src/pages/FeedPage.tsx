import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { fetchNewsForArtists } from "../services/newsApi";
import artists from "../data/artists";
import adData from "../data/adData";
import FeedCard from "../components/FeedCard";
import AdBanner from "../components/AdBanner";
import BottomNav from "../components/BottomNav";
import useArtistStore from "../stores/useArtistStore";
import useAuthStore from "../stores/useAuthStore";
import useThemeStore from "../stores/useThemeStore";

export default function FeedPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { selectedArtists } = useArtistStore();
  const { user } = useAuthStore();
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  const selectedArtistInfo = artists
    .filter((a) => selectedArtists.includes(a.id))
    .map((a) => ({ id: a.id, name: a.name, emoji: a.emoji }));

  const { data: newsItems, isLoading, isError, refetch } = useQuery({
    queryKey: ["news", selectedArtists],
    queryFn: () => fetchNewsForArtists(selectedArtistInfo),
    enabled: selectedArtists.length > 0,
    staleTime: 5 * 60 * 1000,
  });

  const buildFeedWithAds = () => {
    if (!newsItems || newsItems.length === 0) return [];
    const feed: { type: "news" | "ad"; data: any }[] = [];
    let adIndex = 0;
    newsItems.forEach((item, i) => {
      feed.push({ type: "news", data: item });
      if ((i + 1) % 4 === 0 && adIndex < adData.length) {
        feed.push({ type: "ad", data: adData[adIndex] });
        adIndex++;
      }
    });
    return feed;
  };

  const feedWithAds = buildFeedWithAds();

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? "dark-vars bg-[#0A0A0F] text-white" : "bg-[#FAFAFA] text-gray-900"}`}>
      {/* 헤더 */}
      <div className={`sticky top-0 z-10 backdrop-blur-md border-b ${isDark ? "bg-[#0A0A0F]/95 border-[#1E1E2E]" : "bg-white/95 border-gray-100"}`}>
        {/* 상단 바 */}
        <div className="px-5 pt-5 pb-3 flex items-center justify-between animate-fade-in-down">
          <h1 className="text-[22px] font-black tracking-tight">NABI</h1>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/search")} className={isDark ? "text-gray-400" : "text-gray-500"}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
            <button onClick={() => navigate("/notifications")} className={isDark ? "text-gray-400" : "text-gray-500"}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </button>
            {user && (
              <button onClick={() => navigate("/profile")} className="active:scale-90 transition-transform">
                <img src={user.photoURL || ""} alt="" className="w-9 h-9 rounded-full border-2 border-[#E91E63]" />
              </button>
            )}
          </div>
        </div>

        {/* 아티스트 칩 — 크기 키움 */}
        <div className="px-4 pb-4 flex gap-4 overflow-x-auto scrollbar-hide">
          <button onClick={() => refetch()} className="flex flex-col items-center gap-2 flex-shrink-0">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#E91E63] to-[#9C27B0] flex items-center justify-center shadow-md shadow-pink-500/15">
              <span className="text-white text-xl">🦋</span>
            </div>
            <span className={`text-[11px] font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>My Feed</span>
          </button>
          {selectedArtistInfo.map((a) => (
            <div key={a.id} className="flex flex-col items-center gap-2 flex-shrink-0">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl border-2 ${isDark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"}`}>
                {a.emoji}
              </div>
              <span className={`text-[11px] max-w-[56px] truncate ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                {a.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 섹션 헤더 */}
      <div className="px-5 pt-5 pb-3 flex items-center justify-between">
        <h2 className={`text-[17px] font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Your Feed</h2>
        <button onClick={() => refetch()} className="text-[13px] text-[#E91E63] font-semibold">View all</button>
      </div>

      {/* 피드 */}
      <div className="flex-1 overflow-y-auto px-4 pb-28 flex flex-col gap-4 scrollbar-hide">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="text-5xl animate-float">🦋</div>
            <p className={`text-sm animate-pulse ${isDark ? "text-gray-500" : "text-gray-400"}`}>{t("feed.loading")}</p>
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 animate-fade-in-up">
            <span className="text-5xl">⚠️</span>
            <p className={`text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}>{t("feed.error")}</p>
            <button onClick={() => refetch()} className="btn-pink text-sm px-6 py-2.5">{t("feed.retry")}</button>
          </div>
        ) : feedWithAds.length > 0 ? (
          feedWithAds.map((entry, i) =>
            entry.type === "ad" ? (
              <div key={`ad-${entry.data.id}`} className="card-enter" style={{ animationDelay: `${i * 0.06}s` }}>
                <AdBanner ad={entry.data} />
              </div>
            ) : (
              <FeedCard key={entry.data.id} item={entry.data} index={i} />
            )
          )
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-24 animate-fade-in-up">
            <span className="text-5xl mb-5">🔍</span>
            <p className={`text-[15px] font-semibold ${isDark ? "text-gray-300" : "text-gray-600"}`}>{t("feed.empty_title")}</p>
            <p className={`text-sm mt-1 ${isDark ? "text-gray-600" : "text-gray-400"}`}>{t("feed.empty_sub")}</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
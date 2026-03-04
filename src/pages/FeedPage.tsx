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
    <div className={`min-h-screen flex flex-col ${isDark ? "dark-vars bg-[#0A0A0F] text-white" : "bg-white text-gray-900"}`}>
      {/* 헤더 */}
      <div className={`sticky top-0 z-10 backdrop-blur-md border-b ${isDark ? "bg-[#0A0A0F]/95 border-[#1E1E2E]" : "bg-white/95 border-gray-100"}`}>
        <div className="px-5 py-4 flex items-center justify-between animate-fade-in-down">
          <h1 className="text-xl font-black tracking-tight">NABI</h1>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/search")} className={`${isDark ? "text-gray-400" : "text-gray-500"}`}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
            <button onClick={() => navigate("/notifications")} className={`${isDark ? "text-gray-400" : "text-gray-500"}`}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </button>
            {user && (
              <button onClick={() => navigate("/profile")} className="active:scale-90 transition-transform">
                <img src={user.photoURL || ""} alt="" className="w-8 h-8 rounded-full border-2 border-[#E91E63]" />
              </button>
            )}
          </div>
        </div>

        {/* 아티스트 가로 칩 */}
        <div className="px-4 pb-3 flex gap-3 overflow-x-auto scrollbar-hide">
          {/* My Feed 칩 */}
          <button
            onClick={() => refetch()}
            className="flex flex-col items-center gap-1.5 flex-shrink-0"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E91E63] to-[#9C27B0] flex items-center justify-center">
              <span className="text-white text-lg">🦋</span>
            </div>
            <span className={`text-[10px] font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>My Feed</span>
          </button>

          {selectedArtistInfo.map((a) => (
            <div key={a.id} className="flex flex-col items-center gap-1.5 flex-shrink-0">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${isDark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"}`}>
                <span className="text-lg">{a.emoji}</span>
              </div>
              <span className={`text-[10px] max-w-[48px] truncate ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                {a.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 섹션 헤더 */}
      <div className="px-5 pt-4 pb-2 flex items-center justify-between">
        <h2 className={`text-base font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Your Feed</h2>
        <button onClick={() => refetch()} className="text-xs text-[#E91E63] font-semibold">
          View all
        </button>
      </div>

      {/* 피드 */}
      <div className="flex-1 overflow-y-auto pb-24 scrollbar-hide">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="text-4xl animate-float">🦋</div>
            <p className={`text-sm animate-pulse ${isDark ? "text-gray-500" : "text-gray-400"}`}>{t("feed.loading")}</p>
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 animate-fade-in-up">
            <span className="text-4xl">⚠️</span>
            <p className={`text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}>{t("feed.error")}</p>
            <button onClick={() => refetch()} className="btn-pink text-xs px-5 py-2">{t("feed.retry")}</button>
          </div>
        ) : feedWithAds.length > 0 ? (
          feedWithAds.map((entry, i) =>
            entry.type === "ad" ? (
              <div key={`ad-${entry.data.id}`} className="px-4 py-2 card-enter" style={{ animationDelay: `${i * 0.06}s` }}>
                <AdBanner ad={entry.data} />
              </div>
            ) : (
              <FeedCard key={entry.data.id} item={entry.data} index={i} />
            )
          )
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-20 animate-fade-in-up">
            <span className="text-4xl mb-4">🔍</span>
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{t("feed.empty_title")}</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
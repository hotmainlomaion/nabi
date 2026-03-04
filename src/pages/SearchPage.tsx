import { useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchNewsForArtists } from "../services/newsApi";
import artists from "../data/artists";
import FeedCard from "../components/FeedCard";
import BottomNav from "../components/BottomNav";
import useThemeStore from "../stores/useThemeStore";

export default function SearchPage() {
  const { t } = useTranslation();
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const trending = [
    "#BTS_Comeback", "#NewJeans_Paris", "#LISA_1Billion",
    "#StrayKids_Tour", "#MAMA2026", "#Inkigayo",
  ];

  const handleSearch = async (q?: string) => {
    const searchQ = q || query;
    if (!searchQ.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const cleaned = searchQ.replace("#", "").replace(/_/g, " ");
      const matched = artists.find((a) => a.name.toLowerCase().includes(cleaned.toLowerCase()));
      const news = matched
        ? await fetchNewsForArtists([{ id: matched.id, name: matched.name }])
        : await fetchNewsForArtists([{ id: "search", name: cleaned }]);
      setResults(news);
    } catch { setResults([]); }
    setLoading(false);
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? "dark-vars bg-[#0A0A0F] text-white" : "bg-white text-gray-900"}`}>
      {/* 헤더 */}
      <div className={`sticky top-0 z-10 backdrop-blur-md border-b px-5 pt-12 pb-4 ${isDark ? "bg-[#0A0A0F]/95 border-[#1E1E2E]" : "bg-white/95 border-gray-100"}`}>
        <h1 className="text-2xl font-black mb-4">Discover</h1>

        {/* 검색바 */}
        <div className={`flex items-center gap-2 px-4 py-3 rounded-full ${isDark ? "bg-[#111118]" : "bg-gray-100"}`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isDark ? "#6B7280" : "#9CA3AF"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder={t("search.placeholder")}
            className={`flex-1 text-sm bg-transparent outline-none ${isDark ? "text-white placeholder-gray-600" : "text-gray-900 placeholder-gray-400"}`}
          />
          {query && (
            <button onClick={() => { setQuery(""); setResults([]); setSearched(false); }} className="text-gray-400 text-sm">✕</button>
          )}
        </div>
      </div>

      {/* 콘텐츠 */}
      <div className="flex-1 overflow-y-auto pb-24 scrollbar-hide">
        {!searched ? (
          <div className="px-5 pt-5">
            {/* 트렌딩 */}
            <h3 className={`text-sm font-bold mb-3 flex items-center gap-2 ${isDark ? "text-white" : "text-gray-900"}`}>
              <span className="text-[#E91E63]">📈</span> {t("search.trending")}
            </h3>
            <div className="flex flex-wrap gap-2 mb-8">
              {trending.map((tag) => (
                <button
                  key={tag}
                  onClick={() => { setQuery(tag); handleSearch(tag); }}
                  className={`text-xs px-4 py-2 rounded-full transition-all active:scale-95 ${isDark ? "bg-[#111118] text-gray-300 border border-[#1E1E2E]" : "bg-gray-100 text-gray-700"}`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Suggested Artists */}
            <h3 className={`text-sm font-bold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
              Suggested Artists
            </h3>
            <div className="flex flex-col">
              {artists.map((artist) => (
                <button
                  key={artist.id}
                  onClick={() => { setQuery(artist.name); handleSearch(artist.name); }}
                  className={`flex items-center gap-4 py-3.5 border-b transition-all active:opacity-70 ${isDark ? "border-[#1E1E2E]" : "border-gray-100"}`}
                >
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center text-xl ${isDark ? "bg-gray-800" : "bg-gray-50"}`}>
                    {artist.emoji}
                  </div>
                  <div className="flex-1 text-left">
                    <p className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{artist.name}</p>
                    <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>{artist.group}</p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={isDark ? "#4B5563" : "#D1D5DB"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        ) : loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="text-4xl animate-float">🦋</div>
            <p className={`text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}>{t("search.searching")}</p>
          </div>
        ) : results.length > 0 ? (
          <div>
            <p className={`px-5 py-3 text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>
              {t("search.results", { count: results.length, query })}
            </p>
            {results.map((item, i) => <FeedCard key={item.id} item={item} index={i} />)}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-20 animate-fade-in-up">
            <span className="text-4xl mb-4">🔍</span>
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{t("search.no_results", { query })}</p>
            <p className={`text-xs mt-1 ${isDark ? "text-gray-600" : "text-gray-400"}`}>{t("search.try_again")}</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
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

  // 인기 검색어 (빠른 탭)
  const trending = [
    { label: "BTS", emoji: "💜" },
    { label: "BLACKPINK", emoji: "🖤" },
    { label: "NewJeans", emoji: "🐰" },
    { label: "aespa", emoji: "🪐" },
    { label: "Stray Kids", emoji: "🧭" },
    { label: "LE SSERAFIM", emoji: "🔥" },
    { label: "comeback", emoji: "🎵" },
    { label: "concert", emoji: "🎫" },
    { label: "world tour", emoji: "🌍" },
    { label: "album", emoji: "💿" },
  ];

  const handleSearch = async (searchQuery?: string) => {
    const q = searchQuery || query;
    if (!q.trim()) return;

    setLoading(true);
    setSearched(true);

    try {
      // 아티스트 이름과 매칭 확인
      const matchedArtist = artists.find(
        (a) => a.name.toLowerCase().includes(q.toLowerCase())
      );

      if (matchedArtist) {
        // 아티스트 검색: 해당 아티스트의 뉴스 가져오기
        const news = await fetchNewsForArtists([
          { id: matchedArtist.id, name: matchedArtist.name },
        ]);
        setResults(news);
      } else {
        // 키워드 검색: 일반 K-POP 뉴스에서 검색
        const news = await fetchNewsForArtists([
          { id: "search", name: q },
        ]);
        setResults(news);
      }
    } catch (err) {
      console.error("Search failed:", err);
      setResults([]);
    }

    setLoading(false);
  };

  const handleTrendingClick = (label: string) => {
    setQuery(label);
    handleSearch(label);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDark ? "bg-black text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* 헤더 & 검색바 */}
      <div
        className={`sticky top-0 z-10 backdrop-blur-sm border-b px-4 pt-4 pb-3 ${
          isDark ? "bg-black/90 border-gray-800" : "bg-white/90 border-gray-200"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`flex-1 flex items-center gap-2 px-4 py-2.5 rounded-2xl ${
              isDark ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <span className="text-gray-500">🔍</span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t("search.placeholder")}
              className={`flex-1 text-sm bg-transparent outline-none ${
                isDark
                  ? "text-white placeholder-gray-500"
                  : "text-gray-900 placeholder-gray-400"
              }`}
            />
            {query && (
              <button
                onClick={() => {
                  setQuery("");
                  setResults([]);
                  setSearched(false);
                }}
                className="text-gray-500 text-xs"
              >
                ✕
              </button>
            )}
          </div>
          <button
            onClick={() => handleSearch()}
            className="text-sm font-bold text-purple-400 px-3 py-2.5 active:scale-95 transition-all"
          >
            {t("search.button")}
          </button>
        </div>
      </div>

      {/* 콘텐츠 */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-24">
        {!searched ? (
          // 검색 전: 트렌딩 키워드
          <div>
            <h3
              className={`text-sm font-bold mb-3 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              🔥 {t("search.trending")}
            </h3>
            <div className="flex flex-wrap gap-2">
              {trending.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleTrendingClick(item.label)}
                  className={`text-xs px-3 py-2 rounded-full active:scale-95 transition-all ${
                    isDark
                      ? "bg-gray-800 text-gray-300"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {item.emoji} {item.label}
                </button>
              ))}
            </div>

            {/* 아티스트 바로가기 */}
            <h3
              className={`text-sm font-bold mt-6 mb-3 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              🎤 {t("search.browse_artists")}
            </h3>
            <div className="grid grid-cols-4 gap-3">
              {artists.map((artist) => (
                <button
                  key={artist.id}
                  onClick={() => handleTrendingClick(artist.name)}
                  className={`flex flex-col items-center gap-1 py-3 rounded-2xl active:scale-95 transition-all ${
                    isDark ? "bg-gray-900/70" : "bg-white shadow-sm"
                  }`}
                >
                  <span className="text-2xl">{artist.emoji}</span>
                  <span
                    className={`text-[10px] font-bold ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {artist.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : loading ? (
          // 로딩
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="text-4xl animate-spin">🦋</div>
            <p className="text-sm text-gray-400">{t("search.searching")}</p>
          </div>
        ) : results.length > 0 ? (
          // 결과
          <div>
            <p
              className={`text-xs mb-4 ${
                isDark ? "text-gray-500" : "text-gray-400"
              }`}
            >
              {t("search.results", { count: results.length, query })}
            </p>
            <div className="flex flex-col gap-4">
              {results.map((item) => (
                <FeedCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        ) : (
          // 결과 없음
          <div className="flex flex-col items-center justify-center text-center py-20">
            <span className="text-4xl mb-4">🔍</span>
            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {t("search.no_results", { query })}
            </p>
            <p
              className={`text-xs mt-1 ${
                isDark ? "text-gray-600" : "text-gray-400"
              }`}
            >
              {t("search.try_again")}
            </p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
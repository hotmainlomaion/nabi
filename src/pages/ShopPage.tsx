import { useState } from "react";
import shopData, { categoryLabels } from "../data/shopData";
import ShopCard from "../components/ShopCard";
import BottomNav from "../components/BottomNav";
import useArtistStore from "../stores/useArtistStore";
import useThemeStore from "../stores/useThemeStore";

export default function ShopPage() {
  const { selectedArtists } = useArtistStore();
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  const [activeCategory, setActiveCategory] = useState<string>("all");

  const artistFiltered = shopData.filter((item) =>
    selectedArtists.includes(item.artistId)
  );

  const filteredItems =
    activeCategory === "all"
      ? artistFiltered
      : artistFiltered.filter((item) => item.category === activeCategory);

  const availableCategories = [
    ...new Set(artistFiltered.map((item) => item.category)),
  ];

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDark ? "bg-black text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* 헤더 */}
      <div
        className={`sticky top-0 z-10 backdrop-blur-sm border-b ${
          isDark ? "bg-black/90 border-gray-800" : "bg-white/90 border-gray-200"
        }`}
      >
        <div className="px-5 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">🛍️ NABI Shop</h1>
          <span className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>
            {filteredItems.length} items
          </span>
        </div>

        {/* 카테고리 필터 */}
        <div className="px-5 pb-3 flex gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveCategory("all")}
            className={`text-xs px-3 py-1.5 rounded-full whitespace-nowrap transition-all ${
              activeCategory === "all"
                ? "bg-purple-600 text-white"
                : isDark
                ? "bg-gray-800 text-gray-400"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            All
          </button>
          {availableCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs px-3 py-1.5 rounded-full whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? "bg-purple-600 text-white"
                  : isDark
                  ? "bg-gray-800 text-gray-400"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {categoryLabels[cat]?.emoji} {categoryLabels[cat]?.label}
            </button>
          ))}
        </div>
      </div>

      {/* 굿즈 그리드 */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-24">
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {filteredItems.map((item) => (
              <ShopCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-20">
            <span className="text-4xl mb-4">🛍️</span>
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              No items available for your selected artists yet.
            </p>
            <p className={`text-xs mt-1 ${isDark ? "text-gray-600" : "text-gray-400"}`}>
              Try adding more artists!
            </p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
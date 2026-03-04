import type { ShopItem } from "../data/shopData";
import useThemeStore from "../stores/useThemeStore";

interface Props {
  item: ShopItem;
}

export default function ShopCard({ item }: Props) {
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  return (
    <div
      onClick={() => window.open(item.shopUrl, "_blank")}
      className={`rounded-2xl overflow-hidden border cursor-pointer active:scale-[0.97] transition-all ${
        isDark ? "bg-gray-900/70 border-gray-800" : "bg-white border-gray-200 shadow-sm"
      }`}
    >
      {/* 이미지 */}
      <div className="relative">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full aspect-square object-cover"
        />
        {item.badge && (
          <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-600 text-white">
            {item.badge}
          </span>
        )}
      </div>

      {/* 정보 */}
      <div className="p-3 flex flex-col gap-1">
        <span className="text-[10px] text-purple-400 font-bold">
          {item.artistName}
        </span>
        <h3
          className={`text-xs font-bold leading-snug line-clamp-2 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          {item.name}
        </h3>
        <span
          className={`text-sm font-bold mt-1 ${
            isDark ? "text-green-400" : "text-green-600"
          }`}
        >
          {item.price}
        </span>
      </div>
    </div>
  );
}
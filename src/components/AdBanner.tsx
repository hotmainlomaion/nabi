import type { AdItem } from "../data/adData";
import useThemeStore from "../stores/useThemeStore";

interface Props {
  ad: AdItem;
}

export default function AdBanner({ ad }: Props) {
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  const handleClick = () => {
    window.open(ad.linkUrl, "_blank");
  };

  if (ad.type === "banner") {
    return (
      <div
        onClick={handleClick}
        className={`rounded-2xl overflow-hidden border cursor-pointer active:scale-[0.98] transition-transform ${
          isDark ? "border-purple-900/50" : "border-purple-200"
        }`}
      >
        <img
          src={ad.imageUrl}
          alt={ad.title}
          className="w-full h-24 object-cover"
        />
        <div
          className={`px-3 py-2 flex items-center justify-between ${
            isDark ? "bg-purple-950/30" : "bg-purple-50"
          }`}
        >
          <div className="flex items-center gap-2">
            <span
              className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                isDark
                  ? "bg-purple-800/50 text-purple-300"
                  : "bg-purple-200 text-purple-700"
              }`}
            >
              AD
            </span>
            <span
              className={`text-[10px] ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Sponsored by {ad.sponsor}
            </span>
          </div>
          <span className="text-[10px] font-bold text-purple-400">
            {ad.tag} →
          </span>
        </div>
      </div>
    );
  }

  // card 타입
  return (
    <div
      onClick={handleClick}
      className={`rounded-2xl overflow-hidden border cursor-pointer active:scale-[0.98] transition-transform ${
        isDark ? "border-purple-900/50" : "border-purple-200"
      }`}
    >
      <img
        src={ad.imageUrl}
        alt={ad.title}
        className="w-full h-40 object-cover"
      />
      <div
        className={`p-4 flex flex-col gap-1.5 ${
          isDark ? "bg-purple-950/20" : "bg-purple-50"
        }`}
      >
        <div className="flex items-center gap-2">
          <span
            className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
              isDark
                ? "bg-purple-800/50 text-purple-300"
                : "bg-purple-200 text-purple-700"
            }`}
          >
            AD
          </span>
          <span
            className={`text-[10px] ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Sponsored by {ad.sponsor}
          </span>
        </div>
        <h3
          className={`text-sm font-bold ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          {ad.title}
        </h3>
        <p
          className={`text-xs ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {ad.description}
        </p>
        <span className="text-xs font-bold text-purple-400 mt-1">
          {ad.tag} →
        </span>
      </div>
    </div>
  );
}
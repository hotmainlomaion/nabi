import { getSourceLabel } from "../utils/sourceIcon";
import useThemeStore from "../stores/useThemeStore";

interface Props {
  item: {
    id: string;
    artistName: string;
    source: string;
    title: string;
    summary: string;
    timeAgo: string;
    imageUrl?: string;
    url?: string;
  };
}

export default function FeedCard({ item }: Props) {
  const source = getSourceLabel(item.source);
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  const handleClick = () => {
    if (item.url) {
      window.open(item.url, "_blank");
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`rounded-2xl overflow-hidden border ${
        item.url ? "cursor-pointer active:scale-[0.98] transition-transform" : ""
      } ${
        isDark
          ? "bg-gray-900/70 border-gray-800"
          : "bg-white border-gray-200 shadow-sm"
      }`}
    >
      {item.imageUrl && (
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-44 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      )}

      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-purple-400">
              {item.artistName}
            </span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full ${
                isDark ? "text-gray-300" : "text-gray-600"
              } ${source.bg}`}
            >
              {source.icon} {source.label}
            </span>
          </div>
          <span className={`text-[10px] ${isDark ? "text-gray-600" : "text-gray-400"}`}>
            {item.timeAgo}
          </span>
        </div>

        <h3
          className={`text-sm font-bold leading-snug ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          {item.title}
        </h3>

        <p
          className={`text-xs leading-relaxed line-clamp-3 ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {item.summary}
        </p>

        {item.url && (
          <span className="text-[10px] text-purple-400 mt-1">
            Tap to read full article →
          </span>
        )}
      </div>
    </div>
  );
}
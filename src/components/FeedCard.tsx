import { getSourceLabel } from "../utils/sourceIcon";

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

  const handleClick = () => {
    if (item.url) {
      window.open(item.url, "_blank");
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`bg-gray-900/70 rounded-2xl overflow-hidden border border-gray-800 ${
        item.url ? "cursor-pointer active:scale-[0.98] transition-transform" : ""
      }`}
    >
      {/* 이미지 */}
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
        {/* 상단 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-purple-400">
              {item.artistName}
            </span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full text-gray-300 ${source.bg}`}
            >
              {source.icon} {source.label}
            </span>
          </div>
          <span className="text-[10px] text-gray-600">{item.timeAgo}</span>
        </div>

        {/* 제목 */}
        <h3 className="text-sm font-bold text-white leading-snug">
          {item.title}
        </h3>

        {/* 요약 */}
        <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
          {item.summary}
        </p>

        {/* 링크 안내 */}
        {item.url && (
          <span className="text-[10px] text-purple-400 mt-1">
            Tap to read full article →
          </span>
        )}
      </div>
    </div>
  );
}
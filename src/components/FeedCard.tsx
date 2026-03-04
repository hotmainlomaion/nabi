import type { FeedItem } from "../data/feedData";
import { getSourceLabel } from "../utils/sourceIcon";

interface Props {
  item: FeedItem;
}

export default function FeedCard({ item }: Props) {
  const source = getSourceLabel(item.source);

  return (
    <div className="bg-gray-900/70 rounded-2xl overflow-hidden border border-gray-800">
      {/* 이미지 (있을 때만) */}
      {item.imageUrl && (
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-44 object-cover"
        />
      )}

      <div className="p-4 flex flex-col gap-2">
        {/* 상단: 아티스트 이름 + 소스 + 시간 */}
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
        <p className="text-xs text-gray-400 leading-relaxed">
          {item.summary}
        </p>
      </div>
    </div>
  );
}
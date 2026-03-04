import { useRef, useState } from "react";
import html2canvas from "html2canvas";

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
  onClose: () => void;
}

export default function ShareCard({ item, onClose }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setSaving(true);

    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
      });

      const link = document.createElement("a");
      link.download = `nabi-${item.artistName}-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Failed to generate image:", err);
    }

    setSaving(false);
  };

  const handleCopyLink = async () => {
    if (item.url) {
      await navigator.clipboard.writeText(item.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${item.artistName} - ${item.title}`,
          text: item.summary,
          url: item.url || window.location.href,
        });
      } catch (err) {
        // 사용자가 공유 취소한 경우
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      {/* 배경 */}
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      {/* 모달 */}
      <div className="relative bg-gray-900 rounded-t-3xl max-h-[85vh] flex flex-col overflow-y-auto">
        {/* 핸들 */}
        <div className="flex justify-center py-3">
          <div className="w-10 h-1 rounded-full bg-gray-700" />
        </div>

        {/* 헤더 */}
        <div className="px-5 pb-3 flex items-center justify-between">
          <h2 className="text-white font-bold">Share this article</h2>
          <button onClick={onClose} className="text-gray-500 text-lg">
            ✕
          </button>
        </div>

        {/* 미리보기 카드 (이것이 이미지로 변환됨) */}
        <div className="px-5 pb-4">
          <div
            ref={cardRef}
            className="rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
            }}
          >
            {/* 상단 브랜딩 */}
            <div className="px-5 pt-5 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">🦋</span>
                <span className="text-white text-xs font-bold tracking-widest">
                  NABI
                </span>
              </div>
              <span className="text-purple-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-purple-400/30">
                {item.artistName}
              </span>
            </div>

            {/* 이미지 (있을 때만) */}
            {item.imageUrl && (
              <div className="px-5 pb-3">
                <img
                  src={item.imageUrl}
                  alt=""
                  className="w-full h-40 object-cover rounded-xl"
                  crossOrigin="anonymous"
                />
              </div>
            )}

            {/* 제목 & 요약 */}
            <div className="px-5 pb-3">
              <h3 className="text-white text-base font-bold leading-snug">
                {item.title}
              </h3>
              <p className="text-gray-400 text-xs mt-2 leading-relaxed line-clamp-3">
                {item.summary}
              </p>
            </div>

            {/* 하단 */}
            <div className="px-5 pb-5 flex items-center justify-between">
              <span className="text-gray-600 text-[10px]">{item.timeAgo}</span>
              <span className="text-purple-400 text-[10px]">
                nabi.app • K-POP News
              </span>
            </div>
          </div>
        </div>

        {/* 공유 버튼들 */}
        <div className="px-5 pb-8 flex flex-col gap-3">
          {/* 네이티브 공유 (모바일) */}
          <button
            onClick={handleNativeShare}
            className="w-full py-3.5 rounded-2xl bg-purple-600 text-white text-sm font-bold active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            📤 Share
          </button>

          {/* 이미지 다운로드 */}
          <button
            onClick={handleDownload}
            disabled={saving}
            className="w-full py-3.5 rounded-2xl bg-gray-800 text-white text-sm font-bold active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            {saving ? (
              <span className="animate-spin">🦋</span>
            ) : (
              <>🖼️ Download as Image</>
            )}
          </button>

          {/* 링크 복사 */}
          {item.url && (
            <button
              onClick={handleCopyLink}
              className="w-full py-3.5 rounded-2xl border border-gray-700 text-gray-300 text-sm font-bold active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              {copied ? "✅ Link Copied!" : "🔗 Copy Link"}
            </button>
          )}

          {/* SNS 바로가기 */}
          <div className="flex items-center justify-center gap-4 pt-2">
            <button
              onClick={() =>
                window.open(
                  `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    `${item.artistName}: ${item.title}`
                  )}&url=${encodeURIComponent(item.url || "")}`,
                  "_blank"
                )
              }
              className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-lg active:scale-90 transition-all"
            >
              𝕏
            </button>
            <button
              onClick={() =>
                window.open(
                  `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    item.url || ""
                  )}`,
                  "_blank"
                )
              }
              className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-lg active:scale-90 transition-all"
            >
              📘
            </button>
            <button
              onClick={() =>
                window.open(
                  `https://wa.me/?text=${encodeURIComponent(
                    `${item.artistName}: ${item.title} ${item.url || ""}`
                  )}`,
                  "_blank"
                )
              }
              className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-lg active:scale-90 transition-all"
            >
              💬
            </button>
            <button
              onClick={() =>
                window.open(
                  `https://t.me/share/url?url=${encodeURIComponent(
                    item.url || ""
                  )}&text=${encodeURIComponent(
                    `${item.artistName}: ${item.title}`
                  )}`,
                  "_blank"
                )
              }
              className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-lg active:scale-90 transition-all"
            >
              ✈️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
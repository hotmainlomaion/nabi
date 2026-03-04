import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getSourceLabel } from "../utils/sourceIcon";
import useThemeStore from "../stores/useThemeStore";
import useBookmarkStore from "../stores/useBookmarkStore";
import useAuthStore from "../stores/useAuthStore";
import {
  toggleLike,
  checkIfLiked,
  getLikeCount,
  getCommentCount,
} from "../services/communityService";
import CommentModal from "./CommentModal";
import ShareCard from "./ShareCard";

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
  index?: number;
}

export default function FeedCard({ item, index = 0 }: Props) {
  const { t } = useTranslation();
  const source = getSourceLabel(item.source);
  const { theme } = useThemeStore();
  const { user } = useAuthStore();
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarkStore();
  const isDark = theme === "dark";
  const saved = isBookmarked(item.id);

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [heartAnim, setHeartAnim] = useState(false);

  useEffect(() => {
    getLikeCount(item.id).then(setLikeCount);
    getCommentCount(item.id).then(setCommentCount);
    if (user) checkIfLiked(item.id, user.uid).then(setLiked);
  }, [item.id, user]);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) { alert(t("common.login_required_like")); return; }
    setHeartAnim(true);
    setTimeout(() => setHeartAnim(false), 600);
    toggleLike(item.id, user.uid).then((v) => { setLiked(v); setLikeCount((p) => (v ? p + 1 : p - 1)); });
  };

  const handleComment = (e: React.MouseEvent) => { e.stopPropagation(); setShowComments(true); };
  const handleShare = (e: React.MouseEvent) => { e.stopPropagation(); setShowShare(true); };
  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) { alert(t("common.login_required_bookmark")); return; }
    if (saved) removeBookmark(user.uid, item.id);
    else addBookmark(user.uid, { ...item, savedAt: new Date().toISOString() });
  };
  const handleClick = () => { if (item.url) window.open(item.url, "_blank"); };

  return (
    <>
      <div
        onClick={handleClick}
        className={`card-enter rounded-2xl overflow-hidden border transition-all duration-200 ${
          item.url ? "cursor-pointer active:scale-[0.98]" : ""
        } ${isDark ? "bg-[#111118] border-[#1E1E2E]" : "bg-white border-gray-100 shadow-sm"}`}
        style={{ animationDelay: `${index * 0.06}s` }}
      >
        {/* 이미지 */}
        {item.imageUrl && (
          <div className="overflow-hidden">
            <img src={item.imageUrl} alt={item.title} className="w-full h-[200px] object-cover transition-transform duration-500 hover:scale-105"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          </div>
        )}

        {/* 콘텐츠 */}
        <div className="px-5 py-4 flex flex-col gap-3">
          {/* 메타 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-[13px] font-bold text-[#E91E63]">{item.artistName}</span>
              <span className={`text-[11px] px-2.5 py-0.5 rounded-full ${isDark ? "bg-[#1E1E2E] text-gray-400" : "bg-gray-100 text-gray-500"}`}>
                {source.icon} {source.label}
              </span>
            </div>
            <span className={`text-[11px] ${isDark ? "text-gray-600" : "text-gray-400"}`}>{item.timeAgo}</span>
          </div>

          {/* 제목 */}
          <h3 className={`text-[16px] font-bold leading-snug ${isDark ? "text-white" : "text-gray-900"}`}>
            {item.title}
          </h3>

          {/* 요약 */}
          <p className={`text-[13px] leading-[1.6] line-clamp-3 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            {item.summary}
          </p>

          {/* 액션바 */}
          <div className={`flex items-center justify-between pt-3 border-t ${isDark ? "border-[#1E1E2E]" : "border-gray-100"}`}>
            <button onClick={handleLike} className="flex items-center gap-2 py-1">
              <span className={`text-lg ${heartAnim ? "animate-heart" : ""} ${liked ? "text-[#E91E63]" : isDark ? "text-gray-600" : "text-gray-300"}`}>
                {liked ? "♥" : "♡"}
              </span>
              {likeCount > 0 && <span className={`text-[12px] ${isDark ? "text-gray-500" : "text-gray-400"}`}>{likeCount}</span>}
            </button>

            <button onClick={handleComment} className="flex items-center gap-2 py-1">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isDark ? "#4B5563" : "#CBD5E1"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              {commentCount > 0 && <span className={`text-[12px] ${isDark ? "text-gray-500" : "text-gray-400"}`}>{commentCount}</span>}
            </button>

            <button onClick={handleShare} className="py-1">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isDark ? "#4B5563" : "#CBD5E1"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" />
              </svg>
            </button>

            <button onClick={handleBookmark} className="py-1">
              <svg width="18" height="18" viewBox="0 0 24 24" fill={saved ? "#E91E63" : "none"} stroke={saved ? "#E91E63" : isDark ? "#4B5563" : "#CBD5E1"} strokeWidth="1.5">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {showComments && <CommentModal articleId={item.id} onClose={() => { setShowComments(false); getCommentCount(item.id).then(setCommentCount); }} />}
      {showShare && <ShareCard item={item} onClose={() => setShowShare(false)} />}
    </>
  );
}
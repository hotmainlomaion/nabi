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
    toggleLike(item.id, user.uid).then((v) => {
      setLiked(v);
      setLikeCount((p) => (v ? p + 1 : p - 1));
    });
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
        className={`card-enter flex gap-3 p-4 border-b transition-all duration-200 ${
          item.url ? "cursor-pointer active:bg-gray-50" : ""
        } ${isDark ? "border-[#1E1E2E] active:bg-[#111118]" : "border-gray-100"}`}
        style={{ animationDelay: `${index * 0.06}s` }}
      >
        {/* 썸네일 (좌측) */}
        {item.imageUrl ? (
          <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden">
            <img
              src={item.imageUrl}
              alt=""
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          </div>
        ) : (
          <div className={`w-20 h-20 flex-shrink-0 rounded-xl flex items-center justify-center text-2xl ${isDark ? "bg-[#111118]" : "bg-gray-50"}`}>
            {source.icon}
          </div>
        )}

        {/* 텍스트 (우측) */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <h3 className={`text-sm font-bold leading-snug line-clamp-2 ${isDark ? "text-white" : "text-gray-900"}`}>
              {item.title}
            </h3>
            <p className={`text-xs mt-1 line-clamp-1 ${isDark ? "text-gray-500" : "text-gray-500"}`}>
              {item.summary}
            </p>
          </div>

          {/* 메타 + 액션 */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] ${isDark ? "text-gray-600" : "text-gray-400"}`}>
                {item.timeAgo}
              </span>
              <span className="text-[10px] text-[#E91E63] font-semibold">
                {item.artistName}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* 좋아요 */}
              <button onClick={handleLike} className="flex items-center gap-1">
                <span className={`text-sm ${heartAnim ? "animate-heart" : ""} ${liked ? "text-[#E91E63]" : isDark ? "text-gray-600" : "text-gray-300"}`}>
                  {liked ? "♥" : "♡"}
                </span>
                {likeCount > 0 && <span className={`text-[10px] ${isDark ? "text-gray-600" : "text-gray-400"}`}>{likeCount}</span>}
              </button>

              {/* 댓글 */}
              <button onClick={handleComment} className="flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isDark ? "#4B5563" : "#D1D5DB"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                {commentCount > 0 && <span className={`text-[10px] ${isDark ? "text-gray-600" : "text-gray-400"}`}>{commentCount}</span>}
              </button>

              {/* 북마크 */}
              <button onClick={handleBookmark}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill={saved ? "#E91E63" : "none"} stroke={saved ? "#E91E63" : isDark ? "#4B5563" : "#D1D5DB"} strokeWidth="1.5">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {showComments && (
        <CommentModal articleId={item.id} onClose={() => { setShowComments(false); getCommentCount(item.id).then(setCommentCount); }} />
      )}
      {showShare && <ShareCard item={item} onClose={() => setShowShare(false)} />}
    </>
  );
}
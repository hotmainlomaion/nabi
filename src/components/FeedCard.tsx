import { useState, useEffect } from "react";
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
  const { user } = useAuthStore();
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarkStore();
  const isDark = theme === "dark";

  const saved = isBookmarked(item.id);

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    getLikeCount(item.id).then(setLikeCount);
    getCommentCount(item.id).then(setCommentCount);
    if (user) {
      checkIfLiked(item.id, user.uid).then(setLiked);
    }
  }, [item.id, user]);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      alert("Please login to like articles!");
      return;
    }
    toggleLike(item.id, user.uid).then((isNowLiked) => {
      setLiked(isNowLiked);
      setLikeCount((prev) => (isNowLiked ? prev + 1 : prev - 1));
    });
  };

  const handleComment = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowComments(true);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      alert("Please login to bookmark articles!");
      return;
    }
    if (saved) {
      removeBookmark(user.uid, item.id);
    } else {
      addBookmark(user.uid, {
        ...item,
        savedAt: new Date().toISOString(),
      });
    }
  };

  const handleClick = () => {
    if (item.url) {
      window.open(item.url, "_blank");
    }
  };

  return (
    <>
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
          {/* 상단 */}
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

          {/* 제목 */}
          <h3
            className={`text-sm font-bold leading-snug ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {item.title}
          </h3>

          {/* 요약 */}
          <p
            className={`text-xs leading-relaxed line-clamp-3 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {item.summary}
          </p>

          {item.url && (
            <span className="text-[10px] text-purple-400">
              Tap to read full article →
            </span>
          )}

          {/* 액션 바: 좋아요 / 댓글 / 북마크 */}
          <div
            className={`flex items-center justify-between pt-2 mt-1 border-t ${
              isDark ? "border-gray-800" : "border-gray-100"
            }`}
          >
            {/* 좋아요 */}
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 text-xs transition-all active:scale-110 ${
                liked ? "text-red-500" : isDark ? "text-gray-500" : "text-gray-400"
              }`}
            >
              <span className="text-base">{liked ? "❤️" : "🤍"}</span>
              {likeCount > 0 && <span>{likeCount}</span>}
            </button>

            {/* 댓글 */}
            <button
              onClick={handleComment}
              className={`flex items-center gap-1.5 text-xs transition-all active:scale-110 ${
                isDark ? "text-gray-500" : "text-gray-400"
              }`}
            >
              <span className="text-base">💬</span>
              {commentCount > 0 && <span>{commentCount}</span>}
            </button>

            {/* 북마크 */}
            <button
              onClick={handleBookmark}
              className={`text-base transition-all active:scale-110 ${
                saved ? "text-yellow-400" : isDark ? "text-gray-500" : "text-gray-300"
              }`}
            >
              {saved ? "★" : "☆"}
            </button>
          </div>
        </div>
      </div>

      {/* 댓글 모달 */}
      {showComments && (
        <CommentModal
          articleId={item.id}
          onClose={() => {
            setShowComments(false);
            getCommentCount(item.id).then(setCommentCount);
          }}
        />
      )}
    </>
  );
}
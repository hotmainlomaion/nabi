import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import useThemeStore from "../stores/useThemeStore";
import useAuthStore from "../stores/useAuthStore";
import {
  getComments,
  addComment,
  type Comment,
} from "../services/communityService";

interface Props {
  articleId: string;
  onClose: () => void;
}

export default function CommentModal({ articleId, onClose }: Props) {
  const { t } = useTranslation();
  const { theme } = useThemeStore();
  const { user } = useAuthStore();
  const isDark = theme === "dark";

  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    loadComments();
  }, [articleId]);

  const loadComments = async () => {
    setLoading(true);
    const data = await getComments(articleId);
    setComments(data);
    setLoading(false);
  };

  const handlePost = async () => {
    if (!user || !text.trim()) return;
    setPosting(true);
    await addComment(
      articleId,
      user.uid,
      user.displayName || "Anonymous",
      user.photoURL || "",
      text.trim()
    );
    setText("");
    await loadComments();
    setPosting(false);
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMin = Math.floor((now.getTime() - date.getTime()) / 60000);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHour = Math.floor(diffMin / 60);
    if (diffHour < 24) return `${diffHour}h ago`;
    return `${Math.floor(diffHour / 24)}d ago`;
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-black/60 animate-fade-in" onClick={onClose} />

      {/* 모달 */}
      <div
        className={`relative rounded-t-3xl max-h-[75vh] flex flex-col animate-slide-up ${
          isDark ? "bg-gray-900" : "bg-white"
        }`}
      >
        {/* 핸들 */}
        <div className="flex justify-center py-3">
          <div className={`w-10 h-1 rounded-full ${isDark ? "bg-gray-700" : "bg-gray-300"}`} />
        </div>

        {/* 헤더 */}
        <div className="px-5 pb-3 flex items-center justify-between">
          <h2 className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
            {t("comments.title")} ({comments.length})
          </h2>
          <button onClick={onClose} className="text-gray-500 text-lg active:scale-90 transition-transform">
            ✕
          </button>
        </div>

        {/* 댓글 목록 */}
        <div className="flex-1 overflow-y-auto px-5 pb-4 scrollbar-hide">
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <span className="text-2xl animate-float">🦋</span>
            </div>
          ) : comments.length > 0 ? (
            <div className="flex flex-col gap-4">
              {comments.map((c, i) => (
                <div
                  key={c.id}
                  className="flex gap-3 animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  {c.photoURL ? (
                    <img src={c.photoURL} alt="" className="w-8 h-8 rounded-full flex-shrink-0" />
                  ) : (
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                        isDark ? "bg-gray-800 text-gray-400" : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {c.displayName.charAt(0)}
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                        {c.displayName}
                      </span>
                      <span className="text-[10px] text-gray-500">{formatTime(c.createdAt)}</span>
                    </div>
                    <p className={`text-xs mt-0.5 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      {c.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 animate-fade-in">
              <span className="text-3xl">💬</span>
              <p className="text-sm text-gray-500 mt-2">{t("comments.empty")}</p>
            </div>
          )}
        </div>

        {/* 입력창 */}
        {user ? (
          <div
            className={`px-4 py-3 border-t flex items-center gap-3 ${
              isDark ? "border-gray-800" : "border-gray-200"
            }`}
          >
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handlePost()}
              placeholder={t("comments.placeholder")}
              className={`flex-1 text-sm px-4 py-2.5 rounded-full outline-none transition-all focus:ring-2 focus:ring-purple-500/30 ${
                isDark
                  ? "bg-gray-800 text-white placeholder-gray-500"
                  : "bg-gray-100 text-gray-900 placeholder-gray-400"
              }`}
            />
            <button
              onClick={handlePost}
              disabled={!text.trim() || posting}
              className={`text-sm font-bold px-4 py-2.5 rounded-full transition-all active:scale-95 ${
                text.trim()
                  ? "bg-purple-600 text-white"
                  : isDark
                  ? "bg-gray-800 text-gray-600"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              {posting ? "..." : t("comments.post")}
            </button>
          </div>
        ) : (
          <div className={`px-4 py-4 border-t text-center ${isDark ? "border-gray-800" : "border-gray-200"}`}>
            <p className="text-sm text-gray-500">{t("comments.login_prompt")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
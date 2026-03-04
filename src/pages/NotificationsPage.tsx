import { useTranslation } from "react-i18next";
import useNotificationStore from "../stores/useNotificationStore";
import useAuthStore from "../stores/useAuthStore";
import useThemeStore from "../stores/useThemeStore";
import BottomNav from "../components/BottomNav";

const typeConfig: Record<string, { icon: string; color: string; bg: string; darkBg: string }> = {
  news: { icon: "⚡", color: "#E91E63", bg: "bg-pink-50", darkBg: "bg-pink-950/30" },
  community: { icon: "♥", color: "#E91E63", bg: "bg-pink-50", darkBg: "bg-pink-950/30" },
  shop: { icon: "📈", color: "#9C27B0", bg: "bg-purple-50", darkBg: "bg-purple-950/30" },
  system: { icon: "🔔", color: "#607D8B", bg: "bg-gray-100", darkBg: "bg-gray-800/50" },
};

export default function NotificationsPage() {
  const { t } = useTranslation();
  const { notifications, markAsRead, markAllRead } = useNotificationStore();
  const { user } = useAuthStore();
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMin = Math.floor((now.getTime() - date.getTime()) / 60000);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHour = Math.floor(diffMin / 60);
    if (diffHour < 24) return `${diffHour}h ago`;
    return `${Math.floor(diffHour / 24)}d ago`;
  };

  const handleClick = async (notif: any) => {
    if (user && !notif.read) await markAsRead(user.uid, notif.id);
    if (notif.linkUrl) window.open(notif.linkUrl, "_blank");
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? "dark-vars bg-[#0A0A0F] text-white" : "bg-white text-gray-900"}`}>
      {/* 헤더 */}
      <div className={`sticky top-0 z-10 backdrop-blur-md px-5 pt-12 pb-4 border-b ${isDark ? "bg-[#0A0A0F]/95 border-[#1E1E2E]" : "bg-white/95 border-gray-100"}`}>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black">{t("notifications.title")}</h1>
          {notifications.some((n) => !n.read) && user && (
            <button onClick={() => markAllRead(user.uid)} className="text-xs text-[#E91E63] font-semibold">
              {t("notifications.mark_all")}
            </button>
          )}
        </div>
      </div>

      {/* 알림 목록 */}
      <div className="flex-1 overflow-y-auto px-5 py-4 pb-24 flex flex-col gap-3 scrollbar-hide">
        {notifications.length > 0 ? (
          notifications.map((notif, i) => {
            const config = typeConfig[notif.type] || typeConfig.system;
            return (
              <div
                key={notif.id}
                onClick={() => handleClick(notif)}
                className={`card-enter rounded-2xl p-4 flex gap-3 cursor-pointer transition-all active:scale-[0.98] ${
                  notif.read
                    ? isDark ? "bg-[#111118]" : "bg-white border border-gray-100"
                    : isDark ? config.darkBg + " border border-[#E91E63]/20" : config.bg + " border border-pink-100"
                }`}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {/* 아이콘 */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                  style={{ backgroundColor: config.color + "15", color: config.color }}
                >
                  {config.icon}
                </div>

                {/* 텍스트 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                      {notif.title}
                    </p>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                      <span className={`text-[10px] ${isDark ? "text-gray-600" : "text-gray-400"}`}>
                        {formatTime(notif.createdAt)}
                      </span>
                      {!notif.read && <span className="w-2 h-2 rounded-full bg-[#E91E63]" />}
                    </div>
                  </div>
                  <p className={`text-xs mt-0.5 line-clamp-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    {notif.body}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-20 animate-fade-in-up">
            <span className="text-4xl mb-4">🔔</span>
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{t("notifications.empty_title")}</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
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
    const d = new Date(dateStr), now = new Date();
    const m = Math.floor((now.getTime() - d.getTime()) / 60000);
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
  };

  const handleClick = async (n: any) => {
    if (user && !n.read) await markAsRead(user.uid, n.id);
    if (n.linkUrl) window.open(n.linkUrl, "_blank");
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? "dark-vars bg-[#0A0A0F] text-white" : "bg-[#FAFAFA] text-gray-900"}`}>
      {/* 헤더 */}
      <div className={`sticky top-0 z-10 backdrop-blur-md px-5 pt-14 pb-5 border-b ${isDark ? "bg-[#0A0A0F]/95 border-[#1E1E2E]" : "bg-white/95 border-gray-100"}`}>
        <div className="flex items-center justify-between">
          <h1 className="text-[26px] font-black">{t("notifications.title")}</h1>
          {notifications.some((n) => !n.read) && user && (
            <button onClick={() => markAllRead(user.uid)} className="text-[13px] text-[#E91E63] font-semibold">
              {t("notifications.mark_all")}
            </button>
          )}
        </div>
      </div>

      {/* 목록 */}
      <div className="flex-1 overflow-y-auto px-5 py-5 pb-28 flex flex-col gap-3.5 scrollbar-hide">
        {notifications.length > 0 ? (
          notifications.map((notif, i) => {
            const cfg = typeConfig[notif.type] || typeConfig.system;
            return (
              <div key={notif.id} onClick={() => handleClick(notif)}
                className={`card-enter rounded-2xl p-4 flex gap-4 cursor-pointer transition-all active:scale-[0.98] ${
                  notif.read
                    ? isDark ? "bg-[#111118]" : "bg-white border border-gray-100"
                    : isDark ? cfg.darkBg + " border border-[#E91E63]/20" : cfg.bg + " border border-pink-100"
                }`}
                style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="w-11 h-11 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                  style={{ backgroundColor: cfg.color + "12", color: cfg.color }}>
                  {cfg.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-[14px] font-bold leading-snug ${isDark ? "text-white" : "text-gray-900"}`}>{notif.title}</p>
                    <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
                      <span className={`text-[11px] ${isDark ? "text-gray-600" : "text-gray-400"}`}>{formatTime(notif.createdAt)}</span>
                      {!notif.read && <span className="w-2 h-2 rounded-full bg-[#E91E63]" />}
                    </div>
                  </div>
                  <p className={`text-[13px] mt-1 line-clamp-2 leading-relaxed ${isDark ? "text-gray-400" : "text-gray-500"}`}>{notif.body}</p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-28 animate-fade-in-up">
            <span className="text-5xl mb-5">🔔</span>
            <p className={`text-[15px] font-semibold ${isDark ? "text-gray-300" : "text-gray-600"}`}>{t("notifications.empty_title")}</p>
            <p className={`text-sm mt-2 ${isDark ? "text-gray-600" : "text-gray-400"}`}>{t("notifications.empty_sub")}</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
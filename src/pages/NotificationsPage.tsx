import { useNavigate } from "react-router-dom";
import useNotificationStore from "../stores/useNotificationStore";
import useAuthStore from "../stores/useAuthStore";
import useThemeStore from "../stores/useThemeStore";
import BottomNav from "../components/BottomNav";

export default function NotificationsPage() {
  const navigate = useNavigate();
  const { notifications, markAsRead, markAllRead } = useNotificationStore();
  const { user } = useAuthStore();
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "news":
        return "📰";
      case "community":
        return "💬";
      case "shop":
        return "🛍️";
      case "system":
        return "🦋";
      default:
        return "🔔";
    }
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

  const handleNotifClick = async (notif: any) => {
    if (user && !notif.read) {
      await markAsRead(user.uid, notif.id);
    }
    if (notif.linkUrl) {
      window.open(notif.linkUrl, "_blank");
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDark ? "bg-black text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* 헤더 */}
      <div
        className={`sticky top-0 z-10 backdrop-blur-sm px-5 py-4 flex items-center justify-between border-b ${
          isDark ? "bg-black/90 border-gray-800" : "bg-white/90 border-gray-200"
        }`}
      >
        <h1 className="text-xl font-bold">🔔 Notifications</h1>
        {notifications.some((n) => !n.read) && user && (
          <button
            onClick={() => markAllRead(user.uid)}
            className="text-xs text-purple-400"
          >
            Mark all read
          </button>
        )}
      </div>

      {/* 알림 목록 */}
      <div className="flex-1 overflow-y-auto pb-24">
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => handleNotifClick(notif)}
              className={`px-5 py-4 flex gap-3 border-b cursor-pointer active:opacity-70 transition-all ${
                notif.read
                  ? isDark
                    ? "border-gray-900"
                    : "border-gray-100"
                  : isDark
                  ? "bg-purple-950/20 border-gray-800"
                  : "bg-purple-50 border-gray-200"
              }`}
            >
              {/* 아이콘 */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0 ${
                  isDark ? "bg-gray-800" : "bg-gray-200"
                }`}
              >
                {getTypeIcon(notif.type)}
              </div>

              {/* 내용 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-purple-400">
                    {notif.artistName}
                  </span>
                  <span
                    className={`text-[10px] ${
                      isDark ? "text-gray-600" : "text-gray-400"
                    }`}
                  >
                    {formatTime(notif.createdAt)}
                  </span>
                  {!notif.read && (
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                  )}
                </div>
                <p
                  className={`text-sm font-semibold mt-0.5 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {notif.title}
                </p>
                <p
                  className={`text-xs mt-0.5 line-clamp-2 ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {notif.body}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-20">
            <span className="text-4xl mb-4">🔔</span>
            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              No notifications yet.
            </p>
            <p
              className={`text-xs mt-1 ${
                isDark ? "text-gray-600" : "text-gray-400"
              }`}
            >
              We'll let you know when something exciting happens!
            </p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
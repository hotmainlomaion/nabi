import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useThemeStore from "../stores/useThemeStore";
import useNotificationStore from "../stores/useNotificationStore";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { theme } = useThemeStore();
  const { unreadCount } = useNotificationStore();
  const isDark = theme === "dark";

  const tabs = [
    { path: "/feed", icon: "📰", label: t("nav.feed") },
    { path: "/shop", icon: "🛍️", label: t("nav.shop") },
    { path: "/notifications", icon: "🔔", label: t("nav.alerts") },
    { path: "/bookmarks", icon: "🔖", label: t("nav.saved") },
    { path: "/profile", icon: "👤", label: t("nav.my") },
  ];

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-20 border-t backdrop-blur-sm ${
        isDark ? "bg-black/90 border-gray-800" : "bg-white/90 border-gray-200"
      }`}
    >
      <div className="flex items-center justify-around py-2 pb-[env(safe-area-inset-bottom)]">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`relative flex flex-col items-center gap-0.5 px-3 py-1 transition-all active:scale-90 ${
                isActive
                  ? "text-purple-400"
                  : isDark
                  ? "text-gray-600"
                  : "text-gray-400"
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              {tab.path === "/notifications" && unreadCount > 0 && (
                <span className="absolute -top-0.5 right-1 min-w-[16px] h-4 px-1 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
              <span className={`text-[10px] font-bold ${isActive ? "text-purple-400" : ""}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
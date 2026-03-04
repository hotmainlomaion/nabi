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
    { path: "/feed", label: t("nav.feed"), icon: (a: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={a ? 2.2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill={a ? "currentColor" : "none"} />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    )},
    { path: "/search", label: t("nav.search"), icon: (a: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={a ? 2.2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    )},
    { path: "/bookmarks", label: t("nav.saved"), icon: (a: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill={a ? "currentColor" : "none"} stroke="currentColor" strokeWidth={a ? 2.2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    )},
    { path: "/notifications", label: t("nav.alerts"), icon: (a: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill={a ? "currentColor" : "none"} stroke="currentColor" strokeWidth={a ? 2.2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    )},
    { path: "/profile", label: t("nav.my"), icon: (a: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={a ? 2.2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" fill={a ? "currentColor" : "none"} />
      </svg>
    )},
  ];

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-20 border-t ${
        isDark ? "bg-[#0A0A0F]/95 border-[#1E1E2E]" : "bg-white/95 border-gray-100"
      } backdrop-blur-md`}
    >
      <div className="flex items-center justify-around py-1.5 pb-[env(safe-area-inset-bottom)]">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`relative flex flex-col items-center gap-0.5 px-4 py-1.5 transition-all active:scale-90 ${
                isActive
                  ? "text-[#E91E63]"
                  : isDark ? "text-gray-500" : "text-gray-400"
              }`}
            >
              {tab.icon(isActive)}
              {tab.path === "/notifications" && unreadCount > 0 && (
                <span className="absolute top-0 right-2 min-w-[16px] h-4 px-1 rounded-full bg-[#E91E63] text-white text-[9px] font-bold flex items-center justify-center">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
              <span className={`text-[10px] ${isActive ? "font-bold text-[#E91E63]" : "font-medium"}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
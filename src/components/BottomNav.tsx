import { useNavigate, useLocation } from "react-router-dom";
import useThemeStore from "../stores/useThemeStore";

const tabs = [
  { path: "/feed", icon: "📰", label: "Feed" },
  { path: "/shop", icon: "🛍️", label: "Shop" },
  { path: "/bookmarks", icon: "🔖", label: "Saved" },
  { path: "/select", icon: "🎤", label: "Artists" },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-20 border-t backdrop-blur-sm ${
        isDark
          ? "bg-black/90 border-gray-800"
          : "bg-white/90 border-gray-200"
      }`}
    >
      <div className="flex items-center justify-around py-2 pb-[env(safe-area-inset-bottom)]">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-0.5 px-4 py-1 transition-all active:scale-90 ${
                isActive
                  ? "text-purple-400"
                  : isDark
                  ? "text-gray-600"
                  : "text-gray-400"
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              <span
                className={`text-[10px] font-bold ${
                  isActive ? "text-purple-400" : ""
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
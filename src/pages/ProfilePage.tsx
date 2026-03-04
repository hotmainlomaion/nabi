import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import useAuthStore from "../stores/useAuthStore";
import useArtistStore from "../stores/useArtistStore";
import useBookmarkStore from "../stores/useBookmarkStore";
import useNotificationStore from "../stores/useNotificationStore";
import useThemeStore from "../stores/useThemeStore";
import artists from "../data/artists";
import BottomNav from "../components/BottomNav";

const languages = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
];

export default function ProfilePage() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { user, clearUser } = useAuthStore();
  const { selectedArtists, clearArtists } = useArtistStore();
  const { bookmarks } = useBookmarkStore();
  const { notifications } = useNotificationStore();
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === "dark";

  const [showLangPicker, setShowLangPicker] = useState(false);
  const currentLang = languages.find((l) => l.code === i18n.language) || languages[0];

  const handleLogout = async () => {
    await signOut(auth);
    clearUser();
    clearArtists();
    navigate("/");
  };

  const selectedArtistData = artists.filter((a) => selectedArtists.includes(a.id));

  const stats = [
    { value: selectedArtists.length, label: "FOLLOWING" },
    { value: bookmarks.length, label: "SAVED" },
    { value: notifications.filter((n) => !n.read).length, label: "COMMENTS" },
  ];

  if (!user) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center gap-4 ${isDark ? "dark-vars bg-[#0A0A0F] text-white" : "bg-white text-gray-900"}`}>
        <span className="text-5xl">👤</span>
        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{t("profile.login_prompt")}</p>
        <button onClick={() => navigate("/login")} className="btn-pink text-sm px-6 py-3">{t("profile.go_login")}</button>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? "dark-vars bg-[#0A0A0F] text-white" : "bg-white text-gray-900"}`}>
      <div className="flex-1 overflow-y-auto pb-24 scrollbar-hide">
        {/* 프로필 */}
        <div className="flex flex-col items-center pt-12 pb-6 animate-fade-in-up">
          <div className="relative">
            <img
              src={user.photoURL || ""}
              alt=""
              className="w-20 h-20 rounded-full border-3 border-[#E91E63]/30"
            />
            <div className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center ${isDark ? "bg-gray-800" : "bg-gray-100"}`}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isDark ? "#9CA3AF" : "#6B7280"} strokeWidth="1.5">
                <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </div>
          </div>
          <h2 className="text-lg font-bold mt-3">{user.displayName}</h2>
          <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>{user.email}</p>
        </div>

        {/* 통계 */}
        <div className="flex items-center justify-center gap-10 pb-6">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center">
              <span className="text-xl font-black">{s.value}</span>
              <span className={`text-[10px] tracking-wider mt-0.5 ${isDark ? "text-gray-500" : "text-gray-400"}`}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* My Artists */}
        <div className="px-5 pb-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold">My Artists</h3>
            <button onClick={() => navigate("/select")} className="text-xs text-[#E91E63] font-semibold">Edit</button>
          </div>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide">
            {selectedArtistData.length > 0 ? selectedArtistData.map((a) => (
              <div key={a.id} className="flex flex-col items-center gap-1.5 flex-shrink-0">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${isDark ? "bg-gray-800" : "bg-gray-50 border border-gray-200"}`}>
                  {a.emoji}
                </div>
                <span className={`text-[10px] ${isDark ? "text-gray-400" : "text-gray-500"}`}>{a.name}</span>
              </div>
            )) : (
              <p className={`text-xs ${isDark ? "text-gray-600" : "text-gray-400"}`}>{t("profile.no_artists")}</p>
            )}
          </div>
        </div>

        {/* 설정 */}
        <div className="px-5 pb-5">
          <div className={`rounded-2xl overflow-hidden ${isDark ? "bg-[#111118]" : "border border-gray-100"}`}>
            {/* 다크모드 */}
            <div className={`px-4 py-4 flex items-center justify-between border-b ${isDark ? "border-[#1E1E2E]" : "border-gray-100"}`}>
              <div className="flex items-center gap-3">
                <span className="text-lg">🌙</span>
                <span className="text-sm font-medium">Dark Mode</span>
              </div>
              <button
                onClick={toggleTheme}
                className={`w-11 h-6 rounded-full transition-all relative ${theme === "dark" ? "bg-[#E91E63]" : "bg-gray-300"}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all shadow ${theme === "dark" ? "left-[22px]" : "left-0.5"}`} />
              </button>
            </div>

            {/* 언어 */}
            <div
              onClick={() => setShowLangPicker(!showLangPicker)}
              className={`px-4 py-4 flex items-center justify-between cursor-pointer border-b ${isDark ? "border-[#1E1E2E]" : "border-gray-100"}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">🌍</span>
                <span className="text-sm font-medium">{t("profile.language")}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{currentLang.label}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isDark ? "#6B7280" : "#9CA3AF"} strokeWidth="1.5" strokeLinecap="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </div>

            {/* 언어 선택 드롭다운 */}
            {showLangPicker && (
              <div className={`${isDark ? "bg-[#0A0A0F]" : "bg-gray-50"}`}>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { i18n.changeLanguage(lang.code); setShowLangPicker(false); }}
                    className={`w-full text-left px-6 py-3 text-sm flex items-center justify-between transition-all ${
                      lang.code === i18n.language
                        ? "text-[#E91E63] font-bold"
                        : isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    <span>{lang.flag} {lang.label}</span>
                    {lang.code === i18n.language && <span>✓</span>}
                  </button>
                ))}
              </div>
            )}

            {/* 피드 레이아웃 (기획안처럼 표시만) */}
            <div className={`px-4 py-4 flex items-center justify-between ${isDark ? "" : ""}`}>
              <div className="flex items-center gap-3">
                <span className="text-lg">📱</span>
                <span className="text-sm font-medium">Feed Layout</span>
              </div>
              <div className="flex items-center gap-1">
                <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>List</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isDark ? "#6B7280" : "#9CA3AF"} strokeWidth="1.5" strokeLinecap="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* 로그아웃 */}
        <div className="px-5 pb-8">
          <button
            onClick={handleLogout}
            className="w-full py-3.5 text-center text-sm font-bold text-[#E91E63] active:opacity-70 transition-all"
          >
            ↪ Sign Out
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
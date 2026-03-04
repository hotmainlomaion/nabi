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
import ThemeToggle from "../components/ThemeToggle";

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
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  const [showLangPicker, setShowLangPicker] = useState(false);

  const currentLang = languages.find((l) => l.code === i18n.language) || languages[0];

  const handleLogout = async () => {
    await signOut(auth);
    clearUser();
    clearArtists();
    navigate("/");
  };

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    setShowLangPicker(false);
  };

  const selectedArtistNames = artists
    .filter((a) => selectedArtists.includes(a.id))
    .map((a) => ({ name: a.name, emoji: a.emoji }));

  const stats = [
    { label: t("profile.following"), value: selectedArtists.length, icon: "🎤" },
    { label: t("profile.saved"), value: bookmarks.length, icon: "🔖" },
    { label: t("profile.notifications"), value: notifications.length, icon: "🔔" },
  ];

  if (!user) {
    return (
      <div
        className={`min-h-screen flex flex-col items-center justify-center gap-4 ${
          isDark ? "bg-black text-white" : "bg-gray-50 text-gray-900"
        }`}
      >
        <span className="text-5xl">👤</span>
        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
          {t("profile.login_prompt")}
        </p>
        <button
          onClick={() => navigate("/login")}
          className="text-sm text-purple-400 border border-purple-400/30 px-5 py-2 rounded-full"
        >
          {t("profile.go_login")}
        </button>
        <BottomNav />
      </div>
    );
  }

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
        <h1 className="text-xl font-bold">👤 {t("profile.title")}</h1>
        <ThemeToggle />
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {/* 프로필 카드 */}
        <div className="px-5 py-6 flex flex-col items-center gap-3">
          <img
            src={user.photoURL || ""}
            alt="profile"
            className="w-20 h-20 rounded-full border-4 border-purple-500"
          />
          <div className="text-center">
            <h2 className="text-lg font-bold">{user.displayName}</h2>
            <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>
              {user.email}
            </p>
          </div>
        </div>

        {/* 활동 통계 */}
        <div className="px-5 pb-6">
          <div
            className={`rounded-2xl p-4 grid grid-cols-3 gap-4 ${
              isDark ? "bg-gray-900/70" : "bg-white shadow-sm"
            }`}
          >
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1">
                <span className="text-xl">{s.icon}</span>
                <span className="text-lg font-bold">{s.value}</span>
                <span className={`text-[10px] ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 팔로잉 아티스트 */}
        <div className="px-5 pb-6">
          <h3 className="text-sm font-bold mb-3">{t("profile.following_artists")}</h3>
          <div className="flex flex-wrap gap-2">
            {selectedArtistNames.length > 0 ? (
              selectedArtistNames.map((a) => (
                <span
                  key={a.name}
                  className={`text-xs px-3 py-1.5 rounded-full ${
                    isDark ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {a.emoji} {a.name}
                </span>
              ))
            ) : (
              <p className={`text-xs ${isDark ? "text-gray-600" : "text-gray-400"}`}>
                {t("profile.no_artists")}
              </p>
            )}
          </div>
          <button onClick={() => navigate("/select")} className="text-xs text-purple-400 mt-3">
            {t("profile.edit_artists")}
          </button>
        </div>

        {/* 설정 */}
        <div className="px-5 pb-6">
          <h3 className="text-sm font-bold mb-3">{t("profile.settings")}</h3>
          <div className={`rounded-2xl overflow-hidden ${isDark ? "bg-gray-900/70" : "bg-white shadow-sm"}`}>
            {/* 테마 */}
            <div className={`px-4 py-3.5 flex items-center justify-between border-b ${isDark ? "border-gray-800" : "border-gray-100"}`}>
              <div className="flex items-center gap-3">
                <span>🎨</span>
                <span className="text-sm">{t("profile.theme")}</span>
              </div>
              <span className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                {theme === "dark" ? t("profile.dark_mode") : t("profile.light_mode")}
              </span>
            </div>

            {/* 알림 */}
            <div className={`px-4 py-3.5 flex items-center justify-between border-b ${isDark ? "border-gray-800" : "border-gray-100"}`}>
              <div className="flex items-center gap-3">
                <span>🔔</span>
                <span className="text-sm">{t("profile.notif_setting")}</span>
              </div>
              <span className="text-xs text-green-500">{t("common.on")}</span>
            </div>

            {/* 언어 (클릭하면 선택 패널 열림) */}
            <div
              onClick={() => setShowLangPicker(!showLangPicker)}
              className={`px-4 py-3.5 flex items-center justify-between cursor-pointer border-b ${isDark ? "border-gray-800" : "border-gray-100"}`}
            >
              <div className="flex items-center gap-3">
                <span>🌍</span>
                <span className="text-sm">{t("profile.language")}</span>
              </div>
              <span className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                {currentLang.flag} {currentLang.label}
              </span>
            </div>

            {/* 언어 선택 패널 */}
            {showLangPicker && (
              <div className={`px-4 py-2 ${isDark ? "bg-gray-800/50" : "bg-gray-50"}`}>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm flex items-center justify-between transition-all ${
                      lang.code === i18n.language
                        ? "bg-purple-600/20 text-purple-400 font-bold"
                        : isDark
                        ? "text-gray-300"
                        : "text-gray-700"
                    }`}
                  >
                    <span>{lang.flag} {lang.label}</span>
                    {lang.code === i18n.language && <span>✓</span>}
                  </button>
                ))}
              </div>
            )}

            {/* 버전 */}
            <div className="px-4 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span>🦋</span>
                <span className="text-sm">{t("profile.version")}</span>
              </div>
              <span className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                v1.0.0
              </span>
            </div>
          </div>
        </div>

        {/* 로그아웃 */}
        <div className="px-5 pb-6">
          <button
            onClick={handleLogout}
            className="w-full py-3.5 rounded-2xl text-sm font-bold text-red-400 border border-red-400/30 active:scale-95 transition-all"
          >
            {t("profile.logout")}
          </button>
        </div>

        <div className="px-5 pb-8 text-center">
          <p className={`text-[10px] ${isDark ? "text-gray-700" : "text-gray-300"}`}>
            {t("profile.footer")}
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
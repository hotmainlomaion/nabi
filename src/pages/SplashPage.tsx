import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useThemeStore from "../stores/useThemeStore";

export default function SplashPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { theme } = useThemeStore();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 800);
    const t3 = setTimeout(() => setPhase(3), 1300);
    const t4 = setTimeout(() => navigate("/login"), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [navigate]);

  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center relative overflow-hidden ${isDark ? "dark-vars bg-[#0A0A0F]" : "bg-white"}`}>
      {/* 배경 글로우 */}
      <div
        className={`absolute w-80 h-80 rounded-full blur-[80px] transition-opacity duration-1000 ${phase >= 1 ? "opacity-15" : "opacity-0"}`}
        style={{ background: "radial-gradient(circle, #E91E63 0%, transparent 70%)" }}
      />

      {/* 로고 영역 — 간격 넓게 */}
      <div className="flex flex-col items-center gap-6">
        <div className={`text-6xl transition-all duration-700 ${phase >= 1 ? "opacity-100 translate-y-0 animate-float" : "opacity-0 translate-y-8"}`}>
          ✦
        </div>

        <h1 className={`text-[42px] font-black tracking-[0.25em] transition-all duration-700 ${phase >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} ${isDark ? "text-white" : "text-gray-900"}`}>
          NABI
        </h1>

        <p className={`text-sm tracking-widest transition-all duration-700 ${phase >= 3 ? "opacity-100" : "opacity-0"} ${isDark ? "text-gray-500" : "text-gray-400"}`}>
          {t("splash.tagline")}
        </p>
      </div>

      {/* 로딩 바 */}
      <div className={`absolute bottom-20 w-28 h-[3px] rounded-full overflow-hidden ${isDark ? "bg-gray-800" : "bg-gray-200"}`}>
        <div className="h-full bg-[#E91E63] rounded-full transition-all duration-[2500ms] ease-linear" style={{ width: phase >= 1 ? "100%" : "0%" }} />
      </div>
    </div>
  );
}
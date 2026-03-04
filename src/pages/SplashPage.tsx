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
    <div className={`min-h-screen flex flex-col items-center justify-center gap-5 relative overflow-hidden ${isDark ? "dark-vars bg-[#0A0A0F]" : "bg-white"}`}>
      <div className={`absolute w-64 h-64 rounded-full blur-3xl transition-opacity duration-1000 ${phase >= 1 ? "opacity-20" : "opacity-0"}`}
        style={{ background: "radial-gradient(circle, #E91E63 0%, transparent 70%)" }} />

      <div className={`text-7xl transition-all duration-700 ${phase >= 1 ? "opacity-100 translate-y-0 animate-float" : "opacity-0 translate-y-8"}`}>
        ✦
      </div>

      <h1 className={`text-5xl font-black tracking-[0.2em] transition-all duration-700 ${phase >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} ${isDark ? "text-white" : "text-gray-900"}`}>
        NABI
      </h1>

      <p className={`text-sm tracking-wider transition-all duration-700 ${phase >= 3 ? "opacity-100" : "opacity-0"} ${isDark ? "text-gray-500" : "text-gray-400"}`}>
        {t("splash.tagline")}
      </p>

      <div className={`absolute bottom-16 w-32 h-0.5 rounded-full overflow-hidden ${isDark ? "bg-gray-800" : "bg-gray-200"}`}>
        <div className="h-full bg-[#E91E63] rounded-full transition-all duration-[2500ms] ease-linear" style={{ width: phase >= 1 ? "100%" : "0%" }} />
      </div>
    </div>
  );
}
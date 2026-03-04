import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useThemeStore from "../stores/useThemeStore";

export default function SplashPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { theme } = useThemeStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center gap-4 ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      <div className="text-6xl animate-pulse">🦋</div>
      <h1
        className={`text-4xl font-bold tracking-widest ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}
      >
        NABI
      </h1>
      <p className="text-sm text-gray-500 tracking-wide">
        {t("splash.tagline")}
      </p>
    </div>
  );
}
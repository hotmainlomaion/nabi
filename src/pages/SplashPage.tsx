import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SplashPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/select");
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
      <div className="text-6xl animate-pulse">🦋</div>
      <h1 className="text-4xl font-bold text-white tracking-widest">
        NABI
      </h1>
      <p className="text-sm text-gray-500 tracking-wide">
        Your K-POP universe, translated
      </p>
    </div>
  );
}
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import useAuthStore from "../stores/useAuthStore";
import useArtistStore from "../stores/useArtistStore";
import useBookmarkStore from "../stores/useBookmarkStore";
import useThemeStore from "../stores/useThemeStore";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

export default function LoginPage() {
  const { setUser } = useAuthStore();
  const { loadFromFirestore } = useArtistStore();
  const { loadBookmarks } = useBookmarkStore();
  const { theme } = useThemeStore();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const u = result.user;
      setUser({
        uid: u.uid,
        displayName: u.displayName,
        photoURL: u.photoURL,
        email: u.email,
      });
      await loadFromFirestore(u.uid);
      await loadBookmarks(u.uid);
      navigate("/select");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center gap-8 px-6 ${
        isDark ? "bg-black" : "bg-white"
      }`}
    >
      <div className="absolute top-5 right-5">
        <ThemeToggle />
      </div>

      <div className="flex flex-col items-center gap-3">
        <span className="text-6xl">🦋</span>
        <h1
          className={`text-4xl font-bold tracking-widest ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          NABI
        </h1>
        <p className="text-sm text-gray-500 text-center">
          Your K-POP universe, translated
        </p>
      </div>

      <button
        onClick={handleGoogleLogin}
        className={`flex items-center gap-3 font-semibold px-6 py-3.5 rounded-2xl active:scale-95 transition-all ${
          isDark ? "bg-white text-black" : "bg-gray-900 text-white"
        }`}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        Continue with Google
      </button>

      <button
        onClick={() => navigate("/select")}
        className="text-sm text-gray-500 underline underline-offset-4"
      >
        Continue as guest
      </button>
    </div>
  );
}
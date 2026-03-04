import useThemeStore from "../stores/useThemeStore";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className={`
        w-9 h-9 rounded-full flex items-center justify-center text-sm
        transition-all active:scale-90
        ${
          theme === "dark"
            ? "bg-gray-800 text-yellow-400"
            : "bg-gray-200 text-gray-700"
        }
      `}
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
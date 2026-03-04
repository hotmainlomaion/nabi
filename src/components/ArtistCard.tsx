import type { Artist } from "../data/artists";
import useThemeStore from "../stores/useThemeStore";

interface Props {
  artist: Artist;
  selected: boolean;
  onToggle: (id: string) => void;
}

export default function ArtistCard({ artist, selected, onToggle }: Props) {
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  return (
    <button
      onClick={() => onToggle(artist.id)}
      className={`
        relative w-full aspect-square rounded-2xl border-2
        flex flex-col items-center justify-center gap-2
        transition-all duration-200 active:scale-95
        ${
          selected
            ? `${artist.color} ${isDark ? "bg-white/10 shadow-lg shadow-white/5" : "bg-purple-50 shadow-lg shadow-purple-200/50"}`
            : isDark
            ? "border-gray-800 bg-gray-900/50"
            : "border-gray-200 bg-gray-50"
        }
      `}
    >
      {selected && (
        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-[10px] text-white font-bold">
          ✓
        </div>
      )}
      <span className="text-3xl">{artist.emoji}</span>
      <span
        className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}
      >
        {artist.name}
      </span>
      <span className={`text-[10px] ${isDark ? "text-gray-500" : "text-gray-400"}`}>
        {artist.group}
      </span>
    </button>
  );
}
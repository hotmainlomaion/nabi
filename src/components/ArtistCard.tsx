import type { Artist } from "../data/artists";
import useThemeStore from "../stores/useThemeStore";

interface Props {
  artist: Artist;
  selected: boolean;
  onToggle: (id: string) => void;
  index?: number;
}

export default function ArtistCard({ artist, selected, onToggle, index = 0 }: Props) {
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  return (
    <button
      onClick={() => onToggle(artist.id)}
      className={`
        relative w-full rounded-2xl py-5 px-3 flex flex-col items-center gap-3
        transition-all duration-300 active:scale-95 card-enter
        ${selected
          ? isDark
            ? "bg-[#2D1B2E] border-2 border-[#E91E63]"
            : "bg-[#FCE4EC] border-2 border-[#E91E63]"
          : isDark
          ? "bg-[#111118] border-2 border-transparent"
          : "bg-white border-2 border-gray-100 shadow-sm"
        }
      `}
      style={{ animationDelay: `${index * 0.04}s` }}
    >
      {selected && (
        <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#E91E63] flex items-center justify-center animate-pop-in">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      )}

      <div className={`w-[68px] h-[68px] rounded-full flex items-center justify-center text-[28px] border-2 transition-all duration-300 ${
        selected
          ? "border-[#E91E63] shadow-lg shadow-pink-200/30"
          : isDark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"
      }`}>
        {artist.emoji}
      </div>

      <div className="text-center">
        <p className={`text-[13px] font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
          {artist.name}
        </p>
        <p className={`text-[10px] mt-1 uppercase tracking-wider ${isDark ? "text-gray-500" : "text-gray-400"}`}>
          {artist.group}
        </p>
      </div>
    </button>
  );
}
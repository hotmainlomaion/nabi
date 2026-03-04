import { useNavigate } from "react-router-dom";
import artists from "../data/artists";
import ArtistCard from "../components/ArtistCard";
import useArtistStore from "../stores/useArtistStore";

export default function SelectArtistPage() {
  const { selectedArtists, toggleArtist } = useArtistStore();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* 헤더 */}
      <div className="px-5 pt-12 pb-4">
        <h1 className="text-2xl font-bold">Pick your artists 🦋</h1>
        <p className="text-sm text-gray-400 mt-1">
          Choose 1 or more to build your feed
        </p>
      </div>

      {/* 아티스트 그리드 */}
      <div className="flex-1 overflow-y-auto px-5 pb-28">
        <div className="grid grid-cols-3 gap-3">
          {artists.map((artist) => (
            <ArtistCard
              key={artist.id}
              artist={artist}
              selected={selectedArtists.includes(artist.id)}
              onToggle={toggleArtist}
            />
          ))}
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black via-black/95 to-transparent">
        <button
          disabled={selectedArtists.length === 0}
          onClick={() => navigate("/feed")}
          className={`
            w-full py-4 rounded-2xl text-base font-bold transition-all
            ${
              selectedArtists.length > 0
                ? "bg-purple-600 text-white active:scale-95"
                : "bg-gray-800 text-gray-600 cursor-not-allowed"
            }
          `}
        >
          {selectedArtists.length === 0
            ? "Select at least 1 artist"
            : `Continue with ${selectedArtists.length} artist${selectedArtists.length > 1 ? "s" : ""}`}
        </button>
      </div>
    </div>
  );
}
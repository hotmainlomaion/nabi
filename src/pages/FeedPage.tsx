import { useNavigate } from "react-router-dom";
import feedData from "../data/feedData";
import FeedCard from "../components/FeedCard";
import useArtistStore from "../stores/useArtistStore";

export default function FeedPage() {
  const navigate = useNavigate();
  const { selectedArtists } = useArtistStore();

  const filteredFeed = feedData.filter((item) =>
    selectedArtists.includes(item.artistId)
  );

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* 헤더 */}
      <div className="sticky top-0 z-10 bg-black/90 backdrop-blur-sm border-b border-gray-800 px-5 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">🦋 NABI</h1>
        <button
          onClick={() => navigate("/select")}
          className="text-xs text-purple-400 border border-purple-400/30 px-3 py-1.5 rounded-full"
        >
          Edit Artists
        </button>
      </div>

      {/* 피드 카드 목록 */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4 pb-8">
        {filteredFeed.length > 0 ? (
          filteredFeed.map((item) => (
            <FeedCard key={item.id} item={item} />
          ))
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-20">
            <span className="text-4xl mb-4">🔍</span>
            <p className="text-gray-400 text-sm">
              No updates yet for your selected artists.
            </p>
            <p className="text-gray-600 text-xs mt-1">
              Try adding more artists!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
import type { AdItem } from "../data/adData";
import useThemeStore from "../stores/useThemeStore";

interface Props { ad: AdItem; }

export default function AdBanner({ ad }: Props) {
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  const handleClick = () => window.open(ad.linkUrl, "_blank");

  if (ad.type === "banner") {
    return (
      <div onClick={handleClick} className={`rounded-2xl overflow-hidden border cursor-pointer active:scale-[0.98] transition-all ${isDark ? "border-[#1E1E2E]" : "border-gray-100"}`}>
        <img src={ad.imageUrl} alt={ad.title} className="w-full h-28 object-cover" />
        <div className={`px-4 py-3 flex items-center justify-between ${isDark ? "bg-[#111118]" : "bg-gray-50"}`}>
          <div className="flex items-center gap-2">
            <span className={`text-[9px] px-2 py-0.5 rounded font-bold ${isDark ? "bg-[#E91E63]/15 text-[#E91E63]" : "bg-pink-100 text-[#E91E63]"}`}>AD</span>
            <span className={`text-[11px] ${isDark ? "text-gray-400" : "text-gray-500"}`}>by {ad.sponsor}</span>
          </div>
          <span className="text-[12px] font-bold text-[#E91E63]">{ad.tag} →</span>
        </div>
      </div>
    );
  }

  return (
    <div onClick={handleClick} className={`rounded-2xl overflow-hidden border cursor-pointer active:scale-[0.98] transition-all ${isDark ? "border-[#1E1E2E]" : "border-gray-100"}`}>
      <img src={ad.imageUrl} alt={ad.title} className="w-full h-44 object-cover" />
      <div className={`p-5 flex flex-col gap-2 ${isDark ? "bg-[#111118]" : "bg-gray-50"}`}>
        <div className="flex items-center gap-2">
          <span className={`text-[9px] px-2 py-0.5 rounded font-bold ${isDark ? "bg-[#E91E63]/15 text-[#E91E63]" : "bg-pink-100 text-[#E91E63]"}`}>AD</span>
          <span className={`text-[11px] ${isDark ? "text-gray-400" : "text-gray-500"}`}>by {ad.sponsor}</span>
        </div>
        <h3 className={`text-[15px] font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{ad.title}</h3>
        <p className={`text-[13px] ${isDark ? "text-gray-400" : "text-gray-500"}`}>{ad.description}</p>
        <span className="text-[13px] font-bold text-[#E91E63] mt-1">{ad.tag} →</span>
      </div>
    </div>
  );
}
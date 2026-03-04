export interface Artist {
  id: string;
  name: string;
  group: string;
  emoji: string;
  color: string;
}

export const artists: Artist[] = [
  { id: "bts", name: "BTS", group: "HYBE", emoji: "💜", color: "border-purple-500" },
  { id: "blackpink", name: "BLACKPINK", group: "YG", emoji: "🖤", color: "border-pink-500" },
  { id: "aespa", name: "aespa", group: "SM", emoji: "🪐", color: "border-cyan-400" },
  { id: "stray-kids", name: "Stray Kids", group: "JYP", emoji: "🧭", color: "border-red-500" },
  { id: "newjeans", name: "NewJeans", group: "ADOR", emoji: "🐰", color: "border-blue-400" },
  { id: "seventeen", name: "SEVENTEEN", group: "PLEDIS", emoji: "💎", color: "border-rose-400" },
  { id: "ive", name: "IVE", group: "STARSHIP", emoji: "🌟", color: "border-yellow-400" },
  { id: "txt", name: "TOMORROW X TOGETHER", group: "HYBE", emoji: "🌀", color: "border-sky-400" },
  { id: "le-sserafim", name: "LE SSERAFIM", group: "SOURCE", emoji: "🔥", color: "border-orange-500" },
  { id: "nct", name: "NCT", group: "SM", emoji: "🌌", color: "border-green-400" },
  { id: "ateez", name: "ATEEZ", group: "KQ", emoji: "⚓", color: "border-amber-500" },
  { id: "itzy", name: "ITZY", group: "JYP", emoji: "✨", color: "border-fuchsia-400" },
];

export default artists;
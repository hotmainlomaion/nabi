export interface AdItem {
  id: string;
  type: "banner" | "card";
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  sponsor: string;
  tag: string;
}

const adData: AdItem[] = [
  {
    id: "ad-1",
    type: "banner",
    title: "Official K-POP Merch Store",
    description: "Get exclusive albums, photocards & lightsticks. Free shipping worldwide! 🌍",
    imageUrl: "https://placehold.co/400x120/7c3aed/ffffff?text=Official+K-POP+Merch+Store",
    linkUrl: "https://example.com/merch",
    sponsor: "NABI Shop",
    tag: "Shop Now",
  },
  {
    id: "ad-2",
    type: "card",
    title: "Learn Korean with K-POP 🎵",
    description: "Understand your favorite idols without subtitles. Start your free trial today!",
    imageUrl: "https://placehold.co/400x200/ec4899/ffffff?text=Learn+Korean+with+K-POP",
    linkUrl: "https://example.com/learn-korean",
    sponsor: "LingoPOP",
    tag: "Free Trial",
  },
  {
    id: "ad-3",
    type: "banner",
    title: "Concert Tickets Alert 🎫",
    description: "Never miss a K-POP concert near you. Get early access to ticket drops!",
    imageUrl: "https://placehold.co/400x120/f59e0b/000000?text=K-POP+Concert+Tickets",
    linkUrl: "https://example.com/tickets",
    sponsor: "TicketNABI",
    tag: "Get Alerts",
  },
  {
    id: "ad-4",
    type: "card",
    title: "K-POP Photocard Trading 📸",
    description: "Trade and collect photocards from your favorite groups. Join 500K+ collectors!",
    imageUrl: "https://placehold.co/400x200/06b6d4/ffffff?text=Photocard+Trading+App",
    linkUrl: "https://example.com/photocards",
    sponsor: "CardSwap",
    tag: "Download",
  },
  {
    id: "ad-5",
    type: "banner",
    title: "K-Beauty x K-POP Collab 💄",
    description: "Shop the exact makeup your idols wear. Curated by NABI editors.",
    imageUrl: "https://placehold.co/400x120/e11d48/ffffff?text=K-Beauty+x+K-POP",
    linkUrl: "https://example.com/kbeauty",
    sponsor: "GlowPOP",
    tag: "Shop",
  },
];

export default adData;
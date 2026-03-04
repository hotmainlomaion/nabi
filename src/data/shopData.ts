export interface ShopItem {
  id: string;
  artistId: string;
  artistName: string;
  category: "album" | "lightstick" | "photocard" | "fashion" | "accessory";
  name: string;
  price: string;
  imageUrl: string;
  shopUrl: string;
  badge?: string;
}

const shopData: ShopItem[] = [
  // BTS
  {
    id: "shop-1",
    artistId: "bts",
    artistName: "BTS",
    category: "album",
    name: "BTS - 'Proof' Collector's Edition",
    price: "$52.99",
    imageUrl: "https://placehold.co/200x200/7c3aed/ffffff?text=BTS+Proof",
    shopUrl: "https://example.com/bts-proof",
    badge: "Best Seller",
  },
  {
    id: "shop-2",
    artistId: "bts",
    artistName: "BTS",
    category: "lightstick",
    name: "ARMY BOMB Ver.4 (Official Lightstick)",
    price: "$68.00",
    imageUrl: "https://placehold.co/200x200/a855f7/ffffff?text=ARMY+BOMB",
    shopUrl: "https://example.com/army-bomb",
  },
  // BLACKPINK
  {
    id: "shop-3",
    artistId: "blackpink",
    artistName: "BLACKPINK",
    category: "album",
    name: "BLACKPINK - 'BORN PINK' Box Set",
    price: "$45.99",
    imageUrl: "https://placehold.co/200x200/ec4899/ffffff?text=BORN+PINK",
    shopUrl: "https://example.com/born-pink",
    badge: "New",
  },
  {
    id: "shop-4",
    artistId: "blackpink",
    artistName: "BLACKPINK",
    category: "fashion",
    name: "BLACKPINK x Adidas Collab Hoodie",
    price: "$89.00",
    imageUrl: "https://placehold.co/200x200/f472b6/ffffff?text=BP+Hoodie",
    shopUrl: "https://example.com/bp-hoodie",
  },
  // aespa
  {
    id: "shop-5",
    artistId: "aespa",
    artistName: "aespa",
    category: "album",
    name: "aespa - 'Armageddon' Photobook Ver.",
    price: "$38.99",
    imageUrl: "https://placehold.co/200x200/22d3ee/ffffff?text=Armageddon",
    shopUrl: "https://example.com/armageddon",
    badge: "Hot",
  },
  {
    id: "shop-6",
    artistId: "aespa",
    artistName: "aespa",
    category: "lightstick",
    name: "aespa Official Lightstick",
    price: "$55.00",
    imageUrl: "https://placehold.co/200x200/06b6d4/ffffff?text=aespa+Light",
    shopUrl: "https://example.com/aespa-light",
  },
  // NewJeans
  {
    id: "shop-7",
    artistId: "newjeans",
    artistName: "NewJeans",
    category: "album",
    name: "NewJeans - 'How Sweet' EP",
    price: "$24.99",
    imageUrl: "https://placehold.co/200x200/60a5fa/ffffff?text=How+Sweet",
    shopUrl: "https://example.com/how-sweet",
    badge: "New",
  },
  {
    id: "shop-8",
    artistId: "newjeans",
    artistName: "NewJeans",
    category: "photocard",
    name: "NewJeans Random Photocard Set (5pc)",
    price: "$12.99",
    imageUrl: "https://placehold.co/200x200/3b82f6/ffffff?text=NJ+Cards",
    shopUrl: "https://example.com/nj-cards",
    badge: "Popular",
  },
  // Stray Kids
  {
    id: "shop-9",
    artistId: "stray-kids",
    artistName: "Stray Kids",
    category: "album",
    name: "Stray Kids - 'ATE' Limited Ver.",
    price: "$42.99",
    imageUrl: "https://placehold.co/200x200/ef4444/ffffff?text=SKZ+ATE",
    shopUrl: "https://example.com/skz-ate",
    badge: "#1 Album",
  },
  {
    id: "shop-10",
    artistId: "stray-kids",
    artistName: "Stray Kids",
    category: "accessory",
    name: "STAY Official Keyring + Charm Set",
    price: "$18.00",
    imageUrl: "https://placehold.co/200x200/f87171/ffffff?text=STAY+Keyring",
    shopUrl: "https://example.com/stay-keyring",
  },
  // LE SSERAFIM
  {
    id: "shop-11",
    artistId: "le-sserafim",
    artistName: "LE SSERAFIM",
    category: "album",
    name: "LE SSERAFIM - 'EASY' Album",
    price: "$32.99",
    imageUrl: "https://placehold.co/200x200/f97316/ffffff?text=EASY",
    shopUrl: "https://example.com/easy",
  },
  {
    id: "shop-12",
    artistId: "le-sserafim",
    artistName: "LE SSERAFIM",
    category: "fashion",
    name: "LE SSERAFIM x PUMA Training Set",
    price: "$75.00",
    imageUrl: "https://placehold.co/200x200/fb923c/ffffff?text=LSFM+PUMA",
    shopUrl: "https://example.com/lsfm-puma",
    badge: "Collab",
  },
  // SEVENTEEN
  {
    id: "shop-13",
    artistId: "seventeen",
    artistName: "SEVENTEEN",
    category: "lightstick",
    name: "SEVENTEEN Official Carat Bong Ver.3",
    price: "$62.00",
    imageUrl: "https://placehold.co/200x200/fb7185/ffffff?text=Carat+Bong",
    shopUrl: "https://example.com/carat-bong",
  },
  {
    id: "shop-14",
    artistId: "seventeen",
    artistName: "SEVENTEEN",
    category: "photocard",
    name: "SEVENTEEN Trading Card Pack (8pc)",
    price: "$15.99",
    imageUrl: "https://placehold.co/200x200/f43f5e/ffffff?text=SVT+Cards",
    shopUrl: "https://example.com/svt-cards",
  },
  // IVE
  {
    id: "shop-15",
    artistId: "ive",
    artistName: "IVE",
    category: "album",
    name: "IVE - 'IVE SWITCH' Album",
    price: "$29.99",
    imageUrl: "https://placehold.co/200x200/facc15/000000?text=IVE+SWITCH",
    shopUrl: "https://example.com/ive-switch",
    badge: "New",
  },
];

const categoryLabels: Record<string, { emoji: string; label: string }> = {
  album: { emoji: "💿", label: "Albums" },
  lightstick: { emoji: "🔦", label: "Lightsticks" },
  photocard: { emoji: "📸", label: "Photocards" },
  fashion: { emoji: "👕", label: "Fashion" },
  accessory: { emoji: "🎀", label: "Accessories" },
};

export { categoryLabels };
export default shopData;
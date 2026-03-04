export interface FeedItem {
  id: string;
  artistId: string;
  artistName: string;
  source: "twitter" | "instagram" | "news" | "youtube";
  title: string;
  summary: string;
  timeAgo: string;
  imageUrl?: string;
}

const feedData: FeedItem[] = [
  {
    id: "1",
    artistId: "bts",
    artistName: "BTS",
    source: "twitter",
    title: "RM shares new playlist on Weverse",
    summary: "BTS leader RM just dropped a surprise playlist featuring indie and jazz tracks, saying 'Music heals everything.'",
    timeAgo: "12m ago",
  },
  {
    id: "2",
    artistId: "blackpink",
    artistName: "BLACKPINK",
    source: "instagram",
    title: "Jennie posts from Paris Fashion Week",
    summary: "BLACKPINK's Jennie shared stunning behind-the-scenes photos from her Chanel ambassador appearance at Paris Fashion Week 2025.",
    timeAgo: "38m ago",
    imageUrl: "https://placehold.co/400x250/1a1a2e/e040fb?text=BLACKPINK+%F0%9F%96%A4",
  },
  {
    id: "3",
    artistId: "aespa",
    artistName: "aespa",
    source: "news",
    title: "aespa announces world tour 'SYNK: PARALLEL LINE'",
    summary: "SM Entertainment confirmed aespa will kick off their second world tour in Seoul this August, covering 25 cities worldwide.",
    timeAgo: "1h ago",
  },
  {
    id: "4",
    artistId: "newjeans",
    artistName: "NewJeans",
    source: "youtube",
    title: "NewJeans 'How Sweet' MV hits 200M views",
    summary: "The music video for NewJeans' hit single 'How Sweet' has officially surpassed 200 million views on YouTube.",
    timeAgo: "2h ago",
    imageUrl: "https://placehold.co/400x250/1a1a2e/60a5fa?text=NewJeans+%F0%9F%90%B0",
  },
  {
    id: "5",
    artistId: "stray-kids",
    artistName: "Stray Kids",
    source: "news",
    title: "Stray Kids top Billboard 200 for the 4th time",
    summary: "Stray Kids' latest album debuted at #1 on the Billboard 200, making them the only K-pop group to achieve this four times.",
    timeAgo: "3h ago",
  },
  {
    id: "6",
    artistId: "le-sserafim",
    artistName: "LE SSERAFIM",
    source: "twitter",
    title: "Kazuha shares dance practice vlog",
    summary: "LE SSERAFIM's Kazuha posted a behind-the-scenes vlog showing the intense choreography preparation for their upcoming comeback.",
    timeAgo: "4h ago",
  },
  {
    id: "7",
    artistId: "seventeen",
    artistName: "SEVENTEEN",
    source: "instagram",
    title: "SEVENTEEN's Hoshi posts cat photos again",
    summary: "Hoshi once again blessed fans with adorable cat photos on Instagram, captioned with his signature tiger emoji.",
    timeAgo: "5h ago",
    imageUrl: "https://placehold.co/400x250/1a1a2e/fb7185?text=SEVENTEEN+%F0%9F%92%8E",
  },
  {
    id: "8",
    artistId: "ive",
    artistName: "IVE",
    source: "youtube",
    title: "IVE 'HEYA' dance challenge goes viral on TikTok",
    summary: "IVE's catchy 'HEYA' choreography has taken over TikTok with over 5 million user-created videos in just one week.",
    timeAgo: "6h ago",
  },
];

export default feedData;
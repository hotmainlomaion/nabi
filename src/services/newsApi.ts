const API_KEY = "ec99a04fcb75498b816b41dd0f2f9aef";
const BASE_URL = "https://newsapi.org/v2/everything";

export interface NewsArticle {
  id: string;
  artistId: string;
  artistName: string;
  source: "news";
  title: string;
  summary: string;
  timeAgo: string;
  imageUrl?: string;
  url: string;
}

function timeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour}h ago`;
  const diffDay = Math.floor(diffHour / 24);
  return `${diffDay}d ago`;
}

export async function fetchNewsByArtist(
  artistId: string,
  artistName: string
): Promise<NewsArticle[]> {
  const query = `${artistName} kpop`;
  const url = `${BASE_URL}?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&pageSize=5&apiKey=${API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.status !== "ok" || !data.articles) {
    return [];
  }

  return data.articles
    .filter((a: any) => a.title && a.title !== "[Removed]")
    .map((a: any, i: number) => ({
      id: `${artistId}-${i}`,
      artistId,
      artistName,
      source: "news" as const,
      title: a.title,
      summary: a.description || "No description available.",
      timeAgo: timeAgo(a.publishedAt),
      imageUrl: a.urlToImage || undefined,
      url: a.url,
    }));
}

export async function fetchNewsForArtists(
  artists: { id: string; name: string }[]
): Promise<NewsArticle[]> {
  const results = await Promise.all(
    artists.map((a) => fetchNewsByArtist(a.id, a.name))
  );

  return results
    .flat()
    .sort((a, b) => {
      // 최신순 정렬
      const getMinutes = (t: string) => {
        const num = parseInt(t);
        if (t.includes("m")) return num;
        if (t.includes("h")) return num * 60;
        if (t.includes("d")) return num * 1440;
        return 9999;
      };
      return getMinutes(a.timeAgo) - getMinutes(b.timeAgo);
    });
}
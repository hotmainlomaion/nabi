export function getSourceLabel(source: string) {
  switch (source) {
    case "twitter":
      return { icon: "𝕏", label: "Twitter / X", bg: "bg-gray-700" };
    case "instagram":
      return { icon: "📷", label: "Instagram", bg: "bg-pink-900/50" };
    case "news":
      return { icon: "📰", label: "News", bg: "bg-blue-900/50" };
    case "youtube":
      return { icon: "▶", label: "YouTube", bg: "bg-red-900/50" };
    default:
      return { icon: "🔗", label: "Link", bg: "bg-gray-700" };
  }
}
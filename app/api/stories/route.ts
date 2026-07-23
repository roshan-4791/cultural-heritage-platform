import { NextResponse } from 'next/server'

export interface Story {
  id: string
  title: string
  category: string
  description: string
  youtubeUrl: string
  youtubeId?: string
  uploader: string
  date: string
  thumbnail?: string
  language: string
  region?: string
}

export function extractYoutubeId(url: string): string {
  if (!url) return ''
  // Support standard watch, shorts, embed, youtu.be links
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|shorts\/|watch\?v=|watch\?.+&v=))([\w-]{11})/)
  return (match && match[1]) ? match[1] : ''
}

// Default Stories from YouTube Channel @ashrithvenkat5507 (Parayakadavu, Karunagappally, Kollam, Kerala)
const channelStories: Story[] = [
  {
    id: "1",
    title: "Tsunami Survival & Coastal Memories — Parayakadavu",
    category: "Oral History & Traditions",
    description: "Elder oral accounts of the 2004 Indian Ocean Tsunami impact, survival stories, and community resilience recorded in Parayakadavu, Karunagappally, Kollam, Kerala.",
    youtubeUrl: "https://youtu.be/BFVAHkUZlbM",
    youtubeId: "BFVAHkUZlbM",
    uploader: "Woona Venkat Ashrith (@ashrithvenkat5507)",
    date: "2025-02-15",
    thumbnail: "https://img.youtube.com/vi/BFVAHkUZlbM/hqdefault.jpg",
    language: "Malayalam",
    region: "Parayakadavu, Karunagappally, Kollam, Kerala"
  },
  {
    id: "2",
    title: "Childhood Memories & Village Festivals of Coastal Kollam",
    category: "Folk Lore & Living Traditions",
    description: "Village elders sharing cherished memories of traditional temple festivals, community gatherings, and childhood life in Parayakadavu before the tsunami.",
    youtubeUrl: "https://youtu.be/SPA1q-FKIbk",
    youtubeId: "SPA1q-FKIbk",
    uploader: "Woona Venkat Ashrith (@ashrithvenkat5507)",
    date: "2025-02-14",
    thumbnail: "https://img.youtube.com/vi/SPA1q-FKIbk/hqdefault.jpg",
    language: "Malayalam",
    region: "Parayakadavu, Karunagappally, Kollam, Kerala"
  },
  {
    id: "3",
    title: "Coastal Village Heritage & Traditional Livelihoods",
    category: "Folk Lore & Living Traditions",
    description: "Documenting traditional fishing heritage, coir weaving, and coastal village customs recorded during student field research in Karunagappally.",
    youtubeUrl: "https://youtu.be/gbQPp88oiC8",
    youtubeId: "gbQPp88oiC8",
    uploader: "Woona Venkat Ashrith (@ashrithvenkat5507)",
    date: "2025-02-12",
    thumbnail: "https://img.youtube.com/vi/gbQPp88oiC8/hqdefault.jpg",
    language: "Malayalam",
    region: "Parayakadavu, Karunagappally, Kollam, Kerala"
  },
  {
    id: "4",
    title: "Oral Traditions & Elder Wisdom — Parayakadavu Community",
    category: "Oral History & Traditions",
    description: "First-hand accounts of traditional life, maritime folklore, and generational wisdom shared by village matriarchs and patriarchs.",
    youtubeUrl: "https://youtu.be/BMPZDY0kE18",
    youtubeId: "BMPZDY0kE18",
    uploader: "Woona Venkat Ashrith (@ashrithvenkat5507)",
    date: "2025-02-10",
    thumbnail: "https://img.youtube.com/vi/BMPZDY0kE18/hqdefault.jpg",
    language: "Malayalam",
    region: "Parayakadavu, Karunagappally, Kollam, Kerala"
  },
  {
    id: "5",
    title: "Post-Tsunami Community Rebuilding & Cultural Resilience",
    category: "Oral History & Traditions",
    description: "Reflections on how the Parayakadavu community preserved their cultural identity, festivals, and social cohesion after the 2004 tsunami disaster.",
    youtubeUrl: "https://youtu.be/Y6raIybQXng",
    youtubeId: "Y6raIybQXng",
    uploader: "Woona Venkat Ashrith (@ashrithvenkat5507)",
    date: "2025-02-08",
    thumbnail: "https://img.youtube.com/vi/Y6raIybQXng/hqdefault.jpg",
    language: "Malayalam",
    region: "Parayakadavu, Karunagappally, Kollam, Kerala"
  },
  {
    id: "6",
    title: "Traditional Sacred Rituals & Temple Arts of Karunagappally",
    category: "Folk Lore & Living Traditions",
    description: "Exploring sacred village rituals, traditional folk songs, and festive art forms preserved across generations in coastal Kollam.",
    youtubeUrl: "https://youtu.be/eUHDZU-fcks",
    youtubeId: "eUHDZU-fcks",
    uploader: "Woona Venkat Ashrith (@ashrithvenkat5507)",
    date: "2025-02-06",
    thumbnail: "https://img.youtube.com/vi/eUHDZU-fcks/hqdefault.jpg",
    language: "Malayalam",
    region: "Parayakadavu, Karunagappally, Kollam, Kerala"
  },
  {
    id: "7",
    title: "Voices of Coastal Elders — Childhood & Vanishing Heritage",
    category: "Oral History & Traditions",
    description: "Heartfelt interviews capturing childhood games, ancient folk songs, and disappearing village customs documented by the Amrita SSR team.",
    youtubeUrl: "https://youtu.be/p70aWRcXSJg",
    youtubeId: "p70aWRcXSJg",
    uploader: "Woona Venkat Ashrith (@ashrithvenkat5507)",
    date: "2025-02-04",
    thumbnail: "https://img.youtube.com/vi/p70aWRcXSJg/hqdefault.jpg",
    language: "Malayalam",
    region: "Parayakadavu, Karunagappally, Kollam, Kerala"
  },
  {
    id: "8",
    title: "Amrita SSR Field Research — Parayakadavu Heritage Vault",
    category: "Folk Lore & Living Traditions",
    description: "Comprehensive student research archive recording oral histories, tsunami experiences, and cultural traditions in Karunagappally, Kollam.",
    youtubeUrl: "https://youtu.be/XFbpFGPS81s",
    youtubeId: "XFbpFGPS81s",
    uploader: "Woona Venkat Ashrith (@ashrithvenkat5507)",
    date: "2025-02-02",
    thumbnail: "https://img.youtube.com/vi/XFbpFGPS81s/hqdefault.jpg",
    language: "Malayalam",
    region: "Parayakadavu, Karunagappally, Kollam, Kerala"
  }
]

let storiesStore: Story[] = [...channelStories]

export async function GET() {
  return NextResponse.json({ success: true, stories: storiesStore })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, category, description, videoUrl, uploader, language, region } = body

    if (!title || !category) {
      return NextResponse.json({ success: false, message: "Title and category are required." }, { status: 400 })
    }

    const youtubeId = extractYoutubeId(videoUrl || "")

    const newStory: Story = {
      id: Date.now().toString(),
      title,
      category,
      description: description || "Authentic story recorded in Parayakadavu, Karunagappally, Kollam, Kerala.",
      youtubeUrl: videoUrl || "https://www.youtube.com/@ashrithvenkat5507",
      youtubeId: youtubeId,
      uploader: uploader || "Woona Venkat Ashrith (@ashrithvenkat5507)",
      date: new Date().toISOString().split("T")[0],
      thumbnail: youtubeId ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` : "/cultural-video-thumbnail.jpg",
      language: language || "Malayalam",
      region: region || "Parayakadavu, Karunagappally, Kollam, Kerala"
    }

    storiesStore.unshift(newStory)
    return NextResponse.json({ success: true, story: newStory, stories: storiesStore })
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request payload" }, { status: 500 })
  }
}


import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const accessToken = process.env.GOOGLE_PHOTOS_ACCESS_TOKEN

    if (!accessToken) {
      return NextResponse.json({ error: "Google Photos access token not configured" }, { status: 500 })
    }

    // Fetch videos from Google Photos Library
    const response = await fetch("https://photoslibrary.googleapis.com/v1/mediaItems:search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        pageSize: 50,
        filters: {
          mediaTypeFilter: {
            mediaTypes: ["VIDEO"],
          },
        },
      }),
    })

    if (!response.ok) {
      console.error("Google Photos API error:", response.statusText)
      return NextResponse.json({ error: "Failed to fetch videos from Google Photos" }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching Google Photos:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

import { NextResponse } from 'next/server'

/**
 * GET /api/transcript?videoId=XXXXXXXX&lang=ml
 *
 * Multi-fallback YouTube caption extractor:
 * Passes client IP headers to YouTube Innertube API to ensure valid signature generation on timedtext URLs.
 */

interface CaptionTrack {
  baseUrl: string
  languageCode: string
  name?: { simpleText?: string }
  kind?: string // 'asr' = auto-generated
}

interface CaptionEvent {
  tStartMs: number
  dDurationMs?: number
  segs?: Array<{ utf8: string }>
}

async function fetchPlayerResponse(videoId: string, clientIp: string, clientName: string, clientVersion: string, extraContext: object = {}) {
  try {
    const res = await fetch(
      'https://www.youtube.com/youtubei/v1/player?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': clientName === 'ANDROID' 
            ? 'com.google.android.youtube/19.09.37 (Linux; U; Android 11; en_US)'
            : 'com.google.ios.youtube/19.29.1 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X)',
          'X-YouTube-Client-Name': clientName === 'ANDROID' ? '3' : '5',
          'X-YouTube-Client-Version': clientVersion,
          'X-Forwarded-For': clientIp,
        },
        body: JSON.stringify({
          context: {
            client: {
              clientName,
              clientVersion,
              hl: 'en',
              gl: 'IN',
              ...extraContext
            },
          },
          videoId,
        }),
      }
    )

    if (!res.ok) return null
    return await res.json()
  } catch (e) {
    console.warn(`Fetch player response error for ${clientName}:`, e)
    return null
  }
}

function parseXmlCaptions(xmlText: string) {
  const captions: { start: number; dur: number; text: string }[] = []
  const regex = /<text\s+start="([\d.]+)"(?:[^>]*?dur="([\d.]+)")?[^>]*?>([\s\S]*?)<\/text>/gi
  let match
  while ((match = regex.exec(xmlText)) !== null) {
    const start = Math.round(parseFloat(match[1]))
    const dur = match[2] ? Math.round(parseFloat(match[2])) : 3
    const rawText = match[3]
      .replace(/<[^>]+>/g, '')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&#10;/g, ' ')
      .replace(/\n/g, ' ')
      .trim()

    if (rawText) {
      captions.push({ start, dur, text: rawText })
    }
  }
  return captions
}

function parseJson3Captions(jsonText: string) {
  try {
    const captionData = JSON.parse(jsonText)
    const events: CaptionEvent[] = captionData?.events ?? []

    return events
      .filter((e) => e.segs && e.segs.length > 0)
      .map((e) => ({
        start: Math.round(e.tStartMs / 1000),
        dur: Math.round((e.dDurationMs ?? 2000) / 1000),
        text: e.segs!
          .map((s) => s.utf8)
          .join('')
          .replace(/\n/g, ' ')
          .trim()
      }))
      .filter((c) => c.text && c.text !== ' ')
  } catch {
    return []
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const videoId = searchParams.get('videoId')
  const lang = searchParams.get('lang') || 'ml'

  if (!videoId || videoId.length !== 11) {
    return NextResponse.json({ error: 'Invalid videoId' }, { status: 400 })
  }

  // Extract real client IP
  const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() 
    || request.headers.get('x-real-ip') 
    || '1.1.1.1'

  try {
    let captionTracks: CaptionTrack[] = []

    // Attempt 1: ANDROID client API with client IP
    let playerData = await fetchPlayerResponse(videoId, clientIp, 'ANDROID', '19.09.37', { androidSdkVersion: 30 })
    captionTracks = playerData?.captions?.playerCaptionsTracklistRenderer?.captionTracks ?? []

    // Attempt 2: IOS client API
    if (!captionTracks.length) {
      playerData = await fetchPlayerResponse(videoId, clientIp, 'IOS', '19.29.1', { osName: 'iOS', osVersion: '17.5.1' })
      captionTracks = playerData?.captions?.playerCaptionsTracklistRenderer?.captionTracks ?? []
    }

    if (!captionTracks.length) {
      return NextResponse.json({
        captions: [],
        note: 'No captions available for this video.',
        videoId,
        availableLangs: [],
      })
    }

    const findTrack = () => {
      let t = captionTracks.find(t => t.languageCode === lang)
      if (t) return t
      t = captionTracks.find(t => t.languageCode?.startsWith(lang))
      if (t) return t
      t = captionTracks.find(t => t.kind === 'asr')
      if (t) return t
      t = captionTracks.find(t => t.languageCode === 'en')
      if (t) return t
      return captionTracks[0]
    }

    const track = findTrack()
    const cleanBaseUrl = track.baseUrl.replace(/&amp;/g, '&')

    // Prepare URLs to try
    const urlsToTry = [
      cleanBaseUrl,
      cleanBaseUrl.includes('fmt=') ? cleanBaseUrl : cleanBaseUrl + '&fmt=srv1',
      cleanBaseUrl.includes('fmt=') ? cleanBaseUrl : cleanBaseUrl + '&fmt=json3',
      // If signature contains ip=0.0.0.0 or fails, try stripping signature/ip parameters:
      `https://www.youtube.com/api/timedtext?v=${videoId}&lang=${track.languageCode}${track.kind === 'asr' ? '&kind=asr' : ''}&fmt=srv1`
    ]

    let captions: { start: number; dur: number; text: string }[] = []
    let debugInfo: string[] = []

    for (const url of urlsToTry) {
      try {
        const res = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
            'Accept-Language': 'en-US,en;q=0.9',
            'X-Forwarded-For': clientIp,
          }
        })
        if (!res.ok) {
          debugInfo.push(`URL ${url} status ${res.status}`)
          continue
        }

        const rawText = await res.text()
        if (!rawText || !rawText.trim()) {
          debugInfo.push(`URL ${url} returned empty body`)
          continue
        }

        if (rawText.trim().startsWith('{')) {
          captions = parseJson3Captions(rawText)
        } else {
          captions = parseXmlCaptions(rawText)
        }

        if (captions.length > 0) break
        debugInfo.push(`URL ${url} parsed 0 captions from length ${rawText.length}`)
      } catch (e) {
        debugInfo.push(`URL ${url} error ${e instanceof Error ? e.message : String(e)}`)
      }
    }

    return NextResponse.json({
      captions,
      lang: track.languageCode,
      langName: track.name?.simpleText ?? track.languageCode,
      isAutoGenerated: track.kind === 'asr',
      videoId,
      baseUrl: cleanBaseUrl, // Also return baseUrl so client can fetch directly if needed
      availableLangs: captionTracks.map(t => ({
        code: t.languageCode,
        name: t.name?.simpleText ?? t.languageCode,
        auto: t.kind === 'asr',
      })),
      ...(captions.length === 0 ? { debugInfo } : {})
    })

  } catch (error) {
    console.error('Transcript fetch error:', error)
    return NextResponse.json({
      captions: [],
      note: `Could not retrieve captions: ${error instanceof Error ? error.message : 'Unknown error'}`,
      videoId,
    }, { status: 200 })
  }
}

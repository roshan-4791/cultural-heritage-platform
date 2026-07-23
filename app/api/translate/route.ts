import { NextResponse } from 'next/server'

/**
 * POST /api/translate
 * Body: { text: string, targetLang: string, sourceLang?: string }
 * Returns: { translatedText: string }
 *
 * Uses MyMemory FREE Translation API — no API key required!
 * - Free: 5,000 chars/day (anonymous)
 * - Free: 50,000 chars/day (with optional MYMEMORY_EMAIL in .env.local)
 * - Supports: Malayalam (ml), Hindi (hi), Tamil (ta), Telugu (te), Kannada (kn), etc.
 * - Docs: https://mymemory.translated.net/doc/spec.php
 */
export async function POST(request: Request) {
  try {
    const { text, targetLang, sourceLang = 'auto' } = await request.json()

    if (!text || !targetLang) {
      return NextResponse.json({ error: 'Missing text or targetLang' }, { status: 400 })
    }

    // MyMemory language pair format: "en|hi", "auto|ml", etc.
    const langPair = sourceLang === 'auto' ? `en|${targetLang}` : `${sourceLang}|${targetLang}`

    // Optional: add your email in .env.local as MYMEMORY_EMAIL to get 50K chars/day instead of 5K
    const email = process.env.MYMEMORY_EMAIL ?? ''
    const emailParam = email ? `&de=${encodeURIComponent(email)}` : ''

    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langPair}${emailParam}`

    const response = await fetch(url, {
      headers: { 'Accept': 'application/json' }
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('MyMemory API error:', err)
      return NextResponse.json({ translatedText: text, error: 'Translation API error' })
    }

    const data = await response.json()

    // MyMemory response structure
    const translatedText = data?.responseData?.translatedText ?? text
    const responseStatus = data?.responseStatus

    // Status 200 or 206 = OK (206 = translated but low confidence)
    if (responseStatus !== 200 && responseStatus !== 206) {
      console.warn('MyMemory non-OK status:', responseStatus, data?.responseDetails)
      return NextResponse.json({ translatedText: text, note: data?.responseDetails ?? 'Translation unavailable' })
    }

    return NextResponse.json({ translatedText })

  } catch (error) {
    console.error('Translate route error:', error)
    return NextResponse.json({ translatedText: '', error: 'Internal error' }, { status: 500 })
  }
}

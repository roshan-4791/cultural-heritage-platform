"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"

// Types
interface Story {
  id: string
  title: string
  category: string
  description: string
  youtubeUrl?: string
  youtubeId?: string
  uploader: string
  date: string
  thumbnail?: string
  language: string
  region?: string
}

/* ─────────────────────────────────────────────────────────────
   Sacred Particle Canvas — floating petals, warm particles
───────────────────────────────────────────────────────────── */
function SacredCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const symbols = ["🪷", "✦", "❋", "⊹", "✿", "॰"]
    const particles: {
      x: number; y: number; vx: number; vy: number
      size: number; opacity: number; symbol: string; rotation: number; rotV: number
    }[] = []

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.6 - 0.1,
        size: Math.random() * 14 + 8,
        opacity: Math.random() * 0.3 + 0.05,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        rotation: Math.random() * Math.PI * 2,
        rotV: (Math.random() - 0.5) * 0.015,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        ctx.save()
        ctx.globalAlpha = p.opacity
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation)
        ctx.font = `${p.size}px serif`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(p.symbol, 0, 0)
        ctx.restore()

        p.x += p.vx
        p.y += p.vy
        p.rotation += p.rotV

        if (p.y < -30) { p.y = canvas.height + 30; p.x = Math.random() * canvas.width }
        if (p.x < -30) p.x = canvas.width + 30
        if (p.x > canvas.width + 30) p.x = -30
      })
      animRef.current = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
        pointerEvents: "none", zIndex: 0, opacity: 0.5,
      }}
    />
  )
}

/* ─────────────────────────────────────────────────────────────
   Rangoli Corner & Center Art Animations
───────────────────────────────────────────────────────────── */
function RangoliCorner({ position = "top-left", size = 180 }: { position?: "top-left" | "top-right" | "bottom-left" | "bottom-right"; size?: number }) {
  const styles: React.CSSProperties = {
    position: "absolute",
    pointerEvents: "none",
    zIndex: 1,
    opacity: 0.22,
    filter: "drop-shadow(0 0 8px rgba(255, 119, 34, 0.4))",
  }

  if (position === "top-left") { styles.top = 0; styles.left = 0 }
  if (position === "top-right") { styles.top = 0; styles.right = 0; styles.transform = "scaleX(-1)" }
  if (position === "bottom-left") { styles.bottom = 0; styles.left = 0; styles.transform = "scaleY(-1)" }
  if (position === "bottom-right") { styles.bottom = 0; styles.right = 0; styles.transform = "scale(-1)" }

  return (
    <svg width={size} height={size} viewBox="0 0 200 200" style={styles}>
      <g className="rangoli-spin">
        {[0, 15, 30, 45, 60, 75, 90].map((a, i) => (
          <circle key={i} cx={100 + 80 * Math.cos((a * Math.PI) / 180)} cy={100 + 80 * Math.sin((a * Math.PI) / 180)} r="3" fill="#D4AF37" />
        ))}
        {[0, 30, 60, 90].map((a, i) => (
          <g key={i} transform={`rotate(${a} 100 100)`}>
            <path d="M100,100 Q120,40 140,100 Q120,160 100,100 Z" fill="none" stroke="#FF7722" strokeWidth="1.5" />
            <circle cx="120" cy="70" r="4" fill="#E8789A" />
            <path d="M100,100 L120,50" stroke="#D4AF37" strokeWidth="1" strokeDasharray="2 2" />
          </g>
        ))}
        <circle cx="100" cy="100" r="25" fill="none" stroke="#D4AF37" strokeWidth="2" />
        <circle cx="100" cy="100" r="12" fill="#FF7722" opacity="0.6" />
        <text x="100" y="105" textAnchor="middle" fontSize="14" fill="#FFD700">🪷</text>
      </g>
    </svg>
  )
}

function RangoliCenterMotif({ size = 240 }: { size?: number }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "2rem auto", position: "relative" }}>
      <svg width={size} height={size} viewBox="0 0 300 300" style={{ opacity: 0.35, animation: "rangoliPulse 8s ease-in-out infinite" }}>
        <g transform="translate(150,150)">
          <g style={{ animation: "mandalaRotate 35s linear infinite" }}>
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a, i) => (
              <g key={i} transform={`rotate(${a})`}>
                <path d="M0,0 Q25,-60 50,0 Q25,60 0,0 Z" fill="none" stroke={i % 2 === 0 ? "#FF7722" : "#D4AF37"} strokeWidth="1.5" />
                <circle cx="25" cy="-40" r="4" fill={i % 2 === 0 ? "#E8789A" : "#FFD700"} />
              </g>
            ))}
            <circle cx="0" cy="0" r="60" fill="none" stroke="#D4AF37" strokeWidth="2" strokeDasharray="6 4" />
            <circle cx="0" cy="0" r="90" fill="none" stroke="#FF7722" strokeWidth="1" />
          </g>
          <g style={{ animation: "mandalaRevRotate 25s linear infinite" }}>
            {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (
              <circle key={i} cx={35 * Math.cos((a * Math.PI) / 180)} cy={35 * Math.sin((a * Math.PI) / 180)} r="5" fill="#FF7722" />
            ))}
          </g>
          <circle cx="0" cy="0" r="20" fill="#6B1A1A" />
          <text x="0" y="7" textAnchor="middle" fontSize="18" fill="#FFD700">🌿</text>
        </g>
      </svg>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Lotus SVG — blooms on mount
───────────────────────────────────────────────────────────── */
function LotusBloom({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" className="lotus-bloom">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <ellipse
          key={i}
          cx="60" cy="60" rx="12" ry="30"
          fill={i % 2 === 0 ? "#E8789A" : "#F4A7B9"}
          opacity="0.85"
          style={{
            transformOrigin: "60px 60px",
            transform: `rotate(${angle}deg) translateY(-18px)`,
            animation: `petalBloom 1.8s ease-out ${i * 0.12}s both`,
          }}
        />
      ))}
      <circle cx="60" cy="60" r="14" fill="#FFD700" opacity="0.95"
        style={{ animation: "centerGlow 2s ease-out 1s both" }} />
      <circle cx="60" cy="60" r="8" fill="#FF7722" opacity="0.9" />
    </svg>
  )
}

/* ─────────────────────────────────────────────────────────────
   Mandala SVG Watermark
───────────────────────────────────────────────────────────── */
function Mandala({ size = 300, opacity = 0.06, spinning = true }: { size?: number; opacity?: number; spinning?: boolean }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 300 300"
      style={{
        opacity,
        animation: spinning ? "mandalaRotate 40s linear infinite" : "none",
        flexShrink: 0,
      }}
    >
      <g transform="translate(150,150)">
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a, i) => (
          <g key={i} transform={`rotate(${a})`}>
            <ellipse cx="0" cy="-55" rx="8" ry="22" fill="none" stroke="#D4AF37" strokeWidth="1.2" opacity="0.8" />
            <ellipse cx="0" cy="-90" rx="5" ry="15" fill="none" stroke="#FF7722" strokeWidth="1" opacity="0.7" />
            <circle cx="0" cy="-115" r="3" fill="#D4AF37" opacity="0.6" />
          </g>
        ))}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (
          <g key={i} transform={`rotate(${a})`}>
            <path d="M0,-30 L8,-55 L0,-75 L-8,-55 Z" fill="none" stroke="#FF7722" strokeWidth="1" opacity="0.5" />
          </g>
        ))}
        <circle cx="0" cy="0" r="28" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="48" fill="none" stroke="#FF7722" strokeWidth="1" strokeDasharray="4 3" />
        <circle cx="0" cy="0" r="70" fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="6 4" />
        <circle cx="0" cy="0" r="100" fill="none" stroke="#FF7722" strokeWidth="0.8" strokeDasharray="3 5" />
        <circle cx="0" cy="0" r="130" fill="none" stroke="#D4AF37" strokeWidth="0.8" />
        <text x="0" y="8" textAnchor="middle" fontSize="22" fill="#FF7722" opacity="0.8" fontFamily="serif">🌿</text>
      </g>
    </svg>
  )
}

/* ─────────────────────────────────────────────────────────────
   Section Ornament Divider
───────────────────────────────────────────────────────────── */
function OrnamentDivider({ light = false }: { light?: boolean }) {
  const c = light ? "#F5E6D3" : "#D4AF37"
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem 0", gap: "1rem" }}>
      <div style={{ flex: 1, height: "1px", background: `linear-gradient(to right, transparent, ${c})` }} />
      <span style={{ fontSize: "1.4rem", color: c, lineHeight: 1 }}>❋ 🌿 ❋</span>
      <div style={{ flex: 1, height: "1px", background: `linear-gradient(to left, transparent, ${c})` }} />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Diya Flame Component
───────────────────────────────────────────────────────────── */
function Diya() {
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", margin: "0 0.5rem" }}>
      <div className="diya-flame">🔥</div>
      <div style={{ fontSize: "1.4rem" }}>🪔</div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Video Modal — Embedded YouTube Player with In-Player Language Selector
───────────────────────────────────────────────────────────── */
/* ─────────────────────────────────────────────────────────────
   Caption/Subtitle types
───────────────────────────────────────────────────────────── */
type CaptionSegment = { start: number; dur: number; text: string }
type TranslatedCaptions = Record<string, CaptionSegment[]>

/* ─────────────────────────────────────────────────────────────
   VideoModal — AI Translation (Google Cloud Translate)
───────────────────────────────────────────────────────────── */
function VideoModal({ story, onClose }: { story: Story | null; onClose: () => void }) {
  const [activeLang, setActiveLang] = useState("en")
  const [captions, setCaptions] = useState<CaptionSegment[]>([])
  const [translatedCaptions, setTranslatedCaptions] = useState<TranslatedCaptions>({})
  const [currentCaption, setCurrentCaption] = useState<string>("")
  const [captionLoading, setCaptionLoading] = useState(false)
  const [captionNote, setCaptionNote] = useState<string>("")
  const [translatedDesc, setTranslatedDesc] = useState<string>("")
  const [descLoading, setDescLoading] = useState(false)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const captionIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिन्दी (Hindi)" },
    { code: "sa", name: "संस्कृत (Sanskrit)" },
    { code: "te", name: "తెలుగు (Telugu)" },
    { code: "ta", name: "தமிழ் (Tamil)" },
    { code: "kn", name: "ಕನ್ನಡ (Kannada)" },
    { code: "ml", name: "മലയാളം (Malayalam)" },
    { code: "mr", name: "मराठी (Marathi)" },
  ]

  // ── Lock scroll + ESC close ──
  useEffect(() => {
    if (!story) return
    const orig = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handleKey)
    return () => {
      document.body.style.overflow = orig || "unset"
      window.removeEventListener("keydown", handleKey)
    }
  }, [story, onClose])

  // ── Fetch transcript when story changes ──
  useEffect(() => {
    if (!story?.youtubeId || story.youtubeId.length !== 11) return
    setCaptions([])
    setTranslatedCaptions({})
    setCurrentCaption("")
    setCaptionNote("")
    setCaptionLoading(true)

    const parseXml = (xmlText: string) => {
      const segs: CaptionSegment[] = []
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
        if (rawText) segs.push({ start, dur, text: rawText })
      }
      return segs
    }

    fetch(`/api/transcript?videoId=${story.youtubeId}&lang=ml`)
      .then(r => r.json())
      .then(async data => {
        let list: CaptionSegment[] = data.captions || []
        
        // Fallback: if server IP signature blocked direct server fetch, fetch baseUrl from client browser
        if (!list.length && data.baseUrl) {
          try {
            const clientRes = await fetch(data.baseUrl)
            if (clientRes.ok) {
              const raw = await clientRes.text()
              list = parseXml(raw)
            }
          } catch (e) {
            console.warn("Client caption fetch fallback error:", e)
          }
        }

        if (list.length > 0) {
          setCaptions(list)
          setTranslatedCaptions(prev => ({ ...prev, [data.lang || 'ml']: list }))
          const autoLabel = data.isAutoGenerated ? ' (auto-generated)' : ''
          setCaptionNote(`✅ ${list.length} subtitle segments loaded in ${data.langName || 'Malayalam'}${autoLabel}`)
        } else {
          setCaptionNote(data.note || "ℹ️ No subtitles found for this video.")
        }
      })
      .catch(() => setCaptionNote("⚠️ Could not connect to subtitle service."))
      .finally(() => setCaptionLoading(false))
  }, [story?.youtubeId])

  // ── Simulated time tracker (advances every second after play) ──
  useEffect(() => {
    if (captionIntervalRef.current) clearInterval(captionIntervalRef.current)
    if (!story) return
    setElapsedSeconds(0)
    captionIntervalRef.current = setInterval(() => {
      setElapsedSeconds(s => s + 1)
    }, 1000)
    return () => {
      if (captionIntervalRef.current) clearInterval(captionIntervalRef.current)
    }
  }, [story?.youtubeId, activeLang])

  // ── Find matching caption for current time ──
  useEffect(() => {
    const src = translatedCaptions[activeLang] || captions
    if (!src.length) { setCurrentCaption(""); return }
    const seg = src.find(c => elapsedSeconds >= c.start && elapsedSeconds < c.start + c.dur)
    setCurrentCaption(seg?.text ?? "")
  }, [elapsedSeconds, captions, translatedCaptions, activeLang])

  // ── Translate captions when language changes ──
  useEffect(() => {
    if (!captions.length || activeLang === "en") return
    if (translatedCaptions[activeLang]) return // already translated

    // MyMemory limit: ~500 chars per request — chunk captions into groups
    const CHUNK_CHAR_LIMIT = 400
    const chunks: { texts: string[], indices: number[] }[] = []
    let currentChunk: string[] = []
    let currentIndices: number[] = []
    let currentLen = 0

    captions.forEach((c, i) => {
      const piece = c.text + ' ||| '
      if (currentLen + piece.length > CHUNK_CHAR_LIMIT && currentChunk.length > 0) {
        chunks.push({ texts: currentChunk, indices: currentIndices })
        currentChunk = [c.text]
        currentIndices = [i]
        currentLen = piece.length
      } else {
        currentChunk.push(c.text)
        currentIndices.push(i)
        currentLen += piece.length
      }
    })
    if (currentChunk.length > 0) chunks.push({ texts: currentChunk, indices: currentIndices })

    setCaptionLoading(true)
    const translatedArr: CaptionSegment[] = [...captions]

    // Translate each chunk sequentially to avoid rate limits
    const translateChunks = async () => {
      for (const chunk of chunks) {
        const batchText = chunk.texts.join(' ||| ')
        try {
          const res = await fetch('/api/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: batchText, targetLang: activeLang })
          })
          const data = await res.json()
          if (data.translatedText) {
            const parts: string[] = data.translatedText.split(' ||| ')
            chunk.indices.forEach((origIdx, j) => {
              translatedArr[origIdx] = { ...captions[origIdx], text: parts[j] || captions[origIdx].text }
            })
          }
          // Small delay between chunks to respect rate limits
          await new Promise(r => setTimeout(r, 150))
        } catch { /* keep original for this chunk */ }
      }
      setTranslatedCaptions(prev => ({ ...prev, [activeLang]: translatedArr }))
      setCaptionLoading(false)
    }

    translateChunks()
  }, [activeLang, captions])

  // ── Translate story description when language changes ──
  useEffect(() => {
    if (!story) return
    if (activeLang === "en") { setTranslatedDesc(story.description); return }
    setDescLoading(true)
    fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: story.description, targetLang: activeLang })
    })
      .then(r => r.json())
      .then(data => setTranslatedDesc(data.translatedText || story.description))
      .catch(() => setTranslatedDesc(story.description))
      .finally(() => setDescLoading(false))
  }, [activeLang, story?.description])

  if (!story) return null

  return (
    <div
      style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.92)",
        backdropFilter: "blur(12px)",
        zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1rem", overflowY: "auto", animation: "fadeIn 0.25s ease-out"
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "linear-gradient(145deg, #2D0808 0%, #4A1A00 100%)",
          border: "2px solid var(--gold)",
          borderRadius: "18px", width: "100%", maxWidth: "920px",
          maxHeight: "92vh", overflowY: "auto",
          boxShadow: "0 25px 70px rgba(0,0,0,0.85)",
          position: "relative", animation: "scaleIn 0.25s ease-out",
          margin: "auto"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header with Prominent Close Button */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "1rem 1.5rem", borderBottom: "1px solid rgba(212, 175, 55, 0.3)",
          background: "rgba(0,0,0,0.4)", sticky: "top", top: 0, zIndex: 10
        }}>
          <div>
            <span style={{ color: "var(--saffron)", fontSize: "0.8rem", fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
              {story.category} • {story.region || "Parayakadavu, Kollam, Kerala"}
            </span>
            <h3 style={{ color: "var(--bright-gold)", fontSize: "1.25rem", margin: "0.2rem 0 0" }}>
              🌿 {story.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            title="Close Video (Esc)"
            style={{
              background: "linear-gradient(135deg, var(--saffron), var(--deep-saffron))",
              border: "2px solid var(--bright-gold)",
              color: "white", width: "42px", height: "42px", borderRadius: "50%",
              cursor: "pointer", fontSize: "1.3rem", fontWeight: "bold",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 15px rgba(255,119,34,0.5)", flexShrink: 0,
              transition: "transform 0.2s ease"
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.15)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            ✕
          </button>
        </div>

        {/* Language Selector Toolbar */}
        <div style={{
          padding: "0.65rem 1.5rem", background: "rgba(0,0,0,0.55)",
          borderBottom: "1px solid rgba(212,175,55,0.2)",
          display: "flex", alignItems: "center", gap: "0.8rem", flexWrap: "wrap"
        }}>
          <span style={{
            color: "var(--bright-gold)", fontSize: "0.82rem", fontWeight: 700,
            fontFamily: "Poppins, sans-serif", display: "flex", alignItems: "center", gap: "0.4rem"
          }}>
            🤖 AI Translate:
          </span>
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setActiveLang(lang.code)}
                title={`Translate subtitles & description to ${lang.name}`}
                style={{
                  background: activeLang === lang.code
                    ? "linear-gradient(135deg, var(--saffron), var(--deep-saffron))"
                    : "rgba(212,175,55,0.12)",
                  color: activeLang === lang.code ? "white" : "var(--sandalwood)",
                  border: `1px solid ${activeLang === lang.code ? "var(--saffron)" : "rgba(212,175,55,0.25)"}`,
                  borderRadius: "14px", padding: "0.22rem 0.7rem", fontSize: "0.78rem",
                  fontFamily: "Poppins, sans-serif", cursor: "pointer",
                  transition: "all 0.2s", fontWeight: activeLang === lang.code ? 600 : 400
                }}
              >
                {lang.name}
              </button>
            ))}
          </div>
          {captionLoading && (
            <span style={{
              fontSize: "0.72rem", color: "var(--saffron)", fontFamily: "Poppins, sans-serif",
              animation: "pulse 1s infinite"
            }}>⏳ Translating…</span>
          )}
        </div>

        {/* YouTube Embed Player */}
        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, backgroundColor: "#000" }}>
          <iframe
            key={`${story.youtubeId}-${activeLang}`}
            src={
              story.youtubeId && story.youtubeId.length === 11
                ? `https://www.youtube.com/embed/${story.youtubeId}?autoplay=1&rel=0&modestbranding=1&cc_load_policy=1&cc_lang_pref=${activeLang}&hl=${activeLang}`
                : `https://www.youtube.com/embed/8Qn_spdM5Zg?autoplay=1&rel=0&modestbranding=1&cc_load_policy=1&cc_lang_pref=${activeLang}&hl=${activeLang}`
            }
            title={story.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
          />
        </div>

        {/* ── AI Subtitle Panel ─────────────────────────────────── */}
        <div style={{
          minHeight: "3.5rem", background: "rgba(0,0,0,0.75)",
          borderBottom: "1px solid rgba(212,175,55,0.15)",
          padding: "0.6rem 1.5rem", display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: "1rem"
        }}>
          <div style={{ flex: 1 }}>
            {currentCaption ? (
              <p style={{
                margin: 0, color: "#fff", fontSize: "1.05rem",
                fontFamily: "Poppins, sans-serif", lineHeight: "1.55",
                textShadow: "0 2px 8px rgba(0,0,0,0.9)",
                animation: "fadeIn 0.3s ease"
              }}>
                💬 {currentCaption}
              </p>
            ) : captionLoading ? (
              <p style={{ margin: 0, color: "rgba(255,200,100,0.7)", fontSize: "0.85rem", fontFamily: "Poppins, sans-serif" }}>
                ⏳ Loading AI-translated subtitles…
              </p>
            ) : captionNote ? (
              <p style={{ margin: 0, color: "rgba(255,200,100,0.55)", fontSize: "0.8rem", fontFamily: "Poppins, sans-serif" }}>
                {captionNote}
              </p>
            ) : (
              <p style={{ margin: 0, color: "rgba(255,255,255,0.35)", fontSize: "0.82rem", fontFamily: "Poppins, sans-serif" }}>
                🤖 Translated subtitles appear here as the video plays. Pick a language above ↑
              </p>
            )}
          </div>
          <span style={{
            fontSize: "0.7rem", color: "rgba(212,175,55,0.5)",
            fontFamily: "Poppins", whiteSpace: "nowrap"
          }}>⏱ {elapsedSeconds}s</span>
        </div>

        {/* ── Translated Story Description ────────────────────── */}
        <div style={{ padding: "1.2rem 1.5rem", color: "var(--sandalwood)" }}>
          <p style={{
            fontSize: "0.95rem", lineHeight: "1.75", marginBottom: "0.8rem",
            color: "rgba(255,248,240,0.9)", position: "relative"
          }}>
            {descLoading ? (
              <span style={{ opacity: 0.5, fontStyle: "italic" }}>Translating description…</span>
            ) : (
              translatedDesc || story.description
            )}
            {activeLang !== "en" && !descLoading && (
              <span style={{
                marginLeft: "0.5rem", fontSize: "0.72rem", background: "rgba(255,119,34,0.2)",
                color: "var(--saffron)", borderRadius: "6px", padding: "0.1rem 0.4rem",
                fontFamily: "Poppins, sans-serif", verticalAlign: "middle"
              }}>🤖 AI Translated</span>
            )}
          </p>

          {/* Caption status note */}
          {captionNote && !captionLoading && captions.length === 0 && (
            <div style={{
              background: "rgba(255,200,0,0.08)", border: "1px solid rgba(212,175,55,0.25)",
              borderRadius: "8px", padding: "0.5rem 0.8rem", marginBottom: "0.8rem",
              fontSize: "0.8rem", color: "rgba(255,220,100,0.85)", fontFamily: "Poppins, sans-serif"
            }}>
              {captionNote}
              <br />
              <span style={{ opacity: 0.7 }}>
                💡 Tip: You can also use the YouTube <strong>[CC]</strong> button → <strong>Auto-translate</strong> directly in the player.
              </span>
            </div>
          )}



          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", opacity: 0.85, fontFamily: "Poppins, sans-serif" }}>
            <span>🎥 Channel: <a href="https://www.youtube.com/@ashrithvenkat5507" target="_blank" rel="noopener noreferrer" style={{ color: "var(--bright-gold)", textDecoration: "underline" }}>@ashrithvenkat5507</a></span>
            <span>🎙 By: {story.uploader}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Main Component
───────────────────────────────────────────────────────────── */
export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentPage, setCurrentPage] = useState("home")
  const [userName, setUserName] = useState("")
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [signupName, setSignupName] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("")
  const [scrolled, setScrolled] = useState(false)
  const [typedText, setTypedText] = useState("")
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Backend Stories State (Channel Videos)
  const [stories, setStories] = useState<Story[]>([])
  const [activeVideoStory, setActiveVideoStory] = useState<Story | null>(null)
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("All")

  // Upload Form State
  const [uploadTitle, setUploadTitle] = useState("")
  const [uploadCategory, setUploadCategory] = useState("Oral History & Traditions")
  const [uploadDescription, setUploadDescription] = useState("")
  const [uploadVideoUrl, setUploadVideoUrl] = useState("")
  const [uploadLanguage, setUploadLanguage] = useState("Telugu")
  const [uploadRegion, setUploadRegion] = useState("")

  const shloka = "वसुधैव कुटुम्बकम् — The World is One Family."

  const teamMembers = [
    {
      id: 1, name: "Yalamarthi Madhav", role: "Project Coordinator", year: "3rd Year",
      contribution: "Oversees project planning and coordination, manages team workflow and ensures timely execution of research activities.",
      image: "/team-member-1.jpg",
    },
    {
      id: 2, name: "Woona Venkat Ashrith", role: "Video Production Lead", year: "3rd Year",
      contribution: "Leads video recording and editing, manages official YouTube channel @ashrithvenkat5507 and multimedia content.",
      image: "/team-member-2.jpg",
    },
    {
      id: 3, name: "Nallapaneni Vaibhav", role: "Database Manager", year: "3rd Year",
      contribution: "Manages the database infrastructure, ensures data security and organises all collected cultural information.",
      image: "/team-member-3.jpg",
    },
    {
      id: 4, name: "Abhimanyu", role: "Community Liaison", year: "3rd Year",
      contribution: "Connects with community members and elders, builds relationships and facilitates storytelling sessions.",
      image: "/placeholder-user.jpg",
    },
    {
      id: 5, name: "Swagathchandran S", role: "Research Analyst", year: "3rd Year",
      contribution: "Analyses cultural data, documents traditions and creates research reports on preservation findings.",
      image: "/team-member-5.jpg",
    },
    {
      id: 6, name: "Palivela Sai Hruthik", role: "Technical Developer", year: "3rd Year",
      contribution: "Develops and maintains the platform, implements features for uploading and managing cultural content.",
      image: "/team-member-6.jpg",
    },
  ]

  // Fetch stories from Backend API
  const fetchStories = async () => {
    try {
      const res = await fetch("/api/stories")
      const data = await res.json()
      if (data.success && data.stories) {
        setStories(data.stories)
      }
    } catch {
      setStories([
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
      ])
    }
  }

  useEffect(() => {
    fetchStories()
  }, [])

  /* Scroll listener */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  /* Auth persistence */
  useEffect(() => {
    const s = localStorage.getItem("isLoggedIn")
    const n = localStorage.getItem("userName")
    if (s === "true" && n) { setIsLoggedIn(true); setUserName(n) }
  }, [])

  /* Shloka typewriter on home */
  useEffect(() => {
    if (currentPage !== "home") return
    setTypedText("")
    let i = 0
    const id = setInterval(() => {
      setTypedText(shloka.slice(0, i + 1))
      i++
      if (i >= shloka.length) clearInterval(id)
    }, 60)
    return () => clearInterval(id)
  }, [currentPage])

  /* Scroll to top on page change */
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }) }, [currentPage])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (loginEmail.trim() && loginPassword.trim()) {
      const name = loginEmail.split("@")[0]
      setIsLoggedIn(true); setUserName(name)
      localStorage.setItem("isLoggedIn", "true"); localStorage.setItem("userName", name)
      setLoginEmail(""); setLoginPassword("")
      setCurrentPage("dashboard")
    } else alert("Please enter both email and password")
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    if (!signupName.trim() || !signupEmail.trim() || !signupPassword.trim()) { alert("Please fill in all fields"); return }
    if (signupPassword !== signupConfirmPassword) { alert("Passwords do not match"); return }
    if (signupPassword.length < 6) { alert("Password must be at least 6 characters"); return }
    setIsLoggedIn(true); setUserName(signupName)
    localStorage.setItem("isLoggedIn", "true"); localStorage.setItem("userName", signupName)
    setSignupName(""); setSignupEmail(""); setSignupPassword(""); setSignupConfirmPassword("")
    setCurrentPage("dashboard")
  }

  const handleLogout = () => {
    setIsLoggedIn(false); setUserName("")
    localStorage.removeItem("isLoggedIn"); localStorage.removeItem("userName")
    setCurrentPage("home")
  }

  const handleNavigation = (page: string) => {
    if ((page === "upload") && !isLoggedIn) setCurrentPage("login")
    else setCurrentPage(page)
    setMenuOpen(false)
  }

  // Handle Backend Story Submission
  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!uploadTitle.trim()) {
      alert("Please enter a story title.")
      return
    }

    try {
      const res = await fetch("/api/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: uploadTitle,
          category: uploadCategory,
          description: uploadDescription,
          videoUrl: uploadVideoUrl,
          uploader: userName || "Woona Venkat Ashrith (@ashrithvenkat5507)",
          language: uploadLanguage,
          region: uploadRegion,
        }),
      })

      const data = await res.json()
      if (data.success) {
        setUploadSuccess(true)
        fetchStories()
        setUploadTitle("")
        setUploadDescription("")
        setUploadVideoUrl("")
        setUploadRegion("")
      } else {
        alert("Error submitting story: " + data.message)
      }
    } catch {
      setUploadSuccess(true)
    }
  }

  // Filter stories by category
  const filteredStories = selectedCategoryFilter === "All"
    ? stories
    : stories.filter((s) => s.category.toLowerCase().includes(selectedCategoryFilter.toLowerCase()))

  return (
    <>
      {/* Hidden Google Translate Element for In-Player Switcher */}
      <div id="google_translate_element" style={{ display: "none" }}></div>

      {/* Embedded Video Player Modal with In-Player Translation */}
      <VideoModal story={activeVideoStory} onClose={() => setActiveVideoStory(null)} />

      {/* ── Global Styles ── */}
      <style>{`
        :root {
          --saffron:       #FF7722;
          --deep-saffron:  #E8650A;
          --gold:          #D4AF37;
          --bright-gold:   #FFD700;
          --vermillion:    #C0392B;
          --lotus-pink:    #E8789A;
          --lotus-light:   #F9D0DC;
          --sandalwood:    #F5E6D3;
          --deep-maroon:   #6B1A1A;
          --cream:         #FFF8F0;
          --teal:          #1A5276;
          --text-dark:     #1C1C1C;
          --text-light:    #FFF8F0;
          --border-r:      12px;
        }

        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

        html { scroll-behavior: smooth; }

        body {
          font-family: 'Merriweather', 'Georgia', serif;
          color: var(--text-dark);
          background: #FFF8F0;
          overflow-x: hidden;
          position: relative;
        }

        h1, h2, h3 { font-family: 'Playfair Display', 'Georgia', serif; }
        h4, h5, h6 { font-family: 'Poppins', sans-serif; }

        /* Keyframe Animations */
        @keyframes mandalaRotate  { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes mandalaRevRotate { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes rangoliPulse { 0%,100%{transform:scale(1);opacity:0.35} 50%{transform:scale(1.08);opacity:0.55} }
        @keyframes rangoliSpin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes petalBloom     { from { opacity:0; transform: rotate(var(--r)) translateY(-18px) scale(0); } to { opacity:0.85; } }
        @keyframes centerGlow     { from { opacity:0; transform: scale(0); } to { opacity:0.95; transform: scale(1); } }
        @keyframes floatUp        { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes flameFlicker   { 0%,100%{transform:scale(1) rotate(-2deg)} 25%{transform:scale(1.1) rotate(3deg)} 50%{transform:scale(0.95) rotate(-3deg)} 75%{transform:scale(1.05) rotate(2deg)} }
        @keyframes slideDown      { from{opacity:0;transform:translateY(-30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideUp        { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn         { from{opacity:0} to{opacity:1} }
        @keyframes scaleIn        { from{opacity:0;transform:scale(0.85)} to{opacity:1;transform:scale(1)} }
        @keyframes omPulse        { 0%,100%{text-shadow:0 0 10px rgba(255,119,34,0.4)} 50%{text-shadow:0 0 35px rgba(255,119,34,0.9),0 0 60px rgba(212,175,55,0.6)} }
        @keyframes navGlow        { 0%,100%{box-shadow:0 4px 20px rgba(107,26,26,0.5)} 50%{box-shadow:0 4px 40px rgba(255,119,34,0.4),0 0 60px rgba(212,175,55,0.15)} }

        .rangoli-spin { transform-origin: 100px 100px; animation: rangoliSpin 40s linear infinite; }

        /* Sleek & Adjusted Navbar */
        .sacred-nav {
          position: sticky; top: 0; z-index: 1000;
          background: linear-gradient(90deg, #3D0C0C 0%, #6B1A1A 40%, #8B3A0A 80%, #4A1A00 100%);
          border-bottom: 2px solid var(--gold);
          padding: 0.85rem 0;
          animation: navGlow 4s ease-in-out infinite;
          transition: all 0.4s ease;
        }
        .sacred-nav.scrolled {
          padding: 0.55rem 0;
          background: linear-gradient(90deg, #2D0808 0%, #5B1010 40%, #7B2A00 80%, #3A1000 100%);
        }
        .nav-container {
          max-width: 1280px; margin: 0 auto;
          padding: 0 2rem;
          display: flex; justify-content: space-between; align-items: center;
        }
        .logo-wrap {
          display: flex; align-items: center; gap: 0.6rem;
          cursor: pointer; text-decoration: none;
          transition: transform 0.3s ease;
        }
        .logo-wrap:hover { transform: scale(1.04); }
        .logo-om {
          font-size: 2.1rem;
          animation: omPulse 3s ease-in-out infinite;
        }
        .logo-text {
          font-family: 'Cinzel Decorative', 'Tiro Devanagari Hindi', 'Playfair Display', serif;
          font-size: 1.45rem; font-weight: 700;
          color: var(--gold);
          letter-spacing: 1.5px;
          text-shadow: 0 0 15px rgba(212,175,55,0.5);
        }
        .logo-sub {
          font-family: 'Poppins', sans-serif;
          font-size: 0.58rem; font-weight: 400;
          color: rgba(245,230,211,0.75);
          letter-spacing: 1px;
          display: block; text-transform: uppercase; margin-top: -3px;
        }
        .nav-links {
          display: flex; gap: 0.8rem; list-style: none; align-items: center;
        }
        .nav-link {
          color: var(--sandalwood);
          text-decoration: none; font-size: 0.92rem; cursor: pointer;
          font-family: 'Poppins', sans-serif; font-weight: 500;
          padding: 0.5rem 0.9rem; border-radius: 8px;
          transition: all 0.3s ease; position: relative;
        }
        .nav-link::after {
          content: ''; position: absolute; bottom: 4px; left: 50%;
          width: 0; height: 2px;
          background: var(--gold);
          transition: all 0.35s ease; transform: translateX(-50%);
        }
        .nav-link:hover { color: var(--bright-gold); background: rgba(212,175,55,0.1); }
        .nav-link:hover::after { width: 70%; }
        .nav-btn {
          background: linear-gradient(135deg, var(--saffron), var(--deep-saffron));
          color: white; border: none;
          padding: 0.55rem 1.4rem; border-radius: 25px;
          cursor: pointer; font-weight: 700; font-size: 0.88rem;
          font-family: 'Poppins', sans-serif;
          box-shadow: 0 4px 15px rgba(255,119,34,0.4);
          transition: all 0.3s ease;
        }
        .nav-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255,119,34,0.6);
          background: linear-gradient(135deg, var(--bright-gold), var(--gold));
          color: var(--text-dark);
        }
        .nav-user {
          font-family: 'Poppins', sans-serif; font-size: 0.88rem;
          color: var(--bright-gold); font-weight: 600;
          background: rgba(255,215,0,0.1); padding: 0.4rem 0.9rem;
          border-radius: 20px; border: 1px solid rgba(255,215,0,0.25);
        }

        /* Hero */
        .hero {
          min-height: 100vh;
          background:
            linear-gradient(160deg, rgba(61,12,12,0.95) 0%, rgba(107,26,26,0.88) 40%, rgba(139,58,10,0.85) 70%, rgba(74,26,0,0.95) 100%),
            url('/cultural-heritage-patterns-textures.jpg') center/cover no-repeat;
          display: flex; flex-direction: column;
          justify-content: center; align-items: center;
          text-align: center; padding: 6rem 2rem 5rem;
          position: relative; overflow: hidden;
        }
        .hero-mandala-bg {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%,-50%);
          pointer-events: none; z-index: 0;
          opacity: 0.08;
        }
        .hero-content {
          position: relative; z-index: 2;
          max-width: 900px; animation: fadeIn 1s ease-out;
        }
        .hero-om {
          font-size: 4.5rem; display: block;
          animation: omPulse 3s ease-in-out infinite, floatUp 5s ease-in-out infinite;
          margin-bottom: 0.5rem;
        }
        .hero-shloka {
          font-family: 'Tiro Devanagari Hindi', 'Mangal', serif;
          font-size: 1.3rem; color: var(--bright-gold);
          letter-spacing: 1px; margin-bottom: 1.2rem;
          text-shadow: 0 0 20px rgba(255,215,0,0.5);
          min-height: 2rem;
        }
        .shloka-cursor {
          display: inline-block; width: 2px; height: 1.2em;
          background: var(--bright-gold); margin-left: 2px;
          animation: typeCursor 0.8s step-end infinite;
          vertical-align: middle;
        }
        .hero h1 {
          font-size: clamp(2.4rem, 5.5vw, 4.4rem);
          color: var(--text-light); font-weight: 700;
          line-height: 1.18; margin-bottom: 0.8rem;
          animation: slideDown 1s ease-out 0.3s both;
          text-shadow: 2px 2px 8px rgba(0,0,0,0.4);
        }
        .hero-gold { color: var(--bright-gold); }
        .hero-subtitle {
          font-size: clamp(0.95rem, 2vw, 1.2rem);
          color: rgba(245,230,211,0.92); line-height: 1.8;
          margin-bottom: 1.5rem;
          animation: slideUp 1s ease-out 0.5s both;
        }
        .hero-pillars {
          display: flex; justify-content: center; gap: 1rem;
          flex-wrap: wrap; margin-bottom: 2.2rem;
          animation: fadeIn 1s ease-out 0.8s both;
        }
        .pillar-badge {
          background: rgba(212,175,55,0.15);
          border: 1px solid rgba(212,175,55,0.4);
          color: var(--bright-gold); font-family: 'Poppins', sans-serif;
          font-size: 0.78rem; font-weight: 600; letter-spacing: 1px;
          padding: 0.35rem 1rem; border-radius: 20px;
          transition: all 0.3s ease;
        }
        .pillar-badge:hover {
          background: rgba(212,175,55,0.3);
          box-shadow: 0 0 15px rgba(212,175,55,0.4);
        }
        .hero-lotus-row {
          display: flex; justify-content: center; gap: 1.5rem;
          margin-bottom: 2.2rem;
          animation: fadeIn 1s ease-out 1s both;
        }
        .cta-primary {
          background: linear-gradient(135deg, var(--saffron) 0%, var(--deep-saffron) 100%);
          color: white; border: none;
          padding: 1.05rem 2.8rem; font-size: 1.05rem;
          border-radius: var(--border-r); cursor: pointer; font-weight: 700;
          font-family: 'Poppins', sans-serif;
          box-shadow: 0 8px 30px rgba(255,119,34,0.45);
          transition: all 0.3s ease; letter-spacing: 0.5px;
          animation: slideUp 1s ease-out 1.2s both;
          display: inline-flex; align-items: center; gap: 0.5rem;
        }
        .cta-primary:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(255,119,34,0.6);
          background: linear-gradient(135deg, var(--bright-gold), var(--gold));
          color: var(--text-dark);
        }
        .cta-secondary {
          background: transparent;
          color: var(--sandalwood); border: 2px solid rgba(245,230,211,0.4);
          padding: 1rem 2.2rem; font-size: 1rem;
          border-radius: var(--border-r); cursor: pointer; font-weight: 600;
          font-family: 'Poppins', sans-serif;
          transition: all 0.3s ease;
          animation: slideUp 1s ease-out 1.4s both;
          display: inline-flex; align-items: center; gap: 0.5rem;
        }
        .cta-secondary:hover {
          border-color: var(--gold); color: var(--bright-gold);
          background: rgba(212,175,55,0.1);
          transform: translateY(-3px);
        }
        .hero-cta-row {
          display: flex; justify-content: center; gap: 1.2rem; flex-wrap: wrap;
        }

        /* Section Shared */
        .section-wrapper { position: relative; overflow: hidden; }
        .section-inner {
          position: relative; z-index: 2;
          max-width: 1200px; margin: 0 auto;
          padding: 5rem 2rem;
        }
        .section-title {
          text-align: center; font-size: clamp(1.8rem, 4vw, 2.8rem);
          color: var(--deep-maroon); margin-bottom: 0.5rem;
          font-family: 'Playfair Display', serif;
        }
        .section-subtitle {
          text-align: center; font-family: 'Tiro Devanagari Hindi', serif;
          font-size: 1rem; color: var(--saffron);
          margin-bottom: 3rem; opacity: 0.88;
        }

        /* How It Works (Goals) */
        .goals-bg { background: var(--cream); position: relative; }
        .goals-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }
        .goal-card {
          background: white;
          border-radius: var(--border-r);
          padding: 2.5rem 2rem;
          text-align: center;
          border: 1px solid rgba(212,175,55,0.25);
          box-shadow: 0 4px 20px rgba(107,26,26,0.08);
          transition: all 0.4s ease;
          position: relative; overflow: hidden;
        }
        .goal-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 4px;
          background: linear-gradient(90deg, var(--saffron), var(--gold));
        }
        .goal-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 45px rgba(107,26,26,0.15);
          border-color: rgba(212,175,55,0.5);
        }
        .goal-icon { font-size: 3rem; margin-bottom: 1rem; display: block; }
        .goal-card h3 { color: var(--deep-maroon); font-size: 1.35rem; margin-bottom: 0.8rem; }
        .goal-card p  { color: #666; line-height: 1.7; font-size: 0.95rem; }

        /* Video Gallery Section */
        .video-card {
          background: white; border-radius: var(--border-r);
          overflow: hidden; border: 1px solid rgba(212,175,55,0.25);
          box-shadow: 0 8px 25px rgba(107,26,26,0.08);
          transition: all 0.4s ease; cursor: pointer;
          display: flex; flex-direction: column;
        }
        .video-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 45px rgba(107,26,26,0.18);
          border-color: var(--saffron);
        }
        .video-thumb-wrap {
          position: relative; width: 100%; height: 200px; overflow: hidden;
          background: #000;
        }
        .video-thumb-wrap img {
          width: 100%; height: 100%; object-fit: cover; opacity: 0.9;
          transition: transform 0.5s ease;
        }
        .video-card:hover .video-thumb-wrap img { transform: scale(1.08); opacity: 1; }
        .play-overlay {
          position: absolute; top: 0; left: 0; right: 0; bottom: 0;
          display: flex; align-items: center; justify-content: center;
          background: rgba(0,0,0,0.3); transition: background 0.3s;
        }
        .video-card:hover .play-overlay { background: rgba(0,0,0,0.15); }
        .play-btn-circle {
          width: 58px; height: 58px; border-radius: 50%;
          background: linear-gradient(135deg, var(--saffron), var(--deep-saffron));
          color: white; display: flex; align-items: center; justify-content: center;
          font-size: 1.4rem; padding-left: 4px; box-shadow: 0 6px 20px rgba(0,0,0,0.4);
          transition: transform 0.3s ease;
        }
        .video-card:hover .play-btn-circle { transform: scale(1.15); background: var(--bright-gold); color: #000; }

        /* Filter Pills */
        .filter-pill {
          background: rgba(212,175,55,0.1); border: 1px solid rgba(212,175,55,0.3);
          color: var(--deep-maroon); font-family: 'Poppins', sans-serif;
          font-size: 0.85rem; padding: 0.4rem 1rem; border-radius: 20px;
          cursor: pointer; transition: all 0.3s ease; font-weight: 500;
        }
        .filter-pill:hover, .filter-pill.active {
          background: var(--saffron); color: white; border-color: var(--saffron);
          box-shadow: 0 4px 15px rgba(255,119,34,0.3);
        }

        /* Contribute / CTA Section */
        .contribute-bg {
          background:
            linear-gradient(135deg, rgba(61,12,12,0.97) 0%, rgba(107,26,26,0.97) 50%, rgba(139,58,10,0.97) 100%),
            url('/cultural-festival-celebration.jpg') center/cover no-repeat;
          text-align: center; padding: 6rem 2rem;
          position: relative; overflow: hidden;
        }
        .contribute-bg .diya-row {
          display: flex; justify-content: center; margin-bottom: 1.5rem;
        }
        .contribute-bg h2 {
          font-size: clamp(1.8rem, 4vw, 3rem);
          color: var(--bright-gold); margin-bottom: 1rem;
          text-shadow: 0 0 30px rgba(255,215,0,0.4);
        }
        .contribute-bg p {
          font-size: 1.1rem; color: rgba(245,230,211,0.9);
          max-width: 620px; margin: 0 auto 2.5rem; line-height: 1.8;
        }

        .diya-flame {
          font-size: 1.4rem;
          animation: flameFlicker 0.8s ease-in-out infinite;
          display: inline-block;
          filter: drop-shadow(0 0 6px rgba(255,150,0,0.8));
        }

        /* Team Section */
        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem; max-width: 1200px; margin: 0 auto; padding: 0 2rem;
        }
        .team-card {
          background: white; border-radius: var(--border-r);
          overflow: hidden; box-shadow: 0 4px 20px rgba(107,26,26,0.08);
          transition: all 0.4s ease; border: 1px solid rgba(212,175,55,0.2);
        }
        .team-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 25px 55px rgba(107,26,26,0.2);
          border-color: var(--saffron);
        }
        .team-card-img { width: 100%; height: 240px; object-fit: cover; transition: transform 0.5s ease; }
        .team-card:hover .team-card-img { transform: scale(1.07); }
        .team-info { padding: 1.8rem; }
        .team-info h3 { color: var(--deep-maroon); font-size: 1.4rem; margin-bottom: 0.3rem; }
        .team-role { color: var(--saffron); font-weight: 600; font-size: 0.88rem; font-family: 'Poppins', sans-serif; margin-bottom: 0.25rem; }
        .team-year { color: #aaa; font-size: 0.8rem; font-family: 'Poppins', sans-serif; margin-bottom: 0.9rem; }

        /* Auth / Upload */
        .auth-page-bg, .upload-page-bg, .dashboard-page-bg {
          min-height: 100vh; background: var(--cream); padding: 4rem 2rem; position: relative;
        }
        .auth-card, .upload-card {
          background: white; border-radius: 20px; padding: 3rem;
          max-width: 620px; margin: 0 auto;
          box-shadow: 0 10px 40px rgba(107,26,26,0.12);
          border: 1px solid rgba(212,175,55,0.2); position: relative; z-index: 2;
        }
        .form-group { margin-bottom: 1.4rem; }
        .form-group label {
          display: block; margin-bottom: 0.45rem;
          color: var(--text-dark); font-weight: 600; font-size: 0.88rem;
          font-family: 'Poppins', sans-serif;
        }
        .form-group input, .form-group select, .form-group textarea {
          width: 100%; padding: 0.8rem 1rem;
          border: 2px solid rgba(212,175,55,0.25);
          border-radius: 10px; font-size: 0.95rem;
          transition: all 0.3s ease; font-family: 'Merriweather', serif;
          background: white; color: var(--text-dark);
        }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
          outline: none; border-color: var(--saffron);
          box-shadow: 0 0 0 3px rgba(255,119,34,0.12);
        }
        .form-submit-btn {
          width: 100%; padding: 0.9rem;
          background: linear-gradient(135deg, var(--deep-maroon), var(--saffron));
          color: white; border: none; border-radius: 10px;
          font-size: 1rem; font-weight: 700; cursor: pointer;
          font-family: 'Poppins', sans-serif; transition: all 0.3s ease;
          box-shadow: 0 6px 20px rgba(107,26,26,0.3);
        }
        .form-submit-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(107,26,26,0.45); }

        /* Footer */
        .sacred-footer {
          background: linear-gradient(180deg, #2D0808 0%, #3D0C0C 60%, #1A0404 100%);
          color: var(--text-light); padding: 4rem 2rem 2rem;
          border-top: 3px solid var(--gold); position: relative; overflow: hidden;
        }
        .footer-content {
          max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 3rem; padding-bottom: 3rem; border-bottom: 1px solid rgba(255,255,255,0.1);
          position: relative; z-index: 1;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .nav-links.open {
            display: flex; flex-direction: column; position: absolute;
            top: 100%; left: 0; right: 0; background: #3D0C0C;
            padding: 1rem 2rem; gap: 0.5rem; border-bottom: 2px solid var(--gold);
          }
          .nav-mobile-toggle { display: flex !important; }
        }
        @media (min-width: 769px) { .nav-mobile-toggle { display: none !important; } }
      `}</style>

      {/* Sacred Particle Background */}
      <SacredCanvas />

      {/* ══════════════════════════════════════
          ADJUSTED CLEAN NAVIGATION
      ══════════════════════════════════════ */}
      <nav className={`sacred-nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-container">
          <div className="logo-wrap" onClick={() => handleNavigation("home")}>
            <span className="logo-om">🌿</span>
            <div>
              <span className="logo-text">विरासत</span>
              <span className="logo-sub">Virasat — Universal Heritage Vault</span>
            </div>
          </div>

          {/* Clean Top Navigation Links */}
          <ul className={`nav-links${menuOpen ? " open" : ""}`}>
            <li><span className="nav-link" onClick={() => handleNavigation("home")}>Home</span></li>
            <li><span className="nav-link" onClick={() => handleNavigation("about")}>About Mission</span></li>
            <li><span className="nav-link" onClick={() => handleNavigation("upload")}>Upload Story</span></li>
            {isLoggedIn ? (
              <>
                <li><span className="nav-link" onClick={() => handleNavigation("dashboard")}>Dashboard</span></li>
                <li><span className="nav-user">🙏 {userName}</span></li>
                <li><button className="nav-btn" onClick={handleLogout}>Logout</button></li>
              </>
            ) : (
              <li><button className="nav-btn" onClick={() => handleNavigation("login")}>Login / Sign Up</button></li>
            )}
          </ul>

          {/* Mobile Toggle */}
          <button
            className="nav-mobile-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none", border: "2px solid rgba(212,175,55,0.5)",
              borderRadius: "8px", padding: "0.4rem 0.8rem",
              color: "var(--gold)", fontSize: "1.2rem", cursor: "pointer"
            }}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* ══════════════════════════════════════
          HOME PAGE
      ══════════════════════════════════════ */}
      {currentPage === "home" && (
        <>
          {/* Hero Section */}
          <section className="hero">
            <div className="hero-mandala-bg">
              <Mandala size={700} opacity={1} spinning />
            </div>

            <div className="hero-content">
              <span className="hero-om">🌿</span>

              <div className="hero-shloka">
                {typedText}<span className="shloka-cursor" />
              </div>

              <h1>
                Preserve <span className="hero-gold">Vanishing Cultures</span>,<br />
                Unite All <span className="hero-gold">Generations</span>
              </h1>

              <p className="hero-subtitle">
                An inclusive living vault under Amrita Vishwa Vidyapeetam&apos;s SSR programme — capturing, honoring, and embedding
                the endangered oral stories, traditional arts, and wisdom from YouTube Channel @ashrithvenkat5507 into an interactive player.
              </p>

              <div className="hero-pillars">
                {[
                  "🌿 Preservation (संरक्षण)",
                  "🤝 Inclusivity (सद्भाव)",
                  "🙏 Seva (सेवा)",
                  "📿 Parampara (परम्परा)"
                ].map((p) => (
                  <span key={p} className="pillar-badge">{p}</span>
                ))}
              </div>

              <div className="hero-lotus-row">
                <LotusBloom size={90} />
                <LotusBloom size={110} />
                <LotusBloom size={90} />
              </div>

              <div className="hero-cta-row">
                <button
                  className="cta-primary"
                  onClick={() => {
                    const el = document.getElementById("video-theater")
                    if (el) el.scrollIntoView({ behavior: "smooth" })
                    else if (stories.length > 0) setActiveVideoStory(stories[0])
                  }}
                >
                  🎬 Watch Channel Archive
                </button>
                <button
                  className="cta-secondary"
                  onClick={() => window.open("https://www.youtube.com/@ashrithvenkat5507", "_blank")}
                >
                  ▶ YouTube Channel (@ashrithvenkat5507)
                </button>
              </div>
            </div>
          </section>

          <OrnamentDivider />

          {/* How It Works (With Corner & Center Rangoli Animations) */}
          <section className="section-wrapper goals-bg">
            <RangoliCorner position="top-left" size={200} />
            <RangoliCorner position="bottom-right" size={200} />

            <div className="section-inner">
              <h2 className="section-title">How Virasat Serves All Cultures</h2>
              <p className="section-subtitle">"The World is One Family" — Honoring every tribe, village, and oral tradition.</p>
              
              <div className="goals-grid">
                {[
                  {
                    icon: "🎙", title: "Record Vanishing Traditions",
                    desc: "Students sit with tribal elders, village historians, and traditional craftsmen to record endangered songs, rituals, and folklore.",
                  },
                  {
                    icon: "🪷", title: "In-Player Multilingual Watch",
                    desc: "Watch recorded stories directly inside our portal using embedded players with in-player language selection.",
                  },
                  {
                    icon: "🌐", title: "Multi-Language Subtitles",
                    desc: "Select your preferred language (English, Hindi, Sanskrit, Telugu, Tamil, Kannada, Malayalam, Marathi) right while watching videos.",
                  },
                  {
                    icon: "🤝", title: "Amrita SSR Community Seva",
                    desc: "Student research driven by selfless service (Seva) and respect for all cultures, guided by Amrita Vishwa Vidyapeetam.",
                  },
                ].map((c) => (
                  <div key={c.title} className="goal-card">
                    <span className="goal-icon">{c.icon}</span>
                    <h3>{c.title}</h3>
                    <p>{c.desc}</p>
                  </div>
                ))}
              </div>

              {/* Animated Center Rangoli Motif */}
              <RangoliCenterMotif size={240} />
            </div>
          </section>

          <OrnamentDivider />

          {/* ══════════════════════════════════════
              EXCLUSIVE CHANNEL VIDEO THEATER (@ashrithvenkat5507)
          ══════════════════════════════════════ */}
          <section id="video-theater" className="section-wrapper" style={{ background: "white", position: "relative" }}>
            <RangoliCorner position="top-right" size={180} />
            <RangoliCorner position="bottom-left" size={180} />

            <div className="section-inner">
              <h2 className="section-title">🎬 Official Video Vault (@ashrithvenkat5507)</h2>
              <p className="section-subtitle">Watch community interviews &amp; cultural stories directly on site</p>

              {/* Category Filter Pills */}
              <div style={{ display: "flex", justifyContent: "center", gap: "0.6rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
                {[
                  "All",
                  "Oral History",
                  "Living Traditions",
                  "Culinary Heritage",
                  "Folk Music",
                ].map((cat) => (
                  <button
                    key={cat}
                    className={`filter-pill${selectedCategoryFilter === cat ? " active" : ""}`}
                    onClick={() => setSelectedCategoryFilter(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Video Cards Grid */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "2rem",
              }}>
                {filteredStories.map((story) => (
                  <div
                    key={story.id}
                    className="video-card"
                    onClick={() => setActiveVideoStory(story)}
                  >
                    <div className="video-thumb-wrap">
                      <img src={story.thumbnail || "/cultural-video-thumbnail.jpg"} alt={story.title} />
                      <div className="play-overlay">
                        <div className="play-btn-circle">▶</div>
                      </div>
                      <span style={{
                        position: "absolute", bottom: "10px", left: "10px",
                        background: "rgba(0,0,0,0.75)", color: "var(--bright-gold)",
                        fontSize: "0.75rem", padding: "0.2rem 0.6rem", borderRadius: "10px",
                        fontFamily: "Poppins, sans-serif"
                      }}>
                        {story.region || "Channel @ashrithvenkat5507"} • {story.language}
                      </span>
                    </div>

                    <div style={{ padding: "1.4rem", flex: 1, display: "flex", flexDirection: "column" }}>
                      <span style={{ color: "var(--saffron)", fontSize: "0.8rem", fontWeight: 600, fontFamily: "Poppins, sans-serif" }}>
                        {story.category}
                      </span>
                      <h3 style={{ color: "var(--deep-maroon)", fontSize: "1.15rem", margin: "0.4rem 0 0.6rem", lineHeight: 1.4 }}>
                        {story.title}
                      </h3>
                      <p style={{ color: "#666", fontSize: "0.88rem", lineHeight: 1.6, flex: 1, marginBottom: "1rem" }}>
                        {story.description}
                      </p>
                      <div style={{
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        borderTop: "1px solid rgba(212,175,55,0.2)", paddingTop: "0.8rem", fontSize: "0.8rem", color: "#888"
                      }}>
                        <span>🎙 By: {story.uploader}</span>
                        <span style={{ color: "var(--saffron)", fontWeight: 700 }}>▶ Watch &amp; Translate</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <OrnamentDivider />

          {/* Contribute CTA */}
          <section className="contribute-bg">
            <div className="diya-row">
              <Diya /><Diya /><Diya />
            </div>
            <h2>जागो! अपनी सांस्कृतिक धरोहर जगाओ।</h2>
            <p style={{ fontFamily: "'Tiro Devanagari Hindi', serif", fontSize: "1rem", color: "rgba(245,230,211,0.85)", marginBottom: "0.5rem" }}>
              "Awaken! Honor and preserve every vanishing culture."
            </p>
            <p>
              Whether it is tribal song, village oral history, traditional cooking, or artisan carving —
              record your local elders and share their legacy in our universal archive.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "1.2rem", flexWrap: "wrap" }}>
              <button className="cta-primary" onClick={() => handleNavigation(isLoggedIn ? "upload" : "login")}>
                🙏 Upload Your Story
              </button>
              <button className="cta-secondary" onClick={() => handleNavigation("about")}>
                🌿 Learn SSR Mission
              </button>
            </div>
          </section>
        </>
      )}

      {/* ══════════════════════════════════════
          ABOUT PAGE
      ══════════════════════════════════════ */}
      {currentPage === "about" && (
        <section className="section-wrapper" style={{ background: "white" }}>
          <RangoliCorner position="top-left" size={220} />
          <RangoliCorner position="bottom-right" size={220} />

          <div className="section-inner">
            <h2 className="section-title">About Virasat (विरासत)</h2>
            <p className="section-subtitle">Universal Cultural Preservation — Amrita Vishwa Vidyapeetam SSR Initiative</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center", marginBottom: "3rem" }}>
              <div>
                <p style={{ fontSize: "1.05rem", lineHeight: "1.9", color: "#444", marginBottom: "1rem" }}>
                  <strong>Virasat (विरासत)</strong> is an inclusive living vault created by student researchers
                  from Amrita Vishwa Vidyapeetam under our Social Service &amp; Research (SSR) programme.
                </p>
                <p style={{ fontSize: "1rem", lineHeight: "1.8", color: "#666", marginBottom: "1rem" }}>
                  Rooted in the universal principle of <em>Vasudhaiva Kutumbakam</em> ("The World is One Family"), we document and preserve
                  vanishing traditions across all tribes, indigenous groups, regions, and communities without discrimination.
                </p>
                <p style={{ fontSize: "1rem", lineHeight: "1.8", color: "#666" }}>
                  Students record elders, artisans, and storytellers, uploading videos to YouTube channel <a href="https://www.youtube.com/@ashrithvenkat5507" target="_blank" rel="noopener noreferrer" style={{ color: "var(--saffron)", fontWeight: 600 }}>@ashrithvenkat5507</a> and embedding them here.
                </p>
              </div>
              <div style={{ borderRadius: "16px", overflow: "hidden", boxShadow: "0 10px 40px rgba(107,26,26,0.2)", border: "2px solid var(--gold)" }}>
                <img src="/elder-sharing-wisdom-with-youth.jpg" alt="Elder sharing wisdom" style={{ width: "100%", display: "block" }} />
              </div>
            </div>

            <OrnamentDivider />

            {/* Team Members */}
            <div style={{ marginTop: "3rem" }}>
              <h2 className="section-title" style={{ fontSize: "2rem" }}>Our Devoted SSR Team</h2>
              <p className="section-subtitle">Amrita Vishwa Vidyapeetam Student Researchers</p>

              <div className="team-grid">
                {teamMembers.map((member) => (
                  <div key={member.id} className="team-card">
                    <img className="team-card-img" src={member.image || "/placeholder-user.jpg"} alt={member.name} />
                    <div className="team-info">
                      <h3>{member.name}</h3>
                      <div className="team-role">✦ {member.role}</div>
                      <div className="team-year">{member.year}</div>
                      <p style={{ fontSize: "0.88rem", color: "#666", lineHeight: 1.6 }}>{member.contribution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════
          UPLOAD PAGE (CONNECTED TO BACKEND API)
      ══════════════════════════════════════ */}
      {currentPage === "upload" && (
        <div className="upload-page-bg">
          <RangoliCorner position="top-right" size={200} />
          <RangoliCorner position="bottom-left" size={200} />

          <div className="upload-card">
            {uploadSuccess ? (
              <div style={{ textAlign: "center", padding: "2rem" }}>
                <span style={{ fontSize: "4rem", display: "block", marginBottom: "1rem" }}>🙏</span>
                <h3 style={{ color: "var(--deep-maroon)", fontSize: "1.8rem", marginBottom: "0.8rem" }}>
                  Dhanyavaad! धन्यवाद
                </h3>
                <p style={{ color: "#666", fontFamily: "Poppins, sans-serif", lineHeight: 1.7 }}>
                  Your story has been saved directly to our backend archive! It is now featured in our in-site video theater for all to watch.
                </p>
                <OrnamentDivider />
                <button
                  className="cta-primary"
                  style={{ marginTop: "1rem" }}
                  onClick={() => {
                    setUploadSuccess(false)
                    setCurrentPage("home")
                  }}
                >
                  Watch Story in Archive
                </button>
              </div>
            ) : (
              <>
                <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                  <span style={{ fontSize: "2.5rem", display: "block", marginBottom: "0.5rem" }}>📹</span>
                  <h2 style={{ color: "var(--deep-maroon)", fontSize: "1.8rem" }}>Contribute to Virasat</h2>
                  <p style={{ color: "#888", fontSize: "0.9rem", fontFamily: "Poppins, sans-serif" }}>
                    Share stories from channel @ashrithvenkat5507 or local community recordings.
                  </p>
                </div>

                <OrnamentDivider />

                <form onSubmit={handleUploadSubmit}>
                  <div className="form-group">
                    <label>Story Title *</label>
                    <input
                      type="text"
                      placeholder="e.g., Elder Oral Lore Interview"
                      value={uploadTitle}
                      onChange={(e) => setUploadTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Category *</label>
                    <select
                      value={uploadCategory}
                      onChange={(e) => setUploadCategory(e.target.value)}
                      required
                    >
                      <option>Oral History & Traditions</option>
                      <option>Folk Lore & Living Traditions</option>
                      <option>Culinary Heritage</option>
                      <option>Folk Music & Song</option>
                      <option>Indigenous Crafts & Arts</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Region / Community *</label>
                    <input
                      type="text"
                      placeholder="e.g., Andhra Pradesh, Telangana"
                      value={uploadRegion}
                      onChange={(e) => setUploadRegion(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Language *</label>
                    <input
                      type="text"
                      placeholder="e.g., Telugu, English, Hindi"
                      value={uploadLanguage}
                      onChange={(e) => setUploadLanguage(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>YouTube Video Link or ID (from @ashrithvenkat5507) *</label>
                    <input
                      type="text"
                      placeholder="e.g., https://www.youtube.com/watch?v=YOUR_VIDEO_ID"
                      value={uploadVideoUrl}
                      onChange={(e) => setUploadVideoUrl(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Description & Background</label>
                    <textarea
                      placeholder="Briefly describe the elder, interview, or tradition..."
                      value={uploadDescription}
                      onChange={(e) => setUploadDescription(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <button type="submit" className="form-submit-btn">
                    🙏 Save Story to Virasat Vault
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          DASHBOARD PAGE
      ══════════════════════════════════════ */}
      {currentPage === "dashboard" && (
        <div className="dashboard-page-bg">
          <div style={{ maxW: "1200px", margin: "0 auto", position: "relative", zIndex: 2 }}>
            <div style={{
              background: "linear-gradient(135deg, #3D0C0C 0%, #6B1A1A 100%)",
              borderRadius: "20px", padding: "3rem", color: "white", marginBottom: "2rem",
              border: "1px solid var(--gold)", textAlign: "center"
            }}>
              <h2 style={{ color: "var(--bright-gold)", fontSize: "2rem" }}>🙏 Namaste, {userName}!</h2>
              <p style={{ color: "var(--sandalwood)", marginTop: "0.5rem" }}>
                Welcome to your Virasat portal dashboard. Manage your contributions from YouTube channel @ashrithvenkat5507.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
              <div className="goal-card">
                <span className="goal-icon">📹</span>
                <h3>Contribute Story</h3>
                <p>Upload new video stories to the backend archive.</p>
                <button className="cta-primary" style={{ marginTop: "1rem" }} onClick={() => setCurrentPage("upload")}>
                  Upload Now
                </button>
              </div>
              <div className="goal-card">
                <span className="goal-icon">🎬</span>
                <h3>Universal Video Archive</h3>
                <p>Browse and play all uploaded cultural stories right inside the website iframe player.</p>
                <button className="cta-primary" style={{ marginTop: "1rem" }} onClick={() => setCurrentPage("home")}>
                  Watch Archive
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          LOGIN & SIGNUP PAGES
      ══════════════════════════════════════ */}
      {currentPage === "login" && (
        <div className="auth-page-bg">
          <div className="auth-card">
            <h2 style={{ textAlign: "center", color: "var(--deep-maroon)", marginBottom: "1.5rem" }}>
              🌿 Login to Virasat (विरासत)
            </h2>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
              </div>
              <button type="submit" className="form-submit-btn">Login</button>
            </form>
            <p style={{ textAlign: "center", marginTop: "1rem", fontSize: "0.9rem", color: "#666" }}>
              Don&apos;t have an account? <a style={{ color: "var(--saffron)", cursor: "pointer", fontWeight: 700 }} onClick={() => setCurrentPage("signup")}>Sign up</a>
            </p>
          </div>
        </div>
      )}

      {currentPage === "signup" && (
        <div className="auth-page-bg">
          <div className="auth-card">
            <h2 style={{ textAlign: "center", color: "var(--deep-maroon)", marginBottom: "1.5rem" }}>
              🌿 Sign Up for Virasat (विरासत)
            </h2>
            <form onSubmit={handleSignup}>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" value={signupName} onChange={(e) => setSignupName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" value={signupConfirmPassword} onChange={(e) => setSignupConfirmPassword(e.target.value)} required />
              </div>
              <button type="submit" className="form-submit-btn">Create Account</button>
            </form>
            <p style={{ textAlign: "center", marginTop: "1rem", fontSize: "0.9rem", color: "#666" }}>
              Already have an account? <a style={{ color: "var(--saffron)", cursor: "pointer", fontWeight: 700 }} onClick={() => setCurrentPage("login")}>Login</a>
            </p>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          FOOTER
      ══════════════════════════════════════ */}
      <footer className="sacred-footer">
        <div className="footer-content">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
              <span style={{ fontSize: "1.8rem", color: "var(--bright-gold)" }}>🌿</span>
              <span style={{ fontFamily: "Cinzel Decorative, serif", fontSize: "1.35rem", color: "var(--gold)" }}>
                विरासत (Virasat)
              </span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.88rem", lineHeight: 1.8 }}>
              Virasat (विरासत) — Universal Living Vault for Vanishing Cultural Heritage. Featuring content from YouTube Channel <a href="https://www.youtube.com/@ashrithvenkat5507" target="_blank" rel="noopener noreferrer" style={{ color: "var(--bright-gold)", textDecoration: "underline" }}>@ashrithvenkat5507</a>.
              Amrita Vishwa Vidyapeetam SSR Initiative.
            </p>
          </div>

          <div>
            <h3 style={{ color: "var(--gold)", marginBottom: "1rem" }}>Quick Links</h3>
            <p><a onClick={() => setCurrentPage("home")}>Home</a></p>
            <p><a onClick={() => setCurrentPage("about")}>About SSR Team</a></p>
            <p><a onClick={() => setCurrentPage("upload")}>Contribute Video Story</a></p>
            <p><a href="https://www.youtube.com/@ashrithvenkat5507" target="_blank" rel="noopener noreferrer">YouTube @ashrithvenkat5507</a></p>
          </div>

          <div>
            <h3 style={{ color: "var(--gold)", marginBottom: "1rem" }}>Universal Support</h3>
            <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)" }}>
              In-player translation available for English, Telugu, Hindi, Tamil, Kannada, Malayalam &amp; Marathi.
            </p>
          </div>
        </div>

        <div style={{ textAlign: "center", paddingTop: "2rem", color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}>
          <p>© 2025 विरासत (Virasat) — Cultural Heritage Preservation Vault. Amrita Vishwa Vidyapeetam SSR Initiative. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}

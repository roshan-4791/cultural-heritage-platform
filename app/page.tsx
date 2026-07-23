"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"

/* ─────────────────────────────────────────────────────────────
   Sacred Particle Canvas — floating petals, Om symbols, diyas
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

    const symbols = ["🪷", "🕉", "✦", "❋", "⊹", "✿", "॰"]
    const particles: {
      x: number; y: number; vx: number; vy: number
      size: number; opacity: number; symbol: string; rotation: number; rotV: number
    }[] = []

    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.6 - 0.1,
        size: Math.random() * 14 + 8,
        opacity: Math.random() * 0.35 + 0.05,
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
        pointerEvents: "none", zIndex: 0, opacity: 0.6,
      }}
    />
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
        <text x="0" y="8" textAnchor="middle" fontSize="22" fill="#FF7722" opacity="0.8" fontFamily="serif">🕉</text>
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
      <span style={{ fontSize: "1.4rem", color: c, lineHeight: 1 }}>❋ 🕉 ❋</span>
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

  const shloka = "सर्वे भवन्तु सुखिनः। सर्वे सन्तु निरामयाः।"

  const teamMembers = [
    {
      id: 1, name: "Yalamarthi Madhav", role: "Project Coordinator", year: "3rd Year",
      contribution: "Oversees project planning and coordination, manages team workflow and ensures timely execution of research activities.",
      image: "/team-member-1.jpg",
    },
    {
      id: 2, name: "Woona Venkat Ashrith", role: "Video Production Lead", year: "3rd Year",
      contribution: "Leads video recording and editing, ensures high-quality production standards and manages all multimedia content.",
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

  return (
    <>
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

        /* ── Keyframe Animations ── */
        @keyframes mandalaRotate  { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes mandalaRevRotate { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes petalBloom     { from { opacity:0; transform: rotate(var(--r)) translateY(-18px) scale(0); } to { opacity:0.85; } }
        @keyframes centerGlow     { from { opacity:0; transform: scale(0); } to { opacity:0.95; transform: scale(1); } }
        @keyframes floatUp        { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes flameFlicker   { 0%,100%{transform:scale(1) rotate(-2deg)} 25%{transform:scale(1.1) rotate(3deg)} 50%{transform:scale(0.95) rotate(-3deg)} 75%{transform:scale(1.05) rotate(2deg)} }
        @keyframes shimmer        { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
        @keyframes slideDown      { from{opacity:0;transform:translateY(-30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideUp        { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn         { from{opacity:0} to{opacity:1} }
        @keyframes scaleIn        { from{opacity:0;transform:scale(0.85)} to{opacity:1;transform:scale(1)} }
        @keyframes omPulse        { 0%,100%{text-shadow:0 0 10px rgba(255,119,34,0.4)} 50%{text-shadow:0 0 35px rgba(255,119,34,0.9),0 0 60px rgba(212,175,55,0.6)} }
        @keyframes borderGlow     { 0%,100%{box-shadow:0 0 5px rgba(212,175,55,0.3)} 50%{box-shadow:0 0 20px rgba(212,175,55,0.8),0 0 40px rgba(255,119,34,0.4)} }
        @keyframes petalFall      { 0%{transform:translateY(-20px) rotate(0deg);opacity:0} 10%{opacity:1} 90%{opacity:1} 100%{transform:translateY(100vh) rotate(720deg);opacity:0} }
        @keyframes typeCursor     { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes sacredPulse    { 0%,100%{opacity:0.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.05)} }
        @keyframes goldShimmer    { 0%{filter:brightness(1)} 50%{filter:brightness(1.25) saturate(1.3)} 100%{filter:brightness(1)} }
        @keyframes navGlow        { 0%,100%{box-shadow:0 4px 20px rgba(107,26,26,0.5)} 50%{box-shadow:0 4px 40px rgba(255,119,34,0.4),0 0 60px rgba(212,175,55,0.15)} }

        /* ── Navbar ── */
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
        .logo-wrap:hover { transform: scale(1.05); }
        .logo-om {
          font-size: 1.9rem;
          animation: omPulse 3s ease-in-out infinite;
        }
        .logo-text {
          font-family: 'Cinzel Decorative', 'Playfair Display', serif;
          font-size: 1.45rem; font-weight: 700;
          color: var(--gold);
          letter-spacing: 2px;
          text-shadow: 0 0 15px rgba(212,175,55,0.5);
        }
        .logo-sub {
          font-family: 'Poppins', sans-serif;
          font-size: 0.58rem; font-weight: 400;
          color: rgba(245,230,211,0.7);
          letter-spacing: 1.5px;
          display: block; text-transform: uppercase; margin-top: -4px;
        }
        .nav-links {
          display: flex; gap: 0.5rem; list-style: none; align-items: center;
        }
        .nav-link {
          color: var(--sandalwood);
          text-decoration: none; font-size: 0.92rem; cursor: pointer;
          font-family: 'Poppins', sans-serif; font-weight: 500;
          padding: 0.6rem 1rem; border-radius: 8px;
          transition: all 0.3s ease; position: relative;
          letter-spacing: 0.3px;
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
          padding: 0.6rem 1.6rem; border-radius: 25px;
          cursor: pointer; font-weight: 700; font-size: 0.9rem;
          font-family: 'Poppins', sans-serif;
          box-shadow: 0 4px 15px rgba(255,119,34,0.4);
          transition: all 0.3s ease; letter-spacing: 0.5px;
        }
        .nav-btn:hover {
          transform: translateY(-3px);
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

        /* ── Hero ── */
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
          max-width: 860px; animation: fadeIn 1s ease-out;
        }
        .hero-om {
          font-size: 4.5rem; display: block;
          animation: omPulse 3s ease-in-out infinite, floatUp 5s ease-in-out infinite;
          margin-bottom: 0.5rem;
        }
        .hero-shloka {
          font-family: 'Tiro Devanagari Hindi', 'Mangal', serif;
          font-size: 1.25rem; color: var(--bright-gold);
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
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          color: var(--text-light); font-weight: 700;
          line-height: 1.15; margin-bottom: 0.8rem;
          animation: slideDown 1s ease-out 0.3s both;
          text-shadow: 2px 2px 8px rgba(0,0,0,0.4);
        }
        .hero-gold { color: var(--bright-gold); }
        .hero-subtitle {
          font-size: clamp(0.95rem, 2vw, 1.2rem);
          color: rgba(245,230,211,0.9); line-height: 1.8;
          margin-bottom: 1.5rem;
          animation: slideUp 1s ease-out 0.5s both;
        }
        .hero-pillars {
          display: flex; justify-content: center; gap: 1.2rem;
          flex-wrap: wrap; margin-bottom: 2.5rem;
          animation: fadeIn 1s ease-out 0.8s both;
        }
        .pillar-badge {
          background: rgba(212,175,55,0.15);
          border: 1px solid rgba(212,175,55,0.4);
          color: var(--bright-gold); font-family: 'Poppins', sans-serif;
          font-size: 0.78rem; font-weight: 600; letter-spacing: 1.5px;
          padding: 0.35rem 1rem; border-radius: 20px; text-transform: uppercase;
          transition: all 0.3s ease;
        }
        .pillar-badge:hover {
          background: rgba(212,175,55,0.3);
          box-shadow: 0 0 15px rgba(212,175,55,0.4);
        }
        .hero-lotus-row {
          display: flex; justify-content: center; gap: 1.5rem;
          margin-bottom: 2.5rem;
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
          transform: translateY(-5px);
          box-shadow: 0 16px 40px rgba(255,119,34,0.6);
          background: linear-gradient(135deg, var(--bright-gold), var(--gold));
          color: var(--text-dark);
        }
        .cta-primary:active { transform: translateY(-2px); }
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
          transform: translateY(-4px);
        }
        .hero-cta-row {
          display: flex; justify-content: center; gap: 1.2rem; flex-wrap: wrap;
        }
        .hero-scroll-hint {
          position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%);
          color: rgba(245,230,211,0.5); font-size: 0.8rem; font-family: 'Poppins', sans-serif;
          display: flex; flex-direction: column; align-items: center; gap: 0.4rem;
          animation: floatUp 2s ease-in-out infinite;
        }
        .hero-scroll-hint span { font-size: 1.2rem; }

        /* ── Section Shared ── */
        .section-wrapper {
          position: relative; overflow: hidden;
        }
        .section-mandala-bg {
          position: absolute; top: 50%; right: -80px;
          transform: translateY(-50%);
          pointer-events: none; z-index: 0;
        }
        .section-mandala-bg-left {
          position: absolute; top: 50%; left: -80px;
          transform: translateY(-50%);
          pointer-events: none; z-index: 0;
        }
        .section-inner {
          position: relative; z-index: 1;
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
          margin-bottom: 3rem; opacity: 0.85;
        }

        /* ── How It Works (Goals) ── */
        .goals-bg { background: var(--cream); }
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
          border: 1px solid rgba(212,175,55,0.2);
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
          transform: translateY(-10px);
          box-shadow: 0 20px 45px rgba(107,26,26,0.15);
          border-color: rgba(212,175,55,0.5);
          animation: borderGlow 2s ease-in-out infinite;
        }
        .goal-icon { font-size: 3rem; margin-bottom: 1rem; display: block; }
        .goal-card h3 { color: var(--deep-maroon); font-size: 1.35rem; margin-bottom: 0.8rem; }
        .goal-card p  { color: #666; line-height: 1.7; font-size: 0.95rem; }

        /* ── Stats Row ── */
        .stats-bg {
          background: linear-gradient(135deg, #3D0C0C 0%, #6B1A1A 50%, #8B3A0A 100%);
          padding: 4rem 2rem; text-align: center;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 2rem; max-width: 900px; margin: 0 auto;
        }
        .stat-item { display: flex; flex-direction: column; align-items: center; gap: 0.4rem; }
        .stat-num {
          font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 700;
          color: var(--bright-gold);
          text-shadow: 0 0 20px rgba(255,215,0,0.4);
        }
        .stat-label {
          font-family: 'Poppins', sans-serif; font-size: 0.85rem;
          color: rgba(245,230,211,0.8); text-transform: uppercase; letter-spacing: 1px;
        }

        /* ── Contribute / CTA Section ── */
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
          animation: goldShimmer 3s ease-in-out infinite;
        }
        .contribute-bg p {
          font-size: 1.1rem; color: rgba(245,230,211,0.9);
          max-width: 580px; margin: 0 auto 2.5rem; line-height: 1.8;
        }
        .contribute-bg .section-mandala-bg { opacity: 0.05; }

        /* Diya flame */
        .diya-flame {
          font-size: 1.4rem;
          animation: flameFlicker 0.8s ease-in-out infinite;
          display: inline-block;
          filter: drop-shadow(0 0 6px rgba(255,150,0,0.8));
        }

        /* ── About Page ── */
        .about-bg { background: white; }
        .about-hero-strip {
          background: linear-gradient(135deg, #3D0C0C 0%, #6B1A1A 60%, #8B3A0A 100%);
          padding: 4rem 2rem; text-align: center;
        }
        .about-hero-strip h1 {
          color: var(--bright-gold); font-size: clamp(2rem, 5vw, 3.5rem);
          text-shadow: 0 0 25px rgba(255,215,0,0.4);
        }
        .about-hero-strip p {
          color: rgba(245,230,211,0.85); max-width: 680px; margin: 1rem auto 0;
          line-height: 1.8; font-size: 1.05rem;
        }
        .about-content {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 4rem; align-items: center; margin-bottom: 3rem;
        }
        .about-text h2 {
          font-size: 2.2rem; color: var(--deep-maroon); margin-bottom: 1.2rem;
        }
        .about-text p {
          font-size: 1rem; line-height: 1.9; color: #555; margin-bottom: 1.2rem;
        }
        .pillars-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1.5rem;
        }
        .pillar-card {
          background: var(--cream); border-radius: 10px; padding: 1rem;
          border-left: 3px solid var(--saffron); text-align: left;
        }
        .pillar-card h4 { color: var(--saffron); font-size: 1rem; margin-bottom: 0.3rem; font-family: 'Poppins', sans-serif; }
        .pillar-card p  { font-size: 0.82rem; color: #777; line-height: 1.5; }
        .about-image-wrap {
          border-radius: var(--border-r); overflow: hidden;
          box-shadow: 0 15px 50px rgba(107,26,26,0.2);
          border: 3px solid rgba(212,175,55,0.3);
          position: relative;
        }
        .about-image-wrap img { width: 100%; display: block; }
        .about-image-wrap::after {
          content: '🕉';
          position: absolute; top: 1rem; right: 1rem;
          font-size: 2rem;
          animation: omPulse 3s ease-in-out infinite, floatUp 4s ease-in-out infinite;
        }

        /* ── Team Section ── */
        .team-bg {
          background: var(--cream);
          padding: 4rem 0;
          border-top: 2px solid var(--gold);
          border-bottom: 2px solid var(--gold);
        }
        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem; max-width: 1200px; margin: 0 auto; padding: 0 2rem;
        }
        .team-card {
          background: white; border-radius: var(--border-r);
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(107,26,26,0.08);
          transition: all 0.4s ease; cursor: pointer;
          border: 1px solid rgba(212,175,55,0.15);
          position: relative;
        }
        .team-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px;
          background: linear-gradient(90deg, var(--saffron), var(--gold), var(--saffron));
          background-size: 200% 100%;
          animation: shimmer 2s linear infinite; opacity: 0; transition: opacity 0.3s;
        }
        .team-card:hover::before { opacity: 1; }
        .team-card:hover {
          transform: translateY(-14px);
          box-shadow: 0 25px 55px rgba(107,26,26,0.2);
          border-color: rgba(212,175,55,0.4);
        }
        .team-card-img { width: 100%; height: 240px; object-fit: cover; transition: transform 0.5s ease; }
        .team-card:hover .team-card-img { transform: scale(1.07); }
        .team-info { padding: 1.8rem; }
        .team-info h3 { color: var(--deep-maroon); font-size: 1.4rem; margin-bottom: 0.3rem; }
        .team-role { color: var(--saffron); font-weight: 600; font-size: 0.88rem; font-family: 'Poppins', sans-serif; margin-bottom: 0.25rem; }
        .team-year { color: #aaa; font-size: 0.8rem; font-family: 'Poppins', sans-serif; margin-bottom: 0.9rem; }
        .team-info p  { color: #666; font-size: 0.9rem; line-height: 1.6; }

        /* ── Auth Forms ── */
        .auth-page-bg {
          min-height: 100vh;
          background:
            linear-gradient(160deg, rgba(61,12,12,0.96) 0%, rgba(107,26,26,0.92) 50%, rgba(74,26,0,0.96) 100%),
            url('/cultural-heritage-patterns-textures.jpg') center/cover no-repeat;
          display: flex; align-items: center; justify-content: center;
          padding: 3rem 1rem; position: relative; overflow: hidden;
        }
        .auth-page-bg .petal {
          position: absolute;
          font-size: 1.5rem; pointer-events: none;
          animation: petalFall linear infinite;
        }
        .auth-card {
          background: rgba(255,248,240,0.97);
          border-radius: 20px; padding: 3rem 2.5rem;
          width: 100%; max-width: 440px;
          box-shadow: 0 25px 70px rgba(0,0,0,0.35);
          border: 1px solid rgba(212,175,55,0.3);
          position: relative; z-index: 2;
          animation: scaleIn 0.6s ease-out;
        }
        .auth-card-header {
          text-align: center; margin-bottom: 2rem;
        }
        .auth-card-header .om { font-size: 2.5rem; display: block; margin-bottom: 0.5rem;
          animation: omPulse 3s ease-in-out infinite; }
        .auth-card-header h2 { color: var(--deep-maroon); font-size: 2rem; }
        .auth-card-header p  { color: #888; font-size: 0.88rem; font-family: 'Poppins', sans-serif; margin-top: 0.3rem; }
        .form-group { margin-bottom: 1.4rem; }
        .form-group label {
          display: block; margin-bottom: 0.45rem;
          color: var(--text-dark); font-weight: 600; font-size: 0.88rem;
          font-family: 'Poppins', sans-serif;
        }
        .form-group input {
          width: 100%; padding: 0.8rem 1rem;
          border: 2px solid rgba(212,175,55,0.25);
          border-radius: 10px; font-size: 0.95rem;
          transition: all 0.3s ease; font-family: 'Merriweather', serif;
          background: white; color: var(--text-dark);
        }
        .form-group input:focus {
          outline: none; border-color: var(--saffron);
          box-shadow: 0 0 0 3px rgba(255,119,34,0.12);
        }
        .form-submit-btn {
          width: 100%; padding: 0.9rem;
          background: linear-gradient(135deg, var(--deep-maroon), var(--saffron));
          color: white; border: none; border-radius: 10px;
          font-size: 1rem; font-weight: 700; cursor: pointer;
          font-family: 'Poppins', sans-serif;
          transition: all 0.3s ease; letter-spacing: 0.5px;
          box-shadow: 0 6px 20px rgba(107,26,26,0.3);
        }
        .form-submit-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(107,26,26,0.45);
        }
        .auth-switch {
          text-align: center; margin-top: 1.5rem;
          color: #888; font-size: 0.88rem; font-family: 'Poppins', sans-serif;
        }
        .auth-switch a {
          color: var(--saffron); cursor: pointer; font-weight: 700;
          text-decoration: none; transition: color 0.2s;
        }
        .auth-switch a:hover { color: var(--deep-maroon); }

        /* ── Upload Page ── */
        .upload-page-bg {
          min-height: 100vh;
          background: linear-gradient(160deg, var(--cream) 0%, #FFF0E0 100%);
          padding: 4rem 2rem;
          position: relative; overflow: hidden;
        }
        .upload-card {
          background: white; border-radius: 20px;
          padding: 3rem; max-width: 640px; margin: 0 auto;
          box-shadow: 0 10px 40px rgba(107,26,26,0.12);
          border: 1px solid rgba(212,175,55,0.2);
          position: relative; z-index: 2;
        }
        .upload-card-header { text-align: center; margin-bottom: 2rem; }
        .upload-card-header h2 { color: var(--deep-maroon); font-size: 2rem; }
        .upload-card-header p  { color: #888; font-size: 0.9rem; margin-top: 0.4rem; font-family: 'Poppins', sans-serif; }
        .drop-zone {
          border: 2px dashed rgba(212,175,55,0.6);
          border-radius: 14px; padding: 3rem 2rem;
          text-align: center; cursor: pointer;
          background: var(--cream); transition: all 0.3s ease;
          position: relative; overflow: hidden;
        }
        .drop-zone:hover {
          border-color: var(--saffron);
          background: rgba(255,119,34,0.04);
          box-shadow: 0 0 25px rgba(255,119,34,0.15);
        }
        .drop-zone-icon { font-size: 3.5rem; display: block; margin-bottom: 0.8rem; }
        .drop-zone p { color: var(--deep-maroon); font-weight: 600; font-size: 1rem; }
        .drop-zone span { color: #aaa; font-size: 0.82rem; font-family: 'Poppins', sans-serif; }
        .upload-success {
          text-align: center; padding: 2rem;
          animation: scaleIn 0.5s ease-out;
        }
        .upload-success .success-icon { font-size: 4rem; display: block; margin-bottom: 1rem; animation: floatUp 2s ease-in-out infinite; }
        .upload-success h3 { color: var(--deep-maroon); font-size: 1.8rem; margin-bottom: 0.8rem; }
        .upload-success p  { color: #666; font-family: 'Poppins', sans-serif; font-size: 0.95rem; }
        .form-group select {
          width: 100%; padding: 0.8rem 1rem;
          border: 2px solid rgba(212,175,55,0.25);
          border-radius: 10px; font-size: 0.95rem;
          font-family: 'Merriweather', serif;
          background: white; color: var(--text-dark);
          transition: all 0.3s; cursor: pointer;
        }
        .form-group select:focus {
          outline: none; border-color: var(--saffron);
          box-shadow: 0 0 0 3px rgba(255,119,34,0.12);
        }
        .form-group textarea {
          width: 100%; padding: 0.8rem 1rem;
          border: 2px solid rgba(212,175,55,0.25);
          border-radius: 10px; font-size: 0.95rem;
          font-family: 'Merriweather', serif;
          background: white; color: var(--text-dark);
          resize: vertical; min-height: 100px;
          transition: all 0.3s;
        }
        .form-group textarea:focus {
          outline: none; border-color: var(--saffron);
          box-shadow: 0 0 0 3px rgba(255,119,34,0.12);
        }

        /* ── Dashboard ── */
        .dashboard-page-bg {
          min-height: 100vh;
          background: linear-gradient(160deg, var(--cream) 0%, #FFF0E0 100%);
          padding: 2.5rem 2rem;
          position: relative; overflow: hidden;
        }
        .dashboard-inner { max-width: 1200px; margin: 0 auto; position: relative; z-index: 2; }
        .welcome-banner {
          background: linear-gradient(135deg, #3D0C0C 0%, #6B1A1A 50%, #8B3A0A 100%);
          border-radius: 20px; padding: 3rem; margin-bottom: 2rem;
          box-shadow: 0 15px 50px rgba(61,12,12,0.3);
          border: 1px solid rgba(212,175,55,0.2);
          position: relative; overflow: hidden; text-align: center;
        }
        .welcome-banner::before {
          content: '🕉';
          position: absolute; right: 2rem; top: 50%; transform: translateY(-50%);
          font-size: 5rem; opacity: 0.08;
        }
        .welcome-banner h2 {
          color: var(--bright-gold); font-size: 2rem; margin-bottom: 0.5rem;
          text-shadow: 0 0 20px rgba(255,215,0,0.3);
        }
        .welcome-banner .greeting-shloka {
          font-family: 'Tiro Devanagari Hindi', serif;
          color: rgba(245,230,211,0.75); font-size: 0.95rem; margin-bottom: 0.5rem;
        }
        .welcome-banner p { color: rgba(245,230,211,0.8); font-size: 0.95rem; font-family: 'Poppins', sans-serif; }
        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1.8rem;
        }
        .dashboard-card {
          background: white; border-radius: 16px; padding: 2.2rem;
          box-shadow: 0 4px 20px rgba(107,26,26,0.08);
          border: 1px solid rgba(212,175,55,0.15);
          transition: all 0.3s ease;
        }
        .dashboard-card:hover {
          border-color: rgba(212,175,55,0.45);
          box-shadow: 0 12px 35px rgba(212,175,55,0.18);
          transform: translateY(-5px);
        }
        .dashboard-card-icon { font-size: 2.5rem; margin-bottom: 1rem; display: block; }
        .dashboard-card h3 { color: var(--deep-maroon); font-size: 1.4rem; margin-bottom: 0.7rem; }
        .dashboard-card p  { color: #666; font-family: 'Poppins', sans-serif; font-size: 0.9rem; line-height: 1.7; margin-bottom: 1.5rem; }

        /* ── Footer ── */
        .sacred-footer {
          background: linear-gradient(180deg, #2D0808 0%, #3D0C0C 60%, #1A0404 100%);
          color: var(--text-light);
          padding: 4rem 2rem 2rem;
          border-top: 3px solid var(--gold);
          position: relative; overflow: hidden;
        }
        .footer-mandala {
          position: absolute; bottom: -60px; right: -60px; opacity: 0.04;
        }
        .footer-content {
          max-width: 1200px; margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 3rem; padding-bottom: 3rem;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          position: relative; z-index: 1;
        }
        .footer-logo { display: flex; align-items: center; gap: 0.6rem; margin-bottom: 1rem; }
        .footer-logo-om { font-size: 2rem; animation: omPulse 3s ease-in-out infinite; }
        .footer-logo-text {
          font-family: 'Cinzel Decorative', 'Playfair Display', serif;
          font-size: 1.2rem; color: var(--gold); letter-spacing: 2px;
        }
        .footer-tagline {
          font-family: 'Tiro Devanagari Hindi', serif;
          color: rgba(245,230,211,0.6); font-size: 0.85rem; margin-bottom: 0.8rem;
        }
        .footer-section h3 {
          font-family: 'Playfair Display', serif;
          color: var(--gold); margin-bottom: 1.2rem; font-size: 1.1rem;
        }
        .footer-section p, .footer-section a {
          color: rgba(255,255,255,0.75); font-size: 0.9rem; line-height: 1.9;
          text-decoration: none; display: block; cursor: pointer;
          font-family: 'Poppins', sans-serif;
          transition: color 0.3s ease;
        }
        .footer-section a:hover { color: var(--bright-gold); }
        .social-row { display: flex; gap: 0.8rem; margin-top: 1rem; }
        .social-btn {
          width: 42px; height: 42px; border-radius: 50%;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem; cursor: pointer; transition: all 0.3s ease;
          text-decoration: none; color: white;
        }
        .social-btn:hover {
          background: var(--saffron);
          border-color: var(--saffron);
          transform: translateY(-4px) scale(1.1);
          box-shadow: 0 8px 20px rgba(255,119,34,0.4);
          filter: none;
        }
        .footer-bottom {
          max-width: 1200px; margin: 2rem auto 0;
          text-align: center; position: relative; z-index: 1;
        }
        .footer-bottom p {
          color: rgba(255,255,255,0.45);
          font-family: 'Poppins', sans-serif; font-size: 0.8rem;
        }
        .footer-bottom strong { color: var(--gold); }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .hero h1  { font-size: 2.3rem; }
          .about-content { grid-template-columns: 1fr; }
          .nav-links { display: none; }
          .nav-links.open {
            display: flex; flex-direction: column; position: absolute;
            top: 100%; left: 0; right: 0;
            background: #3D0C0C; padding: 1rem 2rem;
            gap: 0.5rem; border-bottom: 2px solid var(--gold);
          }
          .nav-mobile-toggle { display: flex !important; }
          .pillars-grid { grid-template-columns: 1fr; }
          .hero-pillars { gap: 0.6rem; }
          .upload-card { padding: 2rem 1.5rem; }
        }
        @media (min-width: 769px) {
          .nav-mobile-toggle { display: none !important; }
        }

        /* ── Utility ── */
        .text-gold  { color: var(--bright-gold); }
        .text-saffron { color: var(--saffron); }
      `}</style>

      {/* Sacred Particle Canvas */}
      <SacredCanvas />

      {/* ══════════════════════════════════════
          NAVIGATION
      ══════════════════════════════════════ */}
      <nav className={`sacred-nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-container">
          <div className="logo-wrap" onClick={() => handleNavigation("home")}>
            <span className="logo-om">🕉</span>
            <div>
              <span className="logo-text">CHPP</span>
              <span className="logo-sub">Cultural Heritage Preservation Portal</span>
            </div>
          </div>

          {/* Desktop nav */}
          <ul className={`nav-links${menuOpen ? " open" : ""}`}>
            <li><span className="nav-link" onClick={() => handleNavigation("home")}>Home</span></li>
            <li><span className="nav-link" onClick={() => handleNavigation("about")}>About</span></li>
            <li><span className="nav-link" onClick={() => handleNavigation("upload")}>Upload</span></li>
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

          {/* Mobile hamburger */}
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
          {/* Hero */}
          <section className="hero">
            <div className="hero-mandala-bg">
              <Mandala size={700} opacity={1} spinning />
            </div>

            <div className="hero-content">
              <span className="hero-om">🕉</span>

              <div className="hero-shloka">
                {typedText}<span className="shloka-cursor" />
              </div>

              <h1>
                Preserve <span className="hero-gold">Stories</span>,<br />
                Connect <span className="hero-gold">Generations</span>
              </h1>

              <p className="hero-subtitle">
                A sacred initiative under Amrita Vishwa Vidyapeetam's SSR programme — recording, preserving and sharing
                the timeless wisdom of our elders and the living traditions of Sanatan Dharma.
              </p>

              <div className="hero-pillars">
                {["🔱 Dharma", "🌿 Satya", "🙏 Seva", "📿 Parampara"].map((p) => (
                  <span key={p} className="pillar-badge">{p}</span>
                ))}
              </div>

              <div className="hero-lotus-row">
                <LotusBloom size={90} />
                <LotusBloom size={110} />
                <LotusBloom size={90} />
              </div>

              <div className="hero-cta-row">
                <button className="cta-primary" onClick={() => window.open("https://www.youtube.com/@ashrithvenkat5507", "_blank")}>
                  🎬 Watch on YouTube
                </button>
                <button className="cta-secondary" onClick={() => handleNavigation("upload")}>
                  📹 Share Your Story
                </button>
              </div>
            </div>

            <div className="hero-scroll-hint">
              <span>↓</span>
              <span>Scroll to explore</span>
            </div>
          </section>

          <OrnamentDivider />

          {/* How It Works */}
          <section className="section-wrapper goals-bg">
            <div className="section-mandala-bg">
              <Mandala size={420} opacity={0.055} spinning={false} />
            </div>
            <div className="section-inner">
              <h2 className="section-title">How It Works</h2>
              <p className="section-subtitle">यदा यदा हि धर्मस्य ग्लानिर्भवति भारत — Whenever Dharma is in need, we rise.</p>
              <div className="goals-grid">
                {[
                  {
                    icon: "🎙", title: "Record Oral Traditions",
                    desc: "Students and community volunteers sit with elders — recording folk songs, ritual knowledge, medicinal lore, and ancestral stories that live only in memory.",
                  },
                  {
                    icon: "🪷", title: "Preserve with Purpose",
                    desc: "Each video is reviewed, enriched with context and uploaded to our YouTube channel. YouTube's AI auto-generates multi-language subtitles for global reach.",
                  },
                  {
                    icon: "🌐", title: "Share Across Generations",
                    desc: "Young and old reconnect through this living digital archive — ensuring Parampara (lineage of wisdom) is never broken, no matter where in the world you are.",
                  },
                  {
                    icon: "📿", title: "Rooted in Seva",
                    desc: "This is not a project — it is a Seva. Every recording is an act of devotion to the culture that shaped us, guided by Amrita Vishwa Vidyapeetham's mission.",
                  },
                ].map((c) => (
                  <div key={c.title} className="goal-card">
                    <span className="goal-icon">{c.icon}</span>
                    <h3>{c.title}</h3>
                    <p>{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <OrnamentDivider />

          {/* Stats */}
          <div className="stats-bg">
            <div style={{ position: "relative", overflow: "hidden" }}>
              <div className="stats-grid">
                {[
                  { num: "50+", label: "Stories Recorded" },
                  { num: "6", label: "Team Members" },
                  { num: "∞", label: "Cultural Heritage" },
                  { num: "1", label: "Sacred Mission" },
                ].map((s) => (
                  <div key={s.label} className="stat-item">
                    <span className="stat-num">{s.num}</span>
                    <span className="stat-label">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <OrnamentDivider />

          {/* Featured Content Preview */}
          <section className="section-wrapper" style={{ background: "white" }}>
            <div className="section-mandala-bg-left">
              <Mandala size={380} opacity={0.05} spinning={false} />
            </div>
            <div className="section-inner">
              <h2 className="section-title">Sacred Traditions We Preserve</h2>
              <p className="section-subtitle">प्रत्यक्षं किम् प्रमाणम् — See it with your own eyes</p>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "1.8rem",
              }}>
                {[
                  { img: "/elder-telling-stories.jpg", title: "Oral Storytelling", tag: "वाचिक परम्परा" },
                  { img: "/grandmother-cooking-traditional.jpg", title: "Traditional Culinary Arts", tag: "पाक कला" },
                  { img: "/man-playing-traditional-music.jpg", title: "Folk Music & Song", tag: "संगीत" },
                  { img: "/traditional-handicraft-making.jpg", title: "Sacred Handicrafts", tag: "शिल्प कला" },
                ].map((item) => (
                  <div
                    key={item.title}
                    style={{
                      borderRadius: "var(--border-r)", overflow: "hidden",
                      boxShadow: "0 8px 30px rgba(107,26,26,0.12)",
                      border: "1px solid rgba(212,175,55,0.2)",
                      transition: "all 0.4s ease", cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(-8px)"
                      ;(e.currentTarget as HTMLDivElement).style.boxShadow = "0 20px 50px rgba(107,26,26,0.2)"
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.transform = ""
                      ;(e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 30px rgba(107,26,26,0.12)"
                    }}
                  >
                    <div style={{ height: "200px", overflow: "hidden" }}>
                      <img src={item.img} alt={item.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                      />
                    </div>
                    <div style={{ padding: "1.2rem 1.5rem" }}>
                      <div style={{
                        fontFamily: "'Tiro Devanagari Hindi', serif",
                        color: "var(--saffron)", fontSize: "0.82rem", marginBottom: "0.3rem"
                      }}>{item.tag}</div>
                      <h3 style={{ color: "var(--deep-maroon)", fontSize: "1.1rem" }}>{item.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <OrnamentDivider />

          {/* Contribute CTA */}
          <section className="contribute-bg">
            <div className="section-mandala-bg"><Mandala size={500} opacity={1} spinning /></div>
            <div className="diya-row">
              <Diya /><Diya /><Diya />
            </div>
            <h2>जागो! अपनी परम्परा जगाओ।</h2>
            <p style={{ fontFamily: "'Tiro Devanagari Hindi', serif", fontSize: "0.95rem", color: "rgba(245,230,211,0.7)", marginBottom: "0.5rem" }}>
              "Awaken! Awaken your tradition."
            </p>
            <p>
              Every elder's voice carries centuries of living knowledge. Be the bridge between past and future —
              record, share, and immortalise the sacred traditions of Sanatan Dharma before they fade.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "1.2rem", flexWrap: "wrap" }}>
              <button className="cta-primary" onClick={() => handleNavigation(isLoggedIn ? "upload" : "login")}>
                🙏 Upload Your Story
              </button>
              <button className="cta-secondary" style={{ color: "var(--sandalwood)", borderColor: "rgba(245,230,211,0.3)" }}
                onClick={() => handleNavigation("about")}>
                🕉 Learn Our Mission
              </button>
            </div>
          </section>
        </>
      )}

      {/* ══════════════════════════════════════
          ABOUT PAGE
      ══════════════════════════════════════ */}
      {currentPage === "about" && (
        <section className="about-bg section-wrapper">
          {/* Hero Strip */}
          <div className="about-hero-strip" style={{ position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.06, pointerEvents: "none" }}>
              <Mandala size={500} opacity={1} spinning />
            </div>
            <div style={{ position: "relative", zIndex: 2 }}>
              <LotusBloom size={80} />
              <h1 style={{ marginTop: "1rem" }}>About Our Sacred Mission</h1>
              <p>
                An SSR initiative of Amrita Vishwa Vidyapeetam — where student researchers, community elders and
                digital technology converge in service of Sanatan Dharma.
              </p>
            </div>
          </div>

          <OrnamentDivider />

          <div className="section-inner">
            {/* Mission content */}
            <div className="about-content">
              <div className="about-text">
                <h2>Bridging Past &amp; Future</h2>
                <p>
                  The <strong>Cultural Heritage Preservation Portal (CHPP)</strong> is a student-led Seva project
                  under Amrita Vishwa Vidyapeetam's Social Service &amp; Research (SSR) programme. We believe that
                  Sanatan Dharma is not merely a religion — it is a civilisational consciousness, a living river of
                  wisdom flowing through generations.
                </p>
                <p>
                  Our students sit with village elders, grandmothers in their kitchens, folk musicians in village
                  squares, and traditional craftsmen in their workshops — documenting traditions that textbooks
                  cannot capture. Every video uploaded is an act of <em>Seva</em> — selfless service to our ancestors
                  and to the children who will inherit this legacy.
                </p>
                <p>
                  Through YouTube's global platform and AI-powered multilingual subtitles, these stories of
                  <em> Dharma, Satya</em> and <em>Parampara</em> now travel across continents — carrying the
                  fragrance of our culture to the diaspora and the world.
                </p>
                <div className="pillars-grid">
                  {[
                    { icon: "🔱", name: "Dharma", desc: "Righteous duty — we preserve what is sacred and true." },
                    { icon: "🌿", name: "Satya", desc: "Truth — authentic, unfiltered oral knowledge." },
                    { icon: "🙏", name: "Seva", desc: "Selfless service — students volunteer their time and skill." },
                    { icon: "📿", name: "Parampara", desc: "Lineage — elder to youth, an unbroken chain." },
                  ].map((p) => (
                    <div key={p.name} className="pillar-card">
                      <h4>{p.icon} {p.name}</h4>
                      <p>{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="about-image-wrap">
                <img src="/elder-sharing-wisdom-with-youth.jpg" alt="Elder sharing wisdom with youth" />
              </div>
            </div>

            <OrnamentDivider />

            {/* Team */}
            <div className="team-bg" style={{ borderRadius: "20px", overflow: "hidden", margin: "2rem 0" }}>
              <div style={{ textAlign: "center", padding: "2.5rem 2rem 1rem" }}>
                <h2 className="section-title">Our Devoted Team</h2>
                <p className="section-subtitle" style={{ marginBottom: "0" }}>सेवा परमो धर्मः — Service is the highest Dharma</p>
              </div>
              <OrnamentDivider />
              <div className="team-grid" style={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
                {teamMembers.map((member) => (
                  <div key={member.id} className="team-card">
                    <img className="team-card-img" src={member.image || "/placeholder-user.jpg"} alt={member.name} />
                    <div className="team-info">
                      <h3>{member.name}</h3>
                      <div className="team-role">✦ {member.role}</div>
                      <div className="team-year">{member.year}</div>
                      <p>{member.contribution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <OrnamentDivider />

            {/* University Banner */}
            <div style={{
              background: "linear-gradient(135deg, #3D0C0C, #6B1A1A)",
              borderRadius: "16px", padding: "2.5rem", textAlign: "center",
              border: "1px solid rgba(212,175,55,0.25)",
              boxShadow: "0 10px 35px rgba(61,12,12,0.25)",
            }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "0.8rem", animation: "omPulse 3s ease-in-out infinite" }}>🕉</div>
              <h3 style={{ color: "var(--bright-gold)", fontSize: "1.6rem", marginBottom: "0.6rem" }}>
                Amrita Vishwa Vidyapeetam
              </h3>
              <p style={{ color: "rgba(245,230,211,0.8)", maxWidth: "550px", margin: "0 auto", lineHeight: 1.8, fontFamily: "'Poppins',sans-serif", fontSize: "0.9rem" }}>
                Founded by Sri Mata Amritanandamayi Devi — guided by compassion, devotion and the transformative power of selfless service.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════
          UPLOAD PAGE
      ══════════════════════════════════════ */}
      {currentPage === "upload" && (
        <div className="upload-page-bg">
          <div className="section-mandala-bg" style={{ top: "10%", right: "-60px", opacity: 0.07 }}>
            <Mandala size={380} opacity={1} spinning={false} />
          </div>
          <div className="upload-card">
            {uploadSuccess ? (
              <div className="upload-success">
                <span className="success-icon">🙏</span>
                <h3>Dhanyavaad! धन्यवाद</h3>
                <p>Your sacred story has been submitted for review. Once approved, it will be shared on our YouTube channel — preserving this tradition for generations to come.</p>
                <OrnamentDivider />
                <button className="cta-primary" style={{ marginTop: "1rem" }} onClick={() => { setUploadSuccess(false); setCurrentPage("dashboard") }}>
                  Go to Dashboard
                </button>
              </div>
            ) : (
              <>
                <div className="upload-card-header">
                  <span style={{ fontSize: "2.5rem", display: "block", marginBottom: "0.5rem", animation: "floatUp 3s ease-in-out infinite" }}>📹</span>
                  <h2>Share Your Sacred Story</h2>
                  <p>Submit a video for review — help us preserve Sanatan Dharma's living traditions.</p>
                </div>
                <OrnamentDivider />
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setUploadSuccess(true)
                  }}
                >
                  <div className="form-group">
                    <label>Story Title *</label>
                    <input type="text" placeholder="e.g., Grandmother's Pongal Ritual" required />
                  </div>
                  <div className="form-group">
                    <label>Cultural Category *</label>
                    <select required>
                      <option value="">Select a category</option>
                      <option>Oral Traditions & Stories</option>
                      <option>Traditional Cuisine & Recipes</option>
                      <option>Folk Music & Dance</option>
                      <option>Sacred Rituals & Festivals</option>
                      <option>Traditional Crafts & Arts</option>
                      <option>Medicinal & Herbal Wisdom</option>
                      <option>Agricultural Traditions</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea placeholder="Briefly describe the tradition, who is featured, and why it matters..." />
                  </div>
                  <div className="form-group">
                    <label>Video File *</label>
                    <div
                      className="drop-zone"
                      onClick={() => document.getElementById("video-input")?.click()}
                    >
                      <span className="drop-zone-icon">🎬</span>
                      <p>Click or drag & drop your video here</p>
                      <span>MP4, MOV, AVI — up to 500MB</span>
                    </div>
                    <input type="file" id="video-input" accept="video/*" style={{ display: "none" }} />
                  </div>
                  <button type="submit" className="form-submit-btn">
                    🙏 Submit Sacred Story
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
          <div className="section-mandala-bg" style={{ top: "50%", right: "-80px", opacity: 0.06 }}>
            <Mandala size={420} opacity={1} spinning={false} />
          </div>
          <div className="dashboard-inner">
            <div className="welcome-banner">
              <p className="greeting-shloka">नमस्ते — Namasthe</p>
              <h2>🙏 Welcome, {userName}!</h2>
              <p>
                "सर्वे भवन्तु सुखिनः" — May all be happy. You are now part of a sacred mission to preserve
                the timeless wisdom of Sanatan Dharma.
              </p>
            </div>

            <div className="dashboard-grid">
              <div className="dashboard-card">
                <span className="dashboard-card-icon">📤</span>
                <h3>Upload a New Story</h3>
                <p>Share cultural knowledge with the community. Record elders, rituals, folk arts, traditional wisdom and submit your video for review.</p>
                <button className="cta-primary" onClick={() => setCurrentPage("upload")}>
                  Upload Now
                </button>
              </div>
              <div className="dashboard-card">
                <span className="dashboard-card-icon">🎬</span>
                <h3>Watch on YouTube</h3>
                <p>Explore the growing archive of cultural stories. Watch interviews, learn traditions, and connect with your heritage on our YouTube channel.</p>
                <button className="cta-primary" onClick={() => window.open("https://www.youtube.com/@ashrithvenkat5507", "_blank")}>
                  Visit YouTube
                </button>
              </div>
              <div className="dashboard-card">
                <span className="dashboard-card-icon">🕉</span>
                <h3>Our Mission</h3>
                <p>Learn more about the four pillars of this project — Dharma, Satya, Seva and Parampara — and how Amrita Vishwa Vidyapeetam is leading this sacred initiative.</p>
                <button className="cta-primary" onClick={() => setCurrentPage("about")}>
                  Learn More
                </button>
              </div>
              <div className="dashboard-card">
                <span className="dashboard-card-icon">🪷</span>
                <h3>Cultural Categories</h3>
                <p>From oral storytelling and folk music to sacred recipes and ancient crafts — explore the rich tapestry of traditions we are documenting.</p>
                <button className="cta-primary" onClick={() => window.open("https://www.youtube.com/@ashrithvenkat5507", "_blank")}>
                  Explore Stories
                </button>
              </div>
            </div>

            <OrnamentDivider />

            {/* Mini pillars reminder */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem", marginTop: "0.5rem",
            }}>
              {[
                { icon: "🔱", name: "Dharma", desc: "Righteous duty to preserve" },
                { icon: "🌿", name: "Satya", desc: "Truth in every tradition" },
                { icon: "🙏", name: "Seva", desc: "Service above self" },
                { icon: "📿", name: "Parampara", desc: "The unbroken lineage" },
              ].map((p) => (
                <div key={p.name} className="pillar-card" style={{ textAlign: "center", padding: "1.5rem 1rem" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{p.icon}</div>
                  <h4 style={{ color: "var(--saffron)", fontFamily: "'Poppins',sans-serif", marginBottom: "0.3rem" }}>{p.name}</h4>
                  <p style={{ color: "#888", fontSize: "0.82rem" }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          LOGIN PAGE
      ══════════════════════════════════════ */}
      {currentPage === "login" && (
        <div className="auth-page-bg">
          {/* Floating petals */}
          {["🌸", "🪷", "🌺", "✿", "🌼"].map((p, i) => (
            <span
              key={i} className="petal"
              style={{
                left: `${10 + i * 18}%`,
                animationDuration: `${6 + i * 1.5}s`,
                animationDelay: `${i * 1.2}s`,
                fontSize: `${1.2 + (i % 3) * 0.4}rem`,
              }}
            >{p}</span>
          ))}
          <div className="auth-card">
            <div className="auth-card-header">
              <span className="om">🕉</span>
              <h2>Welcome Back</h2>
              <p>Login to continue your sacred Seva</p>
            </div>
            <OrnamentDivider />
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="Enter your email"
                  value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" placeholder="Enter your password"
                  value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
              </div>
              <button type="submit" className="form-submit-btn">
                🙏 Login
              </button>
            </form>
            <div className="auth-switch">
              Don&apos;t have an account?{" "}
              <a onClick={() => setCurrentPage("signup")}>Sign up here</a>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          SIGNUP PAGE
      ══════════════════════════════════════ */}
      {currentPage === "signup" && (
        <div className="auth-page-bg">
          {["🪷", "🌸", "✿", "🌺", "🌼"].map((p, i) => (
            <span
              key={i} className="petal"
              style={{
                left: `${5 + i * 20}%`,
                animationDuration: `${7 + i * 1.3}s`,
                animationDelay: `${i * 0.9}s`,
                fontSize: `${1.1 + (i % 3) * 0.45}rem`,
              }}
            >{p}</span>
          ))}
          <div className="auth-card">
            <div className="auth-card-header">
              <span className="om">🕉</span>
              <h2>Join the Seva</h2>
              <p>Create your account and become a cultural guardian</p>
            </div>
            <OrnamentDivider />
            <form onSubmit={handleSignup}>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="Enter your full name"
                  value={signupName} onChange={(e) => setSignupName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="Enter your email"
                  value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" placeholder="Create a password (min 6 characters)"
                  value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" placeholder="Confirm your password"
                  value={signupConfirmPassword} onChange={(e) => setSignupConfirmPassword(e.target.value)} required />
              </div>
              <button type="submit" className="form-submit-btn">
                🌺 Create Account
              </button>
            </form>
            <div className="auth-switch">
              Already have an account?{" "}
              <a onClick={() => setCurrentPage("login")}>Login here</a>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          FOOTER (all pages)
      ══════════════════════════════════════ */}
      <footer className="sacred-footer">
        <div className="footer-mandala">
          <Mandala size={500} opacity={1} spinning />
        </div>
        <div className="footer-content">
          <div>
            <div className="footer-logo">
              <span className="footer-logo-om">🕉</span>
              <span className="footer-logo-text">CHPP</span>
            </div>
            <div className="footer-tagline">सर्वे भवन्तु सुखिनः</div>
            <p className="footer-section" style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'Poppins',sans-serif", fontSize: "0.88rem", lineHeight: 1.8 }}>
              Cultural Heritage Preservation Portal — an SSR initiative of Amrita Vishwa Vidyapeetam,
              dedicated to preserving and celebrating the timeless wisdom of Sanatan Dharma.
            </p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <a onClick={() => setCurrentPage("home")}>Home</a>
            <a onClick={() => setCurrentPage("about")}>About Us</a>
            <a onClick={() => handleNavigation("upload")}>Upload Story</a>
            <a href="https://www.youtube.com/@ashrithvenkat5507" target="_blank" rel="noopener noreferrer">YouTube Channel</a>
          </div>
          <div className="footer-section">
            <h3>Sacred Pillars</h3>
            <p>🔱 Dharma — Righteous Duty</p>
            <p>🌿 Satya — Truth</p>
            <p>🙏 Seva — Selfless Service</p>
            <p>📿 Parampara — Sacred Lineage</p>
          </div>
          <div className="footer-section">
            <h3>Connect</h3>
            <p>📧 chpp@amrita.edu</p>
            <p>🏛️ Amrita Vishwa Vidyapeetam</p>
            <div className="social-row">
              <a className="social-btn" href="https://www.youtube.com/@ashrithvenkat5507" target="_blank" rel="noopener noreferrer" title="YouTube">▶</a>
              <a className="social-btn" href="#" title="Instagram">📷</a>
              <a className="social-btn" href="#" title="Twitter / X">𝕏</a>
              <a className="social-btn" href="#" title="Facebook">f</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <OrnamentDivider light />
          <p style={{ marginTop: "1rem" }}>
            &copy; 2025 <strong>Cultural Heritage Preservation Portal</strong> — Amrita Vishwa Vidyapeetam SSR Initiative.
            All rights reserved. &nbsp;|&nbsp; Built with 🙏 and &nbsp;
            <strong>Seva</strong>
          </p>
        </div>
      </footer>
    </>
  )
}

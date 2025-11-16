"use client"

import type React from "react"
import type { Video } from "@/types"

import { useState, useEffect } from "react"

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
  const [videos] = useState<Video[]>([])

  const teamMembers = [
    {
      id: 1,
      name: "Yalamarthi Madhav",
      role: "Project Coordinator",
      year: "3rd Year",
      contribution: "Oversees project planning and coordination, manages team workflow and ensures timely execution of research activities.",
      image: "/team-member-1.jpg",
    },
    {
      id: 2,
      name: "Woona Venkat Ashrith",
      role: "Video Production Lead",
      year: "3rd Year",
      contribution: "Leads video recording and editing, ensures high-quality production standards and manages all multimedia content.",
      image: "/team-member-2.jpg",
    },
    {
      id: 3,
      name: "Nallapaneni Vaibhav",
      role: "Database Manager",
      year: "3rd Year",
      contribution: "Manages the database infrastructure, ensures data security and organizes all collected cultural information.",
      image: "/team-member-3.jpg",
    },
    {
      id: 4,
      name: "Abhimanyu",
      role: "Community Liaison",
      year: "3rd Year",
      contribution: "Connects with community members and elders, builds relationships and facilitates storytelling sessions.",
      image: "/team-member-4.jpg",
    },
    {
      id: 5,
      name: "Swagathchandran S",
      role: "Research Analyst",
      year: "3rd Year",
      contribution: "Analyzes cultural data, documents traditions and creates research reports on preservation findings.",
      image: "/team-member-5.jpg",
    },
    {
      id: 6,
      name: "Palivela Sai Hruthik",
      role: "Technical Developer",
      year: "3rd Year",
      contribution: "Develops and maintains the platform, implements features for uploading and managing cultural content.",
      image: "/team-member-6.jpg",
    },
  ]

  useEffect(() => {
    const savedLoginState = localStorage.getItem("isLoggedIn")
    const savedUserName = localStorage.getItem("userName")
    if (savedLoginState === "true" && savedUserName) {
      setIsLoggedIn(true)
      setUserName(savedUserName)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (loginEmail.trim() && loginPassword.trim()) {
      const name = loginEmail.split("@")[0]
      setIsLoggedIn(true)
      setUserName(name)
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userName", name)
      setLoginEmail("")
      setLoginPassword("")
      setCurrentPage("dashboard")
    } else {
      alert("Please enter both email and password")
    }
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    if (!signupName.trim() || !signupEmail.trim() || !signupPassword.trim()) {
      alert("Please fill in all fields")
      return
    }
    if (signupPassword !== signupConfirmPassword) {
      alert("Passwords do not match")
      return
    }
    if (signupPassword.length < 6) {
      alert("Password must be at least 6 characters")
      return
    }

    setIsLoggedIn(true)
    setUserName(signupName)
    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("userName", signupName)
    setSignupName("")
    setSignupEmail("")
    setSignupPassword("")
    setSignupConfirmPassword("")
    setCurrentPage("dashboard")
    alert("Account created successfully!")
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserName("")
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userName")
    setCurrentPage("home")
  }

  const handleNavigation = (page: string) => {
    if ((page === "browse" || page === "upload") && !isLoggedIn) {
      setCurrentPage("login")
    } else {
      setCurrentPage(page)
    }
  }

  return (
    <>
      <style>{`
        :root {
          --primary-color: #8B3A3A;
          --secondary-color: #D4AF37;
          --accent-light: #F5E6D3;
          --accent-dark: #6B4423;
          --text-dark: #2c2c2c;
          --text-light: #f8f8f8;
          --border-radius: 12px;
        }

        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Playfair+Display:wght@600;700&family=Merriweather:wght@400;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Merriweather', serif;
          color: var(--text-dark);
          background-color: #fafafa;
        }

        h1, h2, h3, h4, h5, h6 {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
        }

        /* Updated navbar with enhanced visual design and better color scheme */
        nav {
          background: linear-gradient(90deg, rgba(139, 58, 58, 0.98) 0%, rgba(107, 68, 35, 0.98) 100%);
          backdrop-filter: blur(15px);
          padding: 1.2rem 0;
          box-shadow: 0 8px 32px rgba(139, 58, 58, 0.25);
          position: sticky;
          top: 0;
          z-index: 1000;
          border-bottom: 2px solid rgba(212, 175, 55, 0.3);
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--secondary-color);
          font-family: 'Playfair Display', serif;
          letter-spacing: 2px;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.4s ease;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .logo:hover {
          transform: scale(1.08);
          text-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
          filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.3));
        }

        .nav-links {
          display: flex;
          gap: 2.5rem;
          list-style: none;
          align-items: center;
        }

        .nav-links a {
          color: var(--text-light);
          text-decoration: none;
          font-size: 1rem;
          transition: all 0.3s ease;
          cursor: pointer;
          font-family: 'Poppins', sans-serif;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          position: relative;
          font-weight: 500;
          letter-spacing: 0.5px;
        }

        .nav-links a::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: var(--secondary-color);
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }

        .nav-links a:hover {
          color: var(--secondary-color);
          background: rgba(212, 175, 55, 0.15);
          transform: translateY(-3px);
        }

        .nav-links a:hover::before {
          width: 80%;
        }

        .nav-links button {
          background: linear-gradient(135deg, var(--secondary-color) 0%, #ffd700 100%);
          color: var(--text-dark);
          border: none;
          padding: 0.75rem 1.75rem;
          border-radius: 25px;
          cursor: pointer;
          font-weight: 700;
          transition: all 0.3s ease;
          font-family: 'Poppins', sans-serif;
          box-shadow: 0 6px 20px rgba(212, 175, 55, 0.3);
          letter-spacing: 0.5px;
        }

        .nav-links button:hover {
          background: linear-gradient(135deg, #ffd700 0%, var(--secondary-color) 100%);
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(212, 175, 55, 0.5);
        }

        .nav-links button:active {
          transform: translateY(-2px);
        }

        .nav-links span {
          background: rgba(212, 175, 55, 0.2);
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.95rem;
        }

        /* Hero Section */
        .hero {
          background: linear-gradient(135deg, rgba(139, 58, 58, 0.9) 0%, rgba(107, 68, 35, 0.9) 100%),
                      url('/cultural-heritage-patterns-textures.jpg');
          background-size: cover;
          background-position: center;
          color: var(--text-light);
          padding: 120px 2rem;
          text-align: center;
          min-height: 80vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%);
          border-radius: 50%;
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(30px); }
        }

        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 800px;
        }

        .hero h1 {
          font-size: 4rem;
          margin-bottom: 1rem;
          font-weight: 700;
          letter-spacing: -1px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
          animation: slideDown 0.8s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero p {
          font-size: 1.3rem;
          margin-bottom: 2.5rem;
          color: var(--accent-light);
          animation: slideUp 0.8s ease-out 0.2s both;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .cta-button {
          background: var(--secondary-color);
          color: var(--text-dark);
          border: none;
          padding: 1rem 2.5rem;
          font-size: 1.1rem;
          border-radius: var(--border-radius);
          cursor: pointer;
          font-weight: 700;
          transition: all 0.3s ease;
          font-family: 'Poppins', sans-serif;
          box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3);
          animation: slideUp 0.8s ease-out 0.4s both;
        }

        .cta-button:hover {
          background: #ffd700;
          transform: translateY(-4px);
          box-shadow: 0 14px 35px rgba(212, 175, 55, 0.5);
        }

        .cta-button:active {
          transform: translateY(-2px);
        }

        /* Goals Section */
        .goals {
          padding: 80px 2rem;
          max-width: 1200px;
          margin: 0 auto;
          background: var(--accent-light);
        }

        .section-title {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 3rem;
          color: var(--primary-color);
          font-family: 'Playfair Display', serif;
        }

        .goals-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .goal-card {
          background: white;
          padding: 2.5rem;
          border-radius: var(--border-radius);
          text-align: center;
          transition: all 0.4s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          border-top: 4px solid var(--primary-color);
        }

        .goal-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 30px rgba(139, 58, 58, 0.15);
        }

        .goal-card h3 {
          color: var(--primary-color);
          margin-bottom: 1rem;
          font-size: 1.5rem;
        }

        .goal-card p {
          color: #666;
          line-height: 1.6;
        }

        /* Updated "Ready to Contribute" section with better gradient background */
        .contribute-section {
          background: linear-gradient(135deg, #8B3A3A 0%, #6B4423 50%, #C19A6B 100%);
          padding: 80px 2rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .contribute-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 300"><defs><pattern id="pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse"><rect fill="rgba(255,255,255,0.02)" width="100" height="100"/><path d="M10,50 Q50,10 90,50 T90,90" stroke="rgba(255,255,255,0.05)" fill="none"/></pattern></defs><rect width="1200" height="300" fill="url(%23pattern)"/></svg>');
          opacity: 0.5;
        }

        .contribute-section h2 {
          font-size: 2.8rem;
          color: white;
          margin-bottom: 1rem;
          position: relative;
          z-index: 2;
          font-family: 'Playfair Display', serif;
          text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
        }

        .contribute-section p {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 2rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          position: relative;
          z-index: 2;
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
        }

        .contribute-section .cta-button {
          position: relative;
          z-index: 2;
          background: white;
          color: #8B3A3A;
          font-weight: 700;
        }

        .contribute-section .cta-button:hover {
          background: var(--secondary-color);
          color: var(--text-dark);
          box-shadow: 0 14px 40px rgba(0, 0, 0, 0.3);
        }

        /* About Section */
        .about {
          padding: 80px 2rem;
          max-width: 1200px;
          margin: 0 auto;
          background: white;
        }

        .about-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          margin-bottom: 80px;
        }

        .about-text h2 {
          font-size: 2.5rem;
          color: var(--primary-color);
          margin-bottom: 1.5rem;
          font-family: 'Playfair Display', serif;
        }

        .about-text p {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #555;
          margin-bottom: 1.5rem;
        }

        .about-image {
          width: 100%;
          max-width: 500px;
          border-radius: var(--border-radius);
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        }

        /* Added team members section */
        .team-section {
          background: var(--accent-light);
          padding: 60px 0;
          border-top: 2px solid var(--secondary-color);
          border-bottom: 2px solid var(--secondary-color);
          margin-top: 60px;
        }

        .team-section h2 {
          text-align: center;
          font-size: 2.5rem;
          color: var(--primary-color);
          margin-bottom: 3rem;
          font-family: 'Playfair Display', serif;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .team-card {
          background: white;
          border-radius: var(--border-radius);
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          transition: all 0.4s ease;
          cursor: pointer;
        }

        .team-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 16px 40px rgba(139, 58, 58, 0.2);
        }

        .team-card img {
          width: 100%;
          height: 250px;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .team-card:hover img {
          transform: scale(1.05);
        }

        .team-info {
          padding: 2rem;
        }

        .team-info h3 {
          font-size: 1.5rem;
          color: var(--primary-color);
          margin-bottom: 0.5rem;
          font-family: 'Playfair Display', serif;
        }

        .team-role {
          font-size: 0.9rem;
          color: var(--secondary-color);
          font-weight: 600;
          margin-bottom: 0.5rem;
          font-family: 'Poppins', sans-serif;
        }

        .team-year {
          font-size: 0.85rem;
          color: #999;
          margin-bottom: 1rem;
          font-family: 'Poppins', sans-serif;
        }

        .team-info p {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #666;
        }

        /* Dashboard */
        .dashboard {
          padding: 40px 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .welcome-banner {
          background: linear-gradient(135deg, var(--primary-color) 0%, var(--accent-dark) 100%);
          color: white;
          padding: 3rem;
          border-radius: var(--border-radius);
          margin-bottom: 2rem;
          box-shadow: 0 8px 25px rgba(139, 58, 58, 0.2);
        }

        .welcome-banner h2 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .dashboard-card {
          background: white;
          padding: 2rem;
          border-radius: var(--border-radius);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          border: 2px solid var(--accent-light);
          transition: all 0.3s ease;
        }

        .dashboard-card:hover {
          border-color: var(--secondary-color);
          box-shadow: 0 8px 25px rgba(212, 175, 55, 0.2);
          transform: translateY(-4px);
        }

        .dashboard-card h3 {
          color: var(--primary-color);
          margin-bottom: 1rem;
        }

        .dashboard-card p {
          color: #666;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        /* Video Placeholder */
        .video-placeholder {
          width: 100%;
          aspect-ratio: 16 / 9;
          background: linear-gradient(135deg, var(--accent-light) 0%, #e8d4c0 100%);
          border-radius: var(--border-radius);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary-color);
          font-size: 1.2rem;
          font-weight: 600;
          margin-top: 1rem;
        }

        /* Forms */
        .auth-form {
          max-width: 450px;
          margin: 80px auto;
          background: white;
          padding: 3rem;
          border-radius: var(--border-radius);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .auth-form h2 {
          color: var(--primary-color);
          margin-bottom: 2rem;
          text-align: center;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          color: var(--text-dark);
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
        }

        .form-group input {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid var(--accent-light);
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.3s ease;
          font-family: 'Merriweather', serif;
        }

        .form-group input:focus {
          outline: none;
          border-color: var(--secondary-color);
          box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
        }

        .form-group button {
          width: 100%;
          padding: 0.75rem;
          background: var(--primary-color);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Poppins', sans-serif;
        }

        .form-group button:hover {
          background: var(--accent-dark);
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(139, 58, 58, 0.4);
        }

        .form-group button:active {
          transform: translateY(-1px);
        }

        /* Upload Form */
        .upload-form {
          max-width: 600px;
          margin: 40px auto;
          background: white;
          padding: 2rem;
          border-radius: var(--border-radius);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .upload-form h2 {
          color: var(--primary-color);
          margin-bottom: 2rem;
        }

        .file-input-wrapper {
          position: relative;
          overflow: hidden;
          display: inline-block;
          width: 100%;
        }

        .file-input-wrapper input[type=file] {
          position: absolute;
          left: -9999px;
        }

        .file-input-label {
          display: block;
          padding: 2rem;
          background: var(--accent-light);
          border: 2px dashed var(--primary-color);
          border-radius: var(--border-radius);
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
          color: var(--primary-color);
        }

        .file-input-label:hover {
          background: #f0dcc4;
          border-color: var(--secondary-color);
          transform: translateY(-2px);
        }

        /* Footer */
        footer {
          background: var(--primary-color);
          color: var(--text-light);
          padding: 3rem 2rem;
          margin-top: 5rem;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }

        .footer-section h3 {
          color: var(--secondary-color);
          margin-bottom: 1rem;
        }

        .footer-section p, .footer-section a {
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.8;
          text-decoration: none;
          transition: color 0.3s ease;
          cursor: pointer;
        }

        .footer-section a:hover {
          color: var(--secondary-color);
        }

        .social-links {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }

        .social-links a {
          display: inline-block;
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .social-links a:hover {
          background: var(--secondary-color);
          color: var(--text-dark);
          transform: translateY(-3px);
        }

        .footer-bottom {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
          padding-top: 2rem;
          color: rgba(255, 255, 255, 0.7);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero h1 {
            font-size: 2.5rem;
          }

          .hero p {
            font-size: 1.1rem;
          }

          .nav-links {
            gap: 1rem;
            font-size: 0.9rem;
          }

          .about-content {
            grid-template-columns: 1fr;
          }

          .section-title {
            font-size: 2rem;
          }

          .contribute-section h2 {
            font-size: 1.8rem;
          }

          .team-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Navigation */}
      <nav>
        <div className="nav-container">
          <a className="logo" onClick={() => setCurrentPage("home")}>
            🌿 CHPP
          </a>
          <ul className="nav-links">
            <li>
              <a onClick={() => setCurrentPage("home")}>Home</a>
            </li>
            <li>
              <a onClick={() => setCurrentPage("upload")}>Upload Video</a>
            </li>
            <li>
              <a onClick={() => setCurrentPage("about")}>About</a>
            </li>
            {isLoggedIn ? (
              <>
                <li>
                  <span style={{ color: "var(--secondary-color)" }}>Hi, {userName}!</span>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <li>
                <button onClick={() => setCurrentPage("login")}>Login</button>
              </li>
            )}
          </ul>
        </div>
      </nav>

      {/* Home Page */}
      {currentPage === "home" && (
        <>
          <section className="hero">
            <div className="hero-content">
              <h1>Preserve Stories, Connect Generations</h1>
              <p>
                Join our vibrant community on YouTube where elders share their wisdom, traditions, and cultural heritage. 
                Every story is automatically enhanced with subtitles for better accessibility.
              </p>
              <button className="cta-button" onClick={() => window.open("https://www.youtube.com/@ashrithvenkat5507", "_blank")}>
                Watch on YouTube Community
              </button>
            </div>
          </section>

          <section className="goals">
            <h2 className="section-title">How It Works</h2>
            <div className="goals-grid">
              <div className="goal-card">
                <h3>🎬 Record & Share</h3>
                <p>
                  Students and community members record authentic stories, traditions, and knowledge from elders. 
                  Upload your video through our simple platform.
                </p>
              </div>
              <div className="goal-card">
                <h3>✨ YouTube Featured</h3>
                <p>
                  Your approved stories are featured on our YouTube community channel, reaching a wider audience 
                  and preserving them for generations to come.
                </p>
              </div>
              <div className="goal-card">
                <h3>🌐 Auto Subtitles</h3>
                <p>
                  YouTube automatically generates subtitles in multiple languages, making cultural knowledge 
                  accessible to everyone worldwide.
                </p>
              </div>
            </div>
          </section>

          <section className="contribute-section">
            <h2>Ready to Contribute Your Story?</h2>
            <p>
              Help us preserve cultural heritage. Login or create an account to upload your video.
            </p>
            <button className="cta-button" onClick={() => handleNavigation("upload")}>
              Upload Your Story Now
            </button>
          </section>
        </>
      )}

      {/* About Page */}
      {currentPage === "about" && (
        <section className="about">
          <h2 className="section-title">About Our Project</h2>
          <div className="about-content">
            <div className="about-text">
              <h2>Bridging Past and Future</h2>
              <p>
                The Cultural Heritage Preservation Portal is a groundbreaking initiative under Amrita Vishwa Vidyapeetam's Social Service and Research (SSR) project. It combines the energy of student researchers with the wisdom of community elders. Through carefully recorded interviews and AI-assisted processing, we're creating a living archive of cultural knowledge.
              </p>
              <p>
                Our approach ensures that traditional practices, recipes, songs, and stories are not only preserved but also made accessible to younger generations, fostering a deep connection with our cultural roots.
              </p>
              <p>
                Every story matters. Every voice counts. Join us in this important mission to celebrate and protect our shared heritage.
              </p>
            </div>
            <div className="about-image">
              <img src="/elder-sharing-wisdom-with-youth.jpg" alt="Cultural transmission" style={{ width: "100%" }} />
            </div>
          </div>

          <div className="team-section">
            <h2>Our Dedicated Team</h2>
            <div className="team-grid">
              {teamMembers.map((member) => (
                <div key={member.id} className="team-card">
                  <img src={member.image || "/placeholder.svg"} alt={member.name} />
                  <div className="team-info">
                    <h3>{member.name}</h3>
                    <div className="team-role">{member.role}</div>
                    <div className="team-year">{member.year}</div>
                    <p>{member.contribution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Upload Page */}
      {currentPage === "upload" && (
        <section className="upload-form">
          <h2>Upload Your Story</h2>
          <p style={{ color: "#666", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
            Submit your cultural story or interview. After review, it will be featured on our YouTube channel.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              alert("Thank you for your submission!")
              setCurrentPage("dashboard")
            }}
          >
            <div className="form-group">
              <label>Story Title</label>
              <input type="text" placeholder="e.g., Grandmother's Famous Recipe" required />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input type="text" placeholder="Brief description of the story or tradition" required />
            </div>
            <div className="form-group">
              <label>Video File</label>
              <div className="file-input-wrapper">
                <label className="file-input-label" htmlFor="video-input">
                  📹 Click to upload video or drag and drop
                </label>
                <input type="file" id="video-input" accept="video/*" required />
              </div>
            </div>
            <div className="form-group">
              <button type="submit">Upload Story</button>
            </div>
          </form>
        </section>
      )}

      {/* Dashboard Page */}
      {currentPage === "dashboard" && (
        <section className="dashboard">
          <div className="welcome-banner">
            <h2>Welcome Back, {userName}! 👋</h2>
            <p>Explore our YouTube channel and continue contributing to our cultural preservation mission.</p>
          </div>
          <div className="dashboard-grid">
            <div className="dashboard-card">
              <h3>📤 Upload New Story</h3>
              <p>
                Share your cultural knowledge with the community. Record interviews with elders and upload videos to our
                platform for featured content on YouTube.
              </p>
              <button className="cta-button" onClick={() => setCurrentPage("upload")} style={{ marginTop: "1rem" }}>
                Upload Now
              </button>
            </div>
            <div className="dashboard-card">
              <h3>🎬 Watch on YouTube</h3>
              <p>
                Explore stories from our community. Watch interviews, learn cultural traditions, and connect with your
                heritage on our YouTube channel.
              </p>
              <button className="cta-button" onClick={() => window.open("https://www.youtube.com/@ashrithvenkat5507", "_blank")} style={{ marginTop: "1rem" }}>
                Visit YouTube
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Login Page */}
      {currentPage === "login" && (
        <section className="auth-form">
          <h2>Login to Your Account</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <button type="submit">Login</button>
            </div>
          </form>
          <p style={{ textAlign: "center", marginTop: "1.5rem", color: "#666" }}>
            Don't have an account?{" "}
            <a
              onClick={() => setCurrentPage("signup")}
              style={{ color: "var(--primary-color)", cursor: "pointer", fontWeight: "600" }}
            >
              Sign up here
            </a>
          </p>
        </section>
      )}

      {/* Signup Page */}
      {currentPage === "signup" && (
        <section className="auth-form">
          <h2>Create Your Account</h2>
          <form onSubmit={handleSignup}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Create a password (min 6 characters)"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                value={signupConfirmPassword}
                onChange={(e) => setSignupConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <button type="submit">Create Account</button>
            </div>
          </form>
          <p style={{ textAlign: "center", marginTop: "1.5rem", color: "#666" }}>
            Already have an account?{" "}
            <a
              onClick={() => setCurrentPage("login")}
              style={{ color: "var(--primary-color)", cursor: "pointer", fontWeight: "600" }}
            >
              Login here
            </a>
          </p>
        </section>
      )}

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <div className="footer-section">
            <h3>About CHPP</h3>
            <p>
              Cultural Heritage Preservation Portal is dedicated to preserving and sharing the wisdom and traditions of
              our communities through Amrita Vishwa Vidyapeetam's Social Service and Research Initiative.
            </p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <p>
              <a onClick={() => setCurrentPage("home")}>Home</a>
            </p>
            <p>
              <a href="https://www.youtube.com/channel/YOUR_CHANNEL_ID" target="_blank" rel="noopener noreferrer">Browse Stories</a>
            </p>
            <p>
              <a onClick={() => setCurrentPage("about")}>About Us</a>
            </p>
          </div>
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>
              Email: <a href="mailto:info@chpp.org">CHPP@chpp.org</a>
            </p>
            <p>Phone: (555) 123-4567</p>
            <p>Follow us:</p>
            <div className="social-links">
              <a href="#" title="Facebook">
                f
              </a>
              <a href="#" title="Twitter">
                𝕏
              </a>
              <a href="#" title="Instagram">
                📷
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; 2025 Cultural Heritage Preservation Portal. All rights reserved. |{" "}
            <a style={{ textDecoration: "underline", cursor: "pointer" }}>Privacy Policy</a>
          </p>
        </div>
      </footer>
    </>
  )
}

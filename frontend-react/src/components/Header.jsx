import React, { useContext, useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../AuthProvider'

/* ── Icons ── */
const IconChart = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22,7 13.5,15.5 8.5,10.5 2,17"/>
    <polyline points="16,7 22,7 22,13"/>
  </svg>
)
const IconGrid = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
  </svg>
)
const IconLogout = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16,17 21,12 16,7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
)
const IconLogin = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
    <polyline points="10,17 15,12 10,7"/>
    <line x1="15" y1="12" x2="3" y2="12"/>
  </svg>
)
const IconUser = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
)
const IconMenu = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6"  x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
)
const IconX = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6"  x2="6"  y2="18"/>
    <line x1="6"  y1="6"  x2="18" y2="18"/>
  </svg>
)

/* ── Main ── */
const Header = () => {
  const navigate               = useNavigate()
  const location               = useLocation()
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  /* shadow on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* close mobile menu on route change */
  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refresh')
    setIsLoggedIn(false)
    navigate('/login')
  }

  const isActive = (path) => location.pathname === path

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@500;600&display=swap');

        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes blink {
          0%,100% { opacity: 1; } 50% { opacity: 0.3; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }

        /* ── nav shell ── */
        .hdr-nav {
          position: sticky; top: 0; z-index: 100;
          width: 100%;
          background: rgba(8, 11, 18, 0.82);
          backdrop-filter: blur(20px) saturate(1.4);
          -webkit-backdrop-filter: blur(20px) saturate(1.4);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          transition: box-shadow 0.3s;
          font-family: 'DM Sans', sans-serif;
        }
        .hdr-nav.scrolled {
          box-shadow: 0 4px 40px rgba(0,0,0,0.55), 0 1px 0 rgba(255,255,255,0.06) inset;
        }

        /* top accent line */
        .hdr-nav::before {
          content: '';
          position: absolute; top: 0; left: 8%; right: 8%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(99,102,241,0.7), rgba(16,185,129,0.5), transparent);
        }

        .hdr-inner {
          max-width: 1100px; margin: 0 auto;
          padding: 0 1.25rem;
          height: 60px;
          display: flex; align-items: center; justify-content: space-between;
          gap: 16px;
        }

        /* ── Brand ── */
        .hdr-brand {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none; flex-shrink: 0;
        }
        .hdr-logo {
          width: 34px; height: 34px; border-radius: 9px;
          background: linear-gradient(135deg, rgba(99,102,241,0.25), rgba(16,185,129,0.18));
          border: 1px solid rgba(99,102,241,0.28);
          display: flex; align-items: center; justify-content: center;
          color: #a5b4fc;
          flex-shrink: 0;
        }
        .hdr-brand-text {
          display: flex; flex-direction: column; line-height: 1;
        }
        .hdr-brand-main {
          font-family: 'Syne', sans-serif;
          font-size: 15px; font-weight: 800;
          background: linear-gradient(90deg, #c7d2fe, #a5b4fc, #6ee7b7, #a5b4fc, #c7d2fe);
          background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          animation: shimmer 5s linear infinite;
          letter-spacing: -0.2px;
        }
        .hdr-brand-sub {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px; font-weight: 500;
          color: rgba(255,255,255,0.22);
          letter-spacing: 0.12em; text-transform: uppercase;
          margin-top: 2px;
          display: flex; align-items: center; gap: 5px;
        }
        .live-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 6px rgba(16,185,129,0.9);
          animation: blink 2.2s ease-in-out infinite;
          flex-shrink: 0;
        }

        /* ── Desktop nav links / actions ── */
        .hdr-actions {
          display: flex; align-items: center; gap: 8px;
        }

        /* nav link (Dashboard) */
        .nav-link-item {
          display: flex; align-items: center; gap: 7px;
          padding: 7px 14px; border-radius: 9px;
          text-decoration: none;
          font-size: 13.5px; font-weight: 500;
          color: rgba(255,255,255,0.5);
          border: 1px solid transparent;
          transition: color 0.2s, background 0.2s, border-color 0.2s;
          white-space: nowrap;
        }
        .nav-link-item:hover {
          color: rgba(255,255,255,0.85);
          background: rgba(255,255,255,0.05);
        }
        .nav-link-item.active {
          color: #a5b4fc;
          background: rgba(99,102,241,0.1);
          border-color: rgba(99,102,241,0.22);
        }

        /* solid btn */
        .nav-btn {
          display: flex; align-items: center; gap: 7px;
          padding: 7px 16px; border-radius: 9px;
          font-family: 'Syne', sans-serif;
          font-size: 13px; font-weight: 700; letter-spacing: 0.2px;
          border: none; cursor: pointer; white-space: nowrap;
          transition: transform 0.15s, box-shadow 0.2s, opacity 0.2s;
          text-decoration: none;
        }
        .nav-btn:hover { transform: translateY(-1px); }
        .nav-btn:active { transform: translateY(0); }

        .nav-btn-ghost {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.6);
        }
        .nav-btn-ghost:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.9);
        }

        .nav-btn-primary {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: #fff;
          box-shadow: 0 3px 14px rgba(99,102,241,0.3);
        }
        .nav-btn-primary:hover {
          box-shadow: 0 6px 22px rgba(99,102,241,0.48);
        }

        .nav-btn-danger {
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.22);
          color: #f87171;
        }
        .nav-btn-danger:hover {
          background: rgba(239,68,68,0.18);
          border-color: rgba(239,68,68,0.38);
          color: #fca5a5;
        }

        /* vertical separator */
        .hdr-sep {
          width: 1px; height: 20px;
          background: rgba(255,255,255,0.08);
          flex-shrink: 0;
        }

        /* ── Hamburger ── */
        .hdr-hamburger {
          display: none;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px; padding: 6px;
          color: rgba(255,255,255,0.6); cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .hdr-hamburger:hover {
          background: rgba(255,255,255,0.07);
          color: #fff;
        }

        /* ── Mobile drawer ── */
        .mobile-drawer {
          display: none;
          flex-direction: column; gap: 6px;
          padding: 14px 1.25rem 18px;
          background: rgba(8,11,18,0.97);
          border-top: 1px solid rgba(255,255,255,0.06);
          animation: slideDown 0.25s cubic-bezier(0.22,1,0.36,1) both;
        }
        .mobile-drawer .nav-link-item,
        .mobile-drawer .nav-btn {
          width: 100%;
          padding: 10px 16px;
          justify-content: flex-start;
          font-size: 14px;
        }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .hdr-actions { display: none; }
          .hdr-hamburger { display: flex; align-items: center; }
          .mobile-drawer { display: flex; }
          .hdr-brand-sub { display: none; }
        }
      `}</style>

      {/* ── NAV BAR ── */}
      <nav className={`hdr-nav${scrolled ? ' scrolled' : ''}`}>
        <div className="hdr-inner">

          {/* Brand */}
          <Link to="/" className="hdr-brand">
            <div className="hdr-logo"><IconChart /></div>
            <div className="hdr-brand-text">
              <span className="hdr-brand-main">StockPredictor</span>
              <span className="hdr-brand-sub">
                <span className="live-dot" />
                LSTM · real-time
              </span>
            </div>
          </Link>

          {/* Desktop actions */}
          <div className="hdr-actions">
            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className={`nav-link-item${isActive('/dashboard') ? ' active' : ''}`}
                >
                  <IconGrid />
                  Dashboard
                </Link>

                <div className="hdr-sep" />

                <button className="nav-btn nav-btn-danger" onClick={handleLogout}>
                  <IconLogout />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={`nav-btn nav-btn-ghost${isActive('/login') ? ' active' : ''}`}>
                  <IconLogin />
                  Login
                </Link>
                <Link to="/register" className="nav-btn nav-btn-primary">
                  <IconUser />
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Hamburger */}
          <button
            className="hdr-hamburger"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <IconX /> : <IconMenu />}
          </button>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="mobile-drawer">
            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className={`nav-link-item${isActive('/dashboard') ? ' active' : ''}`}
                >
                  <IconGrid /> Dashboard
                </Link>
                <button className="nav-btn nav-btn-danger" onClick={handleLogout}>
                  <IconLogout /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-btn nav-btn-ghost">
                  <IconLogin /> Login
                </Link>
                <Link to="/register" className="nav-btn nav-btn-primary">
                  <IconUser /> Register
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </>
  )
}

export default Header
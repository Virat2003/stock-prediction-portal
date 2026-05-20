import React from 'react'

/* ── Icons ── */
const IconChart = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22,7 13.5,15.5 8.5,10.5 2,17"/>
    <polyline points="16,7 22,7 22,13"/>
  </svg>
)
const IconCpu = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/>
    <path d="M15 2v2M9 2v2M2 15h2M2 9h2M22 15h-2M22 9h-2M15 22v-2M9 22v-2"/>
  </svg>
)
const IconHeart = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M12 21.593c-.518-.52-9.593-8.233-9.593-13.093 0-3.87 3.13-7 7-7 1.927 0 3.68.769 4.946 2.013C15.618 2.269 17.371 1.5 19.3 1.5c3.87 0 7 3.13 7 7 0 4.86-9.075 12.573-9.593 13.093L12 21.593z"/>
  </svg>
)
const IconGithub = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
)
const IconShield = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)

/* ── Footer ── */
const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap');

        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes blink {
          0%,100% { opacity:1; } 50% { opacity:0.2; }
        }
        @keyframes heartbeat {
          0%,100% { transform: scale(1); }
          25%      { transform: scale(1.3); }
          50%      { transform: scale(1); }
          75%      { transform: scale(1.15); }
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(10px); }
          to   { opacity:1; transform:translateY(0); }
        }

        .ftr-root {
          position: relative;
          background: #080b12;
          border-top: 1px solid rgba(255,255,255,0.07);
          font-family: 'DM Sans', sans-serif;
          overflow: hidden;
        }

        /* top accent glow line */
        .ftr-root::before {
          content: '';
          position: absolute; top: 0; left: 8%; right: 8%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(99,102,241,0.6), rgba(16,185,129,0.4), transparent);
        }

        /* ambient blob */
        .ftr-root::after {
          content: '';
          position: absolute; bottom: -80px; left: 50%;
          transform: translateX(-50%);
          width: 500px; height: 200px; border-radius: 50%;
          background: radial-gradient(ellipse, rgba(99,102,241,0.05) 0%, transparent 70%);
          pointer-events: none;
        }

        .ftr-inner {
          position: relative; z-index: 1;
          max-width: 1100px; margin: 0 auto;
          padding: 36px 1.5rem 28px;
        }

        /* ── Top row ── */
        .ftr-top {
          display: flex; align-items: flex-start;
          justify-content: space-between; flex-wrap: wrap;
          gap: 28px; margin-bottom: 28px;
          animation: fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both;
        }

        /* Brand */
        .ftr-brand {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none;
        }
        .ftr-logo {
          width: 32px; height: 32px; border-radius: 8px;
          background: linear-gradient(135deg, rgba(99,102,241,0.22), rgba(16,185,129,0.15));
          border: 1px solid rgba(99,102,241,0.25);
          display: flex; align-items: center; justify-content: center;
          color: #a5b4fc; flex-shrink: 0;
        }
        .ftr-brand-name {
          font-family: 'Syne', sans-serif;
          font-size: 15px; font-weight: 800;
          background: linear-gradient(90deg, #c7d2fe, #a5b4fc, #6ee7b7, #a5b4fc, #c7d2fe);
          background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          animation: shimmer 5s linear infinite;
        }
        .ftr-brand-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9.5px; font-weight: 500;
          color: rgba(255,255,255,0.2);
          letter-spacing: 0.1em; text-transform: uppercase;
          margin-top: 2px;
          display: flex; align-items: center; gap: 5px;
        }
        .ftr-live-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #10b981; flex-shrink: 0;
          box-shadow: 0 0 6px rgba(16,185,129,0.9);
          animation: blink 2.2s ease-in-out infinite;
        }

        /* Stat pills */
        .ftr-stats {
          display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
        }
        .ftr-stat {
          display: flex; align-items: center; gap: 6px;
          padding: 6px 12px; border-radius: 8px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px; font-weight: 500;
          color: rgba(255,255,255,0.32);
          white-space: nowrap;
        }
        .ftr-stat-icon { color: rgba(99,102,241,0.7); display: flex; }

        /* ── Divider ── */
        .ftr-divider {
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin-bottom: 20px;
        }

        /* ── Bottom row ── */
        .ftr-bottom {
          display: flex; align-items: center;
          justify-content: space-between; flex-wrap: wrap;
          gap: 12px;
          animation: fadeUp 0.6s 0.1s cubic-bezier(0.22,1,0.36,1) both;
        }

        /* Copyright */
        .ftr-copy {
          display: flex; align-items: center; gap: 6px; flex-wrap: wrap;
          font-size: 13px; color: rgba(255,255,255,0.25); font-weight: 300;
        }
        .ftr-copy strong {
          font-weight: 600; color: rgba(255,255,255,0.5);
          font-family: 'Syne', sans-serif; font-size: 13px;
        }
        .ftr-heart {
          color: #f43f5e; display: inline-flex;
          animation: heartbeat 1.8s ease-in-out infinite;
        }

        /* Right links */
        .ftr-links {
          display: flex; align-items: center; gap: 4px;
        }
        .ftr-link {
          display: flex; align-items: center; gap: 6px;
          padding: 5px 11px; border-radius: 7px;
          font-size: 12px; font-weight: 500;
          color: rgba(255,255,255,0.28);
          text-decoration: none;
          border: 1px solid transparent;
          transition: color 0.2s, background 0.2s, border-color 0.2s;
          white-space: nowrap;
        }
        .ftr-link:hover {
          color: rgba(255,255,255,0.7);
          background: rgba(255,255,255,0.05);
          border-color: rgba(255,255,255,0.08);
        }
        .ftr-link-sep {
          width: 1px; height: 14px;
          background: rgba(255,255,255,0.08);
        }

        /* ── Responsive ── */
        @media (max-width: 560px) {
          .ftr-top  { flex-direction: column; gap: 16px; }
          .ftr-bottom { flex-direction: column; align-items: flex-start; gap: 14px; }
          .ftr-stats { display: none; }
        }
      `}</style>

      <footer className="ftr-root">
        <div className="ftr-inner">

          {/* Top row — brand + stat pills */}
          <div className="ftr-top">
            <div>
              <div className="ftr-brand">
                <div className="ftr-logo"><IconChart /></div>
                <div>
                  <div className="ftr-brand-name">StockPredictor</div>
                  <div className="ftr-brand-tag">
                    <span className="ftr-live-dot" />
                    LSTM · real-time inference
                  </div>
                </div>
              </div>
            </div>

            <div className="ftr-stats">
              <div className="ftr-stat">
                <span className="ftr-stat-icon"><IconCpu /></span>
                LSTM Neural Network
              </div>
              <div className="ftr-stat">
                <span className="ftr-stat-icon"><IconShield /></span>
                JWT Auth
              </div>
              <div className="ftr-stat">
                <span className="ftr-stat-icon" style={{ color: "rgba(16,185,129,0.7)" }}>
                  <IconChart />
                </span>
                AI Forecasting
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="ftr-divider" />

          {/* Bottom row — copyright + links */}
          <div className="ftr-bottom">
            <p className="ftr-copy">
              <span>&copy; {year}</span>
              <span>·</span>
              <span>Built with</span>
              <span className="ftr-heart"><IconHeart /></span>
              <span>by</span>
              <strong>Virat Rane</strong>
            </p>

            <div className="ftr-links">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="ftr-link">
                <IconGithub />
                GitHub
              </a>
              <div className="ftr-link-sep" />
              <a href="/login" className="ftr-link">Login</a>
              <div className="ftr-link-sep" />
              <a href="/register" className="ftr-link">Register</a>
            </div>
          </div>

        </div>
      </footer>
    </>
  )
}

export default Footer
import { Link } from "react-router-dom";

/* ── Icons ── */
const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
  </svg>
)
const IconChart = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22,7 13.5,15.5 8.5,10.5 2,17"/>
    <polyline points="16,7 22,7 22,13"/>
  </svg>
)
const IconBrain = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.96-3 2.5 2.5 0 0 1-1.32-4.24 3 3 0 0 1 .34-5.58 2.5 2.5 0 0 1 1.32-4.24A2.5 2.5 0 0 1 9.5 2Z"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.96-3 2.5 2.5 0 0 0 1.32-4.24 3 3 0 0 0-.34-5.58 2.5 2.5 0 0 0-1.32-4.24A2.5 2.5 0 0 0 14.5 2Z"/>
  </svg>
)
const IconShield = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)
const IconZap = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/>
  </svg>
)
const IconSignal = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 20h.01M7 20v-4M12 20v-8M17 20V8M22 4v16"/>
  </svg>
)
const IconStar = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"/>
  </svg>
)

/* ── Feature card ── */
const FeatureCard = ({ icon, title, desc, accent, delay }) => (
  <div style={{
    flex: "1 1 220px",
    background: "rgba(255,255,255,0.028)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "18px",
    padding: "26px 24px",
    display: "flex", flexDirection: "column", gap: "14px",
    position: "relative", overflow: "hidden",
    animation: `fadeUp 0.6s ${delay}s cubic-bezier(0.22,1,0.36,1) both`,
    transition: "border-color 0.25s, transform 0.25s, box-shadow 0.25s",
    cursor: "default",
  }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = accent + "44"
      e.currentTarget.style.transform = "translateY(-4px)"
      e.currentTarget.style.boxShadow = `0 16px 40px rgba(0,0,0,0.4), 0 0 30px ${accent}18`
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"
      e.currentTarget.style.transform = "translateY(0)"
      e.currentTarget.style.boxShadow = "none"
    }}
  >
    {/* top-left corner glow */}
    <div style={{
      position: "absolute", top: 0, left: 0,
      width: "80px", height: "80px", borderRadius: "0 0 80px 0",
      background: `radial-gradient(circle at top left, ${accent}18, transparent 70%)`,
      pointerEvents: "none",
    }} />

    <div style={{
      width: "46px", height: "46px", borderRadius: "12px",
      background: `linear-gradient(135deg, ${accent}22, ${accent}0a)`,
      border: `1px solid ${accent}33`,
      display: "flex", alignItems: "center", justifyContent: "center",
      color: accent,
    }}>
      {icon}
    </div>
    <div>
      <div style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: "15.5px", fontWeight: 700, color: "#f0f0f5",
        marginBottom: "7px",
      }}>{title}</div>
      <div style={{
        fontSize: "13.5px", lineHeight: 1.65,
        color: "rgba(255,255,255,0.35)", fontWeight: 300,
      }}>{desc}</div>
    </div>
  </div>
)

/* ── Stat pill ── */
const StatPill = ({ value, label, delay }) => (
  <div style={{
    display: "flex", flexDirection: "column", alignItems: "center", gap: "4px",
    padding: "18px 28px",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "14px",
    animation: `fadeUp 0.6s ${delay}s cubic-bezier(0.22,1,0.36,1) both`,
    flex: "1 1 100px",
  }}>
    <span style={{
      fontFamily: "'Syne', sans-serif",
      fontSize: "26px", fontWeight: 800, color: "#f0f0f5",
      letterSpacing: "-0.5px",
    }}>{value}</span>
    <span style={{
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: "10px", fontWeight: 500,
      color: "rgba(255,255,255,0.25)",
      textTransform: "uppercase", letterSpacing: "0.1em",
    }}>{label}</span>
  </div>
)

/* ── Main ── */
const Home = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=JetBrains+Mono:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes blink {
          0%,100% { opacity:1; } 50% { opacity:0.2; }
        }
        @keyframes float {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-10px); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(0.92); opacity: 0.6; }
          100% { transform: scale(1.4);  opacity: 0; }
        }

        .home-root {
          min-height: 100vh;
          background: #080b12;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        /* Grid */
        .home-root::before {
          content: '';
          position: fixed; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.017) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.017) 1px, transparent 1px);
          background-size: 52px 52px;
          z-index: 0;
        }

        /* Scanline */
        .scanline {
          position: fixed; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, rgba(16,185,129,0.05), transparent);
          pointer-events: none; z-index: 1;
          animation: scanline 10s linear infinite;
        }

        /* Blobs */
        .blob-a {
          position: fixed; width: 800px; height: 800px; border-radius: 50%;
          background: radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 65%);
          top: -260px; left: -260px; pointer-events: none; z-index: 0;
        }
        .blob-b {
          position: fixed; width: 600px; height: 600px; border-radius: 50%;
          background: radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 65%);
          bottom: -160px; right: -160px; pointer-events: none; z-index: 0;
        }
        .blob-c {
          position: fixed; width: 400px; height: 400px; border-radius: 50%;
          background: radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 65%);
          top: 40%; right: -100px; pointer-events: none; z-index: 0;
        }

        .home-inner {
          position: relative; z-index: 2;
          max-width: 900px; margin: 0 auto;
          padding: 80px 1.5rem 100px;
        }

        /* ── Hero ── */
        .hero-wrap {
          text-align: center;
          margin-bottom: 64px;
        }

        /* badge above title */
        .hero-badge {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 6px 14px; border-radius: 999px;
          background: rgba(99,102,241,0.1);
          border: 1px solid rgba(99,102,241,0.25);
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px; font-weight: 600;
          color: rgba(165,180,252,0.85);
          letter-spacing: 0.08em; text-transform: uppercase;
          margin-bottom: 28px;
          animation: fadeUp 0.6s 0.05s cubic-bezier(0.22,1,0.36,1) both;
        }
        .badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #6366f1;
          box-shadow: 0 0 8px rgba(99,102,241,0.9);
          animation: blink 2s ease-in-out infinite;
        }

        /* headline */
        .hero-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(38px, 7vw, 68px);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -1.5px;
          color: #f0f0f5;
          margin-bottom: 22px;
          animation: fadeUp 0.65s 0.1s cubic-bezier(0.22,1,0.36,1) both;
        }
        .hero-title .accent {
          background: linear-gradient(90deg, #6366f1, #8b5cf6, #10b981, #6366f1);
          background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }

        /* subhead */
        .hero-sub {
          max-width: 560px; margin: 0 auto 38px;
          font-size: 16px; font-weight: 300; line-height: 1.75;
          color: rgba(255,255,255,0.38);
          animation: fadeUp 0.65s 0.18s cubic-bezier(0.22,1,0.36,1) both;
        }
        .hero-sub em {
          font-style: normal;
          color: rgba(255,255,255,0.6); font-weight: 400;
        }

        /* CTA row */
        .hero-cta {
          display: flex; align-items: center; justify-content: center;
          gap: 12px; flex-wrap: wrap;
          animation: fadeUp 0.65s 0.26s cubic-bezier(0.22,1,0.36,1) both;
        }

        .btn-primary-cta {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 14px 28px; border-radius: 12px;
          font-family: 'Syne', sans-serif;
          font-size: 15px; font-weight: 700; letter-spacing: 0.2px;
          text-decoration: none; color: #fff;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          box-shadow: 0 4px 24px rgba(99,102,241,0.38);
          transition: transform 0.2s, box-shadow 0.2s;
          position: relative; overflow: hidden;
        }
        .btn-primary-cta::before {
          content: ''; position: absolute; top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
          transition: left 0.5s;
        }
        .btn-primary-cta:hover::before { left: 100%; }
        .btn-primary-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 34px rgba(99,102,241,0.52);
        }
        .btn-primary-cta:active { transform: translateY(0); }

        /* pulse ring behind button */
        .btn-cta-wrap {
          position: relative; display: inline-block;
        }
        .btn-cta-wrap::before {
          content: '';
          position: absolute; inset: -4px; border-radius: 16px;
          border: 2px solid rgba(99,102,241,0.35);
          animation: pulse-ring 2.2s ease-out infinite;
        }

        .btn-ghost-cta {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 24px; border-radius: 12px;
          font-family: 'Syne', sans-serif;
          font-size: 15px; font-weight: 700;
          text-decoration: none; color: rgba(255,255,255,0.5);
          background: transparent;
          border: 1px solid rgba(255,255,255,0.1);
          transition: color 0.2s, background 0.2s, border-color 0.2s;
        }
        .btn-ghost-cta:hover {
          color: rgba(255,255,255,0.85);
          background: rgba(255,255,255,0.05);
          border-color: rgba(255,255,255,0.18);
        }

        /* rating row */
        .hero-rating {
          display: flex; align-items: center; justify-content: center; gap: 6px;
          margin-top: 22px;
          font-size: 12px; color: rgba(255,255,255,0.22);
          font-family: 'JetBrains Mono', monospace;
          animation: fadeUp 0.6s 0.34s cubic-bezier(0.22,1,0.36,1) both;
        }
        .stars { display: flex; gap: 2px; color: #f59e0b; }

        /* ── Stats row ── */
        .stats-row {
          display: flex; flex-wrap: wrap; gap: 10px;
          margin-bottom: 60px;
          animation: fadeUp 0.6s 0.38s cubic-bezier(0.22,1,0.36,1) both;
        }

        /* ── Section label ── */
        .section-label {
          display: flex; align-items: center; gap: 10px;
          font-size: 11px; font-weight: 600;
          color: rgba(255,255,255,0.2);
          letter-spacing: 0.12em; text-transform: uppercase;
          font-family: 'JetBrains Mono', monospace;
          margin-bottom: 20px;
          animation: fadeUp 0.6s 0.42s cubic-bezier(0.22,1,0.36,1) both;
        }
        .section-label::after {
          content: ''; flex: 1; height: 1px;
          background: rgba(255,255,255,0.07);
        }

        /* ── Features grid ── */
        .features-grid {
          display: flex; flex-wrap: wrap; gap: 14px;
          margin-bottom: 64px;
        }

        /* ── Bottom CTA band ── */
        .cta-band {
          position: relative; overflow: hidden;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 22px;
          padding: 44px 40px;
          text-align: center;
          animation: fadeUp 0.6s 0.55s cubic-bezier(0.22,1,0.36,1) both;
        }
        .cta-band::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg,
            rgba(99,102,241,0.06) 0%, transparent 55%,
            rgba(16,185,129,0.04) 100%);
          pointer-events: none;
        }
        /* top accent */
        .cta-band::after {
          content: '';
          position: absolute; top: 0; left: 15%; right: 15%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(99,102,241,0.7), rgba(16,185,129,0.5), transparent);
        }
        .cta-band-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(22px, 4vw, 32px); font-weight: 800;
          color: #f0f0f5; letter-spacing: -0.5px;
          margin-bottom: 12px;
        }
        .cta-band-sub {
          font-size: 14.5px; font-weight: 300;
          color: rgba(255,255,255,0.35); line-height: 1.7;
          max-width: 420px; margin: 0 auto 28px;
        }

        /* ── Responsive ── */
        @media (max-width: 600px) {
          .home-inner { padding: 60px 1.25rem 80px; }
          .cta-band { padding: 32px 22px; }
        }
      `}</style>

      <div className="home-root">
        <div className="scanline" />
        <div className="blob-a" /><div className="blob-b" /><div className="blob-c" />

        <div className="home-inner">

          {/* ── Hero ── */}
          <div className="hero-wrap">
            <div className="hero-badge">
              <span className="badge-dot" />
              AI-Powered · LSTM Neural Network
            </div>

            <h1 className="hero-title">
              Predict the<br />
              <span className="accent">stock market</span><br />
              with confidence
            </h1>

            <p className="hero-sub">
              Analyze <em>historical price data</em>, visualize moving averages,
              and get <em>ML-driven buy/sell signals</em> — all from a single dashboard
              built for serious investors.
            </p>

            <div className="hero-cta">
              <div className="btn-cta-wrap">
                <Link to="/dashboard" className="btn-primary-cta">
                  Start Predicting <IconArrow />
                </Link>
              </div>
              <Link to="/register" className="btn-ghost-cta">
                Create free account
              </Link>
            </div>

            <div className="hero-rating">
              <span className="stars">
                {[...Array(5)].map((_,i) => <IconStar key={i} />)}
              </span>
              <span>&nbsp;Built with React &amp; Django · LSTM forecasting</span>
            </div>
          </div>

          {/* ── Stats ── */}
          <div className="stats-row">
            <StatPill value="LSTM"   label="Model architecture" delay={0.38} />
            <StatPill value="R²"     label="Accuracy metric"    delay={0.42} />
            <StatPill value="100d+"  label="Moving averages"    delay={0.46} />
            <StatPill value="Live"   label="Real-time signals"  delay={0.50} />
          </div>

          {/* ── Features ── */}
          <div className="section-label">Core features</div>
          <div className="features-grid">
            <FeatureCard
              icon={<IconChart />}
              title="Historical Analysis"
              desc="Visualize years of closing price data with interactive charts. Spot patterns and market cycles at a glance."
              accent="#6366f1"
              delay={0.44}
            />
            <FeatureCard
              icon={<IconBrain />}
              title="LSTM Forecasting"
              desc="Deep learning model trained on real market data. Outputs predicted price with MSE, RMSE and R² accuracy metrics."
              accent="#8b5cf6"
              delay={0.50}
            />
            <FeatureCard
              icon={<IconSignal />}
              title="Buy / Sell Signals"
              desc="Clear directional signals backed by a confidence score ring — so you know not just what, but how sure the model is."
              accent="#10b981"
              delay={0.56}
            />
            <FeatureCard
              icon={<IconZap />}
              title="Moving Averages"
              desc="100-day and 200-day MA overlays help identify long-term trend strength and momentum shifts instantly."
              accent="#f59e0b"
              delay={0.62}
            />
            <FeatureCard
              icon={<IconShield />}
              title="Secure &amp; Private"
              desc="JWT authentication keeps your session safe. All predictions run server-side — your data never leaves the pipeline."
              accent="#ec4899"
              delay={0.68}
            />
          </div>

          {/* ── Bottom CTA ── */}
          <div className="cta-band">
            <div className="cta-band-title">Ready to make smarter trades?</div>
            <p className="cta-band-sub">
              Enter any NSE or BSE ticker and let the model do the heavy lifting.
              No spreadsheets. No guesswork.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
              <Link to="/dashboard" className="btn-primary-cta">
                Open Dashboard <IconArrow />
              </Link>
              <Link to="/register" className="btn-ghost-cta">
                Sign up free
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Home;
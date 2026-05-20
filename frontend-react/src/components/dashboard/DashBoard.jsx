import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";

/* ─────────────────── Icons ─────────────────── */
const IconSearch = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);
const IconLoader = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{animation:"spin 0.9s linear infinite",display:"block"}}>
    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
  </svg>
);
const IconTrendUp = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22,7 13.5,15.5 8.5,10.5 2,17"/><polyline points="16,7 22,7 22,13"/>
  </svg>
);
const IconTrendDown = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22,17 13.5,8.5 8.5,13.5 2,7"/><polyline points="16,17 22,17 22,11"/>
  </svg>
);
const IconWarn = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
    <path d="M12 9v4"/><path d="M12 17h.01"/>
  </svg>
);
const IconCpu = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/>
    <path d="M15 2v2M9 2v2M2 15h2M2 9h2M22 15h-2M22 9h-2M15 22v-2M9 22v-2"/>
  </svg>
);
const IconChevron = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

/* ─────────────────── Metric Card ─────────────────── */
const MetricCard = ({ label, value, sub, accent, delay = 0 }) => (
  <div style={{
    flex: "1 1 130px", minWidth: 0,
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "14px",
    padding: "16px 18px",
    display: "flex", flexDirection: "column", gap: "5px",
    position: "relative", overflow: "hidden",
    animation: `fadeUp 0.5s ${delay}s cubic-bezier(0.22,1,0.36,1) both`,
  }}>
    {/* left accent bar */}
    <div style={{
      position: "absolute", top: "18%", left: 0,
      width: "3px", height: "64%", borderRadius: "0 3px 3px 0",
      background: accent || "rgba(99,102,241,0.7)",
    }} />
    <span style={{
      fontSize: "10px", color: "rgba(255,255,255,0.3)",
      textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600,
    }}>{label}</span>
    <span style={{
      fontSize: "20px", fontWeight: 800, color: "#f0f0f5",
      fontFamily: "'Syne', sans-serif",
      fontVariantNumeric: "tabular-nums",
      overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
    }}>{value}</span>
    {sub && <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.22)", fontWeight: 300 }}>{sub}</span>}
  </div>
);

/* ─────────────────── Chart Block ─────────────────── */
const ChartBlock = ({ title, src, delay = 0 }) => {
  const [open, setOpen] = useState(true);
  if (!src) return null;
  return (
    <div style={{
      background: "rgba(255,255,255,0.025)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: "16px", overflow: "hidden",
      animation: `fadeUp 0.55s ${delay}s cubic-bezier(0.22,1,0.36,1) both`,
    }}>
      {/* header row */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%", display: "flex", alignItems: "center",
          justifyContent: "space-between",
          padding: "13px 18px", background: "transparent", border: "none",
          borderBottom: open ? "1px solid rgba(255,255,255,0.06)" : "none",
          cursor: "pointer", gap: "8px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
          <div style={{
            width: "6px", height: "6px", borderRadius: "50%",
            background: "rgba(16,185,129,0.9)",
            boxShadow: "0 0 8px rgba(16,185,129,0.7)",
          }} />
          <span style={{
            fontSize: "12.5px", fontWeight: 600,
            color: "rgba(255,255,255,0.65)", letterSpacing: "0.03em",
            fontFamily: "'DM Sans', sans-serif",
          }}>{title}</span>
        </div>
        <span style={{
          color: "rgba(255,255,255,0.25)",
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.25s",
          display: "flex",
        }}><IconChevron /></span>
      </button>
      {open && (
        <div style={{ padding: "14px" }}>
          <img
            src={src} alt={title}
            style={{ width: "100%", display: "block", borderRadius: "10px", filter: "brightness(0.95) contrast(1.05)" }}
          />
        </div>
      )}
    </div>
  );
};

/* ─────────────────── Confidence Ring ─────────────────── */
const ConfidenceRing = ({ value, isBuy }) => {
  const pct   = parseFloat(value) || 0;
  const r     = 28;
  const circ  = 2 * Math.PI * r;
  const dash  = (pct / 100) * circ;
  const color = isBuy ? "#10b981" : "#ef4444";
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
      <svg width="72" height="72" viewBox="0 0 72 72">
        <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="5"/>
        <circle cx="36" cy="36" r={r} fill="none" stroke={color} strokeWidth="5"
          strokeDasharray={`${dash} ${circ}`} strokeDashoffset={circ * 0.25}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 6px ${color})`, transition: "stroke-dasharray 1s ease" }}
        />
        <text x="36" y="40" textAnchor="middle" fontSize="13" fontWeight="800"
          fill="#f0f0f5" fontFamily="'Syne',sans-serif">{pct}%</text>
      </svg>
      <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600 }}>confidence</span>
    </div>
  );
};

/* ─────────────────── Main ─────────────────── */
const DashBoard = () => {
  const [ticker, setTicker]             = useState("");
  const [error, setError]               = useState("");
  const [loading, setLoading]           = useState(false);
  const [plot, setPlot]                 = useState("");
  const [ma100, setMa100]               = useState("");
  const [ma200, setMa200]               = useState("");
  const [finalPrediction, setFinalPrediction] = useState("");
  const [mse, setMse]                   = useState("");
  const [r2score, setR2score]           = useState("");
  const [rmse, setRmse]                 = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [predictedPrice, setPredictedPrice] = useState("");
  const [signal, setSignal]             = useState("");
  const [confidence, setConfidenScore]  = useState("");

  const backendRoot = import.meta.env.VITE_BACKEND_ROOT;

  useEffect(() => {
    axiosInstance.get("/protected-view/").catch(err => console.error(err));
  }, []);

  const clear = () => {
    setPlot(""); setMa100(""); setMa200(""); setFinalPrediction("");
    setMse(""); setR2score(""); setRmse(""); setCurrentPrice("");
    setPredictedPrice(""); setSignal(""); setConfidenScore("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    clear();
    try {
      const res = await axiosInstance.post("/predict/", { ticker });
      if (res.data.error) { setError(res.data.error); return; }

      const b = backendRoot;
      setPlot(`${b}${res.data.plot_img}`);
      setMa100(`${b}${res.data.plt_100_ma}`);
      setMa200(`${b}${res.data.plt_200_ma}`);
      setFinalPrediction(`${b}${res.data.plt_final_prediction}`);
      setMse(res.data.mse);
      setR2score(res.data.r2);
      setRmse(res.data.rmse);
      setCurrentPrice(res.data.current_price);
      setPredictedPrice(res.data.predicted_price);
      setSignal(res.data.signal);
      setConfidenScore(res.data.confidence_score);
    } catch (err) {
      console.error(err);
      setError("Could not reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isBuy     = signal === "BUY";
  const hasResult = !error && signal;

  /* price delta */
  const delta = currentPrice && predictedPrice
    ? (((parseFloat(predictedPrice) - parseFloat(currentPrice)) / parseFloat(currentPrice)) * 100).toFixed(2)
    : null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500&family=JetBrains+Mono:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes spin    { to { transform: rotate(360deg); } }
        @keyframes fadeUp  { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pricePop {
          0%   { transform: scale(0.88); opacity:0; }
          60%  { transform: scale(1.04); }
          100% { transform: scale(1);    opacity:1; }
        }

        .dash-root {
          font-family: 'DM Sans', sans-serif;
          background: #080b12;
          min-height: 100vh;
          padding: 2.5rem 1rem 4rem;
          position: relative;
          overflow-x: hidden;
        }

        /* subtle grid */
        .dash-root::before {
          content: '';
          position: fixed; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px);
          background-size: 48px 48px;
          z-index: 0;
        }

        /* scanline sweep */
        .scanline {
          position: fixed; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, rgba(16,185,129,0.06), transparent);
          pointer-events: none; z-index: 1;
          animation: scanline 8s linear infinite;
        }

        /* ambient blobs */
        .blob-tl {
          position: fixed; width: 700px; height: 700px; border-radius: 50%;
          background: radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 65%);
          top: -220px; left: -220px; pointer-events: none; z-index: 0;
        }
        .blob-br {
          position: fixed; width: 580px; height: 580px; border-radius: 50%;
          background: radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 65%);
          bottom: -160px; right: -160px; pointer-events: none; z-index: 0;
        }

        .dash-inner {
          position: relative; z-index: 2;
          max-width: 820px; margin: 0 auto;
        }

        /* ── Header ── */
        .dash-header {
          display: flex; align-items: flex-end;
          justify-content: space-between; flex-wrap: wrap;
          gap: 12px; margin-bottom: 2.4rem;
          animation: fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both;
        }
        .dash-title {
          font-family: 'Syne', sans-serif;
          font-size: 28px; font-weight: 800;
          color: #f0f0f5; letter-spacing: -0.5px; line-height: 1;
        }
        .dash-title span {
          background: linear-gradient(90deg, #6366f1, #10b981, #6366f1);
          background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }
        .dash-subtitle {
          display: flex; align-items: center; gap: 6px;
          font-size: 12px; font-weight: 400;
          color: rgba(255,255,255,0.28); margin-top: 5px;
          font-family: 'JetBrains Mono', monospace;
        }
        .dash-subtitle-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 8px rgba(16,185,129,0.8);
          animation: blink 2s ease-in-out infinite;
        }
        .dash-badge {
          display: flex; align-items: center; gap: 6px;
          padding: 6px 12px; border-radius: 8px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          font-size: 11px; font-weight: 500;
          color: rgba(255,255,255,0.35);
          font-family: 'JetBrains Mono', monospace;
        }

        /* ── Search bar ── */
        .search-wrap {
          display: flex; gap: 10px; margin-bottom: 1.6rem;
          animation: fadeUp 0.6s 0.08s cubic-bezier(0.22,1,0.36,1) both;
        }
        .ticker-input {
          flex: 1; font-size: 15px; font-weight: 600;
          font-family: 'JetBrains Mono', monospace;
          letter-spacing: 0.08em; text-transform: uppercase;
          padding: 13px 18px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.09);
          background: rgba(255,255,255,0.04);
          color: #f0f0f5;
          transition: border-color 0.2s, box-shadow 0.2s;
          caret-color: #10b981;
        }
        .ticker-input::placeholder {
          color: rgba(255,255,255,0.18); font-weight: 400; letter-spacing: 0.03em;
          font-family: 'DM Sans', sans-serif; font-size: 14px;
        }
        .ticker-input:focus {
          outline: none;
          border-color: rgba(16,185,129,0.5);
          box-shadow: 0 0 0 3px rgba(16,185,129,0.1);
          background: rgba(16,185,129,0.05);
        }
        .predict-btn {
          display: flex; align-items: center; gap: 8px;
          padding: 13px 24px; border-radius: 12px;
          border: none; cursor: pointer;
          font-family: 'Syne', sans-serif;
          font-size: 14px; font-weight: 700; letter-spacing: 0.3px;
          white-space: nowrap; position: relative; overflow: hidden;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: #fff;
          box-shadow: 0 4px 20px rgba(99,102,241,0.3);
          transition: transform 0.15s, box-shadow 0.2s;
        }
        .predict-btn::before {
          content: ''; position: absolute; top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
          transition: left 0.45s;
        }
        .predict-btn:hover:not(:disabled)::before { left: 100%; }
        .predict-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(99,102,241,0.45);
        }
        .predict-btn:active:not(:disabled) { transform: translateY(0); }
        .predict-btn:disabled {
          background: rgba(99,102,241,0.2); color: rgba(255,255,255,0.35);
          cursor: not-allowed; box-shadow: none;
        }

        /* ── Error ── */
        .error-box {
          display: flex; align-items: flex-start; gap: 10px;
          padding: 13px 16px; margin-bottom: 1.5rem;
          background: rgba(239,68,68,0.07);
          border: 1px solid rgba(239,68,68,0.2);
          border-radius: 12px; color: #f87171; font-size: 14px;
          animation: fadeUp 0.3s both;
        }

        /* ── Results ── */
        .results-wrap { display: flex; flex-direction: column; gap: 14px; }

        /* hero card */
        .hero-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px; padding: 22px 24px;
          display: flex; flex-wrap: wrap;
          align-items: center; justify-content: space-between; gap: 20px;
          animation: fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both;
          position: relative; overflow: hidden;
        }
        .hero-card::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg,
            rgba(99,102,241,0.04) 0%, transparent 60%,
            rgba(16,185,129,0.03) 100%);
          pointer-events: none;
        }

        .hero-ticker {
          font-family: 'JetBrains Mono', monospace;
          font-size: 32px; font-weight: 700;
          color: #f0f0f5; letter-spacing: 0.05em;
          animation: pricePop 0.5s 0.1s cubic-bezier(0.22,1,0.36,1) both;
        }
        .hero-label {
          font-size: 11px; color: rgba(255,255,255,0.28);
          font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em;
          margin-bottom: 5px;
        }
        .signal-pill {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 9px 18px; border-radius: 999px;
          font-family: 'Syne', sans-serif;
          font-size: 15px; font-weight: 800; letter-spacing: 0.03em;
        }
        .signal-buy {
          background: rgba(16,185,129,0.12);
          border: 1px solid rgba(16,185,129,0.3);
          color: #34d399;
          box-shadow: 0 0 20px rgba(16,185,129,0.15);
        }
        .signal-sell {
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.25);
          color: #f87171;
          box-shadow: 0 0 20px rgba(239,68,68,0.12);
        }

        /* delta badge */
        .delta-badge {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px; font-weight: 600;
          padding: 3px 8px; border-radius: 6px;
        }
        .delta-pos { background: rgba(16,185,129,0.1); color: #34d399; }
        .delta-neg { background: rgba(239,68,68,0.1);  color: #f87171; }

        /* metrics */
        .metrics-row {
          display: flex; flex-wrap: wrap; gap: 10px;
          animation: fadeUp 0.5s 0.05s cubic-bezier(0.22,1,0.36,1) both;
        }

        /* divider label */
        .section-label {
          display: flex; align-items: center; gap: 10px;
          font-size: 11px; font-weight: 600;
          color: rgba(255,255,255,0.2);
          letter-spacing: 0.12em; text-transform: uppercase;
          font-family: 'JetBrains Mono', monospace;
          animation: fadeUp 0.5s 0.1s cubic-bezier(0.22,1,0.36,1) both;
        }
        .section-label::after {
          content: ''; flex: 1; height: 1px;
          background: rgba(255,255,255,0.07);
        }
      `}</style>

      <div className="dash-root">
        <div className="scanline" />
        <div className="blob-tl" />
        <div className="blob-br" />

        <div className="dash-inner">

          {/* ── Header ── */}
          <div className="dash-header">
            <div>
              <h1 className="dash-title">
                Stock&nbsp;<span>Predictor</span>
              </h1>
              <div className="dash-subtitle">
                <div className="dash-subtitle-dot" />
                LSTM neural network · real-time inference
              </div>
            </div>
            <div className="dash-badge">
              <IconCpu />
              AI-powered forecasting
            </div>
          </div>

          {/* ── Search ── */}
          <form className="search-wrap" onSubmit={handleSubmit}>
            <input
              className="ticker-input"
              type="text"
              placeholder="Enter ticker — e.g.  RELIANCE.NS"
              value={ticker}
              onChange={e => setTicker(e.target.value)}
              required
              autoComplete="off"
              spellCheck="false"
            />
            <button className="predict-btn" type="submit" disabled={loading}>
              {loading ? <IconLoader /> : <IconSearch />}
              {loading ? "Analysing…" : "Predict"}
            </button>
          </form>

          {/* ── Error ── */}
          {error && (
            <div className="error-box">
              <span style={{ flexShrink: 0, marginTop: "1px" }}><IconWarn /></span>
              <span>{error}</span>
            </div>
          )}

          {/* ── Results ── */}
          {hasResult && (
            <div className="results-wrap">

              {/* Hero card */}
              <div className="hero-card">
                <div>
                  <div className="hero-label">Analysing</div>
                  <div className="hero-ticker">{ticker.toUpperCase()}</div>
                  {delta && (
                    <span className={`delta-badge ${parseFloat(delta) >= 0 ? "delta-pos" : "delta-neg"}`} style={{ marginTop: "8px", display: "inline-block" }}>
                      {parseFloat(delta) >= 0 ? "▲" : "▼"} {Math.abs(delta)}% projected
                    </span>
                  )}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
                  <div className={`signal-pill ${isBuy ? "signal-buy" : "signal-sell"}`}>
                    {isBuy ? <IconTrendUp /> : <IconTrendDown />}
                    {signal}
                  </div>
                  <ConfidenceRing value={confidence} isBuy={isBuy} />
                </div>
              </div>

              {/* Metrics */}
              <div className="metrics-row">
                <MetricCard
                  label="Current Price"
                  value={`₹${parseFloat(currentPrice).toFixed(2)}`}
                  accent="rgba(99,102,241,0.8)"
                  delay={0.06}
                />
                <MetricCard
                  label="Predicted Price"
                  value={`₹${parseFloat(predictedPrice).toFixed(2)}`}
                  accent={isBuy ? "rgba(16,185,129,0.8)" : "rgba(239,68,68,0.7)"}
                  delay={0.1}
                />
                <MetricCard
                  label="MSE"
                  value={parseFloat(mse).toFixed(2)}
                  sub="Mean squared error"
                  accent="rgba(245,158,11,0.7)"
                  delay={0.14}
                />
                <MetricCard
                  label="RMSE"
                  value={parseFloat(rmse).toFixed(2)}
                  sub="Root mean sq. error"
                  accent="rgba(245,158,11,0.7)"
                  delay={0.18}
                />
                <MetricCard
                  label="R² Score"
                  value={parseFloat(r2score).toFixed(4)}
                  sub="Coefficient of det."
                  accent="rgba(139,92,246,0.8)"
                  delay={0.22}
                />
              </div>

              {/* Charts section */}
              <div className="section-label">Charts</div>

              <ChartBlock title="Historical closing price"      src={plot}            delay={0.1} />
              <ChartBlock title="100-day moving average"        src={ma100}           delay={0.15} />
              <ChartBlock title="200-day moving average"        src={ma200}           delay={0.2} />
              <ChartBlock title="Final prediction vs actual"    src={finalPrediction} delay={0.25} />

            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DashBoard;
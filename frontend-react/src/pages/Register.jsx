import React, { useState } from 'react'
import axiosInstance from "../axiosInstance"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faUser, faEnvelope, faLock, faArrowRight, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [focusedField, setFocusedField] = useState(null)

  const navigate = useNavigate()

  const handleRegistration = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})

    const userData = { username, email, password }

    try {
      const response = await axiosInstance.post("/register/", userData)
      const data = await response.data
      setSuccess(true)
      setUsername("")
      setEmail("")
      setPassword("")
      setTimeout(() => navigate("/login"), 1800)
    } catch (err) {
      setErrors(err.response?.data || {})
    } finally {
      setLoading(false)
    }
  }

  /* Password strength meter */
  const getStrength = (pw) => {
    if (!pw) return { level: 0, label: '', color: 'transparent' }
    let score = 0
    if (pw.length >= 8) score++
    if (/[A-Z]/.test(pw)) score++
    if (/[0-9]/.test(pw)) score++
    if (/[^A-Za-z0-9]/.test(pw)) score++
    const map = [
      { level: 1, label: 'Weak',   color: '#ef4444' },
      { level: 2, label: 'Fair',   color: '#f59e0b' },
      { level: 3, label: 'Good',   color: '#6366f1' },
      { level: 4, label: 'Strong', color: '#10b981' },
    ]
    return map[score - 1] || { level: 0, label: '', color: 'transparent' }
  }

  const strength = getStrength(password)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .reg-root {
          min-height: 100vh;
          background: #0a0a0f;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
          padding: 32px 16px;
        }

        /* Ambient glows */
        .reg-root::before {
          content: '';
          position: absolute;
          width: 640px; height: 640px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(16,185,129,0.10) 0%, transparent 70%);
          top: -180px; right: -180px;
          pointer-events: none;
        }
        .reg-root::after {
          content: '';
          position: absolute;
          width: 520px; height: 520px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 70%);
          bottom: -120px; left: -120px;
          pointer-events: none;
        }

        /* Grid */
        .reg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        /* Card */
        .reg-card {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 440px;
          padding: 48px 44px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 24px;
          backdrop-filter: blur(24px);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.04) inset,
            0 32px 80px rgba(0,0,0,0.65),
            0 0 80px rgba(16,185,129,0.05);
          animation: cardReveal 0.7s cubic-bezier(0.22,1,0.36,1) both;
        }

        @keyframes cardReveal {
          from { opacity: 0; transform: translateY(28px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }

        /* Accent top line — emerald theme for Register */
        .reg-accent {
          position: absolute;
          top: 0; left: 10%; right: 10%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(16,185,129,0.8), rgba(99,102,241,0.6), transparent);
          border-radius: 0 0 4px 4px;
        }

        /* Badge */
        .reg-badge {
          width: 52px; height: 52px;
          border-radius: 14px;
          background: linear-gradient(135deg, rgba(16,185,129,0.25), rgba(99,102,241,0.2));
          border: 1px solid rgba(16,185,129,0.3);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 26px;
          font-size: 22px;
          animation: badgeIn 0.7s 0.15s cubic-bezier(0.22,1,0.36,1) both;
        }

        @keyframes badgeIn {
          from { opacity: 0; transform: scale(0.5) rotate(-15deg); }
          to   { opacity: 1; transform: scale(1)   rotate(0deg); }
        }

        .reg-heading {
          font-family: 'Syne', sans-serif;
          font-size: 26px; font-weight: 800;
          color: #f0f0f5;
          letter-spacing: -0.5px;
          margin-bottom: 6px;
          animation: fadeUp 0.6s 0.2s both;
        }

        .reg-sub {
          font-size: 14px; font-weight: 300;
          color: rgba(255,255,255,0.33);
          margin-bottom: 34px;
          animation: fadeUp 0.6s 0.27s both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Divider */
        .divider {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 28px;
          animation: fadeUp 0.6s 0.34s both;
        }
        .divider-line { flex: 1; height: 1px; background: rgba(255,255,255,0.07); }
        .divider-text {
          font-size: 11px; color: rgba(255,255,255,0.2);
          letter-spacing: 1.5px; text-transform: uppercase; font-weight: 500;
        }

        /* Field */
        .field-wrap {
          position: relative; margin-bottom: 18px;
          animation: fadeUp 0.6s both;
        }
        .field-wrap:nth-child(1) { animation-delay: 0.34s; }
        .field-wrap:nth-child(2) { animation-delay: 0.41s; }
        .field-wrap:nth-child(3) { animation-delay: 0.48s; }

        .field-icon {
          position: absolute; left: 16px; top: 15px;
          font-size: 13px; color: rgba(255,255,255,0.22);
          transition: color 0.22s; pointer-events: none; z-index: 2;
        }
        .field-wrap.is-focused .field-icon { color: rgba(16,185,129,0.9); }

        .reg-input {
          width: 100%;
          padding: 14px 16px 14px 42px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          color: #e8e8f0;
          font-family: 'DM Sans', sans-serif;
          font-size: 14.5px; font-weight: 400;
          outline: none;
          transition: all 0.25s ease;
          caret-color: #10b981;
        }
        .reg-input::placeholder { color: rgba(255,255,255,0.2); font-weight: 300; }
        .reg-input:focus {
          background: rgba(16,185,129,0.07);
          border-color: rgba(16,185,129,0.45);
          box-shadow: 0 0 0 3px rgba(16,185,129,0.1);
        }
        .reg-input.has-error {
          border-color: rgba(239,68,68,0.45);
          background: rgba(239,68,68,0.05);
        }

        /* Inline field error */
        .field-error {
          display: flex; align-items: center; gap: 6px;
          margin-top: 6px; padding-left: 4px;
          font-size: 12.5px; color: #f87171;
          animation: fadeUp 0.3s both;
        }
        .field-error-dot {
          width: 4px; height: 4px; border-radius: 50%;
          background: #ef4444; flex-shrink: 0;
        }

        /* Password strength bar */
        .strength-track {
          display: flex; gap: 5px; margin-top: 10px;
        }
        .strength-seg {
          flex: 1; height: 3px; border-radius: 99px;
          background: rgba(255,255,255,0.07);
          transition: background 0.35s ease;
        }

        .strength-label {
          font-size: 11.5px; margin-top: 5px; font-weight: 500;
          transition: color 0.35s;
          min-height: 16px;
        }

        /* Success banner */
        .success-banner {
          display: flex; align-items: center; gap: 10px;
          padding: 14px 16px;
          background: rgba(16,185,129,0.1);
          border: 1px solid rgba(16,185,129,0.25);
          border-radius: 12px;
          color: #6ee7b7;
          font-size: 14px; font-weight: 500;
          margin-bottom: 20px;
          animation: fadeUp 0.4s both, pulse 1.8s 0.4s ease-in-out infinite;
        }
        @keyframes pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.2); }
          50%      { box-shadow: 0 0 0 6px rgba(16,185,129,0); }
        }

        /* Button */
        .reg-btn {
          width: 100%; padding: 14px;
          border: none; border-radius: 12px;
          font-family: 'Syne', sans-serif;
          font-size: 15px; font-weight: 700; letter-spacing: 0.3px;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          transition: all 0.25s ease;
          margin-top: 6px; position: relative; overflow: hidden;
          animation: fadeUp 0.6s 0.56s both;
        }
        .reg-btn:not(:disabled) {
          background: linear-gradient(135deg, #10b981, #059669);
          color: #fff;
          box-shadow: 0 4px 20px rgba(16,185,129,0.32);
        }
        .reg-btn:not(:disabled):hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 32px rgba(16,185,129,0.48);
        }
        .reg-btn:not(:disabled):active {
          transform: translateY(0);
          box-shadow: 0 2px 10px rgba(16,185,129,0.28);
        }
        .reg-btn:disabled {
          background: rgba(16,185,129,0.15);
          color: rgba(255,255,255,0.35);
          cursor: not-allowed;
        }
        .reg-btn::before {
          content: '';
          position: absolute; top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
          transition: left 0.55s;
        }
        .reg-btn:not(:disabled):hover::before { left: 100%; }

        /* Step dots (visual progress hint) */
        .step-dots {
          display: flex; gap: 6px; justify-content: center;
          margin-bottom: 28px;
          animation: fadeUp 0.6s 0.2s both;
        }
        .step-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: rgba(255,255,255,0.12);
          transition: all 0.3s;
        }
        .step-dot.active {
          background: #10b981;
          box-shadow: 0 0 8px rgba(16,185,129,0.6);
          width: 18px; border-radius: 3px;
        }

        /* Footer */
        .reg-footer {
          margin-top: 28px; text-align: center;
          font-size: 13px; color: rgba(255,255,255,0.25);
          animation: fadeUp 0.6s 0.62s both;
        }
        .reg-footer a {
          color: rgba(16,185,129,0.9); text-decoration: none;
          font-weight: 500; transition: color 0.2s;
        }
        .reg-footer a:hover { color: #6ee7b7; }
      `}</style>

      <div className="reg-root">
        <div className="reg-grid" />

        <div className="reg-card">
          <div className="reg-accent" />

          <div className="reg-badge">✨</div>

          <h2 className="reg-heading">Create an account</h2>
          <p className="reg-sub">Join us — it only takes a moment</p>

          {/* Step progress dots */}
          <div className="step-dots">
            {['username', 'email', 'password'].map((f, i) => {
              const filled = [username, email, password][i]
              return <div key={f} className={`step-dot ${filled ? 'active' : ''}`} />
            })}
          </div>

          <div className="divider">
            <div className="divider-line" />
            <span className="divider-text">your details</span>
            <div className="divider-line" />
          </div>

          <form onSubmit={handleRegistration} noValidate>

            {/* Username */}
            <div className={`field-wrap ${focusedField === 'username' ? 'is-focused' : ''}`}>
              <span className="field-icon"><FontAwesomeIcon icon={faUser} /></span>
              <input
                type="text"
                className={`reg-input ${errors.username ? 'has-error' : ''}`}
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={() => setFocusedField('username')}
                onBlur={() => setFocusedField(null)}
                autoComplete="username"
              />
              {errors.username && (
                <div className="field-error">
                  <div className="field-error-dot" />
                  {errors.username}
                </div>
              )}
            </div>

            {/* Email */}
            <div className={`field-wrap ${focusedField === 'email' ? 'is-focused' : ''}`}>
              <span className="field-icon"><FontAwesomeIcon icon={faEnvelope} /></span>
              <input
                type="email"
                className={`reg-input ${errors.email ? 'has-error' : ''}`}
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                autoComplete="email"
              />
              {errors.email && (
                <div className="field-error">
                  <div className="field-error-dot" />
                  {errors.email}
                </div>
              )}
            </div>

            {/* Password */}
            <div className={`field-wrap ${focusedField === 'password' ? 'is-focused' : ''}`}>
              <span className="field-icon"><FontAwesomeIcon icon={faLock} /></span>
              <input
                type="password"
                className={`reg-input ${errors.password ? 'has-error' : ''}`}
                placeholder="Set a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                autoComplete="new-password"
              />
              {/* Strength meter */}
              {password && (
                <>
                  <div className="strength-track">
                    {[1, 2, 3, 4].map((seg) => (
                      <div
                        key={seg}
                        className="strength-seg"
                        style={{ background: strength.level >= seg ? strength.color : undefined }}
                      />
                    ))}
                  </div>
                  <div className="strength-label" style={{ color: strength.color }}>
                    {strength.label}
                  </div>
                </>
              )}
              {errors.password && (
                <div className="field-error">
                  <div className="field-error-dot" />
                  {errors.password}
                </div>
              )}
            </div>

            {/* Success */}
            {success && (
              <div className="success-banner">
                <FontAwesomeIcon icon={faCheckCircle} />
                Account created! Redirecting to login…
              </div>
            )}

            <button type="submit" className="reg-btn" disabled={loading || success}>
              {loading ? (
                <><FontAwesomeIcon icon={faSpinner} spin /> Creating account…</>
              ) : success ? (
                <><FontAwesomeIcon icon={faCheckCircle} /> Done!</>
              ) : (
                <>Create Account <FontAwesomeIcon icon={faArrowRight} /></>
              )}
            </button>
          </form>

          <div className="reg-footer">
            Already have an account?{' '}
            <a href="/login">Sign in instead</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
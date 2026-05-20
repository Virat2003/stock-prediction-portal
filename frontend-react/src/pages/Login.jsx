import React, { useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faUser, faLock, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { AuthContext } from '../AuthProvider'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState()
  const [loading, setLoading] = useState(false)
  const [focusedField, setFocusedField] = useState(null)

  const navigate = useNavigate()
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrors(null)

    const userData = { username, password }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/v1/token/", userData)
      const data = await response.data
      localStorage.setItem("accessToken", data.access)
      localStorage.setItem("refresh", data.refresh)
      setIsLoggedIn(true)
      navigate("/dashboard")
    } catch (err) {
      setErrors("Invalid credentials. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .login-root {
          min-height: 100vh;
          background: #0a0a0f;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Ambient background blobs */
        .login-root::before {
          content: '';
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%);
          top: -150px;
          left: -150px;
          pointer-events: none;
        }
        .login-root::after {
          content: '';
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%);
          bottom: -100px;
          right: -100px;
          pointer-events: none;
        }

        /* Floating grid lines */
        .grid-lines {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        .login-card {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 420px;
          padding: 48px 44px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          backdrop-filter: blur(20px);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.04) inset,
            0 32px 80px rgba(0,0,0,0.6),
            0 0 80px rgba(99,102,241,0.06);
          animation: cardReveal 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes cardReveal {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Top accent line */
        .card-accent {
          position: absolute;
          top: 0; left: 10%; right: 10%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(99,102,241,0.8), rgba(16,185,129,0.6), transparent);
          border-radius: 0 0 4px 4px;
        }

        /* Logo / icon badge */
        .login-badge {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: linear-gradient(135deg, rgba(99,102,241,0.3), rgba(16,185,129,0.2));
          border: 1px solid rgba(99,102,241,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 28px;
          font-size: 22px;
          animation: badgeReveal 0.7s 0.15s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes badgeReveal {
          from { opacity: 0; transform: scale(0.6) rotate(-10deg); }
          to   { opacity: 1; transform: scale(1) rotate(0deg); }
        }

        .login-heading {
          font-family: 'Syne', sans-serif;
          font-size: 26px;
          font-weight: 800;
          color: #f0f0f5;
          letter-spacing: -0.5px;
          margin-bottom: 6px;
          animation: fadeUp 0.6s 0.2s both;
        }

        .login-sub {
          font-size: 14px;
          color: rgba(255,255,255,0.35);
          font-weight: 300;
          margin-bottom: 36px;
          animation: fadeUp 0.6s 0.28s both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Field wrapper */
        .field-wrap {
          position: relative;
          margin-bottom: 16px;
          animation: fadeUp 0.6s both;
        }
        .field-wrap:nth-child(1) { animation-delay: 0.32s; }
        .field-wrap:nth-child(2) { animation-delay: 0.4s; }

        .field-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 13px;
          color: rgba(255,255,255,0.25);
          transition: color 0.2s;
          pointer-events: none;
          z-index: 2;
        }

        .field-wrap.is-focused .field-icon {
          color: rgba(99,102,241,0.8);
        }

        .login-input {
          width: 100%;
          padding: 14px 16px 14px 42px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          color: #e8e8f0;
          font-family: 'DM Sans', sans-serif;
          font-size: 14.5px;
          font-weight: 400;
          outline: none;
          transition: all 0.25s ease;
          caret-color: #6366f1;
        }

        .login-input::placeholder {
          color: rgba(255,255,255,0.2);
          font-weight: 300;
        }

        .login-input:focus {
          background: rgba(99,102,241,0.08);
          border-color: rgba(99,102,241,0.5);
          box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
        }

        /* Error */
        .error-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 14px;
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.2);
          border-radius: 10px;
          color: #f87171;
          font-size: 13px;
          margin-bottom: 20px;
          animation: shake 0.4s cubic-bezier(0.36,0.07,0.19,0.97) both, fadeUp 0.3s both;
        }

        @keyframes shake {
          10%, 90% { transform: translateX(-2px); }
          20%, 80% { transform: translateX(3px); }
          30%, 50%, 70% { transform: translateX(-4px); }
          40%, 60% { transform: translateX(4px); }
        }

        .error-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #ef4444;
          flex-shrink: 0;
        }

        /* Submit button */
        .login-btn {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 12px;
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.3px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.25s ease;
          margin-top: 8px;
          position: relative;
          overflow: hidden;
          animation: fadeUp 0.6s 0.48s both;
        }

        .login-btn:not(:disabled) {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: #fff;
          box-shadow: 0 4px 20px rgba(99,102,241,0.35);
        }

        .login-btn:not(:disabled):hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 30px rgba(99,102,241,0.5);
        }

        .login-btn:not(:disabled):active {
          transform: translateY(0);
          box-shadow: 0 2px 10px rgba(99,102,241,0.3);
        }

        .login-btn:disabled {
          background: rgba(99,102,241,0.2);
          color: rgba(255,255,255,0.4);
          cursor: not-allowed;
          box-shadow: none;
        }

        /* Button shimmer effect */
        .login-btn::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transition: left 0.5s;
        }
        .login-btn:not(:disabled):hover::before {
          left: 100%;
        }

        /* Footer links */
        .login-footer {
          margin-top: 28px;
          text-align: center;
          font-size: 13px;
          color: rgba(255,255,255,0.25);
          animation: fadeUp 0.6s 0.55s both;
        }

        .login-footer a {
          color: rgba(99,102,241,0.9);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }

        .login-footer a:hover {
          color: #a5b4fc;
        }

        /* Divider */
        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 28px;
          animation: fadeUp 0.6s 0.36s both;
        }
        .divider-line {
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.07);
        }
        .divider-text {
          font-size: 11px;
          color: rgba(255,255,255,0.2);
          letter-spacing: 1.5px;
          text-transform: uppercase;
          font-weight: 500;
        }
      `}</style>

      <div className="login-root">
        <div className="grid-lines" />

        <div className="login-card">
          <div className="card-accent" />

          <div className="login-badge">🔐</div>

          <h2 className="login-heading">Welcome back</h2>
          <p className="login-sub">Sign in to access your portal</p>

          <div className="divider">
            <div className="divider-line" />
            <span className="divider-text">credentials</span>
            <div className="divider-line" />
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className={`field-wrap ${focusedField === 'username' ? 'is-focused' : ''}`}>
              <span className="field-icon">
                <FontAwesomeIcon icon={faUser} />
              </span>
              <input
                type="text"
                className="login-input"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={() => setFocusedField('username')}
                onBlur={() => setFocusedField(null)}
                required
                autoComplete="username"
              />
            </div>

            <div className={`field-wrap ${focusedField === 'password' ? 'is-focused' : ''}`}>
              <span className="field-icon">
                <FontAwesomeIcon icon={faLock} />
              </span>
              <input
                type="password"
                className="login-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                required
                autoComplete="current-password"
              />
            </div>

            {errors && (
              <div className="error-bar">
                <div className="error-dot" />
                {errors}
              </div>
            )}

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} spin />
                  Authenticating...
                </>
              ) : (
                <>
                  Sign In
                  <FontAwesomeIcon icon={faArrowRight} />
                </>
              )}
            </button>
          </form>

          <div className="login-footer">
            Don't have an account?{' '}
            <a href="/register">Create one</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
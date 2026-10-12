import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./AuthExperience.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const isLocalhost = window.location.hostname === "localhost";
      const backendURL = isLocalhost
        ? "http://localhost:3002"
        : "https://full-stack-stock-trading-platform-c4js.onrender.com";

      const res = await axios.post(`${backendURL}/api/auth/login`, { email, password }, { withCredentials: true });
      if (res.data.user) localStorage.setItem("user", JSON.stringify(res.data.user));
      if (res.data.token) localStorage.setItem("token", res.data.token);
      toast.success("Welcome back! Login successful.");
      const dashboardURL = isLocalhost
        ? "http://localhost:3001"
        : "https://full-stack-stock-trading-platform-1-18oq.onrender.com";
      setTimeout(() => { window.location.href = dashboardURL; }, 700);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed. Please check your details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-visual">
        <Link to="/" className="brand-lockup"><span className="brand-mark">N</span> northstar<span className="brand-dot">.</span></Link>
        <div className="visual-copy">
          <span className="eyebrow"><i /> YOUR NEXT MOVE STARTS HERE</span>
          <h1>Invest in your<br /><em>own potential.</em></h1>
          <p>A clearer view of your money. A smarter way to build your investing habit.</p>
          <div className="market-card">
            <div className="market-card-top"><span>MARKET SNAPSHOT</span><span className="live-pill">● LIVE UI</span></div>
            <div className="market-number">NIFTY 50 <b>+1.24%</b></div>
            <svg className="sparkline" viewBox="0 0 440 100" preserveAspectRatio="none" aria-label="Decorative rising market line">
              <defs><linearGradient id="areaFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#b9f56b" stopOpacity=".28"/><stop offset="100%" stopColor="#b9f56b" stopOpacity="0"/></linearGradient></defs>
              <path d="M0 82 C25 76 35 86 58 65 S95 72 118 49 S151 65 178 43 S218 58 245 30 S280 45 305 23 S345 42 369 17 S409 24 440 5 L440 100 L0 100Z" fill="url(#areaFill)"/>
              <path d="M0 82 C25 76 35 86 58 65 S95 72 118 49 S151 65 178 43 S218 58 245 30 S280 45 305 23 S345 42 369 17 S409 24 440 5" fill="none" stroke="#b9f56b" strokeWidth="3" strokeLinecap="round"/>
            </svg>
            <div className="market-foot"><span>Market illustration for demo UI</span><span>Explore with confidence ↗</span></div>
          </div>
        </div>
        <div className="visual-bottom"><span>DESIGNED FOR THE LONG GAME</span><span>01 — 03</span></div>
      </section>
      <section className="auth-form-side">
        <div className="mobile-brand"><span className="brand-mark">N</span> northstar<span className="brand-dot">.</span></div>
        <div className="auth-form-wrap">
          <div className="auth-heading"><span className="eyebrow dark-eyebrow">GOOD TO HAVE YOU BACK</span><h2>Welcome back<span>.</span></h2><p>Sign in to continue to your investing space.</p></div>
          <form className="modern-auth-form" onSubmit={submitHandler}>
            <label htmlFor="email">Email address</label>
            <input id="email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
            <div className="password-label"><label htmlFor="password">Password</label><button type="button" className="text-action" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}</button></div>
            <input id="password" type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} required />
            <button className="auth-submit" type="submit" disabled={loading}>{loading ? "Signing you in…" : "Sign in"} <span>↗</span></button>
          </form>
          <p className="auth-switch">New to Northstar? <Link to="/signup">Create an account</Link></p>
          <div className="secure-note"><span>✳</span> Your account is protected with secure authentication.</div>
        </div>
        <footer className="auth-legal"><span>© 2026 Northstar Finance UI</span><span>Built for thoughtful investing</span></footer>
      </section>
    </main>
  );
}
export default Login;

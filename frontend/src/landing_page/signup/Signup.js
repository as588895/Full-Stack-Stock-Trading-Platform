import React, { useState } from "react";
import API from "../../services/authApi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../login/AuthExperience.css";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/signup", formData);
      toast.success("Account created successfully!");
      setTimeout(() => navigate("/login"), 800);
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page signup-page">
      <section className="auth-visual">
        <Link to="/" className="brand-lockup"><span className="brand-mark">N</span> northstar<span className="brand-dot">.</span></Link>
        <div className="visual-copy">
          <span className="eyebrow"><i /> START WITH A STRONG FOUNDATION</span>
          <h1>Your future.<br /><em>Your strategy.</em></h1>
          <p>Build better financial habits with a workspace designed to keep your goals in focus.</p>
          <div className="benefit-list">
            <div><span>↗</span><section><b>One clear view</b><small>Bring your investing journey into focus.</small></section></div>
            <div><span>⌁</span><section><b>Made for your pace</b><small>Explore, learn, and grow at your own speed.</small></section></div>
            <div><span>✳</span><section><b>Security comes first</b><small>Your account uses the existing platform auth.</small></section></div>
          </div>
        </div>
        <div className="visual-bottom"><span>MAKE ROOM FOR WHAT'S NEXT</span><span>02 — 03</span></div>
      </section>
      <section className="auth-form-side">
        <div className="mobile-brand"><span className="brand-mark">N</span> northstar<span className="brand-dot">.</span></div>
        <div className="auth-form-wrap signup-form-wrap">
          <div className="auth-heading"><span className="eyebrow dark-eyebrow">YOUR JOURNEY STARTS HERE</span><h2>Create your account<span>.</span></h2><p>A few details and you're ready to get started.</p></div>
          <form className="modern-auth-form" onSubmit={handleSubmit}>
            <label htmlFor="username">Your name</label>
            <input id="username" name="username" type="text" autoComplete="name" placeholder="e.g. Aman Singh" value={formData.username} onChange={handleChange} required minLength={2} />
            <label htmlFor="signup-email">Email address</label>
            <input id="signup-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required />
            <div className="password-label"><label htmlFor="signup-password">Create password</label><button type="button" className="text-action" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}</button></div>
            <input id="signup-password" name="password" type={showPassword ? "text" : "password"} autoComplete="new-password" placeholder="Choose a strong password" value={formData.password} onChange={handleChange} required minLength={6} />
            <small className="field-hint">Use at least 6 characters.</small>
            <button className="auth-submit" type="submit" disabled={loading}>{loading ? "Creating account…" : "Create account"} <span>↗</span></button>
          </form>
          <p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
          <div className="secure-note"><span>✳</span> By continuing, you agree to use the platform responsibly.</div>
        </div>
        <footer className="auth-legal"><span>© 2026 Northstar Finance UI</span><span>Built for thoughtful investing</span></footer>
      </section>
    </main>
  );
}
export default Signup;

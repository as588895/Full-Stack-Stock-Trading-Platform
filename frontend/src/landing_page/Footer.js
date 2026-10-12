import React from "react";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand-col">
          <Link to="/" className="brand-lockup">
            <span className="brand-mark">N</span>
            <span className="northstar-text">
              northstar<span className="brand-dot">.</span>
            </span>
          </Link>
          <p>
            A calmer, clearer workspace for your investing journey. Learn,
            explore and make decisions at your own pace.
          </p>
          <div className="footer-socials">
            <span>in</span>
            <span>𝕏</span>
            <span>◎</span>
          </div>
        </div>
        <div className="footer-col">
          <h4>Platform</h4>
          <Link to="/products">Products</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/signup">Create account</Link>
          <Link to="/login">Sign in</Link>
        </div>
        <div className="footer-col">
          <h4 style={{ color: "#38bdf8" }}>Northstar</h4>
          <Link to="/about">About us</Link>
          <Link to="/supports">Help centre</Link>
          <a href="mailto:support@northstar.example">Contact support</a>
        </div>
        <div className="footer-note">
          <span className="footer-spark">✳</span>
          <h4>Invest with intention.</h4>
          <p>Build a plan that fits your goals—not the noise of the market.</p>
          <Link to="/signup" className="footer-link-cta">
            Start your journey ↗
          </Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Northstar Finance UI. Educational project.</span>
        <span>
          Investments involve risk. This demo is not financial advice.
        </span>
      </div>
    </footer>
  );
}
export default Footer;

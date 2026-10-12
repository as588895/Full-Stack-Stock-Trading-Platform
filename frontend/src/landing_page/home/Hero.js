import React from "react";
import { Link } from "react-router-dom";
function Hero() {
  return (
    <section className="home-hero">
      <div className="hero-grid-bg" />
      <div className="hero-copy">
        <div className="eyebrow">
          <i /> A MORE THOUGHTFUL WAY TO INVEST
        </div>
        <h1>
          Your money deserves
          <br />a <em>clearer direction.</em>
        </h1>
        <p className="hero-description">
          One intuitive workspace to explore markets, track your portfolio and
          build confidence in every next step.
        </p>
        <div className="hero-actions">
          <Link to="/signup" className="primary-action">
            Create your account <span>↗</span>
          </Link>
          <Link to="/products" className="secondary-action">
            Explore the platform <span>→</span>
          </Link>
        </div>
        <div className="hero-trust">
          <div className="avatar-stack">
            <span>A</span>
            <span>M</span>
            <span>R</span>
          </div>
          <div>
            <b>Built for curious investors</b>
            <small>Simple tools. Clear information. Your pace.</small>
          </div>
        </div>
      </div>
      <div className="hero-visual">
        <div className="floating-label">
          <span className="status-dot" /> YOUR PORTFOLIO OVERVIEW
        </div>
        <div className="portfolio-card">
          <div className="portfolio-card-head">
            <div>
              <small>Total portfolio value</small>
              <h3>
                ₹12,84,560<span className="value-change">+8.42%</span>
              </h3>
            </div>
            <span className="card-menu">•••</span>
          </div>
          <div className="chart-legend">
            <span>
              <i /> Portfolio
            </span>
            <span>Last 6 months⌄</span>
          </div>
          <svg
            className="hero-chart"
            viewBox="0 0 520 190"
            preserveAspectRatio="none"
            role="img"
            aria-label="Illustrative rising portfolio chart"
          >
            <defs>
              <linearGradient id="portfolioArea" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#bff47a" stopOpacity=".34" />
                <stop offset="100%" stopColor="#bff47a" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[35, 75, 115, 155].map((y) => (
              <line
                key={y}
                x1="0"
                x2="520"
                y1={y}
                y2={y}
                stroke="#e9eee8"
                strokeDasharray="4 6"
              />
            ))}
            <path
              d="M0 158 C25 150 30 128 57 137 S90 115 112 125 S143 84 169 101 S200 115 224 80 S255 94 281 66 S315 78 342 53 S378 69 401 39 S442 55 462 27 S496 38 520 12 L520 190 L0 190Z"
              fill="url(#portfolioArea)"
            />
            <path
              d="M0 158 C25 150 30 128 57 137 S90 115 112 125 S143 84 169 101 S200 115 224 80 S255 94 281 66 S315 78 342 53 S378 69 401 39 S442 55 462 27 S496 38 520 12"
              fill="none"
              stroke="#6b9c43"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>
          <div className="chart-months">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
          </div>
          <div className="portfolio-stats">
            <div>
              <small>Invested</small>
              <b>₹11,84,800</b>
            </div>
            <div>
              <small>Overall returns</small>
              <b className="positive">+₹99,760</b>
            </div>
            <div className="mini-bars">
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
        <div className="market-chip chip-one">
          <span className="chip-icon">↗</span>
          <div>
            <small>Market momentum</small>
            <b>Positive today</b>
          </div>
        </div>
        <div className="market-chip chip-two">
          <span className="chip-icon coin-icon">₹</span>
          <div>
            <small>Keep your goals</small>
            <b>Always in focus</b>
          </div>
        </div>
        <p className="demo-caption">
          Illustrative interface · Not live market data
        </p>
      </div>
    </section>
  );
}
export default Hero;

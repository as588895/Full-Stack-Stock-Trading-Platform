import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const links = [
    ["Products", "/products"],
    ["Pricing", "/pricing"],
    ["About", "/about"],
    ["Support", "/supports"],
  ];
  return (
    <header className="site-header">
      <nav className="site-nav">
        <Link to="/" className="brand-lockup" onClick={() => setOpen(false)}>
          <span className="brand-mark">N</span>
          <span className="northstar-text">
            northstar<span className="brand-dot">.</span>
          </span>
        </Link>
        <button
          className="mobile-menu-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <i className={open ? "bi bi-x-lg" : "bi bi-list"} />
        </button>
        <div className={`nav-links ${open ? "nav-open" : ""}`}>
          {links.map(([label, path]) => (
            <Link
              key={path}
              to={path}
              className={
                location.pathname === path ? "nav-link active" : "nav-link"
              }
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/login"
            className="nav-login"
            onClick={() => setOpen(false)}
          >
            Log in
          </Link>
          <Link to="/signup" className="nav-cta" onClick={() => setOpen(false)}>
            Get started <span>↗</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
export default Navbar;

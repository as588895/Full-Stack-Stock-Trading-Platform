import React from "react";
import { Link } from "react-router-dom";

const features = [
  { number: "01", icon: "bi-binoculars", title: "Northstar Markets", tag: "DISCOVER", description: "Keep the market in view with a focused workspace for exploring instruments and following the names that matter to you." },
  { number: "02", icon: "bi-pie-chart", title: "Portfolio Console", tag: "UNDERSTAND", description: "Review holdings, positions and account activity in one organized place, with a clearer view of your investing journey." },
  { number: "03", icon: "bi-activity", title: "Orders & Activity", tag: "TAKE ACTION", description: "Keep track of your order flow and recent activity through a streamlined interface designed to reduce clutter." },
  { number: "04", icon: "bi-journal-bookmark", title: "Learning Desk", tag: "BUILD KNOWLEDGE", description: "Explore core market concepts and build confidence through curiosity, research and thoughtful practice." },
];

function ProductPage() {
  return <main className="northstar-page">
    <section className="inner-hero product-hero">
      <span className="section-kicker">THE NORTHSTAR TOOLKIT</span>
      <h1>Everything in view.<br/><em>Nothing in the way.</em></h1>
      <p>A considered set of tools for exploring markets, following your portfolio and understanding your activity—without the unnecessary noise.</p>
      <div className="inner-hero-metrics"><div><b>01</b><span>Explore markets</span></div><div><b>02</b><span>Follow your portfolio</span></div><div><b>03</b><span>Learn at your pace</span></div></div>
    </section>
    <section className="product-grid-section">
      <div className="product-section-heading"><div><span className="section-kicker">BUILT AROUND YOUR WORKFLOW</span><h2>One workspace.<br/><em>More perspective.</em></h2></div><p>Northstar is a student-built trading platform concept. The product descriptions below explain the intended experience; availability depends on the connected demo application.</p></div>
      <div className="northstar-product-grid">{features.map((item) => <article className="northstar-product-card" key={item.number}><div className="product-card-top"><span className="product-icon"><i className={`bi ${item.icon}`}/></span><span className="product-index">{item.number} / 04</span></div><span className="product-tag">{item.tag}</span><h3>{item.title}</h3><p>{item.description}</p><Link to="/signup" className="product-card-link">Explore Northstar <span>↗</span></Link></article>)}</div>
    </section>
    <section className="product-bottom-cta"><div><span className="section-kicker">READY WHEN YOU ARE</span><h2>Start with curiosity.<br/><em>Grow with clarity.</em></h2></div><Link to="/signup" className="primary-action">Create your account <span>↗</span></Link></section>
  </main>;
}
export default ProductPage;

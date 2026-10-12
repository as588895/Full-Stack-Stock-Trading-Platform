import React from "react";
import { Link } from "react-router-dom";
function Brokerage(){
 return <section className="pricing-details-section">
   <div className="pricing-detail-intro"><span className="section-kicker">CLEAR EXPECTATIONS</span><h2>A demo platform,<br/><em>without the fine print.</em></h2><p>Northstar is an educational project—not a registered brokerage. It does not provide real brokerage services or represent real exchange fees.</p></div>
   <div className="pricing-detail-cards">
     <article><span className="pricing-detail-icon"><i className="bi bi-compass"/></span><h3>Explore the interface</h3><p>Try the available demo experience and get familiar with the platform's layout and tools.</p><span className="pricing-detail-foot">Demo experience</span></article>
     <article><span className="pricing-detail-icon"><i className="bi bi-shield-check"/></span><h3>Understand the limits</h3><p>Displayed balances, charts or market illustrations may be sample data and should not be treated as live financial information.</p><span className="pricing-detail-foot">Educational use only</span></article>
     <article><span className="pricing-detail-icon"><i className="bi bi-chat-square-text"/></span><h3>Need a hand?</h3><p>Visit the support page for general guidance on account access and using the demo workspace.</p><Link to="/supports" className="inline-link">Visit support <span>↗</span></Link></article>
   </div>
 </section>
}
export default Brokerage;

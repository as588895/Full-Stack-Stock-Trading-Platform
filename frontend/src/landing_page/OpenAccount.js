import React from "react";import {Link} from "react-router-dom";
function OpenAccount(){return <section className="closing-cta"><div className="cta-orb"/><span className="section-kicker">YOUR NEXT CHAPTER STARTS HERE</span><h2>Make your next move<br/><em>with intention.</em></h2><p>Start exploring a more considered way to follow your investing journey.</p><Link to="/signup" className="primary-action">Get started for free <span>↗</span></Link><small>No pressure. Just a better place to begin.</small></section>}
export default OpenAccount;

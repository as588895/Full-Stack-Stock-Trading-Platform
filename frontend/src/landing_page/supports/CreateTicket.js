import React from "react";
import { Link } from "react-router-dom";
const topics = [
 {icon:"bi-person-lock",title:"Account & access",desc:"Help with signing in, creating an account and common access questions.",items:["Login and signup","Password and account details","Session and access issues"]},
 {icon:"bi-graph-up-arrow",title:"Markets workspace",desc:"Learn where to find key areas and understand the demo interface.",items:["Watchlist basics","Market overview","Charts and instrument details"]},
 {icon:"bi-wallet2",title:"Orders & portfolio",desc:"Understand the terminology used across your trading workspace.",items:["Orders and order status","Holdings and positions","Funds and account summary"]},
];
function CreateTicket(){return <section className="support-topic-section"><div className="support-topic-heading"><span className="section-kicker">HELP CENTRE</span><h2>Find your next step.</h2><p>Choose a topic to see what part of the demo experience it covers.</p></div><div className="support-topic-grid">{topics.map((topic)=><article className="support-topic-card" key={topic.title}><span className="support-topic-icon"><i className={`bi ${topic.icon}`}/></span><h3>{topic.title}</h3><p>{topic.desc}</p><ul>{topic.items.map((item)=><li key={item}><i className="bi bi-arrow-up-right"/>{item}</li>)}</ul><Link to="/signup" className="support-topic-link">Open Northstar <span>↗</span></Link></article>)}</div><div className="support-contact-strip"><div><b>Still looking for an answer?</b><p>This is a demo project. For account-specific issues, use the contact details provided by your project maintainer.</p></div><a href="mailto:support@northstar.example">Contact support ↗</a></div></section>}
export default CreateTicket;

import React from "react";

function Hero() {
  return (
    <div className="container">
      <div className="row p-5 mt-5 mb-5">
        <h1 className="fs-2 text-center">
          We pioneered the discount broking model in India.
          <br />
          Now, we are breaking ground with out technology.
        </h1>
      </div>

      <div className="row p-5 mt-5 border-top text-muted fs-6" style={{ lineHeight: '1.8', fontSize: '1.2em'}}>
        <div className="col-6 p-5">
          <p>
            We kick-started operations on the 15th of August, 2010 with the goal
            of oreaking all barriers that traders and investors face in India in
            terms of cost, support, and tecnology. We named the company Zeradha,
            a combination of Zero and "Rodhe", the Sanskrit word for barrier.
          </p>
          <p>
            Today, our disruptive pricing models and in-house technology have
            made us the biggest stock broker in india.
          </p>
          <p>
            {" "}
            Over 1+ Crare clients place millions of orders every day through our
            powerful ecosystem of inwestownt platforms, contributing over 15% of
            all Indian retail trading volumes.
          </p>
        </div>
        <div className="col-6 p-5">
          <p>
            In addition, na number of popular open online educational and
            community initiatives to empower retail and investors.
          </p>
            <p>
            <a href="" style={{ textDecoration: 'none' }}>Rainmatter</a>, our fintech fund and incubator, has invested in several fintech
            startups with the goal of growing the Indian capital markets</p>
            <p>And yet, we are always up to something new every day. Catch up on the latest updates on
            our blog or the media is saying about us
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;

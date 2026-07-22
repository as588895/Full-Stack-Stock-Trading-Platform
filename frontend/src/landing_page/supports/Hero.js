import React from "react";

function Hero() {
    return (
        <section
            className="container-fluid"
            id="supportHero"
            style={{
                backgroundColor: "#387ed1",
                color: "white",
                minHeight: "320px",
            }}
        >
            <div className="p-2 d-flex justify-content-between" id="supportWrapper">
                <h4 className="fw-normal">Support Portal</h4>
                <a href="" className="me-5"> 
                    Track Tickets
                </a>
            </div>

            <div className="row p-2 m-3">
                <div className="col-6 p-4 ">
                    <h1 className="fs-3">
                        Search for an answer or browse help topics to create a ticket
                    </h1>
                    <input placeholder="Eg. how do I activate F&O" />
                    <br />
                    <a href="">Track Account Opening</a>
                    <a href="" style={{ marginLeft: "20px" }}>
                        Track Segment Activation
                    </a>
                    <a href="" style={{ marginLeft: "20px" }}>
                        Intraday Margins
                    </a>
                    <a href="" style={{ marginLeft: "20px" }}>
                        Track User Manual
                    </a>
                </div>

                <div className="col-6 p-4 featuredSection">
                    <h1 className="fs-3">Featured</h1>
                    <ol>
                        <li className="p-1">
                            <a href="">Current Takeover and Delisting - January 2024</a>
                        </li>
                        <li className="p-2">
                            <a href="">Latest Intraday Leverages - MIS & CO</a>
                        </li>
                    </ol>
                </div>
            </div>
        </section>
    );
}

export default Hero;

import React, { useEffect } from "react";
import { toast } from "react-toastify";

import Hero from "./Hero";
import Awards from "./Awards";
import Stats from "./Stats";
import Pricing from "./Pricing";
import Education from "./Education";

import OpenAccount from "../OpenAccount";

function HomePage() {

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("logout") === "true") {
      toast.success("✅ Logout successful!");
      window.history.replaceState({}, "", "/");
    }

    if (params.get("signup") === "true") {
      toast.success("✅ Account created successfully!");
      window.history.replaceState({}, "", "/");
    }

  }, []);

  return (
    <>
      <Hero />
      <Awards />
      <Stats />
      <Pricing />
      <Education />
      <OpenAccount />
    </>
  );
}

export default HomePage;
import React, { useEffect, useState } from "react";
import axios from "axios";

import Dashboard from "./Dashboard";
import TopBar from "./TopBar";

const Home = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Localhost vs Render
  const isLocalhost = window.location.hostname === "localhost";

  const backendURL = isLocalhost
    ? "http://localhost:3002"
    : "https://full-stack-stock-trading-platform-c4js.onrender.com";

  const loginURL = isLocalhost
    ? "http://localhost:3000/login"
    : "https://full-stack-stock-trading-platform-1-18oq.onrender.com/login";

  useEffect(() => {
    axios
      .get(`${backendURL}/api/auth/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Authentication error:", err);
        window.location.replace(loginURL);
      });
  }, [backendURL, loginURL]);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <>
      <TopBar user={user} />
      <Dashboard />
    </>
  );
};

export default Home;
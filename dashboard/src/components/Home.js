import React, { useEffect, useState } from "react";
import axios from "axios";

import Dashboard from "./Dashboard";
import TopBar from "./TopBar";

const Home = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      // .get("http://localhost:3002/api/auth/me", {
      //   withCredentials: true,
      .get("https://your-backend.onrender.com/api/auth/me", {
      withCredentials: true,

      })
      .then((res) => {
        setUser(res.data.user);
        setLoading(false);
      })
      .catch(() => {
        // window.location.replace("http://localhost:3001/login");
        window.location.replace("https://your-frontend.onrender.com/login");
      });
  }, []);

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
import axios from "axios";

const isLocalhost = window.location.hostname === "localhost";

const API = axios.create({
  baseURL: isLocalhost
    ? "http://localhost:3002/api/auth"
    : "https://full-stack-stock-trading-platform-c4js.onrender.com/api/auth",

  withCredentials: true,
});

export default API;
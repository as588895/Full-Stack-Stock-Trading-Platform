import axios from "axios";

const API = axios.create({
    baseURL: "https://full-stack-stock-trading-platform-c4js.onrender.com/api/auth",
    withCredentials: true,
});

export default API;
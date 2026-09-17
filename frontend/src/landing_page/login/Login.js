import { useState } from "react";
import axios from "axios";
import "./Login.css";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const isLocalhost = window.location.hostname === "localhost";

      const backendURL = isLocalhost
        ? "http://localhost:3002"
        : "https://full-stack-stock-trading-platform-c4js.onrender.com";

      const res = await axios.post(
        `${backendURL}/api/auth/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      // Save user information
      if (res.data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );
      }

      // Save token
      if (res.data.token) {
        localStorage.setItem(
          "token",
          res.data.token
        );
      }

      toast.success("✅ Login successful!");

      const dashboardURL = isLocalhost
        ? "http://localhost:3001"
        : "https://full-stack-stock-trading-platform-1-18oq.onrender.com";

      setTimeout(() => {
        window.location.href = dashboardURL;
      }, 1000);

    } catch (err) {
      console.log("Login Error:", err);

      toast.error(
        err.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  return (
    <div className="login-container">
      <form
        className="login-form"
        onSubmit={submitHandler}
      >
        <h1>Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
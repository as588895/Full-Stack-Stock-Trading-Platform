import { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3002/api/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );

      alert(res.data.message);

      // JWT Token Save
      localStorage.setItem("token", res.data.token);

      // User Save
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/");
      
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={submitHandler}>
        <h1>Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button>Login</button>
      </form>
    </div>
  );
}

export default Login;

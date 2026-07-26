import { useState } from "react";
import axios from "axios";
import "./Login.css";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  // const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        // "http://localhost:3002/api/auth/login",
        "https://full-stack-stock-trading-platform-c4js.onrender.com/api/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );

      // alert(res.data.message);
      // alert(res.data.message);

toast.success("✅ Login successful!");

setTimeout(() => {
  window.location.href = "https://YOUR-DASHBOARD.onrender.com";
}, 1200);

//       // JWT Token Save
//       localStorage.setItem("token", res.data.token);

//       // User Save
//       localStorage.setItem("user", JSON.stringify(res.data.user));

//       // Dashboard open karo
// navigate("/dashboard");
// const res = await axios.post(
//     "http://localhost:3002/api/auth/login",
//     {
//         email,
//         password,
//     },
//     {
//         withCredentials: true,
//     }
// );

// window.location.href = "http://localhost:3001";
window.location.href = "https://full-stack-stock-trading-platform-1-18oq.onrender.com";
      
    } catch (err) {
      // alert(err.response?.data?.message || "Login Failed");
      toast.error(err.response?.data?.message || "Login Failed");
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
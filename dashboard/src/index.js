import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";
// import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
         <Route path="/*" element={<Home />} />
        {/* <Route path="/*" element={<ProtectedRoute>
              <Home />
            </ProtectedRoute>} /> */}
      </Routes>
      <ToastContainer
  position="top-right"
  autoClose={2500}
/>
    </BrowserRouter>
  </React.StrictMode>
);

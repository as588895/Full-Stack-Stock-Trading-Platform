import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Menu = ({ user }) => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = (index) => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="logo.png" alt="Logo" style={{ width: "50px" }} />
      <div className="menus">
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/orders"
              onClick={() => handleMenuClick(1)}
            >
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/positions"
              onClick={() => handleMenuClick(3)}
            >
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="funds"
              onClick={() => handleMenuClick(4)}
            >
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/apps"
              onClick={() => handleMenuClick(6)}
            >
              <p className={selectedMenu === 6 ? activeMenuClass : menuClass}>
                Apps
              </p>
            </Link>
          </li>
        </ul>
        <hr />
        <div className="profile" onClick={handleProfileClick}>
  <div className="avatar">
    {user ? user.username.charAt(0).toUpperCase() : "ZU"}
  </div>

  <p className="username">
    {user ? user.username : "USERID"}
  </p>

  {isProfileDropdownOpen && (
    <div
      style={{
        position: "absolute",
        top: "60px",
        right: "20px",
        background: "#fff",
        border: "1px solid #ddd",
        borderRadius: "6px",
        padding: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
        zIndex: 1000,
      }}
    >
      <p style={{ margin: "0 0 8px 0" }}>
        <strong>ID:</strong> {user ? user._id : ""}
      </p>

     <button
  onClick={async () => {
    try {
      // await axios.post(
      //   "http://localhost:3002/api/auth/logout",
      await axios.post(
  "https://your-backend.onrender.com/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      // window.location.href = "http://localhost:3000";
      window.location.href = "https://your-frontend.onrender.com";
    } catch (err) {
      console.log(err);
    }
  }}
>
  Logout
</button>
    </div>
  )}
</div>
      </div>
    </div>
  );
};

export default Menu;

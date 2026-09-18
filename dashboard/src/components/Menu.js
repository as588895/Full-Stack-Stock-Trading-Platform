import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Menu.css";

const Menu = ({ user }) => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  // Logout function
  const handleLogout = async () => {
    const isLocalhost = window.location.hostname === "localhost";

    const backendURL = isLocalhost
      ? "http://localhost:3002"
      : "https://full-stack-stock-trading-platform-c4js.onrender.com";

    const frontendURL = isLocalhost
      ? "http://localhost:3000"
      : "https://full-stack-stock-trading-platform-2-rouf.onrender.com";

    try {
      await axios.post(
        `${backendURL}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      localStorage.removeItem("user");
      localStorage.removeItem("token");

      window.location.href = `${frontendURL}/?logout=true`;
    } catch (err) {
      console.log(err);

      localStorage.removeItem("user");
      localStorage.removeItem("token");

      window.location.href = `${frontendURL}/?logout=true`;
    }
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">

      {/* LOGO */}
      <div className="menu-logo">
        <img src="logo.png" alt="Logo" />
      </div>

      {/* MENUS */}
      <div className="menus">

        <ul>

          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              <p
                className={
                  selectedMenu === 0
                    ? activeMenuClass
                    : menuClass
                }
              >
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
              <p
                className={
                  selectedMenu === 1
                    ? activeMenuClass
                    : menuClass
                }
              >
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
              <p
                className={
                  selectedMenu === 2
                    ? activeMenuClass
                    : menuClass
                }
              >
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
              <p
                className={
                  selectedMenu === 3
                    ? activeMenuClass
                    : menuClass
                }
              >
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
              <p
                className={
                  selectedMenu === 4
                    ? activeMenuClass
                    : menuClass
                }
              >
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
              <p
                className={
                  selectedMenu === 6
                    ? activeMenuClass
                    : menuClass
                }
              >
                Apps
              </p>
            </Link>
          </li>

        </ul>

        <hr />

        {/* PROFILE */}
        <div
          className="profile"
          onClick={handleProfileClick}
        >

          <div className="avatar">
            {user
              ? user.username.charAt(0).toUpperCase()
              : "U"}
          </div>

          <p className="username">
            {user ? user.username : "USERID"}
          </p>

          {isProfileDropdownOpen && (
            <div className="profile-dropdown">

              <p className="profile-id">
                <strong>ID:</strong>{" "}
                {user ? user._id : ""}
              </p>

              <button
                className="logout-btn"
                onClick={handleLogout}
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
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const { closeBuyWindow } = useContext(GeneralContext);

  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);

  const [showSuccess, setShowSuccess] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleBuyClick = async (e) => {
    e.preventDefault();

    const isLocalhost = window.location.hostname === "localhost";

    const backendURL = isLocalhost
      ? "http://localhost:3002"
      : "https://full-stack-stock-trading-platform-c4js.onrender.com";

    try {
      const response = await axios.post(
        `${backendURL}/newOrder`,
        {
          name: uid,
          qty: Number(stockQuantity),
          price: Number(stockPrice),
          mode: "BUY",
        },
        {
          withCredentials: true,
        }
      );

      console.log("Buy Order Response:", response.data);

      setWalletBalance(response.data.walletBalance);
      setShowSuccess(true);
    } catch (err) {
      console.error("Buy Order Error:", err);

      setErrorMessage(
        err.response?.data?.message ||
          "Unable to place buy order"
      );

      setShowError(true);
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    closeBuyWindow();
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    closeBuyWindow();
  };

  const handleErrorClose = () => {
    setShowError(false);
  };

  return (
    <div className="container" id="buy-window" draggable="true">

      {/* BUY WINDOW */}

      <div className="regular-order">
        <div className="inputs">

          <fieldset>
            <legend>Qty.</legend>

            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
              onChange={(e) =>
                setStockQuantity(e.target.value)
              }
              value={stockQuantity}
            />
          </fieldset>

          <fieldset>
            <legend>Price</legend>

            <input
              type="number"
              name="price"
              id="price"
              min="0"
              step="0.05"
              onChange={(e) =>
                setStockPrice(e.target.value)
              }
              value={stockPrice}
            />
          </fieldset>

        </div>
      </div>

      <div className="buttons">

        <span>
          Amount required ₹
          {(Number(stockQuantity) * Number(stockPrice)).toFixed(2)}
        </span>

        <div>

          <Link
            to=""
            className="btn btn-blue"
            onClick={handleBuyClick}
          >
            Buy
          </Link>

          <Link
            to=""
            className="btn btn-grey"
            onClick={handleCancelClick}
          >
            Cancel
          </Link>

        </div>

      </div>

      {/* SUCCESS POPUP */}

      {showSuccess && (
        <div className="buy-popup-overlay">

          <div className="buy-popup">

            <button
              className="buy-popup-close"
              onClick={handleSuccessClose}
            >
              ×
            </button>

            <div className="success-icon">
              ✓
            </div>

            <h2>Order Successful!</h2>

            <p className="popup-main-text">
              BUY order successful!
            </p>

            <p className="popup-balance">
              Remaining Balance:
              <strong>
                ₹{Number(walletBalance).toFixed(2)}
              </strong>
            </p>

            <button
              className="popup-ok-btn"
              onClick={handleSuccessClose}
            >
              OK
            </button>

          </div>

        </div>
      )}

      {/* ERROR POPUP */}

      {showError && (
        <div className="buy-popup-overlay">

          <div className="buy-popup">

            <button
              className="buy-popup-close"
              onClick={handleErrorClose}
            >
              ×
            </button>

            <div className="error-icon">
              !
            </div>

            <h2>Order Failed</h2>

            <p className="popup-main-text">
              {errorMessage}
            </p>

            <button
              className="popup-ok-btn"
              onClick={handleErrorClose}
            >
              OK
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default BuyActionWindow;
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const SellActionWindow = ({ uid }) => {
  const { closeSellWindow } = useContext(GeneralContext);

  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState("");

  const [showSuccess, setShowSuccess] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSellClick = async (e) => {
    e.preventDefault();

    const isLocalhost = window.location.hostname === "localhost";

    const backendURL = isLocalhost
      ? "http://localhost:3002"
      : "https://full-stack-stock-trading-platform-c4js.onrender.com";

    const orderData = {
      name: uid,
      qty: Number(stockQuantity),
      price: Number(stockPrice),
      mode: "SELL",    //sell
    };

    console.log("SELL ORDER DATA:", orderData);   //order section

    try {
      const response = await axios.post(
        `${backendURL}/newOrder`,
        orderData,
        {
          withCredentials: true,
        }
      );

      console.log("SELL ORDER RESPONSE:", response.data);

      setWalletBalance(response.data.walletBalance);
      setShowSuccess(true);
    } catch (err) {
      console.error("SELL ORDER ERROR:", err);
      console.error("SERVER RESPONSE:", err.response?.data);

      setErrorMessage(
        err.response?.data?.message ||
          "Unable to place sell order"
      );

      setShowError(true);
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    closeSellWindow();
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    closeSellWindow();
  };

  const handleErrorClose = () => {
    setShowError(false);
  };

  return (
    <div
      className="container"
      id="buy-window"
      draggable="true"
    >

      {/* SELL WINDOW */}

      <div className="regular-order">
        <div className="inputs">

          <fieldset>
            <legend>Qty.</legend>

            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
              value={stockQuantity}
              onChange={(e) =>
                setStockQuantity(e.target.value)
              }
            />
          </fieldset>

          <fieldset>
            <legend>Price</legend>

            <input
              type="number"
              name="price"
              id="price"
              min="0.01"
              step="0.05"
              value={stockPrice}
              onChange={(e) =>
                setStockPrice(e.target.value)
              }
            />
          </fieldset>

        </div>
      </div>

      <div className="buttons">

        <span>
          Amount received ₹
          {(
            Number(stockQuantity || 0) *
            Number(stockPrice || 0)
          ).toFixed(2)}
        </span>

        <div>

          <Link
            to=""
            className="btn btn-sell"
            onClick={handleSellClick}
          >
            Sell
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
              SELL order successful!
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

export default SellActionWindow;
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const SellActionWindow = ({ uid }) => {
  const { closeSellWindow } = useContext(GeneralContext);

  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState("");

  const handleSellClick = async () => {
    const isLocalhost = window.location.hostname === "localhost";

    const backendURL = isLocalhost
      ? "http://localhost:3002"
      : "https://full-stack-stock-trading-platform-c4js.onrender.com";

    const orderData = {
      name: uid,
      qty: Number(stockQuantity),
      price: Number(stockPrice),
      mode: "SELL",
    };

    // Check exactly what frontend is sending
    console.log("SELL ORDER DATA:", orderData);

    try {
      const response = await axios.post(
        `${backendURL}/newOrder`,
        orderData,
        {
          withCredentials: true,
        }
      );

      console.log("SELL ORDER RESPONSE:", response.data);

      alert(
        `SELL order successful!\nRemaining Balance: ₹${response.data.walletBalance}`
      );

      closeSellWindow();
    } catch (err) {
      console.error("SELL ORDER ERROR:", err);
      console.error("SERVER RESPONSE:", err.response?.data);

      alert(
        err.response?.data?.message ||
          "Unable to place sell order"
      );
    }
  };

  const handleCancelClick = () => {
    closeSellWindow();
  };

  return (
    <div
      className="container"
      id="buy-window"
      draggable="true"
    >
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
            className="btn btn-blue"
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
    </div>
  );
};

export default SellActionWindow;
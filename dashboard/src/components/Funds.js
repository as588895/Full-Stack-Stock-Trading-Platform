import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Funds.css";

const Funds = () => {
  const [balance, setBalance] = useState(0);

  const [amount, setAmount] = useState("");

  const [modalType, setModalType] = useState(null);

  const [loading, setLoading] = useState(true);

  const [processing, setProcessing] = useState(false);

  const [message, setMessage] = useState("");

  const [messageType, setMessageType] = useState("");

  const [commodityOpen, setCommodityOpen] = useState(false);

  const isLocalhost = window.location.hostname === "localhost";

  const backendURL = isLocalhost
    ? "http://localhost:3002"
    : "https://full-stack-stock-trading-platform-c4js.onrender.com";


  // =====================================================
  // FETCH WALLET
  // =====================================================

  const fetchWallet = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${backendURL}/wallet`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setBalance(Number(res.data.balance) || 0);
      }
    } catch (err) {
      console.error("Wallet Error:", err);

      setMessage("Unable to fetch wallet balance");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchWallet();
  }, []);


  // =====================================================
  // ADD / WITHDRAW
  // =====================================================

  const handleTransaction = async () => {
    const value = Number(amount);

    if (!value || value <= 0) {
      setMessage("Please enter a valid amount");
      setMessageType("error");
      return;
    }

    if (modalType === "withdraw" && value > balance) {
      setMessage("Insufficient wallet balance");
      setMessageType("error");
      return;
    }

    try {
      setProcessing(true);

      const endpoint =
        modalType === "add"
          ? "/wallet/add"
          : "/wallet/withdraw";

      const res = await axios.post(
        `${backendURL}${endpoint}`,
        {
          amount: value,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setBalance(Number(res.data.balance));

        setMessage(
          modalType === "add"
            ? `₹${value.toLocaleString("en-IN")} added successfully`
            : `₹${value.toLocaleString("en-IN")} withdrawn successfully`
        );

        setMessageType("success");

        setAmount("");

        setModalType(null);
      }
    } catch (err) {
      console.error("Transaction Error:", err);

      setMessage(
        err.response?.data?.message ||
          "Transaction failed"
      );

      setMessageType("error");
    } finally {
      setProcessing(false);
    }
  };


  // =====================================================
  // OPEN COMMODITY ACCOUNT
  // =====================================================

  const handleCommodityAccount = () => {
    setCommodityOpen(true);
  };


  const closeModal = () => {
    if (!processing) {
      setModalType(null);
      setAmount("");
    }
  };


  const formatMoney = (value) => {
    return Number(value || 0).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );
  };


  // Used margin placeholder based on current balance
  const usedMargin = Math.max(
    0,
    100000 - balance
  );


  return (
    <div className="funds-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="funds-header">

        <div>
          <h3>Funds</h3>

          <p>
            Manage your trading balance and account funds
          </p>
        </div>

        <div className="wallet-badge">

          <span className="wallet-dot"></span>

          Wallet Active

        </div>

      </div>


      {/* =================================================
          ACTION BAR
      ================================================= */}

      <div className="funds-action">

        <div className="action-info">

          <div className="upi-icon">
            ₹
          </div>

          <div>
            <strong>
              Instant Fund Transfer
            </strong>

            <p>
              Add or withdraw funds securely
            </p>
          </div>

        </div>


        <div className="action-buttons">

          <button
            className="fund-btn add"
            onClick={() => {
              setModalType("add");
              setMessage("");
            }}
          >
            + Add Funds
          </button>


          <button
            className="fund-btn withdraw"
            onClick={() => {
              setModalType("withdraw");
              setMessage("");
            }}
          >
            Withdraw
          </button>

        </div>

      </div>


      {/* =================================================
          MESSAGE
      ================================================= */}

      {message && (
        <div
          className={`fund-message ${messageType}`}
        >
          {message}
        </div>
      )}


      {/* =================================================
          MAIN GRID
      ================================================= */}

      <div className="funds-grid">


        {/* =================================================
            EQUITY
        ================================================= */}

        <div className="fund-card">

          <div className="card-heading">

            <div>

              <span className="card-label">
                EQUITY
              </span>

              <h4>
                Trading Account
              </h4>

            </div>


            <div className="balance-display">

              <span>
                Available Balance
              </span>

              <strong>
                {loading
                  ? "Loading..."
                  : `₹${formatMoney(balance)}`
                }
              </strong>

            </div>

          </div>


          <div className="fund-table">


            <div className="fund-row highlight">

              <span>
                Available margin
              </span>

              <strong>
                ₹{formatMoney(balance)}
              </strong>

            </div>


            <div className="fund-row">

              <span>
                Used margin
              </span>

              <strong>
                ₹{formatMoney(usedMargin)}
              </strong>

            </div>


            <div className="fund-row">

              <span>
                Available cash
              </span>

              <strong>
                ₹{formatMoney(balance)}
              </strong>

            </div>


            <div className="fund-divider"></div>


            <div className="fund-row">

              <span>
                Opening Balance
              </span>

              <strong>
                ₹100,000.00
              </strong>

            </div>


            <div className="fund-row">

              <span>
                Current Balance
              </span>

              <strong>
                ₹{formatMoney(balance)}
              </strong>

            </div>


            <div className="fund-row">

              <span>
                Payin
              </span>

              <strong className="green-text">
                ₹0.00
              </strong>

            </div>


            <div className="fund-row">

              <span>
                SPAN
              </span>

              <strong>
                ₹0.00
              </strong>

            </div>


            <div className="fund-row">

              <span>
                Delivery margin
              </span>

              <strong>
                ₹0.00
              </strong>

            </div>


            <div className="fund-row">

              <span>
                Exposure
              </span>

              <strong>
                ₹0.00
              </strong>

            </div>


            <div className="fund-row">

              <span>
                Options premium
              </span>

              <strong>
                ₹0.00
              </strong>

            </div>


            <div className="fund-divider"></div>


            <div className="fund-row">

              <span>
                Collateral (Liquid funds)
              </span>

              <strong>
                ₹0.00
              </strong>

            </div>


            <div className="fund-row">

              <span>
                Collateral (Equity)
              </span>

              <strong>
                ₹0.00
              </strong>

            </div>


            <div className="fund-row total">

              <span>
                Total Collateral
              </span>

              <strong>
                ₹0.00
              </strong>

            </div>

          </div>

        </div>


        {/* =================================================
            COMMODITY
        ================================================= */}

        <div className="commodity-card">

          <div className="commodity-icon">
            ◈
          </div>

          <span className="commodity-label">
            COMMODITY
          </span>

          <h3>
            Commodity Trading
          </h3>

          <p>
            Trade commodities by opening a
            separate commodity account.
          </p>


          {!commodityOpen ? (

            <button
              className="open-account-btn"
              onClick={handleCommodityAccount}
            >
              Open Account
              <span>→</span>
            </button>

          ) : (

            <div className="commodity-success">

              <span>✓</span>

              <div>
                <strong>
                  Account Request Started
                </strong>

                <p>
                  Your commodity account setup
                  is ready to continue.
                </p>
              </div>

            </div>

          )}

        </div>

      </div>


      {/* =================================================
          TRANSACTION MODAL
      ================================================= */}

      {modalType && (

        <div
          className="fund-modal-overlay"
          onClick={closeModal}
        >

          <div
            className="fund-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="modal-close"
              onClick={closeModal}
            >
              ×
            </button>


            <div className="modal-icon">

              {modalType === "add"
                ? "+"
                : "−"
              }

            </div>


            <h3>

              {modalType === "add"
                ? "Add Funds"
                : "Withdraw Funds"
              }

            </h3>


            <p className="modal-description">

              {modalType === "add"
                ? "Add money to your trading wallet"
                : "Withdraw money from your trading wallet"
              }

            </p>


            <div className="current-balance">

              <span>
                Current Balance
              </span>

              <strong>
                ₹{formatMoney(balance)}
              </strong>

            </div>


            <label>
              Amount
            </label>


            <div className="amount-input">

              <span>₹</span>

              <input
                type="number"
                min="1"
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value)
                }
                placeholder="Enter amount"
                autoFocus
              />

            </div>


            <div className="quick-amounts">

              {[1000, 5000, 10000].map(
                (value) => (

                  <button
                    key={value}
                    onClick={() =>
                      setAmount(value)
                    }
                  >
                    ₹{value.toLocaleString(
                      "en-IN"
                    )}
                  </button>

                )
              )}

            </div>


            <button
              className={`modal-action ${
                modalType
              }`}
              onClick={handleTransaction}
              disabled={processing}
            >

              {processing
                ? "Processing..."
                : modalType === "add"
                ? "Add Funds"
                : "Withdraw"
              }

            </button>

          </div>

        </div>

      )}

    </div>
  );
};

export default Funds;
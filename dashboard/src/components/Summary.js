
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  BriefcaseBusiness,
  ShoppingCart,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
} from "lucide-react";

import "./Summary.css";

const Summary = () => {
  const [holdings, setHoldings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const [walletBalance, setWalletBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const isLocalhost = window.location.hostname === "localhost";

  const backendURL = isLocalhost
    ? "http://localhost:3002"
    : "https://full-stack-stock-trading-platform-c4js.onrender.com";

  const fetchDashboardData = async () => {
    try {
      setRefreshing(true);

      const [holdingsRes, ordersRes, userRes, walletRes] =
        await Promise.all([
          axios.get(`${backendURL}/allHoldings`, {
            withCredentials: true,
          }),

          axios.get(`${backendURL}/allOrders`, {
            withCredentials: true,
          }),

          axios.get(`${backendURL}/api/auth/me`, {
            withCredentials: true,
          }),

          axios.get(`${backendURL}/wallet`, {
            withCredentials: true,
          }),
        ]);

      setHoldings(holdingsRes.data || []);
      setOrders(ordersRes.data || []);
      setUser(userRes.data?.user || null);
      setWalletBalance(walletRes.data?.balance || 0);
    } catch (error) {
      console.error("Dashboard data error:", error);

      // Wallet endpoint agar abhi backend mein nahi hai,
      // baaki dashboard data phir bhi show hoga.
      try {
        const [holdingsRes, ordersRes, userRes] = await Promise.all([
          axios.get(`${backendURL}/allHoldings`, {
            withCredentials: true,
          }),
          axios.get(`${backendURL}/allOrders`, {
            withCredentials: true,
          }),
          axios.get(`${backendURL}/api/auth/me`, {
            withCredentials: true,
          }),
        ]);

        setHoldings(holdingsRes.data || []);
        setOrders(ordersRes.data || []);
        setUser(userRes.data?.user || null);
      } catch (fallbackError) {
        console.error("Dashboard fallback error:", fallbackError);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const portfolio = useMemo(() => {
    let invested = 0;
    let currentValue = 0;
    let dayPnL = 0;

    holdings.forEach((stock) => {
      const quantity = Number(stock.qty) || 0;
      const average = Number(stock.avg) || 0;
      const price = Number(stock.price) || 0;

      const investedValue = average * quantity;
      const currentStockValue = price * quantity;

      invested += investedValue;
      currentValue += currentStockValue;

      const dayPercent =
        parseFloat(String(stock.day || "0").replace("%", "")) || 0;

      dayPnL += currentStockValue * (dayPercent / 100);
    });

    const totalPnL = currentValue - invested;

    const totalPnLPercent =
      invested > 0 ? (totalPnL / invested) * 100 : 0;

    const dayPnLPercent =
      currentValue > 0 ? (dayPnL / currentValue) * 100 : 0;

    return {
      invested,
      currentValue,
      totalPnL,
      totalPnLPercent,
      dayPnL,
      dayPnLPercent,
    };
  }, [holdings]);

  const totalBuyValue = useMemo(() => {
    return orders
      .filter((order) => order.mode === "BUY")
      .reduce(
        (total, order) =>
          total + Number(order.price || 0) * Number(order.qty || 0),
        0
      );
  }, [orders]);

  const totalSellValue = useMemo(() => {
    return orders
      .filter((order) => order.mode === "SELL")
      .reduce(
        (total, order) =>
          total + Number(order.price || 0) * Number(order.qty || 0),
        0
      );
  }, [orders]);

  const formatCurrency = (value) => {
    return `₹${Number(value || 0).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    })}`;
  };

  const formatPercent = (value) => {
    const number = Number(value || 0);

    return `${number >= 0 ? "+" : ""}${number.toFixed(2)}%`;
  };

  const formatDate = (date) => {
    if (!date) return "";

    const parsedDate = new Date(date);

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    });
  };

  const getStockPnL = (stock) => {
    const quantity = Number(stock.qty) || 0;
    const avg = Number(stock.avg) || 0;
    const price = Number(stock.price) || 0;

    return (price - avg) * quantity;
  };

  const getInitial = () => {
    if (!user?.username) return "U";

    return user.username.charAt(0).toUpperCase();
  };

  if (loading) {
    return (
      <div className="summary-loading">
        <div className="loading-spinner"></div>
        <p>Loading your portfolio...</p>
      </div>
    );
  }

  return (
    <div className="summary-dashboard">

      {/* HEADER */}
      <div className="summary-header">

        <div>
          <div className="welcome-line">
            <span>Overview</span>

            <span className="live-status">
              <span className="live-dot"></span>
              LIVE
            </span>
          </div>

          <h1>
            Welcome back, {user?.username || "Trader"} 👋
          </h1>

          <p>
            Here's your portfolio performance and trading activity.
          </p>
        </div>

        <button
          className="refresh-btn"
          onClick={fetchDashboardData}
          disabled={refreshing}
        >
          <RefreshCw
            size={17}
            className={refreshing ? "spin" : ""}
          />
          Refresh
        </button>

      </div>

      {/* MAIN PORTFOLIO HERO */}
      <div className="portfolio-hero">

        <div className="portfolio-hero-left">

          <div className="hero-label">
            Total Portfolio Value
          </div>

          <div className="hero-value">
            {formatCurrency(portfolio.currentValue)}
          </div>

          <div
            className={
              portfolio.totalPnL >= 0
                ? "hero-pnl profit"
                : "hero-pnl loss"
            }
          >
            {portfolio.totalPnL >= 0 ? (
              <TrendingUp size={18} />
            ) : (
              <TrendingDown size={18} />
            )}

            <span>
              {formatCurrency(Math.abs(portfolio.totalPnL))}
            </span>

            <span>
              ({formatPercent(portfolio.totalPnLPercent)})
            </span>

            <small>Total return</small>
          </div>

        </div>

        <div className="hero-divider"></div>

        <div className="hero-stat">
          <span>Invested</span>
          <strong>{formatCurrency(portfolio.invested)}</strong>
        </div>

        <div className="hero-divider"></div>

        <div className="hero-stat">
          <span>Today's P&L</span>

          <strong
            className={
              portfolio.dayPnL >= 0 ? "profit" : "loss"
            }
          >
            {portfolio.dayPnL >= 0 ? "+" : "-"}
            {formatCurrency(Math.abs(portfolio.dayPnL))}
          </strong>

          <small
            className={
              portfolio.dayPnL >= 0 ? "profit" : "loss"
            }
          >
            {formatPercent(portfolio.dayPnLPercent)}
          </small>
        </div>

      </div>

      {/* STAT CARDS */}
      <div className="summary-cards">

        <div className="summary-card">

          <div className="summary-card-top">
            <div className="summary-icon blue">
              <Wallet size={20} />
            </div>

            <span className="card-label">
              Available Cash
            </span>
          </div>

          <h2>{formatCurrency(walletBalance)}</h2>

          <p>
            Current wallet balance
          </p>

        </div>

        <div className="summary-card">

          <div className="summary-card-top">
            <div className="summary-icon purple">
              <BriefcaseBusiness size={20} />
            </div>

            <span className="card-label">
              Holdings
            </span>
          </div>

          <h2>{holdings.length}</h2>

          <p>
            Stocks in portfolio
          </p>

        </div>

        <div className="summary-card">

          <div className="summary-card-top">
            <div className="summary-icon orange">
              <ShoppingCart size={20} />
            </div>

            <span className="card-label">
              Orders
            </span>
          </div>

          <h2>{orders.length}</h2>

          <p>
            Total executed orders
          </p>

        </div>

        <div className="summary-card">

          <div className="summary-card-top">
            <div className="summary-icon green">
              <Activity size={20} />
            </div>

            <span className="card-label">
              Return
            </span>
          </div>

          <h2
            className={
              portfolio.totalPnL >= 0 ? "profit" : "loss"
            }
          >
            {formatPercent(portfolio.totalPnLPercent)}
          </h2>

          <p>
            Overall portfolio return
          </p>

        </div>

      </div>

      {/* TWO COLUMN SECTION */}
      <div className="summary-grid">

        {/* HOLDINGS */}
        <div className="dashboard-panel">

          <div className="panel-heading">

            <div>
              <h3>Top Holdings</h3>
              <p>Your current investments</p>
            </div>

            <a href="/holdings">
              View all →
            </a>

          </div>

          {holdings.length === 0 ? (
            <div className="empty-state">
              <BriefcaseBusiness size={30} />
              <h4>No holdings yet</h4>
              <p>
                Your purchased stocks will appear here.
              </p>
            </div>
          ) : (
            <div className="holdings-list">

              {holdings
                .slice()
                .sort(
                  (a, b) =>
                    b.price * b.qty - a.price * a.qty
                )
                .slice(0, 5)
                .map((stock, index) => {

                  const pnl = getStockPnL(stock);
                  const value =
                    Number(stock.price || 0) *
                    Number(stock.qty || 0);

                  const pnlPercent =
                    Number(stock.avg) > 0
                      ? ((Number(stock.price) -
                          Number(stock.avg)) /
                          Number(stock.avg)) *
                        100
                      : 0;

                  return (
                    <div
                      className="holding-row"
                      key={stock._id || index}
                    >

                      <div className="stock-info">

                        <div className="stock-avatar">
                          {stock.name?.charAt(0)}
                        </div>

                        <div>
                          <strong>{stock.name}</strong>

                          <span>
                            {stock.qty} shares
                          </span>
                        </div>

                      </div>

                      <div className="stock-price">
                        <strong>
                          {formatCurrency(value)}
                        </strong>

                        <span>
                          Avg. {formatCurrency(stock.avg)}
                        </span>
                      </div>

                      <div
                        className={
                          pnl >= 0
                            ? "stock-pnl profit"
                            : "stock-pnl loss"
                        }
                      >
                        {pnl >= 0 ? (
                          <ArrowUpRight size={14} />
                        ) : (
                          <ArrowDownRight size={14} />
                        )}

                        <span>
                          {pnl >= 0 ? "+" : "-"}
                          {formatCurrency(Math.abs(pnl))}
                        </span>

                        <small>
                          {formatPercent(pnlPercent)}
                        </small>
                      </div>

                    </div>
                  );
                })}

            </div>
          )}

        </div>

        {/* PORTFOLIO BREAKDOWN */}
        <div className="dashboard-panel">

          <div className="panel-heading">

            <div>
              <h3>Portfolio Breakdown</h3>
              <p>Investment distribution</p>
            </div>

          </div>

          <div className="breakdown-content">

            <div className="donut-wrapper">

              <div
                className="donut-chart"
                style={{
                  background: `conic-gradient(
                    #387ed1 0deg,
                    #387ed1 ${
                      portfolio.currentValue > 0
                        ? Math.min(
                            360,
                            (portfolio.invested /
                              portfolio.currentValue) *
                              360
                          )
                        : 0
                    }deg,
                    #e8edf3 ${
                      portfolio.currentValue > 0
                        ? Math.min(
                            360,
                            (portfolio.invested /
                              portfolio.currentValue) *
                              360
                          )
                        : 0
                    }deg
                  )`,
                }}
              >
                <div className="donut-inner">
                  <strong>
                    {holdings.length}
                  </strong>
                  <span>Stocks</span>
                </div>
              </div>

            </div>

            <div className="breakdown-details">

              <div className="breakdown-line">
                <span>
                  <i className="legend invested"></i>
                  Invested
                </span>

                <strong>
                  {formatCurrency(portfolio.invested)}
                </strong>
              </div>

              <div className="breakdown-line">
                <span>
                  <i className="legend current"></i>
                  Current Value
                </span>

                <strong>
                  {formatCurrency(portfolio.currentValue)}
                </strong>
              </div>

              <div className="breakdown-line">
                <span>
                  <i className="legend cash"></i>
                  Available Cash
                </span>

                <strong>
                  {formatCurrency(walletBalance)}
                </strong>
              </div>

              <div className="breakdown-divider"></div>

              <div className="breakdown-total">

                <span>Net Worth</span>

                <strong>
                  {formatCurrency(
                    portfolio.currentValue +
                      walletBalance
                  )}
                </strong>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ACTIVITY + TRADE SUMMARY */}
      <div className="summary-grid bottom-grid">

        {/* RECENT ORDERS */}
        <div className="dashboard-panel">

          <div className="panel-heading">

            <div>
              <h3>Recent Activity</h3>
              <p>Your latest trades</p>
            </div>

            <a href="/orders">
              View all →
            </a>

          </div>

          {orders.length === 0 ? (
            <div className="empty-state">
              <ShoppingCart size={30} />
              <h4>No orders yet</h4>
              <p>
                Your executed orders will appear here.
              </p>
            </div>
          ) : (
            <div className="activity-list">

              {orders.slice(0, 5).map((order, index) => {

                const amount =
                  Number(order.qty || 0) *
                  Number(order.price || 0);

                const isBuy = order.mode === "BUY";

                return (
                  <div
                    className="activity-row"
                    key={order._id || index}
                  >

                    <div
                      className={
                        isBuy
                          ? "activity-badge buy"
                          : "activity-badge sell"
                      }
                    >
                      {isBuy ? "B" : "S"}
                    </div>

                    <div className="activity-main">

                      <strong>
                        {isBuy ? "Bought" : "Sold"}{" "}
                        {order.name}
                      </strong>

                      <span>
                        {order.qty} shares ×{" "}
                        {formatCurrency(order.price)}
                      </span>

                    </div>

                    <div className="activity-right">

                      <strong>
                        {formatCurrency(amount)}
                      </strong>

                      <span>
                        {formatDate(order.createdAt)}
                      </span>

                    </div>

                  </div>
                );
              })}

            </div>
          )}

        </div>

        {/* TRADING SUMMARY */}
        <div className="dashboard-panel">

          <div className="panel-heading">

            <div>
              <h3>Trading Summary</h3>
              <p>Your overall trading activity</p>
            </div>

          </div>

          <div className="trade-summary">

            <div className="trade-summary-card">

              <div className="trade-summary-icon buy">
                <ArrowUpRight size={18} />
              </div>

              <div>
                <span>Total Bought</span>
                <strong>
                  {formatCurrency(totalBuyValue)}
                </strong>
              </div>

            </div>

            <div className="trade-summary-card">

              <div className="trade-summary-icon sell">
                <ArrowDownRight size={18} />
              </div>

              <div>
                <span>Total Sold</span>
                <strong>
                  {formatCurrency(totalSellValue)}
                </strong>
              </div>

            </div>

            <div className="trade-summary-card">

              <div className="trade-summary-icon orders">
                <Activity size={18} />
              </div>

              <div>
                <span>Orders</span>
                <strong>{orders.length}</strong>
              </div>

            </div>

            <div className="trade-summary-card">

              <div className="trade-summary-icon holdings">
                <BriefcaseBusiness size={18} />
              </div>

              <div>
                <span>Holdings</span>
                <strong>{holdings.length}</strong>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Summary;


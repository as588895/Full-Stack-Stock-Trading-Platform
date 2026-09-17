import React from "react";

const Summary = () => {
  return (
    <div className="summary-dashboard">

      {/* Dashboard Header */}
      <div className="summary-header">
        <div>
          <h2>Hi, User! 👋</h2>
          <p>Here's your portfolio overview for today.</p>
        </div>

        <div className="market-status">
          <span className="status-dot"></span>
          Market Open
        </div>
      </div>

      {/* Portfolio Cards */}
      <div className="summary-cards">

        <div className="summary-card">
          <div className="card-top">
            <span>Portfolio Value</span>
            <span className="card-icon">₹</span>
          </div>

          <h2>₹31.43k</h2>
          <p className="card-subtitle">Current value of holdings</p>
        </div>

        <div className="summary-card">
          <div className="card-top">
            <span>Available Cash</span>
            <span className="card-icon">💰</span>
          </div>

          <h2>₹3.74k</h2>
          <p className="card-subtitle">Available margin</p>
        </div>

        <div className="summary-card">
          <div className="card-top">
            <span>Total P&L</span>
            <span className="card-icon">↗</span>
          </div>

          <h2 className="profit">+₹1.55k</h2>
          <p className="profit-text">+5.20% overall return</p>
        </div>

        <div className="summary-card">
          <div className="card-top">
            <span>Holdings</span>
            <span className="card-icon">📦</span>
          </div>

          <h2>13</h2>
          <p className="card-subtitle">Stocks in portfolio</p>
        </div>

      </div>

      {/* Main Dashboard Content */}
      <div className="summary-main-grid">

        {/* Performance Graph */}
        <div className="summary-panel performance-panel">

          <div className="panel-header">
            <div>
              <h3>Portfolio Performance</h3>
              <p>Your portfolio value over time</p>
            </div>

            <select>
              <option>1 Month</option>
              <option>3 Months</option>
              <option>6 Months</option>
              <option>1 Year</option>
            </select>
          </div>

          <div className="fake-chart">

            <div className="chart-y-axis">
              <span>₹35k</span>
              <span>₹30k</span>
              <span>₹25k</span>
              <span>₹20k</span>
              <span>₹15k</span>
            </div>

            <div className="chart-area">

              <div className="chart-grid">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>

              <svg
                className="chart-line"
                viewBox="0 0 600 220"
                preserveAspectRatio="none"
              >
                <polyline
                  points="
                    0,175
                    70,160
                    130,170
                    190,130
                    250,145
                    310,110
                    370,120
                    430,80
                    490,95
                    550,55
                    600,35
                  "
                />
              </svg>

              <div className="chart-labels">
                <span>Week 1</span>
                <span>Week 2</span>
                <span>Week 3</span>
                <span>Week 4</span>
              </div>

            </div>

          </div>

        </div>

        {/* Portfolio Breakdown */}
        <div className="summary-panel breakdown-panel">

          <div className="panel-header">
            <div>
              <h3>Portfolio Summary</h3>
              <p>Investment breakdown</p>
            </div>
          </div>

          <div className="breakdown-item">
            <div>
              <span>Investment</span>
              <strong>₹29.88k</strong>
            </div>

            <div className="progress">
              <span className="investment-progress"></span>
            </div>
          </div>

          <div className="breakdown-item">
            <div>
              <span>Current Value</span>
              <strong>₹31.43k</strong>
            </div>

            <div className="progress">
              <span className="current-progress"></span>
            </div>
          </div>

          <div className="breakdown-item">
            <div>
              <span>Profit</span>
              <strong className="profit">+₹1.55k</strong>
            </div>

            <div className="profit-box">
              +5.20%
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Section */}
      <div className="summary-bottom-grid">

        {/* Holdings Overview */}
        <div className="summary-panel">

          <div className="panel-header">
            <div>
              <h3>Holdings Overview</h3>
              <p>Your current investments</p>
            </div>

            <span className="view-link">View All →</span>
          </div>

          <div className="mini-table">

            <div className="mini-row mini-heading">
              <span>Stock</span>
              <span>Qty.</span>
              <span>Value</span>
              <span>P&L</span>
            </div>

            <div className="mini-row">
              <span>RELIANCE</span>
              <span>10</span>
              <span>₹2,950</span>
              <span className="profit">+₹250</span>
            </div>

            <div className="mini-row">
              <span>INFY</span>
              <span>8</span>
              <span>₹1,420</span>
              <span className="profit">+₹120</span>
            </div>

            <div className="mini-row">
              <span>TCS</span>
              <span>5</span>
              <span>₹2,080</span>
              <span className="loss">-₹85</span>
            </div>

          </div>

        </div>

        {/* Recent Activity */}
        <div className="summary-panel">

          <div className="panel-header">
            <div>
              <h3>Recent Activity</h3>
              <p>Your latest trades</p>
            </div>

            <span className="view-link">View Orders →</span>
          </div>

          <div className="activity-list">

            <div className="activity-item">
              <div className="activity-icon buy-icon">B</div>

              <div className="activity-info">
                <strong>BUY RELIANCE</strong>
                <span>10 shares • ₹2,950</span>
              </div>

              <small>Today</small>
            </div>

            <div className="activity-item">
              <div className="activity-icon sell-icon">S</div>

              <div className="activity-info">
                <strong>SELL INFY</strong>
                <span>5 shares • ₹1,775</span>
              </div>

              <small>Yesterday</small>
            </div>

            <div className="activity-item">
              <div className="activity-icon buy-icon">B</div>

              <div className="activity-info">
                <strong>BUY TCS</strong>
                <span>5 shares • ₹2,080</span>
              </div>

              <small>2 days ago</small>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Summary;
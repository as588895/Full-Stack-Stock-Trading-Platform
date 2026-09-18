import React from "react";
import { positions } from "../data/data";
import "./Positions.css";

const Positions = () => {
  let investment = 0;
  let totalPnL = 0;

  positions.forEach((stock) => {
    const qty = Number(stock.qty) || 0;
    const avg = Number(stock.avg) || 0;
    const price = Number(stock.price) || 0;

    investment += avg * qty;
    totalPnL += (price - avg) * qty;
  });

  const totalPositions = positions.length;

  const pnlPercentage =
    investment > 0
      ? ((totalPnL / investment) * 100).toFixed(2)
      : "0.00";

  return (
    <div className="positions-page">

      {/* HEADER */}
      <div className="positions-header">
        <div>
          <h3 className="positions-title">
            Positions <span>({totalPositions})</span>
          </h3>

          <p className="positions-subtitle">
            Your active trading positions
          </p>
        </div>

        <div className="positions-overall-pnl">
          <span>Overall P&L</span>

          <strong className={totalPnL >= 0 ? "positions-profit" : "positions-loss"}>
            {totalPnL >= 0 ? "+" : "-"}₹
            {Math.abs(totalPnL).toFixed(2)}
          </strong>

          <small className={totalPnL >= 0 ? "positions-profit" : "positions-loss"}>
            {totalPnL >= 0 ? "+" : ""}
            {pnlPercentage}%
          </small>
        </div>
      </div>


      {/* SUMMARY */}
      <div className="positions-summary">

        <div className="positions-summary-card">
          <span>Total Positions</span>

          <strong>
            {totalPositions}
          </strong>
        </div>

        <div className="positions-summary-card">
          <span>Total Investment</span>

          <strong>
            ₹{investment.toFixed(2)}
          </strong>
        </div>

        <div className="positions-summary-card">
          <span>Overall P&L</span>

          <strong className={
            totalPnL >= 0
              ? "positions-profit"
              : "positions-loss"
          }>
            {totalPnL >= 0 ? "+" : "-"}₹
            {Math.abs(totalPnL).toFixed(2)}
          </strong>
        </div>

        <div className="positions-summary-card">
          <span>P&L %</span>

          <strong className={
            totalPnL >= 0
              ? "positions-profit"
              : "positions-loss"
          }>
            {totalPnL >= 0 ? "+" : ""}
            {pnlPercentage}%
          </strong>
        </div>

      </div>


      {/* TABLE */}
      <div className="positions-table">

        <table>

          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>
          </thead>

          <tbody>

            {positions.map((stock, index) => {

              const qty = Number(stock.qty) || 0;
              const avg = Number(stock.avg) || 0;
              const price = Number(stock.price) || 0;

              const pnl = (price - avg) * qty;

              const isProfit = pnl >= 0;

              return (
                <tr key={index}>

                  <td>
                    <span className="positions-product-badge">
                      {stock.product}
                    </span>
                  </td>

                  <td className="positions-instrument">
                    {stock.name}
                  </td>

                  <td>
                    {qty}
                  </td>

                  <td>
                    ₹{avg.toFixed(2)}
                  </td>

                  <td className="positions-ltp">
                    ₹{price.toFixed(2)}
                  </td>

                  <td
                    className={
                      isProfit
                        ? "positions-profit"
                        : "positions-loss"
                    }
                  >
                    {isProfit ? "+" : "-"}₹
                    {Math.abs(pnl).toFixed(2)}
                  </td>

                  <td
                    className={
                      stock.isLoss
                        ? "positions-loss"
                        : "positions-profit"
                    }
                  >
                    {stock.day}
                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Positions;
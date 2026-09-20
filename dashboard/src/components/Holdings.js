import React, { useEffect, useState } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";
import "./Holdings.css";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [loading, setLoading] = useState(true);

  const isLocalhost = window.location.hostname === "localhost";

  const backendURL = isLocalhost
    ? "http://localhost:3002"
    : "https://full-stack-stock-trading-platform-c4js.onrender.com";

  const fetchHoldings = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${backendURL}/allHoldings`,
        {
          withCredentials: true,
        }
      );

      console.log("REAL HOLDINGS DATA:", res.data);

      setAllHoldings(res.data || []);
    } catch (err) {
      console.error("Holdings API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHoldings();
  }, []);

  const totalInvestment = allHoldings.reduce(
    (total, stock) =>
      total +
      (Number(stock.investedValue) || 0),
    0
  );

  const currentValue = allHoldings.reduce(
    (total, stock) =>
      total +
      (Number(stock.currentValue) || 0),
    0
  );

  const totalPnL = currentValue - totalInvestment;

  const totalPnLPercent =
    totalInvestment > 0
      ? (totalPnL / totalInvestment) * 100
      : 0;

  const formatMoney = (value) => {
    return Number(value || 0).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );
  };

  const labels = allHoldings.map(
    (stock) => stock.name
  );

  const data = {
    labels,

    datasets: [
      {
        label: "Current Stock Price",

        data: allHoldings.map(
          (stock) => Number(stock.price) || 0
        ),

        backgroundColor:
          "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  if (loading) {
    return (
      <div className="holdings-loading">
        Loading your holdings...
      </div>
    );
  }

  return (
    <>
      <h3 className="title">
        Holdings ({allHoldings.length})
      </h3>

      <div className="order-table">
        <table>

          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>

          <tbody>

            {allHoldings.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  style={{
                    textAlign: "center",
                    padding: "40px",
                  }}
                >
                  No holdings available
                </td>
              </tr>
            ) : (
              allHoldings.map(
                (stock, index) => {

                  const pnl =
                    Number(stock.pnl) || 0;

                  const pnlPercent =
                    Number(stock.pnlPercent) || 0;

                  const dayChangePercent =
                    Number(
                      stock.dayChangePercent
                    ) || 0;

                  const pnlClass =
                    pnl >= 0
                      ? "profit"
                      : "loss";

                  const dayClass =
                    dayChangePercent >= 0
                      ? "profit"
                      : "loss";

                  return (
                    <tr key={stock._id || index}>

                      <td>
                        {stock.name}
                      </td>

                      <td>
                        {stock.qty}
                      </td>

                      <td>
                        ₹
                        {formatMoney(
                          stock.avg
                        )}
                      </td>

                      <td>
                        ₹
                        {formatMoney(
                          stock.price
                        )}
                      </td>

                      <td>
                        ₹
                        {formatMoney(
                          stock.currentValue
                        )}
                      </td>

                      <td
                        className={pnlClass}
                      >
                        {pnl >= 0
                          ? "+"
                          : "-"}
                        ₹
                        {formatMoney(
                          Math.abs(pnl)
                        )}
                      </td>

                      <td
                        className={pnlClass}
                      >
                        {pnlPercent >= 0
                          ? "+"
                          : ""}
                        {pnlPercent.toFixed(2)}
                        %
                      </td>

                      <td
                        className={dayClass}
                      >
                        {dayChangePercent >= 0
                          ? "+"
                          : ""}
                        {dayChangePercent.toFixed(
                          2
                        )}
                        %
                      </td>

                    </tr>
                  );
                }
              )
            )}

          </tbody>
        </table>
      </div>

      <div className="row">

        <div className="col">
          <h5>
            ₹{formatMoney(totalInvestment)}
          </h5>

          <p>
            Total investment
          </p>
        </div>

        <div className="col">
          <h5>
            ₹{formatMoney(currentValue)}
          </h5>

          <p>
            Current value
          </p>
        </div>

        <div className="col">

          <h5
            className={
              totalPnL >= 0
                ? "profit"
                : "loss"
            }
          >
            {totalPnL >= 0
              ? "+"
              : "-"}
            ₹
            {formatMoney(
              Math.abs(totalPnL)
            )}

            {" ("}

            {totalPnLPercent >= 0
              ? "+"
              : ""}

            {totalPnLPercent.toFixed(2)}
            %)
          </h5>

          <p>
            P&L
          </p>

        </div>

      </div>

      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;
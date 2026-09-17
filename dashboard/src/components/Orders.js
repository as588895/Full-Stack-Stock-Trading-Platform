import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const isLocalhost = window.location.hostname === "localhost";

      const backendURL = isLocalhost
        ? "http://localhost:3002"
        : "https://full-stack-stock-trading-platform-c4js.onrender.com";

      try {
        const response = await axios.get(
          `${backendURL}/allOrders`,
          {
            withCredentials: true,
          }
        );

        console.log("Orders Response:", response.data);

        setOrders(response.data);
      } catch (err) {
        console.error("Orders Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="orders">
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="orders">

      {orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders yet</p>
        </div>
      ) : (
        <div className="orders-table-container">

          <h2>Order History</h2>

          <table className="orders-table">

            <thead>
              <tr>
                <th>Stock</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Type</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>

                  <td>{order.name}</td>

                  <td>{order.qty}</td>

                  <td>
                    ₹{Number(order.price).toFixed(2)}
                  </td>

                  <td>
                    <span
                      className={
                        order.mode === "BUY"
                          ? "order-buy"
                          : "order-sell"
                      }
                    >
                      {order.mode}
                    </span>
                  </td>

                  <td>
                    {new Date(
                      order.createdAt
                    ).toLocaleString()}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>
      )}

    </div>
  );
};

export default Orders;
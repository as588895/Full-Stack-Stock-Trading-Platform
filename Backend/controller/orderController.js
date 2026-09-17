const OrdersModel = require("../model/OrdersModel");

// =======================
// Create New Order
// =======================

exports.newOrder = async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;

    if (!name || !qty || !price || !mode) {
      return res.status(400).json({
        success: false,
        message: "Please provide all order details",
      });
    }

    const order = await OrdersModel.create({
      userId: req.user.id,
      name,
      qty,
      price,
      mode,
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (err) {
    console.error("New Order Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =======================
// Get Current User Orders
// =======================

exports.allOrders = async (req, res) => {
  try {
    const orders = await OrdersModel.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (err) {
    console.error("All Orders Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
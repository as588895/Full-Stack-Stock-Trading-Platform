require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
const cors = require("cors");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const OrdersModel = require("./model/OrdersModel");
const WalletModel = require("./model/WalletModel");
console.log("WalletModel:", WalletModel);

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGODB_URL;

const app = express();
const cookieParser = require("cookie-parser");
const authRoutes = require("./auth/routes/authRoutes");

const verifyToken = require("./middleware/verifyToken");

// CORS sabse pehle
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://full-stack-stock-trading-platform-2-rouf.onrender.com",
      "https://full-stack-stock-trading-platform-1-18oq.onrender.com",
    ],
    credentials: true,
  }),
);
// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookies
app.use(cookieParser());

// Auth Routes
app.use("/api/auth", authRoutes);
// orderRoutes
// app.use("/api/orders", orderRoutes);

// app.get("/addHoldings", async (req, res) => {
//   let tempHoldings = [
//     {
//       name: "BHARTIARTL",
//       qty: 2,
//       avg: 538.05,
//       price: 541.15,
//       net: "+0.58%",
//       day: "+2.99%",
//     },
//     {
//       name: "HDFCBANK",
//       qty: 2,
//       avg: 1383.4,
//       price: 1522.35,
//       net: "+10.04%",
//       day: "+0.11%",
//     },
//     {
//       name: "HINDUNILVR",
//       qty: 1,
//       avg: 2335.85,
//       price: 2417.4,
//       net: "+3.49%",
//       day: "+0.21%",
//     },
//     {
//       name: "INFY",
//       qty: 1,
//       avg: 1350.5,
//       price: 1555.45,
//       net: "+15.18%",
//       day: "-1.60%",
//       isLoss: true,
//     },
//     {
//       name: "ITC",
//       qty: 5,
//       avg: 202.0,
//       price: 207.9,
//       net: "+2.92%",
//       day: "+0.80%",
//     },
//     {
//       name: "KPITTECH",
//       qty: 5,
//       avg: 250.3,
//       price: 266.45,
//       net: "+6.45%",
//       day: "+3.54%",
//     },
//     {
//       name: "M&M",
//       qty: 2,
//       avg: 809.9,
//       price: 779.8,
//       net: "-3.72%",
//       day: "-0.01%",
//       isLoss: true,
//     },
//     {
//       name: "RELIANCE",
//       qty: 1,
//       avg: 2193.7,
//       price: 2112.4,
//       net: "-3.71%",
//       day: "+1.44%",
//     },
//     {
//       name: "SBIN",
//       qty: 4,
//       avg: 324.35,
//       price: 430.2,
//       net: "+32.63%",
//       day: "-0.34%",
//       isLoss: true,
//     },
//     {
//       name: "SGBMAY29",
//       qty: 2,
//       avg: 4727.0,
//       price: 4719.0,
//       net: "-0.17%",
//       day: "+0.15%",
//     },
//     {
//       name: "TATAPOWER",
//       qty: 5,
//       avg: 104.2,
//       price: 124.15,
//       net: "+19.15%",
//       day: "-0.24%",
//       isLoss: true,
//     },
//     {
//       name: "TCS",
//       qty: 1,
//       avg: 3041.7,
//       price: 3194.8,
//       net: "+5.03%",
//       day: "-0.25%",
//       isLoss: true,
//     },
//     {
//       name: "WIPRO",
//       qty: 4,
//       avg: 489.3,
//       price: 577.75,
//       net: "+18.08%",
//       day: "+0.32%",
//     },
//   ];

//   tempHoldings.forEach((item) => {
//     let newHolding = new HoldingsModel({
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.day,
//       day: item.day,
//     });

//     newHolding.save();
//   });
//   res.send("Done!");
// });

// app.get("/addPositions", async (req, res) => {
//   let tempPositions = [
//     {
//       product: "CNC",
//       name: "EVEREADY",
//       qty: 2,
//       avg: 316.27,
//       price: 312.35,
//       net: "+0.58%",
//       day: "-1.24%",
//       isLoss: true,
//     },
//     {
//       product: "CNC",
//       name: "JUBLFOOD",
//       qty: 1,
//       avg: 3124.75,
//       price: 3082.65,
//       net: "+10.04%",
//       day: "-1.35%",
//       isLoss: true,
//     },
//   ];

//   tempPositions.forEach((item) => {
//     let newPosition = new PositionsModel({
//       product: item.product,
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.net,
//       day: item.day,
//       isLoss: item.isLoss,
//     });

//     newPosition.save();
//   });
//   res.send("Done!");
// });

// app.get("/allHoldings", verifyToken, async (req, res) => {
//   try {
//     const allHoldings = await HoldingsModel.find({
//       userId: req.user.id,
//     });

//     res.json(allHoldings);
//   } catch (err) {
//     console.error("Holdings Error:", err);

//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// });

app.get("/allHoldings", verifyToken, async (req, res) => {
  try {
    const holdings = await HoldingsModel.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    const formattedHoldings = holdings.map((stock) => {
      const qty = Number(stock.qty) || 0;
      const avg = Number(stock.avg) || 0;
      const price = Number(stock.price) || 0;
      const previousClose = Number(stock.previousClose) || 0;

      const investedValue = avg * qty;
      const currentValue = price * qty;

      const pnl = currentValue - investedValue;

      const pnlPercent = investedValue > 0 ? (pnl / investedValue) * 100 : 0;

      const dayChange = previousClose > 0 ? (price - previousClose) * qty : 0;

      const dayChangePercent =
        previousClose > 0 ? ((price - previousClose) / previousClose) * 100 : 0;

      return {
        ...stock.toObject(),

        investedValue,
        currentValue,

        pnl,
        pnlPercent,

        dayChange,
        dayChangePercent,

        net: `${pnlPercent >= 0 ? "+" : ""}${pnlPercent.toFixed(2)}%`,

        day:
          previousClose > 0
            ? `${dayChangePercent >= 0 ? "+" : ""}${dayChangePercent.toFixed(2)}%`
            : "0.00%",
      };
    });

    res.json(formattedHoldings);
  } catch (err) {
    console.error("Holdings Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

app.get("/wallet", verifyToken, async (req, res) => {
  try {
    let wallet = await WalletModel.findOne({ userId: req.user.id });
    if (!wallet) {
      wallet = await WalletModel.create({
        userId: req.user.id,
        balance: 100000,
      });
    }
    res.json({ success: true, balance: wallet.balance });
  } catch (err) {
    console.error("Wallet Error:", err);
    res.status(500).json({ success: false, message: "Unable to fetch wallet" });
  }
});

// =====================================================
// ADD FUNDS
// =====================================================
console.log("WALLET ROUTES LOADED");

app.post("/wallet/add", verifyToken, async (req, res) => {
  try {
    const amount = Number(req.body.amount);

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid amount",
      });
    }

    const userId = req.user.id;

    let wallet = await WalletModel.findOne({ userId });

    if (!wallet) {
      wallet = await WalletModel.create({
        userId,
        balance: 100000,
      });
    }

    wallet.balance += amount;

    await wallet.save();

    res.json({
      success: true,
      message: "Funds added successfully",
      balance: wallet.balance,
    });
  } catch (err) {
    console.error("Add Funds Error:", err);

    res.status(500).json({
      success: false,
      message: "Unable to add funds",
    });
  }
});

// =====================================================
// WITHDRAW FUNDS
// =====================================================

app.post("/wallet/withdraw", verifyToken, async (req, res) => {
  try {
    const amount = Number(req.body.amount);

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid amount",
      });
    }

    const userId = req.user.id;

    let wallet = await WalletModel.findOne({ userId });

    if (!wallet) {
      wallet = await WalletModel.create({
        userId,
        balance: 100000,
      });
    }

    if (wallet.balance < amount) {
      return res.status(400).json({
        success: false,
        message: "Insufficient wallet balance",
        available: wallet.balance,
      });
    }

    wallet.balance -= amount;

    await wallet.save();

    res.json({
      success: true,
      message: "Withdrawal successful",
      balance: wallet.balance,
    });
  } catch (err) {
    console.error("Withdraw Error:", err);

    res.status(500).json({
      success: false,
      message: "Unable to withdraw funds",
    });
  }
});

app.get("/allPositions", async (req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

// for dashboard
app.get("/dashboard", verifyToken, (req, res) => {
  res.json({
    success: true,
    message: "Welcome Dashboard",

    user: req.user,
  });
});

app.post("/newOrder", verifyToken, async (req, res) => {
  console.log("NEW ORDER REQUEST:", req.body);
  try {
    const { name, qty, price, mode } = req.body;

    const quantity = Number(qty);
    const stockPrice = Number(price);

    // Validate order details
    if (!name || !quantity || !stockPrice || !["BUY", "SELL"].includes(mode)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order details",
      });
    }

    if (quantity <= 0 || stockPrice <= 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity and price must be greater than 0",
      });
    }

    const userId = req.user.id;

    // =====================================================
    // SELL ORDER
    // =====================================================

    if (mode === "SELL") {
      const holding = await HoldingsModel.findOne({
        userId: userId,
        name: name,
      });

      // User doesn't own this stock
      if (!holding) {
        return res.status(400).json({
          success: false,
          message: "You do not own this stock",
        });
      }

      // Not enough shares
      if (holding.qty < quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient holdings. You own only ${holding.qty} shares`,
          availableQuantity: holding.qty,
        });
      }

      const totalAmount = quantity * stockPrice;

      // Find wallet
      let wallet = await WalletModel.findOne({
        userId: userId,
      });

      // Create wallet if it doesn't exist
      if (!wallet) {
        wallet = await WalletModel.create({
          userId: userId,
          balance: 100000,
        });
      }

      // Add sold amount to wallet
      wallet.balance += totalAmount;

      await wallet.save();

      // Reduce holding quantity
      holding.qty -= quantity;

      // Update current price
      holding.price = stockPrice;

      // If all shares are sold, delete holding
      if (holding.qty === 0) {
        await HoldingsModel.deleteOne({
          _id: holding._id,
        });
      } else {
        await holding.save();
      }

      // Save SELL order
      const newOrder = await OrdersModel.create({
        userId: userId,
        name: name,
        qty: quantity,
        price: stockPrice,
        mode: "SELL",
      });

      return res.status(201).json({
        success: true,
        message: "Sell order executed successfully",
        order: newOrder,
        walletBalance: wallet.balance,
        soldAmount: totalAmount,
      });
    }

    // =====================================================
    // BUY ORDER
    // =====================================================

    if (mode === "BUY") {
      // Find wallet
      let wallet = await WalletModel.findOne({
        userId: userId,
      });

      // Create wallet if it doesn't exist
      if (!wallet) {
        wallet = await WalletModel.create({
          userId: userId,
          balance: 100000,
        });
      }

      const totalAmount = quantity * stockPrice;

      // Check wallet balance
      if (wallet.balance < totalAmount) {
        return res.status(400).json({
          success: false,
          message: "Insufficient wallet balance",
          required: totalAmount,
          available: wallet.balance,
        });
      }

      // Deduct money
      wallet.balance -= totalAmount;

      await wallet.save();

      // Find existing holding
      let holding = await HoldingsModel.findOne({
        userId: userId,
        name: name,
      });

      if (holding) {
        const oldQuantity = holding.qty;
        const oldAverage = holding.avg;

        const newQuantity = oldQuantity + quantity;

        const newAverage =
          (oldQuantity * oldAverage + quantity * stockPrice) / newQuantity;

        holding.qty = newQuantity;
        holding.avg = newAverage;
        holding.price = stockPrice;

        await holding.save();
      } else {
        // Create new holding
        holding = await HoldingsModel.create({
          userId: userId,
          name: name,
          qty: quantity,
          avg: stockPrice,
          price: stockPrice,

          // First purchase price is used as initial previous close
          previousClose: stockPrice,

          net: "0.00%",
          day: "0.00%",
        });
      }

      // Save BUY order
      const newOrder = await OrdersModel.create({
        userId: userId,
        name: name,
        qty: quantity,
        price: stockPrice,
        mode: "BUY",
      });

      return res.status(201).json({
        success: true,
        message: "Buy order executed successfully",
        order: newOrder,
        holding: holding,
        walletBalance: wallet.balance,
      });
    }
  } catch (err) {
    console.error("Order Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

app.get("/updatePreviousClose", async (req, res) => {
  try {
    const holdings = await HoldingsModel.find({});

    for (const holding of holdings) {
      if (!holding.previousClose || holding.previousClose === 0) {
        holding.previousClose = holding.price;
        await holding.save();
      }
    }

    res.json({
      success: true,
      message: "Previous close updated successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Order section backend
app.get("/allOrders", verifyToken, async (req, res) => {
  try {
    const allOrders = await OrdersModel.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(allOrders);
  } catch (err) {
    console.error("Orders Fetch Error:", err);

    res.status(500).json({
      success: false,
      message: "Unable to fetch orders",
    });
  }
});

app.listen(PORT, () => {
  console.log("App Started!");
  mongoose.connect(uri);
  console.log("DB Connected!");
});

const express = require("express");
const router = express.Router();

const {
  newOrder,
  allOrders,
} = require("../controller/orderController");

const verifyToken = require("../../middleware/verifyToken");

router.post("/newOrder", verifyToken, newOrder);
router.get("/allOrders", verifyToken, allOrders);

module.exports = router;
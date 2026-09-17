const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
    },

    qty: {
      type: Number,
      required: true,
      min: 1,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    mode: {
      type: String,
      required: true,
      enum: ["BUY", "SELL"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Orders", ordersSchema);
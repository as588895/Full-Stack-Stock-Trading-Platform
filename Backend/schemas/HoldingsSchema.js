const { Schema } = require("mongoose");

const HoldingsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
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
      min: 0,
    },

    avg: {
      type: Number,
      required: true,
      min: 0,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    // Previous closing price
    previousClose: {
      type: Number,
      default: 0,
      min: 0,
    },

    net: {
      type: String,
      default: "0.00%",
    },

    day: {
      type: String,
      default: "0.00%",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = { HoldingsSchema };a
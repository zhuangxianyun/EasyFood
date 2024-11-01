const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    nickname: {
      type: String,
      required: true,
    },
    wechat: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    orderItems: [
      {
        id: Number,
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    subtotal: String,
    total: String,
    pickupDate: {
      type: String,
      required: true,
    },
    pickupTime: {
      type: String,
      required: true,
    },
    orderTime: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);

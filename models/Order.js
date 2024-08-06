const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  deliveryStatusMessage: {
    type: String,
    enum: ["Pending", "Completed", "Cancelled"],
    default: "Pending",
  },

  orderedDate: {
    type: Date,
    default: Date.now,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },

  totalPrice: {
    type: Number,
  },

  orderedQty: {
    type: Number,
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  totalAmount: Number,
  shippingAddress: {
    name: String,
    email: String,
    phone: String,
    street: String,
    city: String,
    pincode: String,
    state: String,
    country: String,
  },
  paymentMode: String,
  createdAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["pending", "shipping", "completed", "cancelled"],
    default: "pending",
  },
});

module.exports = mongoose.model("Order", orderSchema);

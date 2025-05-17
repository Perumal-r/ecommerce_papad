const Order = require("../modules/order");

// Place Order
const placeOrder = async (req, res) => {
  try {
    const { userId, cartItems, shippingAddress, paymentMode } = req.body;

    const totalAmount =
      cartItems.reduce(
        (sum, item) => sum + item.productId.price * item.quantity,
        0
      ) + 50;

    const order = await Order.create({
      userId,
      products: cartItems,
      totalAmount,
      shippingAddress,
      paymentMode,
    });

    res.status(201).json({ success: true, orderId: order._id, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Single Order
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("products.productId");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  placeOrder,
  getOrderById,
};

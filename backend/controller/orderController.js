const Order = require("../modules/order");
const nodemailer = require("nodemailer");

//mail send code

const sendInvoiceEmail = async (toEmail, order) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // or use 'smtp.ethereal.email' for testing
    auth: {
      user: "pr657122@gmail.com",       // ✅ Replace with your email
      pass: "ylgs qsyf oolw eimv",        // ✅ Use App Password (not your login)
    },
  });

  const mailOptions = {
    from: '<pr657122@gmail.com>',
    to: toEmail,
    subject: "Your Order Invoice",
    html: `
      <h2>Invoice for your order</h2>
      <p><strong>Order ID:</strong> ${order._id}</p>
      <p><strong>Total:</strong> ₹${order.totalAmount}</p>
      <p><strong>Shipping Name:</strong> ${order.shippingAddress.name}</p>
      <p><strong>Shipping Email:</strong> ${order.shippingAddress.email}</p>
      <p><strong>Items:</strong></p>
      <ul>
        ${order.products.map(item => `
          <li>${item.productId.name} x ${item.quantity} = ₹${item.productId.price * item.quantity}</li>
        `).join("")}
      </ul>
      <p><strong>Shipping:</strong> ₹50</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

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
      status: "pending",
    });
 await sendInvoiceEmail(shippingAddress.email, order);
    res.status(201).json({ success: true, orderId: order._id, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//update order
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Validate status
    if (!["pending", "completed", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order status updated", order });
  } catch (err) {
    res.status(500).json({ message: err.message });
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

//Get All Orders

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("products.productId") // populate product details
      .sort({ createdAt: -1 });       // most recent orders first

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  placeOrder,
  getOrderById,
  sendInvoiceEmail,
  updateOrderStatus,
  getAllOrders
};

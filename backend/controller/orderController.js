const Order = require("../modules/order");
const Category = require("../modules/categories");
const nodemailer = require("nodemailer");

//mail send code

const sendInvoiceEmail = async (toEmail, order) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // or use 'smtp.ethereal.email' for testing
    auth: {
      user: "pr657122@gmail.com", // Replace with your email
      pass: "ylgs qsyf oolw eimv", // Use App Password (not your login)
    },
  });
  const mailOptions = {
    from: "<pr657122@gmail.com>",
    to: toEmail,
    subject: "Your Order Invoice",
    html: `
      <h2>Invoice for your order</h2>
      <p><strong>Order ID:</strong> ${order._id}</p>
      <p><strong>Total:</strong> ₹${order.totalAmount}</p>
      <p><strong>Customer Name:</strong> ${order.shippingAddress.name}</p>
      <p><strong>Customer Email:</strong> ${order.shippingAddress.email}</p>
      <p><strong>Items:</strong></p>
      <ul>
        ${order.products
          .map(
            (item) => `
          <li>${item.productId.name} x ${item.quantity} = ₹${
              item.productId.price * item.quantity
            }</li>
        `
          )
          .join("")}
      </ul>
      <p><strong>Shipping:</strong> ₹50</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

// Place Order
const placeOrder = async (req, res) => {
  try {
    const { userId, cartItems, shippingAddress, paymentMode, createdAt } =
      req.body;

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
      createdAt,
    });
     const populatedOrder = await Order.findById(order._id).populate("products.productId");
    await sendInvoiceEmail(shippingAddress.email, populatedOrder);
    res.status(201).json({ success: true, orderId: order._id, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//update order
const updateOrderStatus = async (req, res) => {
  try {
    const { status, createdAt } = req.body;

    // Validate status
    if (!["pending", "shipping", "completed", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    if (status === "cancelled") {
      const deletedOrder = await Order.findByIdAndDelete(req.params.id);

      if (!deletedOrder) {
        return res.status(404).json({ message: "Order not found to delete" });
      }

      return res.json({
        message: "Order cancelled and deleted",
        order: deletedOrder,
      });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status, createdAt },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order status updated", updatedOrder });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const userId = req.params.id; // From logged in user
    // Fetch all orders by user ID
    const orders = await Order.find({ userId: req.params.id });

    if (!orders || orders.length === 0) {
      return res.status(200).json({ message: "No orders found for this user" });
    }

    const enrichedOrders = await Promise.all(
      orders.map(async (order) => {
        const enrichedProducts = await Promise.all(
          order.products.map(async (item) => {
            const product = await Category.findById(item.productId);
            return {
              _id: item._id,
              productId: {
                name: product?.name || "Unknown",
                price: product?.price || 0,
              },
              quantity: item.quantity,
            };
          })
        );

        return {
          ...order._doc,
          products: enrichedProducts,
        };
      })
    );

    res.status(200).json({ orders: enrichedOrders });
    // res.json(orders);
    // console.log("Orders fetched successfully",orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Get All Orders

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    // .populate("products.productId") // populate product details
    // .sort({ createdAt: -1 });       // most recent orders first

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//filter order by date

// GET /api/orders/product-sales?date=2025-05-17&productId=6810ae674f74ada5441118fa

const getProductSalesByDate = async (req, res) => {
  try {
    const { date, productId } = req.query;
    if (!date || !productId) {
      return res
        .status(400)
        .json({ message: "date and productId are required" });
    }

    // start and end of the day in UTC
    const startDate = new Date(date + "T00:00:00.000Z");
    const endDate = new Date(date + "T23:59:59.999Z");

    // Fetch orders for that day that contain the productId
    const orders = await Order.find({
      createdAt: { $gte: startDate, $lte: endDate },
      "products.productId": productId,
    }).populate("products.productId");

    // Sum quantity * price for that product in all orders
    let totalSalesAmount = 0;

    orders.forEach((order) => {
      order.products.forEach((item) => {
        if (item.productId._id.toString() === productId) {
          totalSalesAmount += item.productId.price * item.quantity;
        }
      });
    });

    res.json({ date, productId, totalSalesAmount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  placeOrder,
  getOrderById,
  sendInvoiceEmail,
  updateOrderStatus,
  getAllOrders,
  getProductSalesByDate,
};

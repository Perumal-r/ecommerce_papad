const express = require("express");
const router = express.Router();
const {
  placeOrder,
  getOrderById,
  updateOrderStatus,
  getAllOrders
} = require("../controller/orderController");

router.post("/place-order", placeOrder);
router.get("/place-order/:id", getOrderById);
router.put("/update-order/:id", updateOrderStatus);
router.get("/all-orders", getAllOrders);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  placeOrder,
  getOrderById,
  updateOrderStatus,
  getAllOrders,
  getProductSalesByDate
} = require("../controller/orderController");

router.post("/place-order", placeOrder);
router.get("/place-order/:id", getOrderById);
router.put("/update-order/:id", updateOrderStatus);
router.get("/all-orders", getAllOrders);
router.get("/orders-by-date", getProductSalesByDate);

module.exports = router;

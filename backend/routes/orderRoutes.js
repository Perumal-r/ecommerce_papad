const express = require("express");
const router = express.Router();
const {
  placeOrder,
  getOrderById,
} = require("../controller/orderController");

router.post("/place-order", placeOrder);
router.get("/place-order/:id", getOrderById);

module.exports = router;

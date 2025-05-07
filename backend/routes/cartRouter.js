const express = require("express");
const router = express.Router();
const cartController = require("../controller/cartController");

router.post("/add", cartController.addToCart);
router.put("/update/:cartItemId", cartController.updateCartItem);
router.delete("/delete/:cartItemId", cartController.deleteCartItem);
router.get("/user/:userId", cartController.getUserCart);

module.exports = router;

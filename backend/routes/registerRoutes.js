const express = require("express");
const router = express.Router();
const { addUser, loginUser,sendOTP,verifyOTP } = require("../controller/registercontroller");

router.post("/register", addUser);
router.post("/verify-otp", verifyOTP); 
router.post("/send-otp", sendOTP);
router.post("/login", loginUser);

module.exports = router;

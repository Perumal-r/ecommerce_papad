const express = require("express");
const router = express.Router();
const { addUser } = require("../controller/registercontroller");

router.post("/register", addUser);

module.exports = router;

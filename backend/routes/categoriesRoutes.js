const express = require("express");
const upload = require("../config/upload");
const router = express.Router();
const {
  getAllCategories,
  addCategory,
} = require("../controller/categoriescontroller");

// Define route
router.get("/getcategories", getAllCategories);
router.post("/addcategory", upload.single("image"), addCategory);

module.exports = router;

const express = require("express");
const upload = require("../config/upload");
const {auth} = require("../config/auth");
const router = express.Router();

const {
  getAllCategories,
  addCategory,
  updatecategory,
  deleteCategory,
} = require("../controller/categoriescontroller");

// Define route
router.get("/getcategories",getAllCategories);
router.post("/addcategory", upload.single("image"), addCategory);
router.post("/updatecategory/:id", upload.single("image"), updatecategory);
router.delete("/deletecategory/:id", deleteCategory);
module.exports = router;

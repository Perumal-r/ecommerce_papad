const express = require("express");
const router = express.Router();
const upload = require("../config/upload"); // your multer setup

const {
  getProfileByUserId,
  createProfile,
  updateProfile,
} = require("../controller/profileController");

router.get("/getprofile/:userId", getProfileByUserId);
router.post("/createprofile", upload.single("image"), createProfile);
router.put("/updateprofile/:userId", upload.single("image"), updateProfile);

module.exports = router;

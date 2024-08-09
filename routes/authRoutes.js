const express = require("express");
const router = express.Router();
const {
  isAdmin,
  registerUser,
  loginUser,
  forgotPassword,
} = require("../controllers/authControllers");

router.post("/isadmin", isAdmin);
router.post("/signup", registerUser);
router.post("/signin", loginUser);
router.post("/forgotpassword", forgotPassword);

module.exports = router;

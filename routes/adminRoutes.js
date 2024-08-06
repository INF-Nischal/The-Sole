const express = require("express");
const router = express.Router();
const {
  isAdmin,
  registerUser,
  loginUser,
} = require("../controllers/authControllers");

router.post("/isadmin", isAdmin);
router.post("/signup", registerUser);
router.post("/signin", loginUser);

module.exports = router;

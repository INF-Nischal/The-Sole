const express = require("express");
// const authorize = require("../middlewares/auth")
const {
  authenticated,
  authorizeRoles,
} = require("../middlewares/authMiddleware");

const {
  getAllCart,
  getCartById,
  addNewCart,
  updateCartById,
  deleteCartById,
  getCartByUserId,
} = require("../controllers/cartControllers");

const router = new express.Router();

router.get("/carts", getAllCart);

router.get("/carts/:id", getCartById);

router.get("/carts/user/:userId", getCartByUserId);

router.post("/carts", addNewCart);

router.put("/carts/:id", updateCartById);

router.delete("/carts/:id", deleteCartById);

module.exports = router;

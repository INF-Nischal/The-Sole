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

router.get("/carts", authenticated, getAllCart);

router.get("/carts/:id", authenticated, getCartById);

router.get("/carts/user/:userId", authenticated, getCartByUserId);

router.post("/carts", authenticated, addNewCart);

router.put("/carts/:id", authenticated, updateCartById);

router.delete("/carts/:id", authenticated, deleteCartById);

module.exports = router;

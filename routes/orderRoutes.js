const express = require("express");
const router = new express.Router();

const {
  getAllOrders,
  getOrderById,
  getUserOrders,
  addNewOrder,
  updateOrderById,
  deleteOrderById,
} = require("../controllers/orderControllers");

const {
  authenticated,
  authorizeRoles,
} = require("../middlewares/authMiddleware");

router.get("/orders", getAllOrders);
router.get("/orders/:id", getOrderById);
router.get("/orders/user/:userId", authenticated, getUserOrders);

router.post("/orders/:userId", authenticated, addNewOrder);

router.put("/orders/:id", authenticated, updateOrderById);

router.delete("/orders/:id", authenticated, deleteOrderById);

module.exports = router;

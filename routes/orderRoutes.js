const express = require("express");
const router = express.Router();

const {
  getAllOrders,
  getOrderById,
  getUserOrders,
  addNewOrder,
  updateOrderById,
  deleteOrderById,
  getOrdersByTimeframe,
} = require("../controllers/orderControllers");

const {
  authenticated,
  authorizeRoles,
} = require("../middlewares/authMiddleware");

router.get("/orders/analytics", getOrdersByTimeframe);
router.get("/orders", getAllOrders);
router.get("/orders/:id", getOrderById);
router.get("/orders/user/:userId", authenticated, getUserOrders);

router.post("/orders/:userId", authenticated, addNewOrder);

router.put("/orders/:id", authenticated, updateOrderById);

router.delete("/orders/:id", authenticated, deleteOrderById);

module.exports = router;

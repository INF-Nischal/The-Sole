// const express = require("express");
// const router = new express.Router();

// const {
//   add_new_order,
//   update_order,
//   delete_order,
//   get_all_order,
//   get_order_by_id,
// } = require("../controllers/ordercontrollers");

// const {
//   authenticated,
//   authorizeRoles,
// } = require("../middlewares/authMiddleware");

// // to get all order
// router.get("/orders", authenticated, get_all_order); // get method

// //to insert order
// router.post("/orders/newOrder", authenticated, add_new_order); // post method

// // router.get("/orders/:userId/userOrders", getUserOrders);

// // to update order ADMIN
// router.put(
//   "/update/:orderId/:deliveryStatusMessage",
//   authenticated,
//   update_order
// ); //put method

// // to get order by id
// router.get("/orders/:id", authenticated, get_order_by_id); // get method

// // to delete order
// router.delete("/orders/:id", authenticated, delete_order); //delete method

// //exporting router
// module.exports = router;

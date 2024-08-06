// const express = require("express");
// // const authorize = require("../middlewares/auth")
// const {
//   authenticated,
//   authorizeRoles,
// } = require("../middlewares/authMiddleware");
// const {
//   addNewCart,
//   updateCart,
//   deleteCart,
//   getAllCart,
// } = require("../controllers/cartControllers");

// // bulk export of routes
// const router = new express.Router();

// // to get all cart
// router.get("/carts", authenticated, getAllCart); // get method

// //to insert cart
// router.post("/insert/:productId/:quantity", authenticated, addNewCart); // post method

// // to update cart
// router.put("carts/:id", updateCart); //put method

// // to delete cart
// router.delete("/carts/:id", authenticated, deleteCart); //delete method

// //exporting router
// module.exports = router;

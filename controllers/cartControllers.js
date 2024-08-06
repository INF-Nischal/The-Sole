// const Cart = require("../models/Cart");

// const addNewCart = async (req, res) => {
//   try {
//     const productId = req.params.productId;
//     const userId = req.user._id;
//     const quantity = req.params.quantity;

//     const inCart = await Cart.findOne({ productId, userId });

//     if (inCart) {
//       await Cart.updateOne(
//         { productId, userId },
//         { quantity: quantity + req.params.quantity }
//       );

//       res.status(200).json({
//         message: "Cart Quantity Updated Successfully!",
//       });
//     } else {
//       const cart = new Cart({
//         productId,
//         userId,
//         quantity,
//       });

//       await cart.save();

//       res.status(201).json({
//         message: "Item added to cart!",
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// const updateCart = async (req, res) => {
//   try {
//     const productId = req.params.id;
//     const userId = req.params.id;

//     await Cart.updateOne(
//       { productId, userId },
//       { quantity: req.params.quantity }
//     );

//     res.status(201).json({
//       message: "Cart Updated Successfully!",
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// const deleteCart = async (req, res) => {
//   try {
//     const productId = req.params.productId;
//     const userId = req.user._id;
//     const response = await Cart.deleteOne({ productId, userId });

//     if (response.deletedCount > 0) {
//       res.status(201).json({
//         success: true,
//         message: "Item Deleted Successfully!",
//       });
//     } else {
//       res.status(500).json({
//         success: false,
//         message: "This item is not in the cart!",
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// const getAllCart = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const cartsData = await Cart.find({ userId })
//       .populate("productId")
//       .select("-productCategory");

//     res.status(201).json({
//       success: true,
//       message: "Cart fetched successfully",
//       data: cartsData,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// module.exports = {
//   addNewCart,
//   updateCart,
//   deleteCart,
//   getAllCart,
// };

const express = require("express");
const router = express.Router();
const { authenticated } = require("../middlewares/authMiddleware");
const {
  getAllUsers,
  userProfile,
  updateProfileData,
  updateProfileWithImage,
  changePassword,
  saveProductToWishlist,
  getUserWishlistProducts,
  getUserById,
  deleteUserById,
  updateUserById,
  getUsersByTimeframe,
} = require("../controllers/userControllers");

router.get("/users/analytics", getUsersByTimeframe);

router.get("/users", getAllUsers);
router.get("/users/:id", authenticated, getUserById);

router.put("/users/:id", authenticated, updateUserById);

router.delete("/users/:id", authenticated, deleteUserById);

router.get("/users/wishlist/:userId", authenticated, getUserWishlistProducts);
router.post("/users/wishlist/:productId", authenticated, saveProductToWishlist);

router.get("/users/:id/userProfile", authenticated, userProfile);

router.put("/update/:id/userProfile", authenticated, updateProfileData);
router.put("/update/profile-all", authenticated, updateProfileWithImage);

router.post("/users/:id", userProfile);

router.post("/newPassword", authenticated, changePassword);

module.exports = router;

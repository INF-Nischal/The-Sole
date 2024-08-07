const express = require("express");
const router = express.Router();
const { authenticated } = require("../middlewares/authMiddleware");
const {
  getAllUsers,
  userProfile,
  addNewUser,
  updateProfileData,
  updateProfileWithImage,
  changePassword,
  saveProductToWishlist,
  getUserWishlistProducts,
  getUserById,
  deleteUserById,
  updateUserById,
} = require("../controllers/userControllers");

router.get("/users", getAllUsers);
// router.get('/users/:id', authenticated, userscontrollers.getUserById);

router.get("/users/:id", getUserById);

router.get("/users/:id/userProfile", authenticated, userProfile);

router.post("/users/addUser", addNewUser);

router.put("/update/:id/userProfile", authenticated, updateProfileData);
router.put("/update/profile-all", authenticated, updateProfileWithImage);

router.post("/users/:id", userProfile);

router.post("/newPassword", authenticated, changePassword);

router.get("/wishlistProduct", authenticated, getUserWishlistProducts);

router.post(
  "/wishlistProduct/:productId",
  authenticated,
  saveProductToWishlist
);

router.put("/users/:id", updateUserById);

router.delete("/users/:id", deleteUserById);

module.exports = router;

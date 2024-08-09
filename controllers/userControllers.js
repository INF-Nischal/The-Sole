const User = require("../models/User.js");
const Product = require("../models/Product.js");
const bcrypt = require("bcryptjs");
const cloudinary = require("../middlewares/cloudinaryMiddleware");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("wishlistProduct");

    if (users) {
      return res.json({ users });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndUpdate(req.params.id, req.body);

    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const userProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      phoneNumber: user.phoneNumber,
      userImage: user.userImage,
    };

    res.status(200).json({
      success: true,
      message: "User get success",
      data: userData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProfileData = async (req, res) => {
  console.log(req.body);
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({
      message: "User not found!",
    });
  }
  try {
    const { name, email, phoneNumber, address } = req.body;
    await User.findByIdAndUpdate(
      req.user._id,
      { name, email, phoneNumber, address },
      { new: true, runValidators: true, useFindAndModify: false }
    );
    const userData = await User.findById(req.user._id);
    console.log("data =>>>>" + userData);
    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: userData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProfileWithImage = async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found!",
    });
  }
  const { name, email, phoneNumber, address } = req.body;
  try {
    const formImage = req.files.userImage;
    const imagePath = formImage.tempFilePath;
    if (
      formImage.mimetype == "image/png" ||
      formImage.mimetype == "image/jpg" ||
      formImage.mimetype == "application/octet-stream" ||
      formImage.mimetype == "image/jpeg"
    ) {
      const avatar = await cloudinary.upload_image(imagePath, "User");
      console.log(avatar);
      await User.findByIdAndUpdate(
        userId,
        { name, email, phoneNumber, address, userImage: avatar },
        { new: true, runValidators: true, useFindAndModify: false }
      );
      const userData = await User.findById(userId);
      res.status(200).json({
        success: true,
        message: "User updated successfully!",
        data: userData,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    console.log(req.body);

    const user = await User.findOne({ _id: req.user.id }).select("+password");
    console.log(user);

    const validLogin = await bcrypt.compare(oldPassword, user.password);
    console.log(validLogin);

    if (validLogin) {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(newPassword, salt);
      user.password = hashed;

      await user.save();

      res.status(200).json({
        success: true,
        message: "Password changed successfully!",
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Invalid Password",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const saveProductToWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = req.user;

    if (!user.wishlistProduct) {
      user.wishlistProduct = [];
    }

    if (user.wishlistProduct.includes(productId)) {
      return res.status(400).json({ message: "Product already in wishlist" });
    }

    user.wishlistProduct.push(productId);

    await user.save();

    return res.status(200).json({ message: "Product added to wishlist" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getUserWishlistProducts = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate(
      "wishlistProduct"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ wishlistProducts: user.wishlistProduct });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  userProfile,
  updateProfileData,
  updateProfileWithImage,
  changePassword,
  saveProductToWishlist,
  getUserWishlistProducts,
};

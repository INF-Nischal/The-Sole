const User = require("../models/User.js");
const Product = require("../models/Product.js");
const bcrypt = require("bcryptjs");
const cloudinary = require("../middlewares/cloudinaryMiddleware");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

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

const addNewUser = async (req, res) => {
  const { email, ...data } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      const user = new User({ email: email, ...data });

      await user.save();

      return res.status(201).json({ message: "New user added successfully!" });
    }

    return res.status(400).json({
      message: "User already exists",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
    const product = await Product.findOne({ _id: req.params.productId });
    const user = await User.findOne({ _id: req.user._id }).select(
      "wishlistProduct"
    );
    console.log(user.wishlistProduct);
    if (product) {
      if (user.wishlistProduct.includes(product._id)) {
        user.wishlistProduct.pull(product._id);
        await user.save();
        res.status(200).json({
          success: true,
          message: "Product removed",
        });
      } else {
        user.wishlistProduct.push(product._id);
        await user.save();
        res.status(200).json({
          success: true,
          message: "Product added",
        });
      }
    } else {
      res.status(500).json({
        success: false,
        message: "Product not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
  res.end();
};

const getUserWishlistProducts = async (req, res) => {
  console.log(req.params);
  try {
    const data = await User.findById(req.user._id).populate("wishlistProduct");
    const favs = await Promise.all(
      data.wishlistProduct.map((product) => product.populate("productCategory"))
    );

    res.status(200).json({
      success: true,
      message: "User wishlist fetched",
      data: favs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
  res.end();
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

module.exports = {
  getAllUsers,
  getUserById,
  userProfile,
  addNewUser,
  updateProfileData,
  updateProfileWithImage,
  changePassword,
  saveProductToWishlist,
  getUserWishlistProducts,
  updateUserById,
  deleteUserById,
};

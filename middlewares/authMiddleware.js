require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticated = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        message: "Please login first!",
      });
    }

    token = token.replace("Bearer ", "");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({
        message: "Session expired!",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Function to check if the logged-in user is authorized
const isAuth = (req, res, next) => {
  // Ensure that user ID from token matches the ID in the request body
  if (
    !req.body.loggedInUserId ||
    req.body.loggedInUserId !== req.user._id.toString()
  ) {
    return res.status(403).json({
      message: "You are not authorized",
    });
  }
  next();
};

// Function to check if the user has an admin role
const isAdmin = async (req, res, next) => {
  try {
    const reqUser = await User.findById(req.user._id);

    // Check if the user's role is not admin (role 0 for non-admin)
    if (reqUser.userRole === 0) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Function to authorize user roles
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.userRole)) {
      return res.status(401).json({
        success: false,
        message: `${req.user.userRole} is not allowed to access this resource`,
      });
    }
    next();
  };
};

// Export all functions
module.exports = {
  authenticated,
  isAuth,
  isAdmin,
  authorizeRoles,
};

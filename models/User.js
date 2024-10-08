const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 32,
      required: true,
    },

    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: String,
    },

    address: {
      type: String,
    },

    userImage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
    },

    verified: {
      type: Boolean,
      default: false,
    },

    secretKey: {
      type: String,
      default: null,
    },

    history: {
      type: [String],
      default: [],
    },

    userRole: {
      type: Number,
      default: 1,
      required: true,
    },

    wishlistProduct: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        select: false,
      },
    ],
  },

  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;

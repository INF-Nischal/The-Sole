const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },

    productDescription: {
      type: String,
      required: true,
    },

    productPrice: {
      type: Number,
      required: true,
    },

    productSold: {
      type: Number,
      default: 0,
    },

    productQuantity: {
      type: Number,
      default: 0,
    },

    productCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },

    productImageUrlList: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
    },

    productOffer: {
      type: String,
      default: null,
    },

    productStatus: {
      type: String,
      enum: ["in stock", "out of stock"],
      required: true,
    },
  },

  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;

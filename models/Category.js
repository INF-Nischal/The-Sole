const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },

    categoryDescription: {
      type: String,
    },

    categoryImageURL: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
    },

    categoryStatus: {
      type: String,
    },
  },

  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;

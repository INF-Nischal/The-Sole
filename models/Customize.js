const mongoose = require("mongoose");

const customizeSchema = new mongoose.Schema(
  {
    slideImage: {
      type: String,
    },

    firstShow: {
      type: Number,
      default: 0,
    },
  },

  { timestamps: true }
);

const Customize = mongoose.model("Customize", customizeSchema);
module.exports = Customize;

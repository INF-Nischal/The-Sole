const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    public_id: { type: String, required: true },
    url: { type: String, required: true },
  },
  { timestamp: true }
);

const Image = mongoose.model("Image", imageSchema);
module.exports = Image;

const Image = require("../models/Image");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAllImages = async (req, res) => {
  try {
    const images = await Image.find();

    if (!images) {
      return res.status(404).json({ message: "No images found" });
    }

    return res.status(200).json({ images });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getImageById = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    return res.status(200).json({ image });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const uploadImage = async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ message: "No image found" });
    }

    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: "sole",
      width: 300,
      height: 300,
      crop: "fill",
    });

    const imageURL = uploadResponse.secure_url;

    const publicIdParts = imageURL.split("/");
    const publicId = publicIdParts[publicIdParts.length - 1].split(".")[0];
    const newImage = { public_id: publicId, url: imageURL };

    await Image.create(newImage);

    return res.status(201).json({ newImage });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteImageById = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    await cloudinary.uploader.destroy(image.public_id);

    await Image.findByIdAndDelete(req.params.id);

    return res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllImages,
  getImageById,
  uploadImage,
  deleteImageById,
};

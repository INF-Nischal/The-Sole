const express = require("express");
const router = express.Router();

const {
  getImageById,
  getAllImages,
  uploadImage,
  deleteImageById,
} = require("../controllers/imageControllers");
const { authenticated } = require("../middlewares/authMiddleware");

router.get("/images", getAllImages);

router.get("/images/:id", getImageById);

router.post("/images", authenticated, uploadImage);

router.delete("/images/:id", authenticated, deleteImageById);

module.exports = router;

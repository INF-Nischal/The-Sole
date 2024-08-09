const express = require("express");
const router = express.Router();
// const multer = require("multer");
const {
  getCategoryById,
  addNewCategory,
  deleteCategoryById,
  updateCategoryById,
  getAllCategories,
} = require("../controllers/categoryControllers");
const { authenticated } = require("../middlewares/authMiddleware");

// Image Upload setting
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/uploads/categories");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "_" + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

router.get("/categories", getAllCategories);

router.get("/categories/:id", getCategoryById);

router.post("/categories", authenticated, addNewCategory);

router.put("/categories/:id", authenticated, updateCategoryById);

router.delete("/categories/:id", authenticated, deleteCategoryById);

module.exports = router;

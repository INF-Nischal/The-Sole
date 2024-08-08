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

router.post("/categories", addNewCategory);

router.put("/categories/:id", updateCategoryById);

router.delete("/categories/:id", deleteCategoryById);

module.exports = router;

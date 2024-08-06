// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const {
//   getAllCategory,
//   getProductCategory,
//   addNewCategory,
//   updateCategory,
//   deleteCategory,
// } = require("../controllers/categoryControllers");

// // Image Upload setting
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/uploads/categories");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "_" + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// router.get("/categories", getAllCategory);

// router.post("/categories/addCategory", addNewCategory);

// router.put("/categories/:id", updateCategory);

// router.delete("/categories/:id", deleteCategory);

// module.exports = router;

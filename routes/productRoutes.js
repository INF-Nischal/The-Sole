const express = require("express");
const router = express.Router();
// const multer = require("multer");
// const { authenticated, authorizeRoles } = require("../middlewares/auth");
const {
  getAllProducts,
  getProductById,
  addProduct,
  updateProductById,
  deleteProductById,
  getAllCategoryProduct,
  getProductsByTimeframe,
  //   getProductByCategory,
  //   getProductByPrice,
  //   uploadImage,
  //   addReview,
  //   deleteReview,
} = require("../controllers/productControllers.js");
const { authenticated } = require("../middlewares/authMiddleware.js");

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/uploads/products");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "_" + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

router.get("/products/analytics", getProductsByTimeframe);
router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);
router.post("/products", authenticated, addProduct);
router.put("/products/:id", authenticated, updateProductById);
router.delete("/products/:id", authenticated, deleteProductById);

router.get(
  "/products/category/:categoryId",
  authenticated,
  getAllCategoryProduct
);
// router.post("/product-by-category", getProductByCategory);

// router.get("/products/price", getProductByPrice);

// //Image Upload not specific for which product
// router.post("/uploadImage", uploadImage);

// router.post("/products/:id/reviews", addReview);
// router.delete("/products/:id/reviews/:reviewId", deleteReview);

module.exports = router;

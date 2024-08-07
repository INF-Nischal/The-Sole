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
  //   getAllCategoryProduct,
  //   getProductByCategory,
  //   getProductByPrice,
  //   uploadImage,
  //   addReview,
  //   deleteReview,
} = require("../controllers/productControllers.js");

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/uploads/products");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "_" + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);
router.post("/products", addProduct);
router.put("/products/:id", updateProductById);
router.delete("/products/:id", deleteProductById);

// router.get("/:categoryId", getAllCategoryProduct);
// router.post("/product-by-category", getProductByCategory);

// router.get("/products/price", getProductByPrice);

// //Image Upload not specific for which product
// router.post("/uploadImage", uploadImage);

// router.post("/products/:id/reviews", addReview);
// router.delete("/products/:id/reviews/:reviewId", deleteReview);

module.exports = router;

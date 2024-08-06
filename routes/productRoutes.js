// const express = require("express");
// const router = express.Router();
// const productcontrollers = require("../controllers/productcontrollers");
// const multer = require("multer");
// const { authenticated, authorizeRoles } = require("../middlewares/auth");

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/uploads/products");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "_" + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// router.get("/products", productcontrollers.getAllProducts);
// router.get("/products/:id", productcontrollers.getProductById);
// router.post("/products", authenticated, productcontrollers.addProduct);
// router.put("/products/:id", upload.any(), productcontrollers.updateProductById);
// router.delete("/products/:id", productcontrollers.deleteProductById);

// router.get("/:categoryId", productcontrollers.getAllCategoryProduct);
// router.post("/product-by-category", productcontrollers.getProductByCategory);

// router.get("/products/price", productcontrollers.getProductByPrice);

// //Image Upload not specific for which product
// router.post("/uploadImage", productcontrollers.uploadImage);

// router.post(
//   "/products/:id/reviews",
//   authenticated,
//   productcontrollers.addReview
// );
// router.delete(
//   "/products/:id/reviews/:reviewId",
//   authenticated,
//   productcontrollers.deleteReview
// );

// module.exports = router;

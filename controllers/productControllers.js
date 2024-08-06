// const Product = require("../models/Product.js");
// const cloudinary = require("../middlewares/cloudinaryMiddleware");
// const fs = require("fs");
// const path = require("path");

// const deleteImages = (images, mode) => {
//   const basePath =
//     path.resolve(__dirname + "../../") + "/public/uploads/products/";
//   console.log(basePath);
//   images.forEach((image) => {
//     let filePath =
//       mode === "file" ? basePath + `${image.filename}` : basePath + `${image}`;
//     console.log(filePath);
//     if (fs.existsSync(filePath)) {
//       console.log("Image exists");
//     }
//     fs.unlink(filePath, (err) => {
//       if (err) {
//         return err;
//       }
//     });
//   });
// };

// const getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find()
//       .populate("productCategory")
//       .sort({ _id: -1 });
//     if (products) {
//       return res.json({
//         success: true,
//         message: "Product fetched successfully",
//         data: products,
//       });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

// const getAllCategoryProduct = async (req, res) => {
//   try {
//     const products = await Product.find({
//       productCategory: req.params.categoryId,
//     })
//       .populate("productCategory")
//       .sort({ _id: -1 });
//     if (products) {
//       return res.json({
//         success: true,
//         message: "Product fetched successfully",
//         data: products,
//       });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

// const deleteProductById = async (req, res) => {
//   const { pId } = req.body;
//   if (!pId) {
//     return res.json({ error: "All fields must be required" });
//   } else {
//     try {
//       const deleteProductObj = await Product.findById(pId);
//       const deleteProduct = await Product.findByIdAndDelete(pId);
//       if (deleteProduct) {
//         deleteImages(deleteProductObj.pImages, "string");
//         return res.json({ success: "Product deleted successfully" });
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   }
// };

// const getProductById = async (req, res) => {
//   const { pId } = req.body;
//   if (!pId) {
//     return res.json({ error: "All fields must be required" });
//   } else {
//     try {
//       const singleProduct = await Product.findById(pId)
//         .populate("pCategory", "cName")
//         .populate("pRatingsReviews.user", "name email userImage");
//       if (singleProduct) {
//         return res.json({ Product: singleProduct });
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   }
// };

// const addProduct = async (req, res) => {
//   console.log(req.user._id);
//   console.log(req.user);

//   const formImage = req.files.images;
//   const imagePath = formImage.tempFilePath;

//   if (formImage) {
//     try {
//       const productImageList = await cloudinary.upload_image(
//         imagePath,
//         "products"
//       );
//       const {
//         productName,
//         productDescription,
//         productPrice,
//         productQuantity,
//         productCategory,
//         productOffer,
//         productStatus,
//       } = req.body;

//       const exist = await Product.findOne({ productName });
//       if (exist) {
//         return res.status(400).json({
//           success: false,
//           message: "Product name already exists",
//         });
//       }

//       const product = await Product.create({
//         productImageUrlList: [productImageList],
//         productName,
//         productDescription,
//         productPrice,
//         productQuantity,
//         productCategory,
//         productOffer,
//         productStatus,
//       });
//       res.status(200).json({
//         success: true,
//         message: "Product created successfully!",
//         data: product,
//       });
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   } else {
//     return res.status(500).json({
//       success: false,
//       message: "Product image is required",
//     });
//   }
// };

// const updateProductById = async (req, res) => {
//   const {
//     pId,
//     pName,
//     pDescription,
//     pPrice,
//     pQuantity,
//     pCategory,
//     pOffer,
//     pStatus,
//     pImages,
//   } = req.body;
//   const editImages = req.files;

//   if (
//     !pId ||
//     !pName ||
//     !pDescription ||
//     !pPrice ||
//     !pQuantity ||
//     !pCategory ||
//     !pOffer ||
//     !pStatus
//   ) {
//     return res.json({ error: "All fields must be required" });
//   } else if (pName.length > 255 || pDescription.length > 3000) {
//     return res.json({
//       error:
//         "Name must not exceed 255 characters & Description must not exceed 3000 characters",
//     });
//   } else if (editImages && editImages.length == 1) {
//     deleteImages(editImages, "file");
//     return res.json({ error: "Must provide 2 images" });
//   } else {
//     let editData = {
//       pName,
//       pDescription,
//       pPrice,
//       pQuantity,
//       pCategory,
//       pOffer,
//       pStatus,
//     };
//     if (editImages.length == 2) {
//       const allEditImages = editImages.map((img) => img.filename);
//       editData = { ...editData, pImages: allEditImages };
//       deleteImages(pImages.split(","), "string");
//     }
//     try {
//       const editProduct = await Product.findByIdAndUpdate(pId, editData);
//       if (editProduct) {
//         return res.json({ success: "Product edited successfully" });
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   }
// };

// const getProductByCategory = async (req, res) => {
//   const { catId } = req.body;
//   if (!catId) {
//     return res.json({ error: "All fields must be required" });
//   } else {
//     try {
//       const products = await Product.find({ productCategory: catId }).populate(
//         "pCategory",
//         "cName"
//       );
//       if (products) {
//         return res.json({ Products: products });
//       }
//     } catch (err) {
//       return res.json({ error: "Search product wrong" });
//     }
//   }
// };

// const getProductByPrice = async (req, res) => {
//   const { price } = req.body;
//   if (!price) {
//     return res.json({ error: "All fields must be required" });
//   } else {
//     try {
//       const products = await Product.find({ pPrice: { $lt: price } })
//         .populate("pCategory", "cName")
//         .sort({ pPrice: -1 });
//       if (products) {
//         return res.json({ Products: products });
//       }
//     } catch (err) {
//       return res.json({ error: "Filter product wrong" });
//     }
//   }
// };

// const getCartProducts = async (req, res) => {
//   const { productArray } = req.body;
//   if (!productArray) {
//     return res.json({ error: "All fields must be required" });
//   } else {
//     try {
//       const cartProducts = await Product.find({ _id: { $in: productArray } });
//       if (cartProducts) {
//         return res.json({ Products: cartProducts });
//       }
//     } catch (err) {
//       return res.json({ error: "Cart product wrong" });
//     }
//   }
// };

// const addReview = async (req, res) => {
//   const { pId, uId, rating, review } = req.body;
//   if (!pId || !rating || !review || !uId) {
//     return res.json({ error: "All fields must be required" });
//   } else {
//     try {
//       const checkReviewRatingExists = await Product.findOne({ _id: pId });
//       if (
//         checkReviewRatingExists.pRatingsReviews.some(
//           (item) => item.user.toString() === uId
//         )
//       ) {
//         return res.json({ error: "You already reviewed the product" });
//       }
//       await Product.findByIdAndUpdate(pId, {
//         $push: { pRatingsReviews: { review, user: uId, rating } },
//       });
//       return res.json({ success: "Thanks for your review" });
//     } catch (err) {
//       return res.json({ error: "Add review failed" });
//     }
//   }
// };

// const deleteReview = async (req, res) => {
//   const { rId, pId } = req.body;
//   if (!rId) {
//     return res.json({ message: "All fields must be required" });
//   } else {
//     try {
//       await Product.findByIdAndUpdate(pId, {
//         $pull: { pRatingsReviews: { _id: rId } },
//       });
//       return res.json({ success: "Your review is deleted" });
//     } catch (err) {
//       console.log(err);
//     }
//   }
// };

// const uploadImage = async (req, res) => {
//   try {
//     const result = await cloudinary.uploader.upload(
//       req.files.productImageUrlList.tempFilePath,
//       {
//         use_filename: true,
//         unique_filename: false,
//         folder: "gypsy/products",
//       }
//     );
//     fs.unlinkSync(req.files.productImageUrlList.tempFilePath);
//     res.status(200).json({
//       success: true,
//       message: "Image uploaded successfully!",
//       data: result.secure_url,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// module.exports = {
//   deleteImages,
//   getAllProducts,
//   getAllCategoryProduct,
//   deleteProductById,
//   getProductById,
//   addProduct,
//   updateProductById,
//   getProductByCategory,
//   getProductByPrice,
//   getCartProducts,
//   addReview,
//   deleteReview,
//   uploadImage,
// };

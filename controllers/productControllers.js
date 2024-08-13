const Product = require("../models/Product.js");

const cloudinary = require("../middlewares/cloudinaryMiddleware");
// const fs = require("fs");
const path = require("path");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("productCategory")
      .populate("productImageUrlList");

    if (!products) {
      return res.status(404).json({ error: "No products found" });
    }

    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("productCategory")
      .populate("productImageUrlList");

    if (!product) {
      return res
        .status(404)
        .json({ error: "Product not found", success: false });
    }

    return res.status(200).json({ product, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const { productName, ...product } = req.body;

    const existingProduct = await Product.findOne({ productName });

    if (!existingProduct) {
      await Product.create({ productName: productName, ...product });

      return res
        .status(201)
        .json({ message: "Product added successfully", success: true });
    }

    return res
      .status(400)
      .json({ error: "Product already exists", success: false });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

const updateProductById = async (req, res) => {
  try {
    const existingProduct = await Product.findById(req.params.id);

    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    await Product.findByIdAndUpdate(req.params.id, req.body);

    return res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const existingProduct = await Product.findById(req.params.id);

    if (!existingProduct) {
      return res
        .status(404)
        .json({ message: "Product not found", success: false });
    }

    await Product.findByIdAndDelete(req.params.id);

    return res
      .status(200)
      .json({ message: "Product deleted successfully", success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

const getAllCategoryProduct = async (req, res) => {
  try {
    const products = await Product.find({
      productCategory: req.params.categoryId,
    }).populate("productCategory");

    if (!products) {
      return res.status(404).json({ error: "No products found" });
    }

    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

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
//     } catch (error) {
//       return res.json({ message: error.message });
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

module.exports = {
  //   deleteImages,
  getAllProducts,
  getProductById,
  addProduct,
  updateProductById,
  deleteProductById,
  getAllCategoryProduct,
  //   getProductByCategory,
  //   getProductByPrice,
  //   getCartProducts,
  //   addReview,
  //   deleteReview,
  //   uploadImage,
};

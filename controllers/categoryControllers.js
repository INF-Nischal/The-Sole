// const cloudinary = require("../middlewares/cloudinaryMiddlware");
// const Category = require("../models/Category");
// const fs = require("fs");

// const getAllCategory = async (req, res) => {
//   try {
//     const categories = await Category.find({}).sort({ _id: -1 });

//     if (categories) {
//       return res.status(200).json({
//         data: categories,
//       });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

// const getProductCategory = async (req, res) => {
//   try {
//     let categories = await Category.find({
//       categoryName: req.body.categoryName,
//     }).sort({ _id: -1 });
//     if (categories) {
//       return res.status(200).json({
//         success: true,
//         message: "Category Fetched Successfully",
//         data: categories,
//       });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

// const addNewCategory = async (req, res) => {
//   const formImage = req.files.image;
//   const imagePath = formImage.tempFilePath;

//   if (formImage) {
//     try {
//       const categoryImageURL = await cloudinary.upload_image(
//         imagePath,
//         "categories"
//       );

//       const { categoryName, categoryDescription, categoryStatus } = req.body;

//       const exist = await Category.findOne({ categoryName });
//       if (exist) {
//         return res.status(400).json({
//           success: false,
//           message: "Category name already exists",
//         });
//       }

//       const category = await Category.create({
//         categoryImageURL: categoryImageURL,
//         categoryName,
//         categoryDescription,
//         categoryStatus,
//       });

//       res.status(200).json({
//         success: true,
//         message: "Category created successfully!",
//         data: category,
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
//       message: "Category Image is required",
//     });
//   }
// };

// const updateCategory = async (req, res) => {
//   let { categoryName, categoryDescription, categoryStatus } = req.body;
//   if (!categoryName || !categoryDescription || !categoryStatus) {
//     return res.json({ error: "All fields must be required" });
//   }
//   try {
//     let editCategory = Category.findByIdAndUpdate(categoryName, {
//       categoryDescription,
//       categoryStatus,
//     });
//     let edit = await editCategory.exec();
//     if (edit) {
//       return res.json({ success: "Category edited successfully" });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

// const deleteCategory = async (req, res) => {
//   let { cId } = req.body;
//   if (!cId) {
//     return res.json({ error: "All fields must be required" });
//   } else {
//     try {
//       let deletedCategoryFile = await Category.findById(cId);
//       const filePath = `../server/public/uploads/categories/${deletedCategoryFile.categoryImageURL}`;

//       let deleteCategory = await Category.findByIdAndDelete(cId);
//       if (deleteCategory) {
//         fs.unlink(filePath, (err) => {
//           if (err) {
//             console.log(err);
//           }
//           return res.json({ success: "Category deleted successfully" });
//         });
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   }
// };

// module.exports = {
//   getAllCategory,
//   getProductCategory,
//   addNewCategory,
//   updateCategory,
//   deleteCategory,
// };

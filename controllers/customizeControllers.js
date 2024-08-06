// const fs = require("fs");
// const Category = require("../models/Category");
// const Product = require("../models/Product");
// const Order = require("../models/Order");
// const User = require("../models/User");
// const Customize = require("../models/Customize");

// async function getImages(req, res) {
//   try {
//     const images = await Customize.find({});
//     if (images) {
//       return res.json({ images });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// }

// async function uploadSlideImage(req, res) {
//   let image = req.file.filename;
//   if (!image) {
//     return res.json({ error: "All field required" });
//   }
//   try {
//     let newCustomzie = new Customize({
//       slideImage: image,
//     });
//     let save = await newCustomzie.save();
//     if (save) {
//       return res.json({ success: "Image upload successfully" });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// }

// async function deleteSlideImage(req, res) {
//   let { id } = req.body;
//   if (!id) {
//     return res.json({ error: "All field required" });
//   } else {
//     try {
//       let deletedSlideImage = await Customize.findById(id);
//       const filePath = `../server/public/uploads/customize/${deletedSlideImage.slideImage}`;

//       let deleteImage = await Customize.findByIdAndDelete(id);
//       if (deleteImage) {
//         // Delete Image from uploads -> customizes folder
//         fs.unlink(filePath, (err) => {
//           if (err) {
//             console.log(err);
//           }
//           return res.json({ success: "Image deleted successfully" });
//         });
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   }
// }

// async function getAllData(req, res) {
//   try {
//     let Categories = await Category.find({}).count();
//     let Products = await Product.find({}).count();
//     let Orders = await Order.find({}).count();
//     let Users = await User.find({}).count();
//     if (Categories && Products && Orders) {
//       return res.json({ Categories, Products, Orders, Users });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// }

// module.exports = {
//   getImages,
//   uploadSlideImage,
//   deleteSlideImage,
//   getAllData,
// };

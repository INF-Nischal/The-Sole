// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const {
//   getImages,
//   uploadSlideImage,
//   deleteSlideImage,
//   getAllData,
// } = require("../controllers/customizecontrollers");

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/uploads/customize");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "_" + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// router.get("/get-slide-image", getImages);

// router.post("/delete-slide-image", deleteSlideImage);

// router.post("/upload-slide-image", upload.single("image"), uploadSlideImage);

// router.post("/dashboard-data", getAllData);

// module.exports = router;

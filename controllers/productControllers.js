const Product = require("../models/Product.js");

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

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProductById,
  deleteProductById,
  getAllCategoryProduct,
};

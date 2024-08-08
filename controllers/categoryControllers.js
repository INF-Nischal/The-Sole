// const cloudinary = require("../middlewares/cloudinaryMiddlware");
const Category = require("../models/Category");
// const fs = require("fs");

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    if (!categories) {
      return res.status(404).json({ message: "No categories found" });
    }

    return res.status(200).json({ categories });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json({ category });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addNewCategory = async (req, res) => {
  try {
    const existingCategory = await Category.findOne({
      categoryName: req.body.categoryName,
    });

    if (!existingCategory) {
      await Category.create(req.body);

      return res.status(201).json({ message: "Category created successfully" });
    }

    return res.status(409).json({ message: "Category already exists" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateCategoryById = async (req, res) => {
  try {
    const existingCategory = await Category.findById(req.params.id);

    if (!existingCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    await Category.findByIdAndUpdate(req.params.id, req.body);

    return res.status(200).json({ message: "Category updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteCategoryById = async (req, res) => {
  try {
    const existingCategory = await Category.findById(req.params.id);

    if (!existingCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    await Category.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  addNewCategory,
  updateCategoryById,
  deleteCategoryById,
};

const Category = require("../models/Category");

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate("categoryImageURL");

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
    const category = await Category.findById(req.params.id).populate(
      "categoryImageURL"
    );

    if (!category) {
      return res
        .status(404)
        .json({ message: "Category not found", success: false });
    }

    return res.status(200).json({ category, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

const addNewCategory = async (req, res) => {
  try {
    const existingCategory = await Category.findOne({
      categoryName: req.body.categoryName,
    });

    if (!existingCategory) {
      await Category.create(req.body);

      return res
        .status(201)
        .json({ message: "Category created successfully", success: true });
    }

    return res
      .status(409)
      .json({ message: "Category already exists", success: false });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

const updateCategoryById = async (req, res) => {
  try {
    const existingCategory = await Category.findById(req.params.id);

    if (!existingCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    await Category.findByIdAndUpdate(req.params.id, req.body);

    return res
      .status(200)
      .json({ message: "Category updated successfully", success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

const deleteCategoryById = async (req, res) => {
  try {
    const existingCategory = await Category.findById(req.params.id);

    if (!existingCategory) {
      return res
        .status(404)
        .json({ message: "Category not found", success: false });
    }

    await Category.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ message: "Category deleted successfully", success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  addNewCategory,
  updateCategoryById,
  deleteCategoryById,
};

const Category = require("../models/Category");

const getCategoriesByTimeframe = async (req, res) => {
  try {
    const queryTime = req.query.time;

    let query = {};

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Start of this week (Sunday)

    const startOfMonth = new Date(today);
    startOfMonth.setDate(1); // Start of this month (1st day of the month)

    const startOfYear = new Date(today);
    startOfYear.setMonth(0, 1); // Start of the year (Jan 1st)

    if (queryTime.toLowerCase() === "all") {
      query = {}; // No date filter, fetch all categories
    } else if (queryTime.toLowerCase() === "today") {
      query = { createdAt: { $gte: today } }; // Fetch categories created today
    } else if (queryTime.toLowerCase() === "week") {
      query = { createdAt: { $gte: startOfWeek } }; // Fetch categories created this week
    } else if (queryTime.toLowerCase() === "month") {
      query = { createdAt: { $gte: startOfMonth } }; // Fetch categories created this month
    } else if (queryTime.toLowerCase() === "year") {
      query = { createdAt: { $gte: startOfYear } }; // Fetch categories created this year
    } else {
      return res.status(400).json({ message: "Invalid analytics type" });
    }

    // Fetch categories based on the query
    const categories = await Category.find(query);

    return res.status(200).json({ categories });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

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
  getCategoriesByTimeframe,
  getAllCategories,
  getCategoryById,
  addNewCategory,
  updateCategoryById,
  deleteCategoryById,
};

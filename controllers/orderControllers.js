const Order = require("../models/Order");
const Cart = require("../models/Cart");

const getOrdersByTimeframe = async (req, res) => {
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
      query = {}; // No date filter, fetch all orders
    } else if (queryTime.toLowerCase() === "today") {
      query = { createdAt: { $gte: today } }; // Fetch orders created today
    } else if (queryTime.toLowerCase() === "week") {
      query = { createdAt: { $gte: startOfWeek } }; // Fetch orders created this week
    } else if (queryTime.toLowerCase() === "month") {
      query = { createdAt: { $gte: startOfMonth } }; // Fetch orders created this month
    } else if (queryTime.toLowerCase() === "year") {
      query = { createdAt: { $gte: startOfYear } }; // Fetch orders created this year
    } else {
      return res.status(400).json({ message: "Invalid analytics type" });
    }

    // Fetch orders based on the query
    const orders = await Order.find(query);

    const totalSale = orders.reduce((sum, order) => sum + order.totalPrice, 0);

    return res.status(200).json({ orders: orders, totalSale: totalSale });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId")
      .populate({
        path: "products.productId",
        populate: {
          path: "productImageUrlList",
          model: "Image",
        },
      });

    if (!orders) {
      return res.status(404).json({ message: "No orders found" });
    }

    return res.status(200).json({ orders });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("userId")
      .populate({
        path: "products.productId",
        populate: {
          path: "productImageUrlList",
          model: "Image",
        },
      });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({ order });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const userOrders = await Order.find({ userId: req.params.userId });

    if (!userOrders) {
      return res.status(404).json({ message: "No orders found" });
    }

    return res.status(200).json({ userOrders });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addNewOrder = async (req, res) => {
  try {
    const cart = await Cart.find({ userId: req.params.userId }).populate(
      "productId"
    );

    if (!cart || cart.length === 0) {
      return res.status(404).json({ message: "Cart not found or is empty!" });
    }

    const products = cart.map((item) => ({
      productId: item.productId._id,
      orderedQty: item.quantity,
      price: item.productId.productPrice,
    }));

    const totalPrice = products.reduce(
      (sum, product) => sum + product.price * product.orderedQty,
      0
    );

    const newOrder = new Order({
      userId: req.params.userId,
      products: products,
      totalPrice: totalPrice,
      ...req.body,
    });

    await newOrder.save();

    await Cart.deleteMany({ userId: req.params.userId });

    return res.status(201).json({
      message: "Order Created Successfully!",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found", success: false });
    }

    order.deliveryStatusMessage =
      req.body.deliveryStatusMessage || order.deliveryStatusMessage;

    const updatedOrder = await order.save();

    return res.status(200).json({
      message: "Order updated successfully",
      updatedOrder,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

const deleteOrderById = async (req, res) => {
  try {
    const existingOrder = await Order.findById(req.params.id);

    if (!existingOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    await Order.findByIdAndDelete(req.params.id);

    return res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getOrdersByTimeframe,
  getAllOrders,
  getOrderById,
  getUserOrders,
  addNewOrder,
  updateOrderById,
  deleteOrderById,
};

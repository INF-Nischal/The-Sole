const Order = require("../models/Order");
const Cart = require("../models/Cart");

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("products.productId");

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
    const order = await Order.findById(req.params.id);

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

    console.log(cart);

    if (!cart || cart.length === 0) {
      return res.status(404).json({ message: "Cart not found or is empty!" });
    }

    const products = cart.map((item) => ({
      productId: item.productId._id,
      orderderQty: item.quantity,
      price: item.productId.productPrice,
    }));

    const totalPrice = products.reduce(
      (sum, product) => sum + product.price * product.orderderQty,
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
      return res.status(404).json({ message: "Order not found" });
    }

    order.deliveryStatusMessage =
      req.body.deliveryStatusMessage || order.deliveryStatusMessage;

    const updatedOrder = await order.save();

    return res
      .status(200)
      .json({ message: "Order updated successfully", updatedOrder });
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
  getAllOrders,
  getOrderById,
  getUserOrders,
  addNewOrder,
  updateOrderById,
  deleteOrderById,
};

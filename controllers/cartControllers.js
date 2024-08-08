const Cart = require("../models/Cart");

const getAllCart = async (req, res) => {
  try {
    const carts = await Cart.find().populate("userId").populate("productId");
    return res.status(200).json({ carts });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getCartById = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id)
      .populate("userId")
      .populate("productId");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found!" });
    }

    return res.status(200).json({ cart });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getCartByUserId = async (req, res) => {
  try {
    const userCart = await Cart.find({ userId: req.params.userId })
      .populate("userId")
      .populate("productId");

    if (!userCart) {
      return res.status(404).json({ message: "Cart not found!" });
    }

    return res.status(200).json({ userCart });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addNewCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const existingCart = await Cart.findOne({ userId, productId });

    if (!existingCart) {
      await Cart.create(req.body);
      return res.status(201).json({ message: "Cart created successfully!" });
    }

    existingCart.quantity += quantity;
    await existingCart.save();

    return res.status(201).json({ message: "Cart updated successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateCartById = async (req, res) => {
  try {
    const existingCart = await Cart.findById(req.params.id);

    if (!existingCart) {
      return res.status(404).json({ message: "Cart not found!" });
    }

    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: { quantity: req.body.quantity },
      },
      { new: true }
    );

    return res.status(200).json(updatedCart);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteCartById = async (req, res) => {
  try {
    const existingCart = await Cart.findById(req.params.id);

    if (!existingCart) {
      return res.status(404).json({ message: "Cart not found!" });
    }

    await Cart.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Cart deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCart,
  getCartById,
  getCartByUserId,
  addNewCart,
  updateCartById,
  deleteCartById,
};

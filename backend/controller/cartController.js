const Cart = require("../modules/cart");

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Check if already in cart
    const existing = await Cart.findOne({ userId, productId });

    if (existing) {
      existing.quantity += quantity || 1;
      await existing.save();
      return res.status(200).json({ message: "Cart updated", cart: existing });
    }

    const newCart = new Cart({ userId, productId, quantity });
    await newCart.save();
    res.status(201).json({ message: "Added to cart", cart: newCart });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding to cart", error: err.message });
  }
};

// Update cart item
const updateCartItem = async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const { quantity } = req.body;

    const updated = await Cart.findByIdAndUpdate(
      cartItemId,
      { quantity },
      { new: true }
    );

    res.status(200).json({ message: "Cart item updated", cart: updated });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating cart item", error: err.message });
  }
};

// Delete cart item
const deleteCartItem = async (req, res) => {
  try {
    const { cartItemId } = req.params;

    await Cart.findByIdAndDelete(cartItemId);

    res.status(200).json({ message: "Item removed from cart" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting cart item", error: err.message });
  }
};

// Get all cart items for user
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cartItems = await Cart.find({ userId }).populate("productId");
    res.status(200).json(cartItems);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching cart", error: err.message });
  }
};

module.exports = { addToCart, updateCartItem, deleteCartItem, getUserCart };

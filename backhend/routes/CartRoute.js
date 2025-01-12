const express = require('express');
const router = express.Router();
const CartItem = require('../models/cartItem');

// Add item to the cart
router.post('/add', async (req, res) => {
  try {
    const { name, price, image, quantity, description } = req.body;

    const newItem = new CartItem({ name, price, image, quantity, description });
    await newItem.save();

    res.status(201).json({ message: 'Item added to cart', newItem });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
});

// Get all items in the cart
router.get('/', async (req, res) => {
  try {
    const items = await CartItem.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cart items' });
  }
});

// Update item quantity
router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const updatedItem = await CartItem.findByIdAndUpdate(
      id,
      { quantity },
      { new: true }
    );

    res.status(200).json({ message: 'Item quantity updated', updatedItem });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update item quantity' });
  }
});

// Remove item from the cart
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await CartItem.findByIdAndDelete(id);
    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
});

module.exports = router;

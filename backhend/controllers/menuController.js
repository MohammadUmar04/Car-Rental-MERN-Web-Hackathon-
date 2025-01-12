const Menu = require('../models/menuModels');
const getMenuItems = async (req, res) => {
  try {
    const menuItems = await Menu.find();
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const addMenuItem = async (req, res) => {
  const { name, description, price, image } = req.body;

  try {
    const newMenuItem = await Menu.create({ name, description, price, image });
    res.status(201).json(newMenuItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const deleteMenuItem = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItem = await Menu.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.status(200).json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting menu item' });
  }
};


module.exports = { getMenuItems, addMenuItem, deleteMenuItem };


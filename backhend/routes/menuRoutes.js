    const express = require('express');
    const { getMenuItems, addMenuItem, deleteMenuItem } = require('../controllers/menuController');

    const router = express.Router();

    router.get('/', getMenuItems); // Get all menu items
    router.post('/', addMenuItem); // Add new menu item
    router.delete('/:id', deleteMenuItem); // Delete a menu item by id

    module.exports = router;

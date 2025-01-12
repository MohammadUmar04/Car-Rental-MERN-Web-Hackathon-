'use client';
import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext'; 

const AdminPage = () => {
  const [menuItem, setMenuItem] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
  });

  const [menuItems, setMenuItems] = useState([]);
  const { removeMenuItem } = useContext(CartContext); 
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/menu');
        if (response.ok) {
          const data = await response.json();
          // Ensure every item has a unique id
          const updatedData = data.map((item) => ({
            ...item,
            id: item.id || `temp-id-${Date.now()}-${Math.random()}`,
          }));
          setMenuItems(updatedData);
        } else {
          console.error('Failed to fetch menu items');
        }
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenuItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(menuItem),
      });

      if (response.ok) {
        alert('Menu item added successfully!');
        setMenuItem({ name: '', description: '', price: '', image: '' });
        const newMenuItem = await response.json();
        // Assign a unique id if missing
        newMenuItem.id = newMenuItem.id || `temp-id-${Date.now()}-${Math.random()}`;
        setMenuItems((prev) => [...prev, newMenuItem]);
      } else {
        alert('Error adding menu item.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Server error. Please try again later.');
    }
  };

  const handleDelete = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/menu/${itemId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Menu item deleted successfully!');
        setMenuItems((prev) => prev.filter((item) => item.id !== itemId));
        removeMenuItem(itemId); 
      } else {
        alert('Error deleting menu item.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Server error. Please try again later.');
    }
  };


  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Add Menu Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Name:</label>
          <input
            type="text"
            name="name"
            value={menuItem.name}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block font-medium">Description:</label>
          <textarea
            name="description"
            value={menuItem.description}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>
        <div>
          <label className="block font-medium">Price:</label>
          <input
            type="number"
            name="price"
            value={menuItem.price}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block font-medium">Image URL:</label>
          <input
            type="text"
            name="image"
            value={menuItem.image}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Add Item
        </button>
      </form>
      <section className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Menu Items</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={item.image}
                alt={item.name}
                className="rounded-t-lg h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                <p className="text-gray-600 text-sm mt-2">{item.description}</p>
                <p className="text-gray-800 font-bold mt-2">${item.price}</p>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="mt-4 w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminPage;

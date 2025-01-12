'use client';
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext.js';
import Navbar from '../(Navbar)/page';
import Footer from '../(Footer)/page';

const Cart = () => {
  const { cart, updateQuantity } = useContext(CartContext);

  const handleBuy = async (item) => {
    try {
      const response = await fetch('http://localhost:5000/api/buy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(`Successfully bought ${item.name}!`);
      } else {
        alert(data.error || 'An error occurred while processing your purchase.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while trying to buy the item.');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-center mb-8">Your Cart</h2>
        {cart.length === 0 ? (
          <p className="text-center">Your cart is empty!</p>
        ) : (
          <div className="space-y-8">
            {cart.map((item, index) => (
              <div
                key={item.id || index}
                className="bg-white rounded-lg shadow-md p-4"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div>
                    <label htmlFor={`quantity-${item.id}`} className="mr-2">
                      Quantity:
                    </label>
                    <input
                      id={`quantity-${item.id}`}
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      className="border px-2 py-1 rounded w-16"
                    />
                  </div>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    onClick={() => handleBuy(item)}
                  >
                    Buy
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Cart;

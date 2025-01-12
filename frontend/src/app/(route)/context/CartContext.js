'use client';

import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = async (item) => {
    try {
      const response = await fetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });

      const data = await response.json();

      if (response.ok) {
        const existingItem = cart.find((cartItem) => cartItem.id === item.id);
        if (existingItem) {
          setCart(
            cart.map((cartItem) =>
              cartItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            )
          );
        } else {
          setCart([...cart, { ...item, quantity: 1 }]);
        }
      } else {
        console.error('Failed to add item:', data.error);
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  // Update quantity of an item in the cart
  const updateQuantity = (id, quantity) => {
    setCart(
      cart.map((cartItem) =>
        cartItem.id === id ? { ...cartItem, quantity } : cartItem
      )
    );
  };

  // Remove item from the cart
  const removeItemFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeItemFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

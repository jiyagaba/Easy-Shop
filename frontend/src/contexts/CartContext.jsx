import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Get user id dynamically from localStorage
  const getUserId = () => {
    try {
      const user = localStorage.getItem('user');
      if (!user) return null;
      const userObj = JSON.parse(user);
      return userObj.id || null;
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      return null;
    }
  };

  const USER_ID = getUserId();

  // Fetch cart items from backend on mount and when USER_ID changes
  useEffect(() => {
    if (!USER_ID) return;
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/cart?user_id=${USER_ID}`);
        if (!response.ok) throw new Error('Failed to fetch cart items');
        const data = await response.json();
        setCartItems(data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
    fetchCartItems();
  }, [USER_ID]);

  const addToCart = async (product, quantity = 1) => {
    if (!USER_ID) {
      alert('User not logged in');
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: USER_ID, product_id: product.id, quantity }),
      });
      if (!response.ok) throw new Error('Failed to add to cart');
      const updatedCart = await response.json();
      setCartItems(updatedCart);
      alert('Product added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart. Please try again.');
    }
  };

  const removeFromCart = async (productId) => {
    if (!USER_ID) {
      alert('User not logged in');
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/api/cart/${productId}?user_id=${USER_ID}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to remove from cart');
      const updatedCart = await response.json();
      setCartItems(updatedCart);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (!USER_ID) {
      alert('User not logged in');
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/api/cart/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: USER_ID, quantity }),
      });
      if (!response.ok) throw new Error('Failed to update quantity');
      const updatedCart = await response.json();
      setCartItems(updatedCart);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const clearCart = async () => {
    if (!USER_ID) {
      alert('User not logged in');
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/api/cart/clear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: USER_ID }),
      });
      if (!response.ok) throw new Error('Failed to clear cart');
      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { IoIosArrowForward } from "react-icons/io";
import { FaTrash, FaHeart } from "react-icons/fa"; // Importing FaHeart here
import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // We keep loading state until cartItems are loaded
  useEffect(() => {
    if (cartItems) {
      setLoading(false);
    }
  }, [cartItems]);

  const subtotal = totalPrice;
  const discount = 5.00;
  const total = subtotal - discount;

  if (loading) return <p>Loading cart items...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!cartItems || cartItems.length === 0) return <p>No items in cart</p>;

  // Handlers now use CartContext functions directly
  const handleRemoveFromCart = async (productId) => {
    try {
      await removeFromCart(productId);
    } catch (err) {
      setError('Failed to remove item from cart');
    }
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return; // Prevent quantity less than 1
    try {
      await updateQuantity(productId, newQuantity);
    } catch (err) {
      setError('Failed to update product quantity');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <section className="bg-white shadow-md py-6">
        <div className="w-[85%] mx-auto text-center">
          <h2 className="text-3xl font-bold">Shopping Cart</h2>
          <div className="flex justify-center items-center text-gray-500 mt-2">
            <Link to="/" className="text-blue-500">Home</Link>
            <IoIosArrowForward className="mx-2" />
            <span>My Shopping Cart</span>
          </div>
        </div>
      </section>

      <section className="w-[85%] mx-auto py-12 flex gap-8">
        <div className="w-2/3 bg-white p-6 rounded-lg shadow-lg">
          <div className="grid grid-cols-12 border-b pb-4 mb-4 font-semibold text-gray-600">
            <div className="col-span-6">Product Details</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Total</div>
          </div>

          {cartItems.map((item) => (
            <div key={item.product_id} className="grid grid-cols-12 items-center border-b py-4">
              <div className="col-span-6 flex items-center">
                <img 
                  src={item.img || item.image || ''} 
                  alt={item.title || item.name} 
                  className="w-20 h-20 object-cover rounded-lg border" 
                />
                <div className="ml-4">
                  <h2 className="text-lg font-semibold">{item.title || item.name || item.name}</h2>
                  <p className="text-sm text-gray-500">Category: {item.category}</p>
                  <div className="flex items-center text-gray-500 mt-2">
                    <FaHeart className="cursor-pointer" />
                    <span 
                      className="ml-2 cursor-pointer text-red-500 flex items-center"
                      onClick={() => handleRemoveFromCart(item.product_id)}
                    >
                      <FaTrash className="mr-1" /> Remove
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-span-2 flex justify-center">
                <div className="flex items-center border px-4 py-2 rounded-lg bg-gray-100">
                  <button onClick={() => handleUpdateQuantity(item.product_id, item.quantity - 1)} className="px-2">-</button>
                  <span className="mx-3">{item.quantity}</span>
                  <button onClick={() => handleUpdateQuantity(item.product_id, item.quantity + 1)} className="px-2">+</button>
                </div>
              </div>
              <div className="col-span-2 text-center">${parseFloat(item.price).toFixed(2)}</div>
              <div className="col-span-2 text-center font-semibold">${(parseFloat(item.price) * item.quantity).toFixed(2)}</div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="w-1/3 bg-white p-6 rounded-lg shadow-lg h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span className="font-semibold">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Discount:</span>
            <span className="text-red-500">- ${discount.toFixed(2)}</span>
          </div>
          <div className="border-t pt-2 flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <input 
            type="text" 
            placeholder="Enter Voucher Code" 
            className="w-full p-2 border mt-4 rounded-lg" 
          />
          <button className="w-full mt-4 px-6 py-3 rounded-full bg-purple-500 text-white font-semibold hover:opacity-90">
            Proceed to Checkout
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Cart;

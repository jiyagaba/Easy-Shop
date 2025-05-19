import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const OrderSuccess = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center text-center p-6">
        <img
          src="/images/success.png"
          alt="Order Success"
          className="w-32 h-32 mb-6 mx-auto"
        />
        <h1 className="text-4xl font-bold mb-4 text-green-600">Payment Successful!</h1>
        <p className="text-lg mb-6">
          Thank you for your purchase. Your order has been placed successfully.
        </p>
        <Link
          to="/"
          className="inline-block bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition"
        >
          Continue Shopping
        </Link>
      </main>
      <Footer />
    </div>
  );
};

export default OrderSuccess;

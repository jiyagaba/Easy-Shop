import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'; // Adjust the path based on your project structure

const LikedProducts = () => {
  const [likedProducts, setLikedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLikedProducts = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user?.id || user?.userId;
        if (!userId) {
          setError('User not logged in');
          setLoading(false);
          return;
        }

        const response = await fetch(`http://localhost:3000/api/likeProduct`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          cache: 'no-store'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch liked products');
        }

        const data = await response.json();
        setLikedProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedProducts();
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product/details/${productId}`);
  };

  const handleAddToCart = (productId) => {
    // Implement actual cart logic here
    console.log('Add to cart:', productId);
  };

  if (loading) return <p className="text-center">Loading liked products...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (likedProducts.length === 0) return <p className="text-center">No liked products found.</p>;

  return (
    <>
      <Header />

      <div className="max-w-6xl mx-auto py-10 px-4">
        <div className="space-y-6">
          {likedProducts.map((item) => (
            <div
              key={item.productId}
              className="flex items-center justify-between bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition duration-300"
            >
              {/* Product Info */}
              <div className="flex items-center gap-4">
                <img
                  src={`http://localhost:3000${item.image || '/images/default-product.png'}`}
                  alt={item.name || 'Product'}
                  className="w-24 h-24 rounded-xl object-cover"
                  onError={(e) => { e.target.src = '/images/default-product.png'; }}
                />
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">{item.name || 'Product Name'}</h3>
                  <p className="text-sm text-gray-500">{item.description || 'Product description...'}</p>
                  <p className="text-lg text-purple-600 font-bold mt-1">₹{item.price || 'N/A'}</p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => handleProductClick(item.productId)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full text-sm font-medium transition"
                >
                  View
                </button>
                <button
                  onClick={() => handleAddToCart(item.productId)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full text-sm font-medium transition"
                >
                  Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LikedProducts;

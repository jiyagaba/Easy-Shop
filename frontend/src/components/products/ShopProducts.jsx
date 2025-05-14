import React, { useState, useEffect } from 'react';
import { FaEye, FaRegHeart } from 'react-icons/fa';
import { RiShoppingCartLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { refresh_access_token } from '../../store/reducers/authReducer';
import { useCart } from '../../contexts/CartContext';

const ShopProducts = ({ styles }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likedProducts, setLikedProducts] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addToCart } = useCart();

  useEffect(() => {
    // Fetch products from the API
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products');
        const data = await response.json();
        if (response.ok) {
          setProducts(data);
        } else {
          setError('Failed to fetch products');
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Error fetching products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle the 'like' action with token refresh logic
  const handleLikeClick = async (product) => {
    let token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found, please login');
      return;
    }

    const likeProduct = async (accessToken) => {
      const response = await fetch('http://localhost:3000/api/likeProduct/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          productId: product.id,
          name: product.title,
          price: product.price,
          image: product.img,
          description: product.description || ''
        })
      });
      return response;
    };

    try {
      let response = await likeProduct(token);
      if (response.status === 401) {
        // Token expired, try to refresh
        const refreshResult = await dispatch(refresh_access_token());
        if (refresh_access_token.fulfilled.match(refreshResult)) {
          token = refreshResult.payload;
          localStorage.setItem('token', token); // Store under 'token' key consistently
          response = await likeProduct(token);
        } else {
          console.log('Token refresh failed, please login again');
          return;
        }
      }

      const data = await response.json();

      if (response.ok) {
        setLikedProducts((prev) => [...prev, product]);
        console.log('Product liked successfully!');
      } else {
        console.log('Failed to like product:', data.message);
      }
    } catch (err) {
      console.error('Error liking product:', err);
    }
  };

  // Navigate to the liked products page
  const handleGoToLikedPage = () => {
    navigate('/liked-products');
  };

  if (loading) return <p className="text-center text-gray-500">Loading products...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!Array.isArray(products) || products.length === 0)
    return <p className="text-center text-gray-500">No products available.</p>;

  return (
    <div className="w-full max-w-full">
      <div
        className={`grid ${styles === 'grid'
          ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
          : 'grid-cols-1'} gap-6`}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform duration-500 overflow-hidden ${styles === 'grid' ? 'flex flex-col' : 'flex flex-col md:flex-row'}`}
          >
            {/* Image Section */}
            <div
              className={`${styles === 'grid' ? 'relative group overflow-hidden w-full h-[300px]' : 'relative group overflow-hidden md:w-1/3 w-full h-60'}`}
            >
              <img
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                src={product.img ? `http://localhost:3000${product.img}` : '/images/default-product.png'}
                alt={product.title || 'Product Image'}
                onError={(e) => {
                  e.target.src = '/images/default-product.png';
                }}
              />

              {/* Floating Buttons */}
              <ul className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <li
                  onClick={() => handleLikeClick(product)} // Call handleLikeClick here
                  className="w-9 h-9 cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#8A4FFF] hover:text-white hover:rotate-[360deg] transition-all duration-500"
                >
                  <FaRegHeart />
                </li>
                <Link
                  to={`/product/details/${product.id}`}
                  className="w-9 h-9 cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#8A4FFF] hover:text-white hover:rotate-[360deg] transition-all duration-500"
                >
                  <FaEye />
                </Link>
                <li
                  onClick={() => addToCart(product, 1)}
                  className="w-9 h-9 cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#8A4FFF] hover:text-white hover:rotate-[360deg] transition-all duration-500"
                >
                  <RiShoppingCartLine />
                </li>
              </ul>
            </div>

            {/* Product Details */}
            <div className={`${styles === 'grid' ? 'p-4 flex flex-col justify-between' : 'p-4 flex flex-col justify-between md:w-2/3 w-full'}`}>
              <h2 className="text-base font-semibold text-gray-800 uppercase">{product.title}</h2>
              <div className="mt-2">
                <span className="text-lg font-bold text-purple-600">${product.price}</span>
              </div>
              <button
                onClick={() => addToCart(product, 1)}
                className="mt-4 w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors duration-300"
              >
                <RiShoppingCartLine /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Liked Page Button */}
      <button
        onClick={handleGoToLikedPage}
        className="mt-8 w-full py-2 bg-[#8A4FFF] text-white rounded-lg hover:bg-[#6e3ff0] transition-colors duration-300"
      >
        Go to Liked Products
      </button>
    </div>
  );
};

export default ShopProducts;

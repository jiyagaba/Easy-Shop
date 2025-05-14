import React, { useEffect, useState } from 'react';
import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import Rating from '../Rating.';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { refresh_access_token } from '../../store/reducers/authReducer';

const FeatureProducts = () => {
  const [products, setProducts] = useState([]); // State to store featured products
  const [likedProducts, setLikedProducts] = useState([]);
  const dispatch = useDispatch();

  // Fetch featured products from the backend
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products/featured'); // Backend API for featured products
        const data = await response.json();
        setProducts(data); // Set the fetched products to state
      } catch (error) {
        console.error('Error fetching featured products:', error.message);
      }
    };

    fetchFeaturedProducts();
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
          localStorage.setItem('customerToken', token);
          response = await likeProduct(token);
        } else {
          console.log('Token refresh failed, please login again');
          return;
        }
      }

      const data = await response.json();

      if (response.ok) {
        setLikedProducts((prev) => [...prev, product.id]);
        console.log('Product liked successfully!');
      } else {
        console.log('Failed to like product:', data.message);
      }
    } catch (err) {
      console.error('Error liking product:', err);
    }
  };

  const isLiked = (productId) => likedProducts.includes(productId);

  return (
    <div className='w-[90%] mx-auto py-20 bg-gradient-to-b from-white to-gray-100 rounded-t-3xl shadow-xl'>
      {/* Title */}
      <div className='text-center text-gray-800 flex justify-center items-center flex-col text-5xl font-bold pb-10'>
        <h2>Featured Products</h2>
        <p className='text-lg text-gray-500 mt-3'>
          Every month we pick the best products for you.
        </p>
      </div>

      {/* Product Cards */}
      <div className='grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 px-10'>
        {products.map((product) => (
          <div
            key={product.id}
            className='bg-white rounded-3xl shadow-lg p-6 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 relative'
          >
            <div className='relative overflow-hidden rounded-2xl'>
              {/* Discount Badge */}
              {product.discount && (
                <div className='absolute text-white w-[45px] h-[45px] rounded-full bg-red-500 font-semibold text-sm left-3 top-3 flex items-center justify-center'>
                  {product.discount}%
                </div>
              )}

              {/* Product Image with Link */}
              <div>
                <img
                  className='w-full h-[280px] object-cover rounded-2xl'
                  src={`http://localhost:3000${product.img}`} // Use the image path from the backend
                  alt={product.title}
                />
              </div>
            </div>

            {/* Floating Icons (Wishlist, View, Cart) */}
            <div className='absolute top-4 right-4 flex flex-col gap-2'>
              <button
                onClick={() => handleLikeClick(product)}
                className={`p-3 rounded-full shadow-md transition ${
                  isLiked(product.id) ? 'bg-purple-600 text-white' : 'bg-white text-black hover:bg-gray-100'
                }`}
              >
                <FaRegHeart size={18} />
              </button>

              <Link to={`/product/details/${product.id}`} className='p-3 bg-white rounded-full shadow-md hover:bg-gray-100 transition'>
                <FaEye size={18} />
              </Link>

              <button className='p-3 bg-white rounded-full shadow-md hover:bg-gray-100 transition'>
                <RiShoppingCartLine size={18} />
              </button>
            </div>

            {/* Product Details */}
            <div className='mt-5 text-center'>
              <Link to={`/product/details/${product.id}`}>
                <h3 className='text-xl font-semibold text-gray-900'>{product.title}</h3>
              </Link>
              <p className='text-gray-500 text-sm mt-1'>by Seller</p>
              <div className='mt-3 text-gray-700 font-bold text-2xl'>
                ${product.price}{' '}
                {product.oldPrice && (
                  <span className='text-gray-400 text-xl line-through'>${product.oldPrice}</span>
                )}
              </div>

              {/* Ratings & Sales */}
              <div className='mt-4 flex items-center justify-center text-gray-600 text-base'>
                <Rating ratings={product.rating || 0} />
                <span className='ml-2'>
                  ({product.reviews || 0} Reviews) | {product.sales || 0} Sales
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureProducts;
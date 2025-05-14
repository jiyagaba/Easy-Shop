import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { refresh_access_token } from "../store/reducers/authReducer";
import { useCart } from '../contexts/CartContext';

const CategoryProducts = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedProducts, setLikedProducts] = useState([]);
  const dispatch = useDispatch();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/categories/${category}/products`
        );
        setProducts(res.data);
      } catch (err) {
        console.error(
          "❌ Error fetching products:",
          err.response?.data || err.message
        );
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

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
          name: product.name,
          price: product.price,
          image: product.image,
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
        setLikedProducts((prev) => [...prev, product]);
        console.log('Product liked successfully!');
      } else {
        console.log('Failed to like product:', data.message);
      }
    } catch (err) {
      console.error('Error liking product:', err);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-xl text-purple-600">
        Loading products...
      </div>
    );
  }

  return (
    <div className="w-[90%] mx-auto py-10">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-purple-700 capitalize">
          {category} Products
        </h2>
        <p className="text-lg text-gray-500 mt-2">
          Browse products under the {category} category
        </p>
      </div>

      {products.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No products found in this category.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative"
            >
              {/* Discount Badge */}
              {Number(product.discount) > 0 && (
                <div className="absolute text-white w-[45px] h-[45px] rounded-full bg-red-500 font-semibold text-sm left-3 top-3 flex items-center justify-center z-10">
                  {Number(product.discount).toFixed(0)}%
                </div>
              )}

              {/* Product Image */}
              <div className="relative h-[300px] w-full overflow-hidden">
                <img
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  src={`http://localhost:3000${product.image}`}
                  alt={product.name}
                />

                {/* Floating Icons */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
                  <button
                    onClick={() => handleLikeClick(product)}
                    className="p-3 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
                  >
                    <FaRegHeart size={18} />
                  </button>
                  <Link
                    to={`/product/details/${product.id}`}
                    className="p-3 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
                  >
                    <FaEye size={18} />
                  </Link>
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="p-3 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
                  >
                    <RiShoppingCartLine size={18} />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <Link to={`/product/details/${product.id}`}>
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-gray-500 text-sm mt-1">by Seller</p>
                <div className="mt-3 text-gray-700 font-bold text-xl">
                  ₹{product.price}
                </div>
                <div className="mt-2 text-gray-600 text-sm">
                  ({product.reviews || 0} Reviews) | {product.sales || 0} Sales
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;

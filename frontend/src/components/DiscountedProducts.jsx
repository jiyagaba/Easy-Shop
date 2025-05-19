import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import { AiOutlineHeart, AiOutlineEye, AiOutlineShoppingCart } from "react-icons/ai"; // Updated icons
import { Link } from "react-router-dom";
import axios from "axios";
import "react-multi-carousel/lib/styles.css";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistProvider";

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 4 },
  desktop: { breakpoint: { max: 1024, min: 768 }, items: 3 },
  tablet: { breakpoint: { max: 768, min: 464 }, items: 2 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

const DiscountedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    const fetchDiscountedProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/products/discounted");
        setProducts(res.data || []);
      } catch (err) {
        console.error("Error fetching discounted products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDiscountedProducts();
  }, []);

  const isLiked = (productId) => wishlist.some((item) => item.id === productId);

  const toggleLike = (product) => {
    if (isLiked(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  if (loading) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">Loading discounted products...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">No discounted products available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-16">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900">Discounted Products</h2>
        <p className="text-gray-500 mt-3">Grab these deals before they’re gone!</p>
      </div>

      <div className="relative w-[90%] mx-auto mt-10">
        <Carousel
          autoPlay={false}
          infinite={false}
          responsive={responsive}
          className="relative"
        >
          {products.map((product) => (
            <div key={product.id} className="p-4">
              <div className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition relative">
                <div className="relative">
                  <img
                    src={`http://localhost:3000${product.img}`}
                    alt={product.title}
                    className="w-full h-52 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = "/fallback.png";
                    }}
                  />
                  <div className="absolute top-2 right-2 flex flex-col space-y-3">
                    {/* Like Icon */}
                    <button
                      onClick={() => toggleLike(product)}
                      className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 text-gray-700"
                      aria-label={isLiked(product.id) ? "Unlike" : "Like"}
                    >
                      <AiOutlineHeart size={20} />
                    </button>

                    {/* View Icon */}
                    <Link
                      to={`/product/details/${product.id}`} // Navigate to product details
                      className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 text-gray-700 flex justify-center items-center"
                      aria-label="View Product"
                    >
                      <AiOutlineEye size={20} />
                    </Link>

                    {/* Cart Icon */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 text-gray-700 flex justify-center items-center"
                      aria-label="Add to Cart"
                    >
                      <AiOutlineShoppingCart size={20} />
                    </button>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-900">{product.title}</h3>
                  <p className="text-gray-500 text-sm">by Seller</p>
                  <div className="mt-2 text-gray-900 font-bold text-lg">
                    ${Number(product.price || 0).toFixed(2)}
                  </div>
                  <p className="text-gray-500 text-sm mt-1">(0 Reviews) | 0 Sales</p>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default DiscountedProducts;
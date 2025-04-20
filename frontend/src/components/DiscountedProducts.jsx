import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 4 },
  desktop: { breakpoint: { max: 1024, min: 768 }, items: 3 },
  tablet: { breakpoint: { max: 768, min: 464 }, items: 2 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

const CustomLeftArrow = ({ onClick }) => (
  <button
    className="absolute left-[-30px] top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-100"
    onClick={onClick}
  >
    <FaChevronLeft size={18} />
  </button>
);

const CustomRightArrow = ({ onClick }) => (
  <button
    className="absolute right-[-30px] top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-100"
    onClick={onClick}
  >
    <FaChevronRight size={18} />
  </button>
);

const DiscountedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiscountedProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/products/discounted");
        console.log("Fetched discounted products:", res.data);
        setProducts(res.data || []);
      } catch (err) {
        console.error("Error fetching discounted products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDiscountedProducts();
  }, []);

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
          customLeftArrow={<CustomLeftArrow />}
          customRightArrow={<CustomRightArrow />}
          className="relative"
        >
          {products.map((product) => (
            <div key={product.id} className="p-4">
              <Link to={`/product/${product.id}`}>
                <div className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition">
                  <img
                    src={`http://localhost:3000${product.img}`}
                    alt={product.title}
                    className="w-full h-52 object-cover rounded-lg"
                    onError={(e) => { e.target.src = "/fallback.png"; }}
                  />
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-900">{product.title}</h3>
                    <p className="text-gray-500 text-sm">{product.category}</p>
                    <div className="mt-2 text-gray-900 font-bold text-lg">
                      ${product.price} <span className="text-gray-400 line-through">${(product.price / (1 - product.discount / 100)).toFixed(2)}</span>
                    </div>
                    <div className="mt-2 text-gray-600 text-sm">{product.stock} in stock</div>
                    <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 transition">
                      View
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default DiscountedProducts;
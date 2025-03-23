import React from "react";
import Carousel from "react-multi-carousel";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";

const products = [
  {
    id: 1,
    title: "Predictable Growth Starts Here",
    image: "/images/products/1.webp",
    price: "$490",
    oldPrice: "$659",
    sales: "1200 Sales",
    rating: "4.8",
    reviews: "18",
  },
  {
    id: 2,
    title: "Drive Growth with Powerful CRM",
    image: "/images/products/2.webp",
    price: "$490",
    oldPrice: "$659",
    sales: "1200 Sales",
    rating: "4.8",
    reviews: "18",
  },
  {
    id: 3,
    title: "Design System for Your Products",
    image: "/images/products/3.webp",
    price: "$490",
    oldPrice: "$659",
    sales: "1200 Sales",
    rating: "4.8",
    reviews: "18",
  },
  {
    id: 4,
    title: "E-Commerce Growth Strategies",
    image: "/images/products/4.webp",
    price: "$550",
    oldPrice: "$720",
    sales: "980 Sales",
    rating: "4.6",
    reviews: "22",
  },
  {
    id: 5,
    title: "SaaS Landing Page Templates",
    image: "/images/products/5.webp",
    price: "$450",
    oldPrice: "$599",
    sales: "1100 Sales",
    rating: "4.7",
    reviews: "15",
  },
];

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 3 },
  desktop: { breakpoint: { max: 1024, min: 768 }, items: 2 },
  tablet: { breakpoint: { max: 768, min: 464 }, items: 1 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

// Custom left navigation button
const CustomLeftArrow = ({ onClick }) => (
  <button
    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 z-10"
    onClick={onClick}
  >
    <FaChevronLeft size={18} />
  </button>
);

// Custom right navigation button
const CustomRightArrow = ({ onClick }) => (
  <button
    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 z-10"
    onClick={onClick}
  >
    <FaChevronRight size={18} />
  </button>
);

const Products = () => {
  return (
    <div className="bg-black py-16 text-white">
      <div className="text-center">
        <h2 className="text-4xl font-bold">Weekly Best Selling Products</h2>
        <p className="text-gray-400 mt-3">
          Every month we pick some best products for you.
        </p>
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
            <div key={product.id} className="p-5">
              <Link to="#">
                <div className="bg-white text-black rounded-xl shadow-lg p-5">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-52 object-cover rounded-lg"
                  />
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold">{product.title}</h3>
                    <p className="text-gray-500 text-sm">by themePix</p>
                    <div className="mt-2 text-gray-900 font-bold text-lg">
                      {product.price}{" "}
                      <span className="text-gray-400 line-through">
                        {product.oldPrice}
                      </span>
                    </div>
                    <div className="mt-2 text-gray-600 text-sm">
                      {product.sales}
                    </div>
                    <div className="mt-1 text-yellow-500 flex items-center">
                      ⭐ {product.rating} ({product.reviews} Reviews)
                    </div>
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

export default Products;

import React from "react";
import Carousel from "react-multi-carousel";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";

const discountedProducts = [
  {
    id: 1,
    title: "Shoes",
    image: "/images/products.webp",
    price: "$199",
    oldPrice: "$299",
    sales: "800 Sales",
    rating: "4.7",
    reviews: "12",
  },
  {
    id: 2,
    title: "Headphones",
    image: "/images/products.webp",
    price: "$149",
    oldPrice: "$249",
    sales: "950 Sales",
    rating: "4.9",
    reviews: "22",
  },
  {
    id: 3,
    title: "Laptop",
    image: "/images/products.webp",
    price: "$99",
    oldPrice: "$179",
    sales: "500 Sales",
    rating: "4.6",
    reviews: "15",
  },
  {
    id: 4,
    title: "Tablet",
    image: "/images/products.webp",
    price: "$79",
    oldPrice: "$149",
    sales: "700 Sales",
    rating: "4.8",
    reviews: "18",
  },
  {
    id: 5,
    title: "Phone",
    image: "/images/products.webp",
    price: "$59",
    oldPrice: "$129",
    sales: "650 Sales",
    rating: "4.5",
    reviews: "10",
  },
];

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
          {discountedProducts.map((product) => (
            <div key={product.id} className="p-4">
              <Link to="#">
                <div className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-52 object-cover rounded-lg"
                  />
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-900">{product.title}</h3>
                    <p className="text-gray-500 text-sm">by themePix</p>
                    <div className="mt-2 text-gray-900 font-bold text-lg">
                      {product.price} <span className="text-gray-400 line-through">{product.oldPrice}</span>
                    </div>
                    <div className="mt-2 text-gray-600 text-sm">{product.sales}</div>
                    <div className="mt-1 text-yellow-500 flex items-center">
                      ⭐ {product.rating} ({product.reviews} Reviews)
                    </div>
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
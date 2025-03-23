import React from 'react';
import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import Rating from '../Rating.';
import { Link } from 'react-router-dom';

const products = [
    { id: 1, title: 'Product Title 1', price: 490, oldPrice: 659, rating: 4.8, reviews: 18, sales: 1200, img: '1.webp' },
    { id: 2, title: 'Product Title 2', price: 490, oldPrice: 659, rating: 4.2, reviews: 25, sales: 980, img: '2.webp' },
    { id: 3, title: 'Product Title 3', price: 490, oldPrice: 659, rating: 3.5, reviews: 10, sales: 540, img: '3.webp' },
    { id: 4, title: 'Product Title 4', price: 490, oldPrice: 659, rating: 5.0, reviews: 40, sales: 1800, img: '4.webp' },
    { id: 5, title: 'Product Title 5', price: 490, oldPrice: 659, rating: 2.8, reviews: 5, sales: 200, img: '5.webp' },
    { id: 6, title: 'Product Title 6', price: 490, oldPrice: 659, rating: 4.6, reviews: 30, sales: 1400, img: '6.webp' },
];

const FeatureProducts = () => {
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
                            <div className='absolute text-white w-[45px] h-[45px] rounded-full bg-red-500 font-semibold text-sm left-3 top-3 flex items-center justify-center'>
                                8%
                            </div>

                            {/* Product Image with Link */}
                            <div>
                                <img
                                    className='w-full h-[280px] object-cover rounded-2xl'
                                    src={`/images/products/${product.img}`}
                                    alt={product.title}
                                />
                            </div>
                        </div>

                        {/* Floating Icons (Wishlist, View, Cart) */}
                        <div className='absolute top-4 right-4 flex flex-col gap-2'>
                            <button className='p-3 bg-white rounded-full shadow-md hover:bg-gray-100 transition'>
                                <FaRegHeart size={18} />
                            </button>

                            {/* Eye Icon for Product Details */}

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
                                <span className='text-gray-400 text-xl line-through'>${product.oldPrice}</span>
                            </div>

                            {/* Ratings & Sales */}
                            <div className='mt-4 flex items-center justify-center text-gray-600 text-base'>
                                <Rating ratings={product.rating} />
                                <span className='ml-2'>({product.reviews} Reviews) | {product.sales} Sales</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeatureProducts;

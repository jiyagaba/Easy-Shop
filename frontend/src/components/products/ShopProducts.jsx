import React from 'react';
import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import Rating from '../Rating.';
import { Link } from 'react-router-dom';  // ✅ Import Link

// Dummy product data
const products = [
    { id: 1, title: 'Product 1', price: 490, rating: 4.8, img: '1.webp' },
    { id: 2, title: 'Product 2', price: 420, rating: 4.2, img: '2.webp' },
    { id: 3, title: 'Product 3', price: 350, rating: 3.5, img: '3.webp' },
    { id: 4, title: 'Product 4', price: 500, rating: 5.0, img: '4.webp' },
    { id: 5, title: 'Product 5', price: 280, rating: 2.8, img: '5.webp' },
    { id: 6, title: 'Product 6', price: 460, rating: 4.6, img: '6.webp' },
];

const ShopProducts = ({ styles }) => {
    return (
        <div className={`w-full grid ${styles === 'grid' ? 'grid-cols-3 md-lg:grid-cols-2 md:grid-cols-2' : 'grid-cols-1 md-lg:grid-cols-2 md:grid-cols-2'} gap-3`}>
            {products.map((product) => (  // ✅ Now using `product`
                <div key={product.id} className={`flex transition-all duration-1000 hover:shadow-md hover:-translate-y-3 ${styles === 'grid' ? 'flex-col justify-start items-start' : 'justify-start items-center md-lg:flex-col md-lg:justify-start md-lg:items-start'} w-full gap-4 bg-white p-1 rounded-md`}>

                    {/* Product Image */}
                    <div className={styles === 'grid' ? 'w-full relative group h-[210px] md:h-[270px] xs:h-[170px] overflow-hidden' : 'md-lg:w-full relative group h-[210px] md:h-[270px] overflow-hidden'}>
                        <img className='h-[240px] rounded-md md:h-[270px] xs:h-[170px] w-full object-cover' src={`/images/products/${product.img}`} alt={product.title} />

                        {/* Floating Buttons */}
                        <ul className='flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3'>
                            <li className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#8A4FFF] hover:text-white hover:rotate-[720deg] transition-all'>
                                <FaRegHeart />
                            </li>

                            {/* ✅ Corrected Link */}
                            <Link to={`/product/details/${product.id}`} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#8A4FFF] hover:text-white hover:rotate-[720deg] transition-all'>
                                <FaEye />
                            </Link>

                            <li className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#8A4FFF] hover:text-white hover:rotate-[720deg] transition-all'>
                                <RiShoppingCartLine />
                            </li>
                        </ul>    
                    </div>

                    {/* Product Details */}
                    <div className='flex justify-start items-start flex-col gap-1'>
                        <h2 className='font-bold'>{product.title}</h2>
                        <div className='flex justify-start items-center gap-3'>
                            <span className='text-md font-semibold'>${product.price}</span>
                            <div className='flex'>
                                <Rating ratings={product.rating} />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ShopProducts;

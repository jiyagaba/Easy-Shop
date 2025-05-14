import React, { useState } from 'react';
import { MdEmail } from "react-icons/md";
import { IoMdPhonePortrait, IoMdArrowDropdown } from "react-icons/io";
import { FaFacebookF, FaList, FaLock, FaUser, FaLinkedin, FaGithub } from "react-icons/fa";
import { FaTwitter, FaHeart, FaCartShopping, FaPhoneAlt } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const Header = () => {
    const { pathname } = useLocation();
    const { cartItems } = useCart();
    const [showShidebar, setShowShidebar] = useState(true);
    const [categoryShow, setCategoryShow] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const [category, setCategory] = useState('');
    const wishlist_count = 3;
    const user = true;

    const categorys = [
        'Mobiles', 'Laptops', 'Speakers', 'Top wear', 'Footwear',
        'Watches', 'Home Decor', 'Smart Watches'
    ];

    return (
        <div className='w-full bg-white'>
            {/* Top Header */}
            <div className='header-top bg-gradient-to-r from-[#e5d8ff] to-[#f5f0ff] md-lg:hidden'>
                <div className='w-[85%] lg:w-[90%] mx-auto'>
                    <div className='flex justify-between items-center h-[50px] text-slate-500'>
                        <ul className='flex gap-8 font-semibold text-black'>
                            <li className='flex items-center gap-2 text-sm relative after:absolute after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px]'>
                                <MdEmail />
                                <span>support@gmail.com</span>
                            </li>
                            <li className='flex items-center gap-2 text-sm'>
                                <IoMdPhonePortrait />
                                <span>+(123) 3243 343</span>
                            </li>
                        </ul>

                        <div className='flex items-center gap-10 text-black'>
                            <div className='flex gap-4'>
                                <a href="#"><FaFacebookF /></a>
                                <a href="#"><FaTwitter /></a>
                                <a href="#"><FaLinkedin /></a>
                                <a href="#"><FaGithub /></a>
                            </div>
                            <div className='flex group cursor-pointer text-sm relative items-center gap-1'>
                                <img src="/images/language.png" alt="lang" />
                                <IoMdArrowDropdown />
                                <ul className='absolute invisible transition-all top-12 rounded-sm duration-200 text-white p-2 w-[100px] flex-col gap-3 group-hover:visible group-hover:top-6 group-hover:bg-black z-10 hidden group-hover:flex'>
                                    <li>Hindi</li>
                                    <li>English</li>
                                </ul>
                            </div>

                            {user ? (
                                <Link to='/dashboard' className='flex items-center gap-2 text-sm text-black'>
                                    <FaUser />
                                    <span>Jiya</span>
                                </Link>
                            ) : (
                                <Link to='/login' className='flex items-center gap-2 text-sm text-black'>
                                    <FaLock />
                                    <span>Login</span>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className='w-white'>
                <div className='w-[85%] lg:w-[90%] mx-auto'>
                    <div className='h-[80px] flex justify-between items-center flex-wrap'>
                        {/* Logo + Mobile Menu Button */}
                        <div className='md-lg:w-full w-3/12 md-lg:pt-4'>
                            <div className='flex justify-between items-center'>
                                <Link to='/'>
                                    <img src="/images/logo.png" alt="logo" />
                                </Link>
                                <div className='w-[30px] h-[30px] bg-white text-slate-600 border border-slate-600 rounded-sm cursor-pointer lg:hidden md-lg:flex xl:hidden hidden'
                                    onClick={() => setShowShidebar(false)}>
                                    <FaList />
                                </div>
                            </div>
                        </div>

                        {/* Navbar Links + Icons */}
                        <div className='md:lg:w-full w-9/12'>
                            <div className='flex justify-between md-lg:justify-center items-center pl-8'>
                                <ul className="flex gap-8 text-sm font-bold uppercase md:hidden lg:flex">
                                    {["/", "/shops", "/blog", "/about", "/contact"].map((path, index) => {
                                        const names = ["Home", "Shop", "Blog", "About Us", "Contact Us"];
                                        return (
                                            <li key={path}>
                                                <Link to={path} className={`p-2 block ${pathname === path ? 'text-[#8A4FFF] underline' : 'text-slate-600 hover:text-[#8A4FFF]'}`}>
                                                    {names[index]}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>

                                {/* Wishlist, Cart, Account Dropdown */}
                                <div className='flex gap-5 md-lg:hidden'>
                                    <Link to="/liked-products">
                                        <div className='relative w-[35px] h-[35px] rounded-full bg-[#e2e2e2] flex justify-center items-center'>
                                            <FaHeart className='text-xl text-[#8A4FFF]' />
                                            <span className='absolute -top-[3px] -right-[5px] bg-[#8A4FFF] w-[20px] h-[20px] rounded-full text-white text-xs flex justify-center items-center'>
                                                {wishlist_count}
                                            </span>
                                        </div>
                                    </Link>

                                    <Link to="/cart">
                                        <div className='relative w-[35px] h-[35px] rounded-full bg-[#e2e2e2] flex justify-center items-center'>
                                            <FaCartShopping className='text-xl text-[#8A4FFF]' />
                                            <span className='absolute -top-[3px] -right-[5px] bg-red-500 w-[20px] h-[20px] rounded-full text-white text-xs flex justify-center items-center'>
                                                {cartItems.length}
                                            </span>
                                        </div>
                                    </Link>

                                    {/* Account Dropdown */}
                                    <div className="relative group">
                                        <button className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600">
                                            Account
                                        </button>
                                        <div className="absolute top-full right-0 bg-white shadow-md rounded-md p-2 w-48 hidden group-hover:block z-50 border border-gray-300">
                                            <Link to="/login" className="block px-4 py-2 text-blue-500 hover:bg-gray-100">Sign In</Link>
                                            <Link to="/register" className="block px-4 py-2 text-green-500 hover:bg-gray-100">Create Account</Link>
                                            <hr className="my-2" />
                                            <Link to="/seller-login" className="block px-4 py-2 text-purple-500 hover:bg-gray-100">Seller Sign In</Link>
                                            <Link to="/seller-register" className="block px-4 py-2 text-indigo-500 hover:bg-gray-100">Become a Seller</Link>
                                            <hr className="my-2" />
                                            <Link to="/admin-login" className="block px-4 py-2 text-red-500 hover:bg-gray-100">Admin Login</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar Overlay */}
            {/** You can keep your sidebar component here as-is if it's working correctly */}
            {/* You had the mobile sidebar and category + search bar below, which you can retain as it seems functional */}

        </div>
    );
};

export default Header;

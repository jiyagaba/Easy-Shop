import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getNav } from '../navigation/index';
import { BiLogOutCircle } from "react-icons/bi";

const Sidebar = ({ showSidebar, setShowSidebar }) => {
    const { pathname } = useLocation();
    const [allNav, setAllNav] = useState([]);

    useEffect(() => {
        // Determine role manually based on URL or any logic
        let role = 'seller'; // default role

        if (pathname.includes('/admin')) {
            role = 'admin';
        } else if (pathname.includes('/seller')) {
            role = 'seller';
        }

        const navs = getNav(role);
        setAllNav(navs);
    }, [pathname]);

    return (
        <>
            {/* Overlay for mobile */}
            <div 
                onClick={() => setShowSidebar(false)} 
                className={`fixed duration-200 ${showSidebar ? 'visible' : 'invisible'} w-screen h-screen bg-black/40 top-0 left-0 z-10 lg:hidden`}
            ></div>

            {/* Sidebar */}
            <div 
                className={`fixed top-0 left-0 h-screen z-50 w-[260px] transition-all
                    ${showSidebar ? 'left-0' : '-left-[260px] lg:left-0'}
                    bg-gradient-to-b from-[#1e1e3f] to-[#2e2e5e] shadow-lg`}
            >
                {/* Logo */}
                <div className='h-[70px] flex justify-center items-center border-b border-[#3a3a6a]'>
                    <Link to='/' className='w-[180px] h-[50px]'>
                        <img className='w-full h-full object-contain' src="http://localhost:3001/images/logo.png" alt="Logo" />
                    </Link> 
                </div>

                {/* Navigation */}
                <div className='px-4 mt-4'>
                    <ul>
                        {allNav.map((n, i) => (
                            <li key={i}>
                                <Link 
                                    to={n.path}
                                    className={`flex items-center gap-3 px-4 py-2 rounded-md mb-2 transition-all duration-300
                                        ${pathname === n.path 
                                            ? 'bg-[#1a0b32] text-white shadow-[0_0_10px_#a970ff] border border-[#a970ff] animate-glow'
                                            : 'text-gray-300 hover:bg-[#36365e] hover:text-white'}`}
                                >
                                    <span className='text-lg'>{n.icon}</span>
                                    <span className='font-medium'>{n.title}</span>
                                </Link>
                            </li>
                        ))}

                        {/* Logout */}
                        <li>
                            <button 
                                className='flex items-center gap-3 px-4 py-2 rounded-md text-gray-300 hover:bg-red-600 hover:text-white transition-all w-full'
                            >
                                <BiLogOutCircle className='text-lg' />
                                <span className='font-medium'>Logout</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Sidebar;

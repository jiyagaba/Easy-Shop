import React, { useEffect, useState } from 'react';
import { FaList } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const Header = ({ showSidebar, setShowSidebar }) => {
  const { pathname } = useLocation();
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    const name = localStorage.getItem("name");

    // const name = localStorage.getItem("name");
    if (name) {
      setUserName(name);
    }
  }, []);

  const roleFromPath = pathname.includes('/admin')
    ? 'Admin'
    : pathname.includes('/seller')
    ? 'Seller'
    : 'User';

  const avatar =
    roleFromPath === 'Admin'
      ? 'http://localhost:3001/images/admin.png'
      : roleFromPath === 'Seller'
      ? 'http://localhost:3001/images/admin.png'
      : 'http://localhost:3001/images/user.png';

  return (
    <div className="fixed top-4 left-0 w-full px-2 lg:px-7 z-40">
      <div className="ml-0 lg:ml-[280px] rounded-md h-[65px] flex justify-between items-center bg-gradient-to-r from-[#1e1e3f] to-[#29295e] px-5 shadow-lg shadow-purple-900/50 transition-all">
        {/* Sidebar Toggle */}
        <div
          onClick={() => setShowSidebar(!showSidebar)}
          className="w-[35px] flex lg:hidden h-[35px] rounded-md bg-[#7b32f2] text-white shadow-lg hover:shadow-purple-500/70 justify-center items-center cursor-pointer transition duration-200 ease-in-out"
        >
          <FaList />
        </div>

        {/* Search Bar */}
        <div className="hidden md:block">
          <input
            className="px-3 py-2 outline-none border border-[#423d72] bg-[#1a1a40] rounded-md text-white placeholder-gray-400 focus:border-[#7b32f2] transition duration-200 ease-in-out"
            type="text"
            name="search"
            placeholder="Search"
          />
        </div>

        {/* User Info */}
        <div className="flex justify-center items-center gap-8 relative">
          <div className="flex justify-center items-center gap-3">
            <div className="flex flex-col text-end">
              <h2 className="text-md font-bold text-white">{userName}</h2>
              <span className="text-[14px] font-normal text-gray-400">{roleFromPath}</span>
            </div>
            <img
              className="w-[45px] h-[45px] rounded-full border-2 border-purple-500"
              src={avatar}
              alt={roleFromPath}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;


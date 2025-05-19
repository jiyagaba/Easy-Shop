import { Outlet } from 'react-router-dom';
import Hearder from './Hearder'; 
import Sidebar from './Sidebar';
import { useState } from 'react';

const MainLayout = () => {
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <div className="bg-[#0e0e2c] text-white w-full min-h-screen flex">
            {/* Header */}
            <Hearder showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

            {/* Sidebar */}
            <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

            {/* Main Content */}
            <div className="flex-1 ml-[260px] pt-[95px] px-4 transition-all duration-300 ease-in-out bg-[#1a1a40]">
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;

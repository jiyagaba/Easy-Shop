import React from 'react';
import { FaImages } from "react-icons/fa6";
import { FadeLoader } from 'react-spinners';
import { FaRegEdit } from "react-icons/fa";

const Profile = () => {
    const image = true;
    const loader = true;
    const status = 'active';
    const userInfo = true;

    return (
        <div className="px-4 lg:px-8 pt-6">
            <h1 className="text-[#000000] font-semibold text-lg mb-3">My Profile</h1>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Profile Info Card */}
                <div className="w-full md:w-1/2 bg-[#1e1e2f] rounded-xl border border-purple-500 p-6 shadow-[0_0_15px_#a855f7] text-white">
                    <div className="flex justify-center mb-5">
                        {image ? (
                            <label htmlFor="img" className="relative w-[200px] h-[150px] cursor-pointer overflow-hidden rounded-md border border-slate-700">
                                <img src="http://localhost:3001/images/seller.jpg" alt="Profile" className="w-full h-full object-cover" />
                                {!loader && (
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
                                        <FadeLoader />
                                    </div>
                                )}
                            </label>
                        ) : (
                            <label htmlFor="img" className="flex flex-col items-center justify-center w-[200px] h-[150px] border border-dashed border-white rounded-md cursor-pointer relative">
                                <FaImages size={24} />
                                <span>Select Image</span>
                                {loader && (
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
                                        <FadeLoader />
                                    </div>
                                )}
                            </label>
                        )}
                        <input type="file" id="img" className="hidden" />
                    </div>

                    <div className="bg-[#2a2a40] p-4 rounded-lg text-sm relative">
                        <span className="absolute top-2 right-2 p-1 bg-yellow-500 rounded-md cursor-pointer hover:shadow-[0_0_10px_#facc15]">
                            <FaRegEdit />
                        </span>
                        <p><strong>Name:</strong> Jiaa</p>
                        <p><strong>Email:</strong> jiyaaa@gmail.com</p>
                        <p><strong>Role:</strong> Seller</p>
                        <p><strong>Status:</strong> Active</p>
                        <p>
                            <strong>Payment Account:</strong>
                            {
                                status === 'active'
                                    ? <span className="ml-2 px-2 py-1 bg-green-500 text-white text-xs rounded">Pending</span>
                                    : <span className="ml-2 px-2 py-1 bg-blue-500 text-white text-xs rounded">Click Active</span>
                            }
                        </p>
                    </div>

                    {/* Shop Info */}
                    <div className="bg-[#2a2a40] p-4 mt-4 rounded-lg text-sm relative">
                        <span className="absolute top-2 right-2 p-1 bg-yellow-500 rounded-md cursor-pointer hover:shadow-[0_0_10px_#facc15]">
                            <FaRegEdit />
                        </span>
                        {userInfo ? (
                            <>
                                <p><strong>Shop Name:</strong> Easy Shop</p>
                               
                                <p><strong>City:</strong> Rajpura</p>
                                <p><strong>State:</strong> Patiala</p>
                            </>
                        ) : (
                            <form className="space-y-3">
                                <div>
                                    <label htmlFor="Shop">Shop Name</label>
                                    <input type="text" id="Shop" className="w-full px-4 py-2 bg-[#1e1e2f] border border-slate-600 rounded-md text-white" />
                                </div>
                                <div>
                                    <label htmlFor="division">State Name</label>
                                    <input type="text" id="division" className="w-full px-4 py-2 bg-[#1e1e2f] border border-slate-600 rounded-md text-white" />
                                </div>
                                <div>
                                    <label htmlFor="district">City Name</label>
                                    <input type="text" id="district" className="w-full px-4 py-2 bg-[#1e1e2f] border border-slate-600 rounded-md text-white" />
                                </div>
                                <div>
                                    <label htmlFor="subdis">Country Name</label>
                                    <input type="text" id="subdis" className="w-full px-4 py-2 bg-[#1e1e2f] border border-slate-600 rounded-md text-white" />
                                </div>
                                <button className="bg-purple-600 px-5 py-2 rounded text-white hover:shadow-[0_0_10px_#a855f7]">Save Changes</button>
                            </form>
                        )}
                    </div>
                </div>

                {/* Change Password Card */}
                <div className="w-full md:w-1/2 bg-[#1e1e2f] rounded-xl border border-purple-500 p-6 shadow-[0_0_15px_#a855f7] text-white">
                    <h2 className="text-lg font-semibold mb-4">Change Password</h2>
                    <form className="space-y-3">
                        <div>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" className="w-full px-4 py-2 bg-[#2a2a40] border border-slate-600 rounded-md text-white" placeholder="Email" />
                        </div>
                        <div>
                            <label htmlFor="o_password">Old Password</label>
                            <input type="password" id="o_password" className="w-full px-4 py-2 bg-[#2a2a40] border border-slate-600 rounded-md text-white" placeholder="Old Password" />
                        </div>
                        <div>
                            <label htmlFor="n_password">New Password</label>
                            <input type="password" id="n_password" className="w-full px-4 py-2 bg-[#2a2a40] border border-slate-600 rounded-md text-white" placeholder="New Password" />
                        </div>
                        <button className="bg-purple-600 px-5 py-2 rounded text-white hover:shadow-[0_0_10px_#a855f7]">Save Changes</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;

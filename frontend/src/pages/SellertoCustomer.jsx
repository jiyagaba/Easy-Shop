import React, { useState } from 'react';
import { FaList } from 'react-icons/fa6';
import { IoMdClose } from "react-icons/io";

const SellerToCustomer = () => {
    const [show, setShow] = useState(false);
    const sellerId = 65;

    return (
        <div className='px-4 lg:px-8 pt-6'>
            <h1 className='text-[#000000] font-semibold text-lg mb-3'>Messages</h1>

            <div className='w-full p-6 bg-[#1e1e2f] rounded-xl border border-purple-500 shadow-[0_0_15px_#a855f7]'>
                <div className='flex relative h-[calc(100vh-160px)]'>

                    {/* Sidebar */}
                    <div className={`w-[280px] absolute z-10 ${show ? 'left-0' : '-left-[300px]'} md:relative transition-all`}>
                        <div className='bg-[#2d2d48] rounded-md h-full overflow-y-auto shadow-md'>
                            <div className='flex justify-between items-center text-white px-4 py-4 border-b border-slate-600'>
                                <h2 className='text-lg font-medium'>Customers</h2>
                                <span onClick={() => setShow(false)} className='md:hidden cursor-pointer'><IoMdClose /></span>
                            </div>

                            {['Jiya', 'Jhon', 'Rahul'].map((name, idx) => (
                                <div key={idx} className='flex items-center gap-3 text-white px-4 py-3 border-b border-slate-700 hover:bg-[#3a3a57] cursor-pointer'>
                                    <div className='relative'>
                                        <img src="http://localhost:3001/images/admin.jpg" alt="" className='w-10 h-10 rounded-full border-2 border-purple-400' />
                                        <span className='w-3 h-3 bg-green-500 rounded-full absolute right-0 bottom-0 border-2 border-[#2d2d48]'></span>
                                    </div>
                                    <h3 className='font-medium'>{name}</h3>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Main Chat Area */}
                    <div className='w-full md:ml-4'>
                        {/* Top Header */}
                        <div className='flex justify-between items-center mb-4'>
                            <div className='flex items-center gap-3'>
                                <div className='relative'>
                                    <img src="http://localhost:3001/images/demo.jpg" alt="" className='w-11 h-11 rounded-full border-2 border-green-400' />
                                    <span className='w-3 h-3 bg-green-500 rounded-full absolute right-0 bottom-0 border-2 border-[#1e1e2f]'></span>
                                </div>
                                <h2 className='text-white font-semibold text-base'>Rohan</h2>
                            </div>
                            <div onClick={() => setShow(!show)} className='w-[35px] h-[35px] bg-purple-600 text-white rounded-md flex justify-center items-center md:hidden shadow-md hover:shadow-purple-500/50 cursor-pointer'>
                                <FaList />
                            </div>
                        </div>

                        {/* Messages */}
                        <div className='bg-[#2d2d48] rounded-md p-4 h-[calc(100vh-320px)] overflow-y-auto'>
                            {/* Received Message */}
                            <div className='flex mb-4'>
                                <img src="http://localhost:3000/images/demo.jpg" className='w-9 h-9 rounded-full border-2 border-white mr-3' />
                                <div className='bg-blue-500 text-white rounded-lg px-4 py-2 shadow-md shadow-blue-400/40 max-w-[80%]'>
                                    <p>How are you?</p>
                                </div>
                            </div>

                            {/* Sent Message */}
                            <div className='flex justify-end mb-4'>
                                <div className='bg-red-500 text-white rounded-lg px-4 py-2 shadow-md shadow-red-400/40 max-w-[80%]'>
                                    <p>How are you?</p>
                                </div>
                                <img src="http://localhost:3000/images/admin.jpg" className='w-9 h-9 rounded-full border-2 border-white ml-3' />
                            </div>

                            {/* Another Message */}
                            <div className='flex mb-4'>
                                <img src="http://localhost:3000/images/demo.jpg" className='w-9 h-9 rounded-full border-2 border-white mr-3' />
                                <div className='bg-blue-500 text-white rounded-lg px-4 py-2 shadow-md shadow-blue-400/40 max-w-[80%]'>
                                    <p>I need some help</p>
                                </div>
                            </div>
                        </div>

                        {/* Input Box */}
                        <form className='flex items-center gap-3 mt-4'>
                            <input
                                type='text'
                                placeholder='Type your message...'
                                className='flex-1 bg-[#1e1e2f] border border-slate-600 text-white rounded-md px-3 py-2 focus:outline-none focus:border-purple-500'
                            />
                            <button className='bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-md shadow-md hover:shadow-cyan-500/50'>
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerToCustomer;

import React, { useState } from 'react';
import { FaList } from 'react-icons/fa6';
import { IoMdClose } from "react-icons/io";

const ChatSeller = () => {
    const [show, setShow] = useState(false);
    const sellerId = 65;

    return (
        <div className='px-4 lg:px-8 py-6'>
            <div className='w-full bg-[#1e1e2f] p-6 rounded-xl border border-purple-500 shadow-[0_0_15px_#a855f7] h-[calc(100vh-140px)]'>
                <div className='flex w-full h-full relative'>
                    {/* Sidebar */}
                    <div className={`w-[280px] h-full absolute z-10 ${show ? '-left-[16px]' : '-left-[336px]'} md:left-0 md:relative transition-all`}>
                        <div className='w-full h-[calc(100vh-177px)] bg-[#2a2a40] md:bg-transparent overflow-y-auto rounded-md shadow-md'>
                            <div className='flex text-xl justify-between items-center p-4 md:p-0 md:px-3 md:pb-3 text-white'>
                                <h2>Sellers</h2>
                                <span onClick={() => setShow(!show)} className='block cursor-pointer md:hidden'><IoMdClose /> </span>
                            </div>

                            {["Rahul", "Rohan", "Raju"].map((name, i) => (
                                <div key={i} className={`h-[60px] flex items-center gap-2 text-white px-2 py-2 rounded-md cursor-pointer hover:bg-[#4c4ca7] ${i === 0 ? 'bg-[#8288ed]' : ''}`}>
                                    <div className='relative'>
                                        <img className='w-[38px] h-[38px] border-white border-2 p-[2px] rounded-full' src="http://localhost:3001/images/admin.jpg" alt='' />
                                        <div className='w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0'></div>
                                    </div>
                                    <div className='flex flex-col justify-center w-full'>
                                        <h2 className='text-base font-semibold'>{name}</h2>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Main Chat Section */}
                    <div className='w-full md:w-[calc(100%-200px)] md:pl-4'>
                        <div className='flex justify-between items-center'>
                            {sellerId && (
                                <div className='flex items-center gap-3'>
                                    <div className='relative'>
                                        <img className='w-[45px] h-[45px] border-green-500 border-2 p-[2px] rounded-full' src="http://localhost:3001/images/demo.jpg" alt='' />
                                        <div className='w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0'></div>
                                    </div>
                                </div>
                            )}

                            <div onClick={() => setShow(!show)} className='w-[35px] md:hidden h-[35px] rounded-sm bg-[#0e0e2c] shadow-lg hover:shadow-blue-500/50 flex justify-center items-center text-white cursor-pointer'>
                                <FaList />
                            </div>
                        </div>

                        <div className='py-4'>
                            <div className='bg-[#2f2f45] h-[calc(100vh-290px)] rounded-md p-3 overflow-y-auto'>
                                {/* Messages */}
                                <div className='w-full flex justify-start'>
                                    <div className='flex gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]'>
                                        <img className='w-[38px] h-[38px] border-2 border-white rounded-full p-[3px]' src="http://localhost:3001/images/demo.jpg" alt='' />
                                        <div className='bg-blue-500 text-white py-1 px-2 rounded shadow-lg shadow-blue-500/50'>
                                            <span>How are you?</span>
                                        </div>
                                    </div>
                                </div>

                                <div className='w-full flex justify-end'>
                                    <div className='flex gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]'>
                                        <div className='bg-red-500 text-white py-1 px-2 rounded shadow-lg shadow-red-500/50'>
                                            <span>How are you?</span>
                                        </div>
                                        <img className='w-[38px] h-[38px] border-2 border-white rounded-full p-[3px]' src="http://localhost:3001/images/admin.jpg" alt='' />
                                    </div>
                                </div>

                                <div className='w-full flex justify-start'>
                                    <div className='flex gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]'>
                                        <img className='w-[38px] h-[38px] border-2 border-white rounded-full p-[3px]' src="http://localhost:3001/images/demo.jpg" alt='' />
                                        <div className='bg-blue-500 text-white py-1 px-2 rounded shadow-lg shadow-blue-500/50'>
                                            <span>I need some help</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <form className='flex gap-3'>
                            <input className='w-full px-3 py-[5px] border border-slate-700 rounded-md bg-[#2a2a40] text-white focus:border-blue-500 outline-none' type="text" placeholder='Input Your Message' />
                            <button className='w-[75px] h-[35px] bg-cyan-500 text-white rounded-md shadow-lg hover:shadow-cyan-500/50'>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatSeller;
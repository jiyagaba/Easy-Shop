import React from 'react';

const SellerDetails = () => {
    return (
        <div className='px-2 lg:px-7 pt-5'>
            <h1 className='text-[20px] font-bold mb-3 text-white'>Seller Details</h1>

            <div className='w-full p-4 bg-[#1e1e2f] rounded-md shadow-[0_0_15px_#9b5cfb] text-[#d0d2d6]'>
                <div className='w-full flex flex-wrap'>
                    {/* Image Section */}
                    <div className='w-full md:w-3/12 flex justify-center items-center p-3'>
                        <img 
                            className='w-[200px] h-[230px] object-cover rounded-md border border-[#2a2a40]' 
                            src="http://localhost:3001/images/demo.jpg" 
                            alt="Seller" 
                        />
                    </div>

                    {/* Basic Info */}
                    <div className='w-full md:w-4/12 p-3'>
                        <div className='text-lg font-semibold text-white mb-2 border-b border-[#2a2a40] pb-1'>
                            Basic Info
                        </div>
                        <div className='flex flex-col gap-3 p-4 bg-[#2a2a40] rounded-md'>
                            {[
                                ['Name', 'Ram'],
                                ['Email', 'ram@gmail.com'],
                                ['Role', 'Seller'],
                                ['Status', 'Active'],
                                ['Payment Status', 'Active']
                            ].map(([label, value], i) => (
                                <div key={i} className='text-sm'>
                                    <span className='font-bold text-white'>{label}: </span>
                                    <span>{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Address Info */}
                    <div className='w-full md:w-4/12 p-3'>
                        <div className='text-lg font-semibold text-white mb-2 border-b border-[#2a2a40] pb-1'>
                            Address
                        </div>
                        <div className='flex flex-col gap-3 p-4 bg-[#2a2a40] rounded-md'>
                            {[
                                ['Shop Name', 'Easy Shop'],
                                ['State', 'Punjab'],
                                ['Phone No', '09345678'],
                                ['City', 'Rajpura']
                            ].map(([label, value], i) => (
                                <div key={i} className='text-sm'>
                                    <span className='font-bold text-white'>{label}: </span>
                                    <span>{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Status Update */}
                <form className='mt-6'>
                    <div className='flex flex-col sm:flex-row gap-4'>
                        <select className='px-4 py-2 bg-[#2a2a40] border border-slate-700 text-[#d0d2d6] rounded-md focus:outline-none'>
                            <option value="">-- Select Status --</option>
                            <option value="active">Active</option>
                            <option value="deactive">Deactive</option>
                        </select>
                        <button 
                            type="submit"
                            className='bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md shadow hover:shadow-red-500/40 transition-all w-full sm:w-[170px]'
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SellerDetails;

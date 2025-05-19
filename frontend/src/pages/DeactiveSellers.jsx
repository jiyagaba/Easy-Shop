import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';
import { FaEye } from "react-icons/fa";

const DeactiveSellers = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [perPage, setPerPage] = useState(5);

    return (
        <div className='px-2 lg:px-7 pt-5'>
            <h1 className='text-[20px] font-bold mb-3 text-white'>Deactive Sellers</h1>

            <div className='w-full p-4 bg-[#1e1e2f] rounded-md shadow-[0_0_15px_#9b5cfb]'>
                {/* Top Controls */}
                <div className='flex justify-between items-center mb-4'>
                    <select 
                        onChange={(e) => setPerPage(parseInt(e.target.value))}
                        value={perPage}
                        className='px-4 py-2 bg-[#2a2a40] border border-slate-700 text-[#d0d2d6] rounded-md focus:outline-none'
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option> 
                    </select>

                    <input 
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder='Search...'
                        className='px-4 py-2 bg-[#2a2a40] border border-slate-700 text-[#d0d2d6] rounded-md focus:outline-none'
                    /> 
                </div>

                {/* Table */}
                <div className='relative overflow-x-auto'>
                    <table className='w-full text-sm text-left text-[#d0d2d6] min-w-[600px]'>
                        <thead className='text-xs  uppercase bg-[#a7a3de] text-[#1e1e2f]'>
                            <tr>
                                <th className='py-3 px-4'>No</th>
                                <th className='py-3 px-4'>Image</th>
                                <th className='py-3 px-4'>Name</th>
                                <th className='py-3 px-4'>Email</th>
                                <th className='py-3 px-4'>Payment Status</th>
                                <th className='py-3 px-4'>Status</th>
                                <th className='py-3 px-4'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[1,2,3,4,5].map((d, i) => (
                                <tr 
                                    key={i}
                                    className='hover:bg-[#2a2a40] hover:shadow-[0_0_10px_#9b5cfb] transition-all duration-200'
                                >
                                    <td className='py-2 px-4 whitespace-nowrap'>{d}</td>
                                    <td className='py-2 px-4'>
                                        <img 
                                            className='w-[45px] h-[45px] rounded-md object-cover' 
                                            src={`http://localhost:3001/images/category/${d}.jpg`} 
                                            alt={`Seller ${d}`} 
                                            onError={(e) => e.target.src = '/default-avatar.png'} // Fallback image
                                        />
                                    </td>
                                    <td className='py-2 px-4 whitespace-nowrap'>Jiya</td>
                                    <td className='py-2 px-4 whitespace-nowrap'>jiyaaa@gmail.com</td>
                                    <td className='py-2 px-4 whitespace-nowrap'>
                                        <span className='py-[2px] px-[8px] bg-yellow-400 text-black rounded-md text-xs font-semibold'>
                                            Pending
                                        </span>
                                    </td>
                                    <td className='py-2 px-4 whitespace-nowrap'>
                                        <span className='py-[2px] px-[8px] bg-red-500 text-white rounded-md text-xs font-semibold'>
                                            Deactive
                                        </span>
                                    </td>
                                    <td className='py-2 px-4 whitespace-nowrap'>
                                        <div className='flex items-center gap-2'>
                                            <Link 
                                                to={`/seller/details/${d}`} // Add actual route here
                                                className='p-[6px] bg-green-600 hover:bg-green-700 rounded-md text-white shadow hover:shadow-green-500/50 transition'
                                                title='View Details'
                                            >
                                                <FaEye />
                                            </Link> 
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody> 
                    </table> 
                </div>

                {/* Pagination */}
                <div className='w-full flex justify-end mt-4'>
                    <Pagination 
                        pageNumber={currentPage}
                        setPageNumber={setCurrentPage}
                        totalItem={50}
                        parPage={perPage}
                        showItem={3}
                    />
                </div>
            </div>
        </div>
    );
};

export default DeactiveSellers;

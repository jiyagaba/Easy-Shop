import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';
import { FaEye } from "react-icons/fa";

const Sellers = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [parPage, setParPage] = useState(5)

    return (
        <div className='px-2 lg:px-7 pt-5'>
            <h1 className='text-[20px] font-bold mb-3 text-white'>Sellers</h1>
            
            <div className='w-full p-4 bg-[#1e1e2f] rounded-md shadow-[0_0_15px_#9b5cfb]'>
                <div className='flex justify-between items-center mb-4 flex-wrap gap-3'>
                    <select
                        onChange={(e) => setParPage(parseInt(e.target.value))}
                        className='px-4 py-2 outline-none bg-[#1e1b4b] border border-[#9b5cfb] rounded-md text-white shadow-[0_0_10px_#9b5cfb]transition duration-300 hover:bg-[#2a2a40] hover:shadow-[0_0_15px_#9b5cfb] cursor-pointer'
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option> 
                    </select>

                    <input
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className='px-4 py-2 outline-none bg-[#1e1b4b] border border-[#9b5cfb] rounded-md text-white shadow-[0_0_10px_#9b5cfb]'
                        type="text"
                        placeholder='Search sellers...'
                    /> 
                </div>

                <div className='relative overflow-x-auto'>
                    <table className='w-full text-sm text-left text-white'>
                        <thead className='text-sm uppercase border-b border-[#9b5cfb]'>
                            <tr>
                                <th className='py-3 px-4'>No</th>
                                <th className='py-3 px-4'>Image</th>
                                <th className='py-3 px-4'>Name</th>
                                <th className='py-3 px-4'>Shop Name</th> 
                                <th className='py-3 px-4'>Payment Status</th> 
                                <th className='py-3 px-4'>Email</th> 
                                <th className='py-3 px-4'>State</th> 
                                <th className='py-3 px-4'>Action</th> 
                            </tr>
                        </thead>

                        <tbody>
                            {
                                [1,2,3,4,5].map((d, i) => (
                                    <tr 
                                        key={i} 
                                        className='transition duration-300 hover:bg-[#2a2a40] hover:shadow-[0_0_15px_#9b5cfb] cursor-pointer'
                                    >
                                        <td className='py-2 px-4 whitespace-nowrap'>{d}</td>
                                        <td className='py-2 px-4 whitespace-nowrap'>
                                            <img 
                                                className='w-[45px] h-[45px] rounded-md border border-[#9b5cfb] shadow-[0_0_6px_#9b5cfb]' 
                                                src={`http://localhost:3001/images/category/${d}.jpg`} 
                                                alt="" 
                                            />
                                        </td>
                                        <td className='py-2 px-4 whitespace-nowrap'>Jiyyyya</td>
                                        <td className='py-2 px-4 whitespace-nowrap'>Easy Shop</td>
                                        <td className='py-2 px-4 whitespace-nowrap'>
                                            <span className='text-yellow-400'>Pending</span>
                                        </td>
                                        <td className='py-2 px-4 whitespace-nowrap'>jiya@gmail.com</td>
                                        <td className='py-2 px-4 whitespace-nowrap'>Punjab</td>
                                        <td className='py-2 px-4 whitespace-nowrap'>
                                            <div className='flex items-center gap-4'>
                                                <Link
                                                    className='p-2 bg-green-600 text-white rounded-md hover:shadow-lg hover:shadow-green-500/50 transition duration-300'
                                                    to="#"
                                                >
                                                    <FaEye />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody> 
                    </table> 
                </div>  

                <div className='w-full flex justify-end mt-4'>
                    <Pagination 
                        pageNumber={currentPage}
                        setPageNumber={setCurrentPage}
                        totalItem={50}
                        parPage={parPage}
                        showItem={3}
                    />
                </div>
            </div>
        </div>
    );
};

export default Sellers;

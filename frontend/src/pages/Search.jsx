import React from 'react';

const Search = ({ setParPage,setSearchValue,searchValue }) => {
    return (
        <div className='flex justify-between items-center gap-4 flex-wrap'>
            <select
                onChange={(e) => setParPage(parseInt(e.target.value))}
                className='px-4 py-2 bg-white text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200'
            >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
            </select>

            <input onChange={(e) => setSearchValue(e.target.value)} value={searchValue}
                type="text"
                placeholder="Search"
                className='px-4 py-2 bg-white text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 w-full sm:w-auto'
            />
        </div>
    );
};

export default Search;

import React, { useState, useEffect } from 'react';
import Search from './Search';
import { Link } from 'react-router-dom';
import Pagination from '../views/Pagination';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';

const Prodsall = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [parPage, setParPage] = useState(5);
  const [products, setProducts] = useState([]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products');
        const data = await response.json();
        console.log('Fetched data:', data);

        if (Array.isArray(data)) {
          setProducts(data);
        } else if (Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          console.error('Unexpected data format:', data);
        }
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };

    fetchProducts();
  }, []);

  const startIndex = (currentPage - 1) * parPage;

  const filtered = Array.isArray(products)
    ? products.filter((product) =>
        product.title.toLowerCase().includes(searchValue.toLowerCase())
      )
    : [];

  const displayedProducts = filtered.slice(startIndex, startIndex + parPage);

  return (
    <div className='px-4 lg:px-8 pt-6'>
      <h1 className='text-[#000000] font-semibold text-lg mb-3'>All Products</h1>

      <div className='w-full p-6 bg-[#1e1e2f] rounded-xl border border-purple-500 shadow-[0_0_15px_#a855f7]'>

        {/* Top controls */}
        <div className='flex flex-col md:flex-row items-center justify-between gap-4 mb-4'>
          <div className='w-full md:w-auto md:mr-auto'>
            <select
              onChange={(e) => setParPage(parseInt(e.target.value))}
              className='px-4 py-2 bg-[#2a2a40] border border-slate-600 rounded-lg text-white outline-none transition duration-300 hover:bg-[#2a2a40] hover:shadow-[0_0_15px_#9b5cfb] cursor-pointer'
            >
              {[5, 10, 20].map((num) => (
                <option key={num} value={num}>{num} per page</option>
              ))}
            </select>
          </div>

          <div className='w-full md:w-auto md:ml-auto'>
            <Search
              setParPage={setParPage}
              setSearchValue={setSearchValue}
              searchValue={searchValue}
            />
          </div>
        </div>

        {/* Table */}
        <div className='overflow-x-auto'>
          <div className='min-w-full text-sm text-left text-white'>
            <div className='uppercase border-b border-slate-700 font-semibold flex py-3 bg-[#2d2d48] rounded-md text-sm text-gray-300'>
              <div className='w-[5%] px-2'>No</div>
              <div className='w-[10%] px-2'>Image</div>
              <div className='w-[20%] px-2'>Name</div>
              <div className='w-[15%] px-2'>Category</div>
              <div className='w-[15%] px-2'>Brand</div>
              <div className='w-[10%] px-2'>Price</div>
              <div className='w-[10%] px-2'>Discount</div>
              <div className='w-[10%] px-2'>Stock</div>
              <div className='w-[15%] px-2'>Action</div>
            </div>

            {displayedProducts.map((product, index) => (
              <div
                key={product.id}
                className='flex items-center border-b border-slate-800 py-3 transition duration-300 hover:bg-[#2a2a40] hover:shadow-[0_0_15px_#9b5cfb] cursor-pointer'
              >
                <div className='w-[5%] px-2'>{startIndex + index + 1}</div>
                <div className='w-[10%] px-2'>
                  <img
                    className='w-[45px] h-[45px] object-cover rounded'
                    src={`http://localhost:3000${product.img}`}
                    alt={product.title}
                  />
                </div>
                <div className='w-[20%] px-2'>{product.title}</div>
                <div className='w-[15%] px-2'>{product.category}</div>
                <div className='w-[15%] px-2'>{product.brand}</div>
                <div className='w-[10%] px-2'>${product.price}</div>
                <div className='w-[10%] px-2'>{product.discount}%</div>
                <div className='w-[10%] px-2'>{product.stock}</div>
                <div className='w-[15%] px-2'>
                  <div className='flex items-center gap-2'>
                    <Link
                      to={`edit-product/${product.id}`}
                      className='p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50'
                    >
                      <FaEdit />
                    </Link>
                    <Link
                      to={`view-product/${product.id}`}
                      className='p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50'
                    >
                      <FaEye />
                    </Link>
                    <button className='p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50'>
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className='w-full flex justify-end mt-6'>
          <Pagination
            pageNumber={currentPage}
            setPageNumber={setCurrentPage}
            totalItem={filtered.length}
            parPage={parPage}
            showItem={3}
          />
        </div>
      </div>
    </div>
  );
};

export default Prodsall;

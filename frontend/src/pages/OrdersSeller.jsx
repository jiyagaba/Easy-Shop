import React, { useState } from 'react';
import Search from './Search';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';
import { FaEye } from 'react-icons/fa';

const OrdersSeller = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [parPage, setParPage] = useState(5);

  const orders = [
    { id: 5451, price: 455, paymentStatus: 'Pending', orderStatus: 'Pending' },
    { id: 5452, price: 299, paymentStatus: 'Paid', orderStatus: 'Delivered' },
    { id: 5453, price: 675, paymentStatus: 'Pending', orderStatus: 'Processing' },
    { id: 5454, price: 812, paymentStatus: 'Paid', orderStatus: 'Shipped' },
    { id: 5455, price: 123, paymentStatus: 'Pending', orderStatus: 'Pending' },
  ];

  const filteredOrders = orders.filter((order) =>
    order.id.toString().includes(searchValue)
  );

  const startIndex = (currentPage - 1) * parPage;
  const displayedOrders = filteredOrders.slice(startIndex, startIndex + parPage);

  return (
    <div className='px-4 lg:px-8 pt-6'>
      <h1 className='text-[#000000] font-semibold text-lg mb-3'>Orders</h1>

      <div className='w-full p-6 bg-[#1e1e2f] rounded-xl border border-purple-500 shadow-[0_0_15px_#a855f7]'>

        {/* Dropdown on left, Search on right */}
        <div className='flex flex-col md:flex-row items-center justify-between gap-4 mb-4'>
          {/* Left: Items per page */}
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

          {/* Right: Search */}
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
              <div className='w-[25%] px-2'>Order ID</div>
              <div className='w-[15%] px-2'>Price</div>
              <div className='w-[20%] px-2'>Payment</div>
              <div className='w-[20%] px-2'>Status</div>
              <div className='w-[20%] px-2'>Action</div>
            </div>

            {displayedOrders.map((order) => (
              <div
                key={order.id}
                className='flex items-center border-b border-slate-800 py-3 transition duration-300 hover:bg-[#2a2a40] hover:shadow-[0_0_15px_#9b5cfb] cursor-pointer'
              >
                <div className='w-[25%] px-2'>#{order.id}</div>
                <div className='w-[15%] px-2'>${order.price}</div>
                <div className='w-[20%] px-2'>{order.paymentStatus}</div>
                <div className='w-[20%] px-2'>{order.orderStatus}</div>
                <div className='w-[20%] px-2'>
                  <Link
                    className='inline-flex items-center justify-center px-3 py-1 text-sm bg-green-500 hover:shadow-lg hover:shadow-green-500/50 rounded-md text-white'
                    to={`/seller-dashboard/order/details/${order.id}`}
                  >
                    <FaEye className='mr-1' /> View
                  </Link>
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
            totalItem={filteredOrders.length}
            parPage={parPage}
            showItem={3}
          />
        </div>
      </div>
    </div>
  );
};

export default OrdersSeller;

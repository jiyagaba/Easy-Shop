import React, { useState } from "react";
import { LuArrowDown } from "react-icons/lu";
import { Link } from "react-router-dom";
import Pagination from "../views/Pagination";

const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const orders = [
    { id: 34343, price: 654, paymentStatus: "Pending", orderStatus: "Pending" },
    { id: 34344, price: 210, paymentStatus: "Paid", orderStatus: "Shipped" },
    { id: 34345, price: 500, paymentStatus: "Pending", orderStatus: "Processing" },
    { id: 34346, price: 999, paymentStatus: "Paid", orderStatus: "Delivered" },
    { id: 34347, price: 789, paymentStatus: "Pending", orderStatus: "Pending" },
  ];

  const toggleExpand = (id) => {
    setExpandedOrderId((prev) => (prev === id ? null : id));
  };

  const filteredOrders = orders.filter(order =>
    order.id.toString().includes(searchValue)
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="px-4 lg:px-8 py-6">
      {/* ✅ Glowing Purple Border */}
      <div className="w-full p-6 bg-[#1e1e2f] rounded-xl border border-purple-500 shadow-[0_0_15px_#a855f7]">

        {/* Header Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <select
            onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
            className="px-4 py-2 bg-[#2a2a40] border border-slate-600 rounded-lg text-white outline-none transition duration-300 hover:bg-[#2a2a40] hover:shadow-[0_0_15px_#9b5cfb] cursor-pointer"
          >
            {[5, 10, 20].map((num) => (
              <option key={num} value={num}>{num} per page</option>
            ))}
          </select>

          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="px-4 py-2 w-full md:w-72 bg-[#2a2a40] border border-slate-600 rounded-lg text-white outline-none transition duration-300 hover:bg-[#2a2a40] hover:shadow-[0_0_15px_#9b5cfb] cursor-pointer"
            type="text"
            placeholder="Search by Order ID"
          />
        </div>

        {/* Table */}
        <div className="mt-6 overflow-x-auto">
          <div className="min-w-full text-sm text-left text-white">
            {/* Table Header */}
            <div className="uppercase border-b border-slate-700 font-semibold flex py-3 bg-[#2d2d48] rounded-md text-sm text-gray-300">
              <div className="w-[25%] px-2">Order ID</div>
              <div className="w-[13%] px-2">Price</div>
              <div className="w-[18%] px-2">Payment</div>
              <div className="w-[18%] px-2">Status</div>
              <div className="w-[18%] px-2">Action</div>
              <div className="w-[8%] px-2">Expand</div>
            </div>

            {/* Table Rows */}
            {displayedOrders.map((order) => (
              <React.Fragment key={order.id}>
                <div className="flex items-start border-b border-slate-800  transition duration-300 hover:bg-[#2a2a40] hover:shadow-[0_0_15px_#9b5cfb] cursor-pointer">
                  <div className="py-3 w-[25%] px-2">#{order.id}</div>
                  <div className="py-3 w-[13%] px-2">${order.price}</div>
                  <div className="py-3 w-[18%] px-2">{order.paymentStatus}</div>
                  <div className="py-3 w-[18%] px-2">{order.orderStatus}</div>
                  <div className="py-3 w-[18%] px-2 text-indigo-400">
                    <Link to={`/admin/dashboard/order/details/${order.id}`} className="underline">View</Link>
                  </div>
                  <div
                    onClick={() => toggleExpand(order.id)}
                    className="py-3 w-[8%] px-2 cursor-pointer text-lg"
                  >
                    <LuArrowDown />
                  </div>
                </div>

                {/* Expand Row */}
                {expandedOrderId === order.id && (
                  <div className="bg-[#383874] p-4 rounded-lg mb-4">
                    <div className="text-sm grid grid-cols-4 text-white gap-4">
                      <div>
                        <span className="font-semibold block">Extra Info 1:</span>
                        #Extra Info 1
                      </div>
                      <div>
                        <span className="font-semibold block">Price:</span>
                        $56
                      </div>
                      <div>
                        <span className="font-semibold block">Detail A:</span>
                        Info A
                      </div>
                      <div>
                        <span className="font-semibold block">Detail B:</span>
                        Info B
                      </div>
                    </div>
                    <div className="text-sm grid grid-cols-4 text-white gap-4 mt-3">
                      <div>
                        <span className="font-semibold block">Extra Info 2:</span>
                        #Extra Info 2
                      </div>
                      <div>
                        <span className="font-semibold block">Price:</span>
                        $99
                      </div>
                      <div>
                        <span className="font-semibold block">Detail C:</span>
                        Info C
                      </div>
                      <div>
                        <span className="font-semibold block">Detail D:</span>
                        Info D
                      </div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="w-full flex justify-end mt-6">
          <Pagination 
            pageNumber={currentPage}
            setPageNumber={setCurrentPage}
            totalItem={filteredOrders.length}
            parPage={itemsPerPage}
            showItem={3}
          />
        </div>
      </div>
    </div>
  );
};

export default Orders;

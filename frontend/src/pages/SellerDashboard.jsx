import React from "react";
import { FaBox, FaCheck, FaClipboardList, FaWarehouse } from "react-icons/fa";
import Chart from "react-apexcharts";

const SellerDashboard = () => {
  const boxes = [
    { amount: "150", label: "Total Products", color: "#1f0e4f", icon: <FaBox size={20} /> },
    { amount: "40", label: "Pending Orders", color: "#1f0e4f", icon: <FaClipboardList size={20} /> },
    { amount: "110", label: "Completed Orders", color: "#1f0e4f", icon: <FaCheck size={20} /> },
    { amount: "10", label: "Warehouses", color: "#1f0e4f", icon: <FaWarehouse size={20} /> },
  ];

  const chartOptions = {
    chart: { id: "seller-chart" },
    xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    tooltip: {
      theme: "dark",
      style: {
        fontSize: "14px",
        fontFamily: "Poppins, sans-serif",
      },
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const month = w.globals.labels[dataPointIndex];
        const value = series[seriesIndex][dataPointIndex];
        const label = w.globals.seriesNames[seriesIndex];
        return `
          <div style="
            background: #2a1b5c;
            color: #fff;
            padding: 10px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          ">
            <strong>${month}</strong><br/>
            ${label}: ${value}
          </div>
        `;
      }
    }
  };

  const chartSeries = [
    { name: "Orders", data: [12, 25, 30, 45, 60, 50] },
    { name: "Revenue", data: [1000, 2300, 2000, 2600, 3000, 2700] },
  ];

  const messages = [
    { user: "Support", message: "Your product listing is live", time: "2 days ago" },
    { user: "Buyer", message: "Query about delivery", time: "3 days ago" },
    { user: "Admin", message: "Order issue resolved", time: "4 days ago" },
  ];

  return (
    <div className="p-4 flex flex-col lg:flex-row bg-[#0f0a2b] min-h-screen">
      <div className="flex-1 p-4">
        {/* Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {boxes.map((box, index) => (
            <div
              key={index}
              className="p-4 rounded-xl shadow-[0_0_15px_#b183f2] flex justify-between items-center text-white border border-[#b183f2] transition-all duration-300"
              style={{ backgroundColor: box.color }}
            >
              <div>
                <h2 className="text-xl font-bold">{box.amount}</h2>
                <span className="text-sm text-[#d4c7ff]">{box.label}</span>
              </div>
              <div className="text-[#d4c7ff]">{box.icon}</div>
            </div>
          ))}
        </div>

        {/* Chart & Messages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#1f0e4f] p-4 rounded-xl shadow-[0_0_15px_#b183f2]">
            <Chart options={chartOptions} series={chartSeries} type="bar" height={250} />
          </div>

          <div className="bg-[#1f0e4f] p-4 rounded-xl shadow-[0_0_15px_#b183f2]">
            <h2 className="text-lg font-bold mb-2 text-white">Recent Messages</h2>
            <div className="space-y-2">
              {messages.map((msg, idx) => (
                <div key={idx} className="p-3 bg-[#2d216e] text-white rounded-md flex justify-between">
                  <span>{msg.user}: {msg.message}</span>
                  <span className="text-xs text-gray-400">{msg.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-[#1f0e4f] p-4 rounded-xl mt-4 shadow-[0_0_15px_#b183f2]">
          <h2 className="text-lg font-bold mb-2 text-white">Recent Orders</h2>
          <table className="w-full text-white border border-[#b183f2] rounded-md overflow-hidden">
            <thead>
              <tr className="border-b border-[#a186f2]">
                <th className="py-2">ORDER ID</th>
                <th className="py-2">PRICE</th>
                <th className="py-2">STATUS</th>
                <th className="py-2">SHIPPING</th>
                <th className="py-2">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map((_, idx) => (
                <tr key={idx} className="border-b border-[#a186f2] hover:bg-[#2d216e] transition-colors">
                  <td className="py-2">#SELL{idx + 101}</td>
                  <td className="py-2">$250</td>
                  <td className="py-2">Pending</td>
                  <td className="py-2">In Transit</td>
                  <td className="py-2">View</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const SellerDetails = () => {
  const [seller, setSeller] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    store_name: "",
    shop_name: "", // new field
  });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSellerDetails = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          alert("You are not logged in.");
          window.location.href = "/login"; // redirect if no token
          return;
        }

        const res = await fetch("http://localhost:3000/api/seller/10", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          alert("Session expired. Please log in again.");
          localStorage.removeItem("token");
          window.location.href = "/login";
          return;
        }

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch seller details");

        setSeller(data);
        setFormData({
          name: data.name || "",
          email: data.email || "",
          store_name: data.store_name || "",
          shop_name: data.shop_name || "",
        });
        setLoading(false);
      } catch (err) {
        console.error("❌ Error fetching seller details:", err.message);
        alert(`Error: ${err.message}`);
        setLoading(false);
      }
    };

    fetchSellerDetails();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("You are not logged in.");

    const currentSeller = JSON.parse(localStorage.getItem("seller"));
    if (seller.id !== currentSeller.id) return alert("Unauthorized");

    try {
      const res = await fetch(`http://localhost:3000/api/seller/${seller.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");

      setSeller(data);
      setEditMode(false);
      localStorage.setItem("seller", JSON.stringify(data));
      alert("✅ Seller details updated successfully");
    } catch (err) {
      console.error("❌ Update failed:", err);
      alert(`Something went wrong: ${err.message}`);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("You are not logged in.");

      const res = await fetch(`http://localhost:3000/api/seller/${seller.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Delete failed");

      localStorage.removeItem("seller");
      localStorage.removeItem("token");
      setSeller(null);
      alert("🗑️ Account deleted successfully");
    } catch (err) {
      console.error("❌ Delete failed:", err);
      alert(`Something went wrong: ${err.message}`);
    }
  };

  if (loading) return <div className="text-center text-white mt-10">Loading seller details...</div>;
  if (!seller) return <div className="text-center text-white mt-10">Seller not found.</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="px-4 py-5"
    >
      <h1 className="text-[24px] font-bold mb-4 text-[#7a35fe]">Seller Details</h1>

      <div className="w-full p-4 bg-gradient-to-br from-[#1e1e2f] to-[#2e266f] rounded-xl shadow-[0_0_20px_#9b5cfb] text-white">
        <div className="flex flex-wrap">
          {/* Image Section */}
          <div className="w-full md:w-3/12 flex justify-center items-center p-3">
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4 }}
              className="w-[200px] h-[230px] object-cover rounded-xl border-4 border-[#7a35fe]"
              src={seller.image || "http://localhost:3001/images/demo.jpeg"}
              alt="Seller"
            />
          </div>

          {/* Basic Info */}
          <div className="w-full md:w-4/12 p-3">
            <h2 className="text-lg font-semibold text-white mb-3 border-b border-purple-600 pb-1">
              Basic Info
            </h2>
            <div className="flex flex-col gap-3 p-4 bg-[#322a5f] rounded-xl">
              {["name", "email", "store_name", "shop_name"].map((field) => (
                <div key={field} className="text-sm">
                  <span className="font-bold">{field.replace(/_/g, " ").toUpperCase()}:</span>
                  {editMode ? (
                    <input
                      type="text"
                      name={field}
                      value={formData[field] || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 mt-1 rounded-md bg-[#3e326e] text-white border border-purple-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#9b5cfb]"
                    />
                  ) : (
                    <span className="ml-2">{seller[field] || "—"}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          {editMode ? (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl transition-all"
                onClick={handleSave}
              >
                Save
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-xl"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </motion.button>
            </>
          ) : (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-[#7a35fe] hover:bg-[#5f27cd] text-white px-6 py-2 rounded-xl"
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl"
                onClick={handleDelete}
              >
                Delete Account
              </motion.button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SellerDetails;

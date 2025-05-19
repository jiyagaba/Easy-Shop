import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const CustomerDashboard = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [emailChanged, setEmailChanged] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && typeof parsedUser === "object" && parsedUser.email) {
          setUser(parsedUser);
          setFormData(parsedUser);
        } else {
          throw new Error("Invalid user object");
        }
      } else {
        throw new Error("User not found in localStorage");
      }
    } catch (err) {
      console.error("User data corrupted or missing:", err);
      alert("Session expired or corrupted. Please log in again.");
      localStorage.removeItem("user");
      window.location.href = "/login";
    } finally {
      setLoading(false);
    }
  };

  const refreshUserData = () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setFormData(parsedUser);
      }
    } catch (err) {
      console.error("Failed to reload user data from localStorage:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "email" && value !== user?.email) {
      setEmailChanged(true);
    } else if (name === "email") {
      setEmailChanged(false);
    }
  };

  const handleSave = async () => {
    let newErrors = {};
    if (!formData.email.includes("@")) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const res = await fetch("http://localhost:3000/api/login", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await res.json();
        setUser(data.user);
        setEditMode(false);
        localStorage.setItem("user", JSON.stringify(data.user)); // Update localStorage
        alert("Changes saved to backend!");
      } catch (err) {
        console.error("Failed to update profile:", err);
        alert("Something went wrong while updating.");
      }
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Delete your account permanently?")) return;

    try {
      const res = await fetch("http://localhost:3000/api/profile", {
        method: "DELETE",
      });

      const data = await res.json();
      alert(data.message);
      setUser(null);
      localStorage.removeItem("user");
      window.location.href = "/login"; // Redirect after delete
    } catch (err) {
      console.error("Failed to delete account:", err);
      alert("Failed to delete account.");
    }
  };

  if (loading)
    return <div className="text-purple-500 text-sm mt-10">Loading...</div>;

  if (!user)
    return (
      <div className="text-purple-500 text-sm mt-10">User not logged in!</div>
    );

  const formattedPhone = user.phone
    ? user.phone.replace(/^\+(\d{1,4})(\d{5,})$/, "+$1 - $2")
    : "";

  const inputBox = (label, name, value) => (
    <div className="flex flex-col gap-1">
      {errors[name] && (
        <div className="text-red-600 text-sm -mb-1">{errors[name]}</div>
      )}
      <div className="bg-purple-50 shadow-md px-4 py-3 border-l-4 border-purple-400 flex justify-between items-center w-full cursor-text rounded-xl">
        <label
          htmlFor={name}
          className="font-medium text-gray-700 mr-4 w-[40%]"
        >
          {label}:
        </label>
        {editMode ? (
          <input
            type="text"
            name={name}
            id={name}
            value={formData[name] || ""}
            onChange={handleChange}
            className="bg-transparent text-gray-700 w-full text-right outline-none"
          />
        ) : (
          <span className="text-gray-800 text-right w-full">{value}</span>
        )}
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full h-full bg-white shadow-xl rounded-2xl flex flex-col justify-between border border-purple-200"
    >
      <h2 className="text-3xl font-extrabold text-purple-700 px-8 pt-8 mb-6">
        Welcome, {user.first_name}
      </h2>

      <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6 text-gray-800 text-[16px] px-8 pb-4">
        {inputBox("First Name", "first_name", user.first_name)}
        {inputBox("Middle Name", "middle_name", user.middle_name || "")}
        {inputBox("Last Name", "last_name", user.last_name || "")}
        {inputBox("Username", "username", user.username)}
        {inputBox("Email", "email", user.email)}
        {inputBox("Phone", "phone", formattedPhone)}
        {inputBox("House No", "house_no", user.house_no)}
        {inputBox("Street", "street", user.street)}
        {inputBox("Landmark", "landmark", user.landmark)}
        {inputBox("City", "city", user.city)}
        {inputBox("State", "state", user.state)}
        {inputBox("Country", "country", user.country)}
        {inputBox("Pincode", "pincode", user.pincode)}
      </div>

      <div className="flex flex-wrap gap-4 justify-between px-8 pb-8 mt-4 w-full">
        {editMode ? (
          <button
            onClick={handleSave}
            className={`w-full sm:w-[32%] py-3 text-lg font-semibold text-white rounded-lg hover:shadow transition-all duration-300 flex items-center justify-center gap-2 ${
              emailChanged
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {emailChanged ? "Save & Verify Email" : "Save Changes"}
          </button>
        ) : (
          <>
            <button
              onClick={() => {
                refreshUserData();
                setEditMode(true);
              }}
              className="w-full sm:w-[32%] py-3 text-lg font-semibold bg-purple-600 text-white rounded-lg hover:bg-purple-700 hover:shadow flex items-center justify-center gap-2"
            >
              <FiEdit className="text-xl" />
              Edit Details
            </button>

            <button
              onClick={handleDeleteAccount}
              className="w-full sm:w-[32%] py-3 text-lg font-semibold bg-red-600 text-white rounded-lg hover:bg-red-700 hover:shadow flex items-center justify-center gap-2"
            >
              <FiTrash2 className="text-xl" />
              Delete Account
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default CustomerDashboard;

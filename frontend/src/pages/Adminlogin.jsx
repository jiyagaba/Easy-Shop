import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
import { faLock } from "@fortawesome/free-solid-svg-icons/faLock";

const AdminLogin = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    setMessage("Logging in...");

    try {
      const response = await fetch("http://localhost:3000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setMessage("✅ Admin logged in successfully!");
        navigate("/admin-dashboard");
      } else {
        setMessage(`❌ ${data.message || "Login failed"}`);
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Error connecting to server. Please try again.");
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#cdcae9]">
      <motion.div
        initial={{ x: "100vw", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 60 }}
        className="w-[500px] min-h-[400px] flex flex-col bg-white rounded-lg shadow-lg p-8"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Admin Login
        </h2>
        <form className="w-full" onSubmit={submit}>
          <div className="relative mb-4">
            <input
              name="email"
              type="email"
              placeholder="Admin Email"
              value={state.email}
              onChange={inputHandle}
              className="w-full p-4 pl-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6f68d1] text-lg bg-slate-100"
            />
            <FontAwesomeIcon
              icon={faEnvelope}
              className="absolute left-4 top-4 text-gray-500 text-lg"
            />
          </div>

          <div className="relative mb-4">
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={state.password}
              onChange={inputHandle}
              className="w-full p-4 pl-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6f68d1] text-lg bg-slate-100"
            />
            <FontAwesomeIcon
              icon={faLock}
              className="absolute left-4 top-4 text-gray-500 text-lg"
            />
          </div>

          {message && (
            <p
              className={`mt-4 text-lg font-semibold ${
                message.includes("✅") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            className="w-full mt-4 bg-[#6f68d1] hover:shadow-lg text-white font-bold py-3 text-lg rounded-md"
          >
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;

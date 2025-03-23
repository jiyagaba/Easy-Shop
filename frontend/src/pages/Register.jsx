import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

const API_URL = "http://localhost:3000/api/signup"; // Correct API URL

const Register = () => {
  const [state, setState] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const inputHandle = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: state.name,
          email: state.email,
          password: state.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      setSuccess("Signup successful! Please verify your email.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#cdcae9]">
      <motion.div
        initial={{ x: "-100vw", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 60 }}
        className="w-[800px] min-h-[500px] flex bg-white rounded-lg shadow-lg overflow-hidden"
      >
        <div className="w-1/2 h-full flex flex-col justify-center p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Register</h2>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          {success && <p className="text-green-500 mb-2">{success}</p>}
          <form className="w-full" onSubmit={submit}>
            {[
              { name: "name", type: "text", placeholder: "Username", icon: "fa-user" },
              { name: "email", type: "email", placeholder: "Email", icon: "fa-envelope" },
              { name: "password", type: "password", placeholder: "Password", icon: "fa-lock" },
            ].map(({ name, type, placeholder, icon }) => (
              <div className="relative mb-4" key={name}>
                <input
                  onChange={inputHandle}
                  value={state[name]}
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  className="w-full p-4 pl-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6f68d1] text-lg bg-slate-100"
                  required
                />
                <i className={`absolute left-4 top-4 text-gray-500 fa ${icon} text-lg`}></i>
              </div>
            ))}
            <button
              type="submit"
              className="w-full mt-4 bg-[#6f68d1] hover:shadow-lg text-white font-bold py-3 text-lg rounded-md"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
        <div className="w-1/2 bg-[#6f68d1] flex flex-col justify-center items-center text-white p-8 rounded-l-[100px]">
          <h2 className="text-2xl font-bold">Welcome Back!</h2>
          <p className="mt-2">Already have an account?</p>
          <button
            onClick={() => navigate("/login")}
            className="mt-4 border-2 bg-white text-[#6f68d1] hover:bg-[#5a54c7] hover:text-white font-bold py-3 px-8 rounded-md text-lg"
          >
            Login
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
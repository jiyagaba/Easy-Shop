import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerSeller } from "../features/seller/sellerThunk";
import { clearStatus } from "../features/seller/sellerSlice";
import "@fortawesome/fontawesome-free/css/all.min.css";

const SellerRegister = () => {
  const [state, setState] = useState({
    sellername: "",
    email: "",
    password: "",
    store_name: "",
    role: "seller",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.seller);

  const inputHandle = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    const sellerData = {
      sellername: state.sellername,
      email: state.email,
      password: state.password,
      store_name: state.store_name,
      role: "seller",
    };

    console.log("Form data being submitted:", sellerData);
    dispatch(registerSeller(sellerData));
  };

  useEffect(() => {
    dispatch(clearStatus());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      const timeout = setTimeout(() => navigate("/seller-login"), 3000);
      return () => clearTimeout(timeout);
    }
  }, [success, navigate]);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#cdcae9]">
      <motion.div
        initial={{ x: "-100vw", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 60 }}
        className="w-[800px] min-h-[550px] flex bg-white rounded-lg shadow-lg overflow-hidden"
      >
        {/* Left Side - Registration Form */}
        <div className="w-1/2 h-full flex flex-col justify-center p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Seller Registration</h2>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          {success && <p className="text-green-500 mb-2">{success}</p>}

          <form onSubmit={submit}>
            {[
              { name: "sellername", type: "text", placeholder: "Username", icon: "fa-user" },
              { name: "email", type: "email", placeholder: "Email", icon: "fa-envelope" },
              { name: "password", type: "password", placeholder: "Password", icon: "fa-lock" },
              { name: "store_name", type: "text", placeholder: "Store Name", icon: "fa-store" },
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
              disabled={loading}
              className="w-full mt-4 bg-[#6f68d1] hover:shadow-lg text-white font-bold py-3 text-lg rounded-md"
            >
              {loading ? "Registering..." : "Register as Seller"}
            </button>
          </form>
        </div>

        {/* Right Side - Redirect to Login */}
        <div className="w-1/2 bg-[#6f68d1] flex flex-col justify-center items-center text-white p-8 rounded-l-[100px]">
          <h2 className="text-2xl font-bold">Already a Seller?</h2>
          <p className="mt-2">Log in to manage your store.</p>
          <button
            onClick={() => navigate("/seller-login")}
            className="mt-4 border-2 bg-white text-[#6f68d1] hover:bg-[#5a54c7] hover:text-white font-bold py-3 px-8 rounded-md text-lg"
          >
            Seller Login
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default SellerRegister;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shops from "./pages/Shops";
import Card from "./pages/Cards";
import Details from "./pages/Details";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SellerLogin from "./pages/SellerLogin";
import SellerRegister from "./pages/SellerRegister";
import AdminLogin from "./pages/Adminlogin";
import AdminDashboard from "./pages/AdminDashboard";
import MainLayout from "./layout/MainLayout";
import Orders from "./pages/Orders";
import Category from "./pages/Category";
import Sellers from "./pages/Sellers";
import PaymentRequest from "./pages/PaymentRequest";
import DeactiveSellers from "./pages/DeactiveSellers";
import { Outlet } from "react-router-dom";
import SellerRequest from "./pages/SellerRequest";
import SellerDetails from "./pages/SellerDetails";
import ChatSeller from "./pages/ChatSeller";
import SellerDashboard from "./pages/SellerDashboard";
import AddProduct from "./pages/AddProduct";
import Prodsall from "./pages/Prodsall";
import DiscountProducts from "./pages/DiscountProducts";
import OrdersSeller from "./pages/OrdersSeller";
import Payments from "./pages/Payments";
import SellerToCustomer from "./pages/SellertoCustomer";
import SellerToAdmin from "./pages/SellerToAdmin";
import Profile from "./pages/Profile";
import EditProduct from "./pages/EditProduct";
// import CustomerDashboard from "./pages/CustomerDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/seller-login" element={<SellerLogin />} />
        <Route path="/seller-register" element={<SellerRegister />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/shops" element={<Shops />} />
        <Route path="/card" element={<Card />} />
        <Route path="/product/details/:id" element={<Details />} />
        <Route path="/dashboard" element={<Profile/>}/>
        
        
        {/* Admin Dashboard Layout */}
        <Route path="/admin-dashboard" element={<MainLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="category" element={<Category/>} />
          <Route path="sellers" element={<Sellers/>} />
          <Route path="payment-request" element={<PaymentRequest/>} />
          <Route path="deactive-sellers" element={<DeactiveSellers/>} /> 
          <Route path="seller-request" element={<SellerRequest/>} />
          <Route path="seller-request/seller/details" element={<SellerDetails/>}/>
          <Route path="chat-seller" element={<ChatSeller/>} /> 
        </Route>

        <Route path="/seller-dashboard" element={<MainLayout />}>
        <Route index element={<SellerDashboard />} />
        <Route path="add-product" element={<AddProduct/>} />
        <Route path="all-product" element={<Prodsall/>}/>
        <Route path="add-product/all-product" element={<Prodsall/>}/>
        <Route path="discount-product" element={<DiscountProducts/>}/>
        <Route path="orders" element={<OrdersSeller/>}/>
        <Route path="payments" element={<Payments/>}/>
        <Route path="chat-customer" element={<SellerToCustomer/>}/>
        <Route path="chat-support" element={<SellerToAdmin/>}/>
        <Route path="profile" element={<Profile/>}/>
        <Route path="all-product/edit-product" element={<EditProduct/>}/>
        

        

        </Route>
      
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;

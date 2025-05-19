import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shops from "./pages/Shops";
import Cart from "./pages/Cart";
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
import CategoryProducts from "./pages/CategoryProducts";
import LikedProducts from "./pages/LikedProducts";
import Review from "./pages/Review";
// import Cart from "./pages/Cart";
import { WishlistProvider } from "./contexts/WishlistProvider";
import { CartProvider } from "./contexts/CartContext";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import AboutUs from "./pages/AboutUs";
// import CustomerDashboard from "./pages/CustomerDashboard";

function App() {
  return (
    <BrowserRouter>
    <WishlistProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/seller-login" element={<SellerLogin />} />
          <Route path="/seller-register" element={<SellerRegister />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/shops" element={<Shops />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/details/:id" element={<Details />} />
          <Route path="/dashboard" element={<Profile/>}/>
          <Route path="/category/:category" element={<CategoryProducts />} />
          <Route path="/liked-products" element={<LikedProducts/>}/>
          <Route path="/blog" element={<BlogPage/>}/>
          <Route path='/contact' element={<ContactPage/>}/>
          {/* <Route path="/cart" element={<Card />} /> */}
          <Route path="/about" element={<AboutUs/>}/>
          <Route path="/product/review/:productId" element={<Review />} />

        
        
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
        <Route path="profile" element={<SellerDetails/>}/>
        <Route path="all-product/edit-product/:id" element={<EditProduct/>}/>
        

        

        </Route>
      
        

        </Routes>
      </CartProvider>
    </WishlistProvider>
    </BrowserRouter>
  );
}

export default App;

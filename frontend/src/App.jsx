import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Shops from './pages/Shops';
import Card from './pages/Cards';
import Details from './pages/Details';
import Login from './pages/Login';
import Register from './pages/Register';
import SellerLogin from './pages/SellerLogin';
import SellerRegister from './pages/SellerRegister';
import AdminLogin from './pages/Adminlogin';
// import Category from './components/Category';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/seller-login" element={<SellerLogin/>}/>
         <Route path="/seller-register" element={<SellerRegister />} />
         <Route path="/admin-login" element={<AdminLogin/>}/>
        <Route path='/shops' element={<Shops/>} />
        {/* <Route path='/category' element={<Category/>}/> */}
        <Route path='/card' element={<Card/>} />
        <Route path='/product/details/:id' element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

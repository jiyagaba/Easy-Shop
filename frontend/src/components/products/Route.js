import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Login from "./Login";  // Import your login component
import Register from "./Register"; // Import your register component
import SellerLogin from "./pages/SellerLogin";
import SellerRegister from "./pages/SellerRegister";
import AdminLogin from "../../pages/Adminlogin";
// import SellerLogin from "../../pages/SellerLogin";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/seller-login" element={<SellerLogin/>}/>
        <Route path="/seller-register" element={<SellerRegister />} />
        <Route path="/admin-login" element={<AdminLogin/>}/>

      </Routes>
    </Router>
  );
}

export default App;

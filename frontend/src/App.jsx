import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./Component/Navbar";
import Footer from "./Component/footer";
import Blog from "./Pages/Blog";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Login from "./Component/Login";
import Signup from "./Component/Signup";
import ForgetPassword from "./Component/ForgetPassword";
import ForgetPasswordOTP from "./Component/ForgetPasswordOTP";
import ResetPassword from "./Component/ResetPassword";
import AuthResetPassword from "./Component/AuthResetPassord";
import OTP from "./Component/OTP";
import AllProductListing from "./Pages/ProductListing";
import UserProductListing from "./Component/product/UserProductList";
import UserAddProduct from "./Component/product/UserAddProduct";
import UserProfileEdit from "./Component/UserProfileEdit";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/products" element={<AllProductListing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/user/products" element={<UserProductListing />} />
          <Route path="/user/product/add" element={<UserAddProduct />} />
          <Route path="/user/profile/edit" element={<UserProfileEdit />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/otp" element={<OTP />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/forget-password/otp" element={<ForgetPasswordOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/password-reset" element={<AuthResetPassword />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;

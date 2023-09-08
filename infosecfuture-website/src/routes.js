import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/home/index";
import CustomNavbar from "./components/navbar/navbar";
import LoginRegistrationForm from "./pages/login_register/login_register";
import Footer from "./components/footer/footer";

const RoutesConfig = () => {
  const location = useLocation();

  return (
    <div>
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login-signup" element={<LoginRegistrationForm />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
      
      {location.pathname !== "/login-signup" && <Footer />}
    </div>
  );
};

export default RoutesConfig;

import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../../pages/Login";
import Products from "../../pages/Products";
import Cart from "../../pages/Cart";
import Profile from "../../pages/Profile";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/products" element={<Products />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/" element={<Navigate to="/products" replace />} />
    </Routes>
  );
};

export default AppRoutes;

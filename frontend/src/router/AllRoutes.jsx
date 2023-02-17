
import { Route, Routes } from "react-router-dom";
import { Admin } from "../pages/Admin";
import { Cart } from "../pages/Cart";
import { Checkout } from "../pages/Checkout";
import { Create } from "../pages/Create";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Singup } from "../pages/Singup";
export const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/singup" element={<Singup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/:id" element={<Admin/>} />
        <Route path="/add" element={<Create/>} />
        <Route path="/checkout" element={<Checkout/>} />
      </Routes>
    </>
  );
};

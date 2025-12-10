import { Route, Routes } from "react-router-dom";
import DefaultLayout from "@/layouts/DefaultLayout";
import AuthLayout from "@/layouts/AuthLayout";
import ProductCategory from "@/pages/user/productCategory/product-category";
import Products from "@/pages/user/products/products";
import AddToCart from "@/pages/user/addToCart/add-to-cart";
import SignIn from "@/pages/auth/sign-in";
import SignUp from "@/pages/auth/sign-up";
import Home from "@/pages/user/home/home";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/category/:type" element={<ProductCategory />} />
        <Route path="/product/:id" element={<Products />} />
        <Route path="/cart" element={<AddToCart />} />
      </Route>

      <Route path="/auth" element={<AuthLayout />}>
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
      </Route>
    </Routes>
  );
};
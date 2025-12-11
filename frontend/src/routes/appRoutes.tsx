import { Route, Routes } from "react-router-dom";
import DefaultLayout from "@/layouts/DefaultLayout";
import AuthLayout from "@/layouts/AuthLayout";
import ProductCategory from "@/pages/user/productCategory/product-category";
import ProductDetails from "@/pages/user/productDetails/productDetails";
import AddToCart from "@/pages/user/addToCart/add-to-cart";
import AllBrands from "@/pages/user/brands/all-brands";
import Wishlist from "@/pages/user/wishlist/Wishlist";
import Login from "@/pages/auth/login/page";
import Home from "@/pages/user/home/home";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/category/:type" element={<ProductCategory />} />
        <Route path="/product-category/:id" element={<ProductCategory />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<AddToCart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/all-brands" element={<AllBrands />} />
      </Route>

      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        {/* <Route path="sign-up" element={<SignUp />} /> */}
      </Route>
    </Routes>
  );
};
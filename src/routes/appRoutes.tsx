import { Route, Routes } from "react-router-dom";
import DefaultLayout from "@/layouts/DefaultLayout";
import AuthLayout from "@/layouts/AuthLayout";
import ProductCategory from "@/pages/user/productCategory/product-category";
import ProductDetails from "@/pages/user/productDetails/productDetails";
import AddToCart from "@/pages/user/addToCart/add-to-cart";
import AllBrands from "@/pages/user/brands/all-brands";
import Wishlist from "@/pages/user/wishlist/Wishlist";
import Login from "@/pages/auth/login/login";
import Home from "@/pages/user/home/home";
import Register from "@/pages/auth/register/register";
import { VerifyOtp } from "@/pages/auth/verify-otp/page";
import { ResetPassword } from "@/pages/auth/reset-password/reset-password";
import OtpVerifiedSuccessfully from "@/pages/auth/otp-verified-successfully/otp-varified-successfully";
import ForgotPassword from "@/pages/auth/forgot-password/forgot-password";
import NotFound from "@/components/user/NotFound";
import About from "@/pages/user/about/about";

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
        <Route path="/about" element={<About />} />
      </Route>

      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="sign-up" element={<Register />} />
        <Route path="verify-otp" element={<VerifyOtp />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="otp-verified-successfully" element={<OtpVerifiedSuccessfully />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>
       <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
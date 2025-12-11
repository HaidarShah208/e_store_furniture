import { Form, Formik, type FormikHelpers } from "formik";
import Button from "../../../components/Button";
import {useNavigate } from "react-router-dom";
import type { LoginValues } from "../../../lib/type/api/auth";
import AuthLayout from "../../../components/Layout/AuthLayout";
import { useState } from "react";
import { useVerifyOtpMutation } from "../../../redux/api/auth";
import { OTPInput } from "./component/otpInput";
 

export const VerifyOtp = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState<string[]>([]);
    const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
    const initialValues: LoginValues = { email: "" };
  
    const submitHandler = async (_values: LoginValues, actions: FormikHelpers<LoginValues>) => {
      const otpCode = otp.join("");
      const email = localStorage.getItem("email");
      const body = { email: email!, otp: otpCode };
      if (otpCode) { localStorage.setItem("reset_token", String(otpCode)); }
      await verifyOtp(body).unwrap();
  
  
      navigate("/reset-password");    
      actions.setSubmitting(false);
    };
  
    return (
      <AuthLayout>
      <div className="flex flex-col min-h-screen w-full max-w-md mx-auto">

        <div className="pt-4 pb-6 flex-shrink-0">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="text-xl font-medium">Verify</span>
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <div className="mb-8 text-center">
            <h1 className="mb-2 font-medium text-gray-800 text-xl dark:text-white/90">
              Reset code sent to your email
            </h1>
            <p className="text-sm text-primaryGray dark:text-gray-400">
              We’ve sent a 4-digit code to your department email.
            </p>
          </div>

          <Formik initialValues={initialValues} onSubmit={submitHandler}>
            {(formik) => (
              <Form onSubmit={formik.handleSubmit}>
                <div className="flex justify-center mb-3">
                  <OTPInput setOtp2={setOtp} />
                </div>
              </Form>
            )}
          </Formik>
        </div>

        <div className="mt-auto pt-8 pb-6">
          <Button
            buttonText="Verify"
            type="submit"
            className="rounded-2xl w-full"
            isLoading={isLoading}
            onClick={() => {
              document.querySelector("form")?.requestSubmit();
            }}
          />
        </div>

      </div>
    </AuthLayout>
    );
  };
  
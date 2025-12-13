import { Form, Formik, type FormikHelpers } from "formik";
import Button from "@/components/common/Button";
import {useNavigate } from "react-router-dom";
import type { LoginValues } from "@/types/api/auth";
import { useState } from "react";
import { OTPInput } from "./component/otpInput";
import { useTranslation } from "react-i18next";
 

export const VerifyOtp = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [otp, setOtp] = useState<string[]>([]);
    const initialValues: LoginValues = { email: "" };
  
    const submitHandler = async (_values: LoginValues, actions: FormikHelpers<LoginValues>) => {
      const otpCode = otp.join("");
      if (otpCode) { localStorage.setItem("reset_token", String(otpCode)); }
      navigate("/auth/reset-password");    
      actions.setSubmitting(false);
    };
  
    return (
      <div className="flex flex-col min-h-screen w-full max-w-md mx-auto">

        <div className="pt-4 pb-6  shrink-0">
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
            <span className="text-xl font-medium">{t('auth.verifyOtp.title')}</span>
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <div className="mb-8 text-center">
            <h1 className="mb-2 font-medium text-gray-800 text-xl dark:text-white/90">
              {t('auth.verifyOtp.resetCodeSent')}
            </h1>
            <p className="text-sm text-primaryGray dark:text-gray-400">
              {t('auth.verifyOtp.description')}
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
            buttonText={t('auth.verifyOtp.verify')}
            type="submit"
            className="rounded-2xl w-full"
            onClick={() => {
              document.querySelector("form")?.requestSubmit();
            }}
          />
        </div>

      </div>
    );
  };
  
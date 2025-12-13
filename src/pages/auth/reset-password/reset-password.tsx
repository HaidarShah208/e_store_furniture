import { Form, Formik, type FormikHelpers } from "formik";
import Button from "@/components/common/Button";
import { useNavigate } from "react-router-dom";
import FormControl from "@/components/common/FormControl";
import {
  ResetPasswordSchema,
  ResetPasswordType,
} from "@/utils/schema";
import { useTranslation } from "react-i18next";
 

export const ResetPassword = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const initialValues: ResetPasswordType = {
      password: "",
      password_confirmation: "",
    };
  
    const submitHandler = async (_values: ResetPasswordType, actions: FormikHelpers<ResetPasswordType>) => {
      const token = localStorage.getItem("reset_token");
      if (!token) {
        navigate("/auth/forgot-password");  
        return;
      }
    
          localStorage.removeItem("reset_token");
          navigate("/auth/login");
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
                <span className="text-lg font-medium">{t('auth.resetPassword.title')}</span>
              </button>
            </div>
    
            <div className="flex-1 flex flex-col justify-center">
              <div className="mb-8 text-center">
              <h1 className="mb-2 font-medium text-gray-800 text-xl dark:text-white/90">
                  {t('auth.resetPassword.createNewPassword')}
                </h1>
                <p className="text-sm text-primaryGray dark:text-gray-400">
                  {t('auth.resetPassword.description')}
                </p>
              </div>
    
              <Formik
                initialValues={initialValues}
                validationSchema={ResetPasswordSchema}
                onSubmit={submitHandler}
              >
                {(formik) => (
                  <Form onSubmit={formik.handleSubmit}>
                    <FormControl
                     inputStyle="rounded-2xl border-gray-300"
                      control="input"
                      label=""
                      type="password"
                      name="password"
                      placeholder={t('auth.resetPassword.newPassword')}
                    />
    
                    <FormControl
                     inputStyle="rounded-2xl border-gray-300"
                      control="input"
                      label=""
                      type="password"
                      name="password_confirmation"
                      placeholder={t('auth.resetPassword.confirmPassword')}
                    />
                  </Form>
                )}
              </Formik>
            </div>
    
            <div className="mt-auto pt-8 pb-6">
              <Button
                buttonText={t('auth.resetPassword.savePassword')}
                type="submit"
                className="rounded-2xl w-full"
                onClick={() => {
                  document.querySelector("form")?.requestSubmit();
                }}
              />
            </div>
    
          </div>
    )
  };
  
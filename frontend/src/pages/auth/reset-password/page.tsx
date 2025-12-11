import { Form, Formik, type FormikHelpers } from "formik";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import FormControl from "../../../components/FormControl";
import AuthLayout from "../../../components/Layout/AuthLayout";
import {
  ResetPasswordSchema,
  ResetPasswordType,
} from "../../../lib/schema";
import {
    useChangePasswordMutation,
} from "../../../redux/api/auth";

export const ResetPassword = () => {
    const navigate = useNavigate();
    const initialValues: ResetPasswordType = {
      password: "",
      password_confirmation: "",
    };
    const [changePassword, { isLoading }] = useChangePasswordMutation();
  
    const submitHandler = async (values: ResetPasswordType, actions: FormikHelpers<ResetPasswordType>) => {
      const token = localStorage.getItem("reset_token");
      if (!token) {
        navigate("/forgot-password");  
        return;
      }
      const body = {
        token: token,
        newPassword: values.password,
        confirmPassword: values.password_confirmation,
      };
      try {
        const response = await changePassword(body).unwrap();
        console.log(response);
        localStorage.removeItem("reset_token");
        navigate("/login");
      } catch (err) {
      } finally {
        actions.setSubmitting(false);
      }
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
                <span className="text-lg font-medium">Reset Password</span>
              </button>
            </div>
    
            <div className="flex-1 flex flex-col justify-center">
              <div className="mb-8 text-center">
              <h1 className="mb-2 font-medium text-gray-800 text-xl dark:text-white/90">
                  Create New Password
                </h1>
                <p className="text-sm text-primaryGray dark:text-gray-400">
                  Enter a strong password to secure your account.
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
                      placeholder="New Password"
                    />
    
                    <FormControl
                     inputStyle="rounded-2xl border-gray-300"
                      control="input"
                      label=""
                      type="password"
                      name="password_confirmation"
                      placeholder="Confirm Password"
                    />
                  </Form>
                )}
              </Formik>
            </div>
    
            <div className="mt-auto pt-8 pb-6">
              <Button
                buttonText="Save Password"
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
    )
  };
  
import { Form, Formik, type FormikHelpers } from "formik";
import Button from "@/components/common/Button";
import { useNavigate } from "react-router-dom";
import FormControl from "@/components/common/FormControl";
import type { LoginValues } from "@/types/api/auth";
import { EmailSchema } from "@/utils/schema";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const initialValues: LoginValues = { email: "" };
  
  const submitHandler = async (_values: LoginValues, actions: FormikHelpers<LoginValues>) => {
    localStorage.setItem("email", _values.email);
    navigate("/verify-otp");  
    actions.setSubmitting(false);
  };

  return (
      <div className="flex flex-col min-h-screen w-full  mx-auto ">
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
            <span className="text-lg font-medium">Forgot Password</span>
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-center ">
          <div className="mb-8 text-center">
            <h1 className="mb-2 font-semibold text-gray-800 text-2xl dark:text-white/90">
              Reset your password
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              We'll send a reset code to your department email.
            </p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={EmailSchema}
            onSubmit={submitHandler}
          >
            {(formik) => (
              <Form onSubmit={formik.handleSubmit}>
                <FormControl
                  inputStyle="rounded-2xl border-gray-300"
                  control="input"
                  label=""
                  type="email"
                  name="email"
                  placeholder="Enter your Department email"
                />
              </Form>
            )}
          </Formik>
        </div>                
                <div className="mt-auto pt-8 pb-6">
                  <Button 
                    buttonText="Send Reset Code" 
                    type="submit" 
                    className="rounded-2xl w-full" 
                    onClick={() => {
                      document.querySelector('form')?.requestSubmit();
                    }}
                  />
                </div>
      </div>
  );
}
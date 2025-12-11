
import { Form, Formik } from "formik";
import type { RegisterValues } from "@/types/api/auth";
import { Link, useNavigate } from "react-router-dom";
import { RegisterSchema } from "@/utils/schema";
import FormControl from "@/components/common/FormControl";
import Button from "@/components/common/Button";
import sargelogo from '@/assets/Logo.svg'

export default function Register() {
  const initialValues: RegisterValues = {
    name: "",
    email: "",
    officer_id:"",
    password: "",
    password_confirmation: "",
  };
  const navigate = useNavigate();

  const submitHandler = async (_values: RegisterValues, actions: any) => {
    navigate("/dashboard");
    actions.setSubmitting(false);
  };
  return (
    <>
      <div className="mt-40 flex justify-center flex-col items-center sm:mb-8">
      <div className=" mb-6">
                  <img src={sargelogo} alt="SARGE" className="h-28 w-36" />
               </div>
        <h1 className="mb-2 font-semibold text-xl dark:text-white/90 sm:text-title-md">
        Create your SARGE account
        </h1>
        <p className="text-sm text-primaryGray dark:text-gray-400">
        Use your official department email
        </p>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={RegisterSchema}
        onSubmit={submitHandler}
      >
        {(formik) => {
          return (
            <Form onSubmit={formik.handleSubmit}>
              <FormControl
                inputStyle="rounded-2xl border-gray-300"
                control="input"
                label=""
                type="text"
                name="name"
                placeholder="Full Name"
              />

              <FormControl
                inputStyle="rounded-2xl border-gray-300"
                control="input"
                label=""
                type="email"
                name="email"
                placeholder="Department Email"
              />
              <FormControl
              inputStyle="rounded-2xl border-gray-300"
                control="input"
                label=""
                type="text"
                name="officer_id"
                placeholder="Officer ID Number"
              />

              <FormControl
              inputStyle="rounded-2xl border-gray-300"
                control="input"
                label=""
                type="password"
                name="password"
                placeholder="Password"
              />

              <FormControl
              inputStyle="rounded-2xl border-gray-300"
                control="input"
                label=""
                type="password"
                name="password_confirmation"
                placeholder="Confirm Password"
              />           
            <div className="flex items-center space-x-2 my-6">
              <FormControl
                  control="checkbox"
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                   label={""} 
                   name={"checkbox"}/>
              <label htmlFor="terms" className="text-sm text-gray-700">
                I agree to the
                <a href="/terms">
                  Terms of Service
                </a> {" "}
                & {" "}
                <a href="/privacy">
                  Privacy Policy
                </a>
              </label>
            </div>

              <div className="mb-5">
                <Button
                  buttonText="Register"
                  type="submit"
                  className="rounded-2xl border-none"
                ></Button>
              </div>

              <div className="mt-10 mb-3  text-center">
                <p>
                  Already have an account?{" "}
                  <Link to="/auth/login" className="font-bold hover:underline">
                    Log in
                  </Link>
                </p>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

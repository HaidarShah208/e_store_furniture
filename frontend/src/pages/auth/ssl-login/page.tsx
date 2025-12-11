import { Form, Formik } from "formik";
import {   useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import FormControl from "../../../components/FormControl";
import AuthLayout from "../../../components/Layout/AuthLayout";
import type { LoginValues } from "../../../lib/type/api/auth";
import Selector from "../../../components/ui/sworn_officer/selector";
import { useState } from "react";

export default function SSLLogin() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("all");

  const initialValues: LoginValues = {
    email: "",
    password: "",
  };

  // const [login, { isLoading }] = useLoginMutation();

  const submitHandler = async (_values: LoginValues, actions: any) => {
    try {
      // const response = await login(values).unwrap();
      // console.log(response);
      navigate('/otp-verified-successfully')
    } finally {
      actions.setSubmitting(false);
    }
  };

   const SSOSelector=[
    { label: "Choose SSO Provider", value: "all" },
    { label: "Microsoft Azure AD", value: "microsoftazuread" },
  ]

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

            <span className="text-xl font-medium">SSO Login</span>
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <div className="mb-8 text-start">
            <h1 className="mb-2 font-medium text-gray-800 text-lg dark:text-white/90">
            Sign in using your department’s secure portal.
            </h1>
            <p className="text-sm text-primaryGray dark:text-gray-400">
            SSO ensures encrypted access across all SARGE systems under your agency network.
            </p>
          </div>

          <Formik
            initialValues={initialValues}
            // validationSchema={LoginSchema}
            onSubmit={submitHandler}
          >
            {(formik) => (
              <Form onSubmit={formik.handleSubmit} className="space-y-4">

                <FormControl
                  inputStyle="rounded-2xl border-gray-300"
                  control="input"
                  label=""
                  type="email"
                  name="email"
                  placeholder="Department Domain / Agency ID"
                />

          <Selector
          label=""
          className="border rounded-2xl py-3.5 px-2"
          options={SSOSelector}
          value={selectedOption}
          onChange={setSelectedOption}
        />
                <Button
                  buttonText="Login"
                  type="submit"
                  // isLoading={isLoading}
                  className="w-full bg-secondarySarge border-none rounded-2xl"
                />
 
              </Form>
            )}
          </Formik>
        </div>

      </div>
    </AuthLayout>
  );
}

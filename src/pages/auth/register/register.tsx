
import { Form, Formik } from "formik";
import type { RegisterValues } from "@/types/api/auth";
import { Link, useNavigate } from "react-router-dom";
import { RegisterSchema } from "@/utils/schema";
import FormControl from "@/components/common/FormControl";
import Button from "@/components/common/Button";
import { useTranslation } from "react-i18next";
import sargelogo from '@/assets/Logo.png'

export default function Register() {
  const { t } = useTranslation();
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
        {t('auth.signup.createSargeAccount')}
        </h1>
        <p className="text-sm text-primaryGray dark:text-gray-400">
        {t('auth.signup.useOfficialEmail')}
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
                placeholder={t('auth.signup.namePlaceholder')}
              />

              <FormControl
                inputStyle="rounded-2xl border-gray-300"
                control="input"
                label=""
                type="email"
                name="email"
                placeholder={t('auth.signup.departmentEmailPlaceholder')}
              />
              <FormControl
              inputStyle="rounded-2xl border-gray-300"
                control="input"
                label=""
                type="text"
                name="officer_id"
                placeholder={t('auth.signup.officerId')}
              />

              <FormControl
              inputStyle="rounded-2xl border-gray-300"
                control="input"
                label=""
                type="password"
                name="password"
                placeholder={t('auth.signup.passwordPlaceholder')}
              />

              <FormControl
              inputStyle="rounded-2xl border-gray-300"
                control="input"
                label=""
                type="password"
                name="password_confirmation"
                placeholder={t('auth.signup.confirmPasswordPlaceholder')}
              />           
            <div className="flex items-center space-x-2 my-6">
              <FormControl
                  control="checkbox"
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                   label={""} 
                   name={"checkbox"}/>
              <label htmlFor="terms" className="text-sm text-gray-700">
                {t('auth.signup.terms')}{" "}
                <a href="/terms">
                  {t('auth.signup.termsLink')}
                </a> {" "}
                {t('auth.signup.and')} {" "}
                <a href="/privacy">
                  {t('auth.signup.privacyLink')}
                </a>
              </label>
            </div>

              <div className="mb-5">
                <Button
                  buttonText={t('auth.signup.register')}
                  type="submit"
                  className="rounded-2xl border-none"
                ></Button>
              </div>

              <div className="mt-10 mb-3  text-center">
                <p>
                  {t('auth.signup.haveAccount')}{" "}
                  <Link to="/auth/login" className="font-bold hover:underline">
                    {t('auth.signup.logIn')}
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

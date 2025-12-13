import { Form, Formik } from 'formik';
import Button from '@/components/common/Button';
import FormControl from '@/components/common/FormControl';
import { LoginSchema } from '@/utils/schema';
import type { LoginValues } from '@/types/api/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import sargelogo from '@/assets/Logo.png'

export default function Login() {
   const { t } = useTranslation();
   const initialValues: LoginValues = { email: "", password: "" };
   const navigate = useNavigate();

   const submitHandler = async (_values: LoginValues, actions: any) => {
      try {
         navigate("/dashboard");
         actions.setSubmitting(false);
      } finally {
         actions.setSubmitting(false);
      }
   };
   return (
         <div className="flex flex-col mt-10 justify-center w-full py-4">
            <div className="mb-6 sm:mb-8 text-center">
               <div className="flex justify-center mb-4 sm:mb-6">
                  <img src={sargelogo} alt="SARGE" className="h-20 w-28 sm:h-28 sm:w-36" />
               </div>
               
               <h1 className="text-xl font-semibold text-gray-900 mb-1">
                  {t('auth.signin.welcomeToSarge')}
               </h1>
               <p className="text-sm font-medium text-primaryGray">
                  {t('auth.signin.loginToAccount')}
               </p>
            </div>

            <Formik
               initialValues={initialValues}
               validationSchema={LoginSchema}
               onSubmit={submitHandler}
            >
               {(formik) => {
                  return (
                     <Form onSubmit={formik.handleSubmit} className="space-y-4">
                        <FormControl
                        inputStyle="rounded-2xl border-gray-300"
                           control="input"
                           label=""
                           type="email"
                           name="email"
                           placeholder={t('auth.signin.departmentEmailPlaceholder')}
                        />

                        <FormControl
                        inputStyle="rounded-2xl border-gray-300"
                           control="input"
                           label=""
                           type="password"
                           name="password" 
                           placeholder={t('auth.signin.passwordPlaceholder')}
                        />

                        <div className="pt-2">
                           <Button
                              buttonText={t('auth.signin.login')}
                              type="submit"
                              className="w-full bg-black border-none rounded-2xl"
                           />
                        </div>

                        <div className="text-center">
                           <Link 
                              to="/auth/forgot-password" 
                              className="text-sm text-primaryGray hover:underline"
                           >
                              {t('auth.signin.forgotPassword')}
                           </Link>
                        </div>

                        <div className="relative my-6">
                           <div className="relative flex justify-center text-sm">
                              <span className="px-2 bg-white text-gray-500">{t('auth.or')}</span>
                           </div>
                        </div>

                        <div className="text-center pt-4">
                           <span className="text-sm text-gray-600">
                              {t('auth.signin.noAccount')}{' '}
                           </span>
                           <Link 
                              to="/auth/sign-up" 
                              className="text-sm hover:underline font-bold"
                           >
                              {t('auth.signin.signUp')}
                           </Link>
                        </div>
                     </Form>
                  );
               }}
            </Formik>
         </div>
   )
}

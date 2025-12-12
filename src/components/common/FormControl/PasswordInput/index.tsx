import { useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import ErrorMsg from '../../ErrorMessage';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
 
const PasswordInput
  = (props:any) => {
    const { placeholder, name, label, labelStyle, inputStyle, ...rest } = props;
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    function togglePasswordVisibility() {
      setIsPasswordVisible((prevState) => !prevState);
    }
    return (
      <div className='flex flex-col mt-5  mx-auto'>
        <label
          className={twMerge(clsx('font-medium text-lightGrey2 leading-[20px] capitalize', labelStyle && labelStyle))}
          htmlFor={name}>{label}</label>
        <Field name={name} id={name}>
          {({ field}:any) => (
            <div className='relative'>
            
              <input
                autoComplete={placeholder}
                type={isPasswordVisible ? "text" : "password"}
                className={twMerge('w-full font-poppin rounded-lg placeholder:text-gray-400 text-sm border-none placeholder:font-medium focus:shadow-none bg-whiteSmoke shadow-none px-3.5 py-2.5 mt-1.5 ')}
                {...rest}
                placeholder={placeholder}
                {...field}
              />
              <button
                className="absolute inset-y-0 top-2 right-0 flex items-center px-4 text-gray-600"
                onClick={togglePasswordVisibility}
                type='button'
              >
                {isPasswordVisible ? (
                  <span className="paswordIconLabel">
                    <i className="fa-solid fa-eye"></i>
                  </span>
                ) : (
                  <span className="paswordIconLabel">
                    <i className="fa-solid fa-eye-slash"></i>
                  </span>
                )
                }
              </button>
            </div>

          )}
        </Field>
        <ErrorMessage name={name} component={ErrorMsg} />
      </div>
    );
  };

export default PasswordInput
  ;



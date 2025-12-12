
import  { useState } from "react";
import { Field, ErrorMessage } from "formik";
import ErrorMsg from "../../ErrorMessage";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { FormControlProps } from "@/types/formTypes";

const CustomInput = (props: FormControlProps) => {
  const {
    label,
    prefix,
    type = "text",
    maxLength,
    placeholder,
    name,
    className,
    labelStyle,
    inputStyle,
    icon,
    disabled
  } = props;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  return (

    <div className={twMerge(clsx("flex flex-col mb-4 w-full", className))}>
      {label && (
        <label
          className={twMerge(
            clsx(
              "mb-2.5 block font-medium text-black dark:text-white",
              labelStyle && labelStyle
            )
          )}
          htmlFor={name}
        >
          {label}
        </label>
      )}

      <div className="relative">
        <Field name={name} id={name}>
          {({ field }: {
            field: any
          }) => (
            <input
              prefix={prefix}
              className={twMerge(
                clsx(
                  "w-full rounded-lg border border-stroke bg-transparent py-3 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
                  inputStyle && inputStyle
                )
              )}
              disabled={disabled || false}
              type={isPasswordVisible ? 'text' : type}
              maxLength={maxLength}
              placeholder={placeholder}
              {...field}
            />
          )}
        </Field>

        {(icon && type != 'password')&& <span className="absolute right-4 top-3">{icon}</span>}
        {(type == 'password')&& <span className="absolute cursor-pointer right-4 top-3" onClick={() => togglePasswordVisibility()}>{isPasswordVisible ? <HiEyeOff size={25}/> : <HiEye size={25}/>}</span>}
      </div>
      <ErrorMessage name={name} component={ErrorMsg} />
    </div>
  );
};

export default CustomInput;

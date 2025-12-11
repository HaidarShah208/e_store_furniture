import { ErrorMessage, Field } from "formik";
import ErrorMsg from "../../ErrorMessage";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { FormControlProps } from "@/types/formTypes";
 
const Textarea = ({
  placeholder,
  label,
  name,
  className,
  labelStyle,
  inputStyle,
  rows = 4,
}: FormControlProps) => {
  return (
    <div className={twMerge(clsx("mb-4", className && className))}>
      {label && (
        <label
          htmlFor={name}
          className={twMerge(
            clsx(
              "mb-2.5 block font-medium text-black dark:text-white",
              labelStyle && labelStyle
            )
          )}
        >
          {label}
        </label>
      )}
      <Field as="textarea" rows={rows} name={name} id={name}>
        {({ field }: { field: any }) => (
          <textarea
            className={twMerge(
              clsx(
                "w-full rounded border no-scrollbar border-stroke py-3 px-5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary",
                inputStyle && inputStyle
              )
            )}
            rows={rows}
            placeholder={placeholder}
            {...field}
          >
            </textarea>
        )}
      </Field>
      <ErrorMessage name={name} component={ErrorMsg} />
    </div>
  );
};

export default Textarea;

 
import ErrorMsg from "../../ErrorMessage";
import  { useImperativeHandle, forwardRef,  useRef } from 'react';
import { ErrorMessage } from "formik";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { FileComponentProps, FormControlProps } from "@/types/formTypes";

const FileInput = forwardRef<FileComponentProps, FormControlProps>((props, ref) => {
    const {
        label,
        prefix,
        maxLength,
        placeholder,
        name,
        className,
        labelStyle,
        inputStyle,
        onChange,
        acceptFile
    } = props;
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => ({
        reset() {
            if (inputRef.current) {
                inputRef.current.value = ''; // Reset the input value
            }
        },
    }));
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

            <input
                ref={inputRef}
                prefix={prefix}
                className={twMerge(
                    clsx(
                        "w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:py-3 file:px-5 dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary",
                        inputStyle && inputStyle
                    )
                )}
                type={'file'}
                maxLength={maxLength}
                placeholder={placeholder}
                onClick={(e: any) => (e.target.value = null)}
                onChange={onChange}
                accept={acceptFile}
            />
            <ErrorMessage name={name} component={ErrorMsg} />
        </div>
    );
});

export default FileInput;

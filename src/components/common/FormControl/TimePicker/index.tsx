
import { Field, ErrorMessage } from 'formik';
import ErrorMsg from '../../ErrorMessage';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

const CustomTimePicker
    = (props:any) => {
        const { label, prefix, name, className, labelStyle, inputStyle, ...rest } = props;
        return (
            <div className={twMerge(clsx('flex flex-col mt-5 w-full', className))}>
                {
                    label && (
                        <label
                            className={twMerge(clsx('font-medium text-lightGrey2 text-sm leading-[20px] capitalize', labelStyle && labelStyle))}
                            htmlFor={name}
                        >
                            {label}
                        </label>
                    )
                }
                <Field name={name} id={name}>
                    {({ field }:any) => (
                        <input type="time" {...field} prefix={prefix}
                            className={twMerge(clsx('text-sm rounded-lg placeholder:text-dark placeholder:text-sm placeholder:font-medium bg-whiteSmoke w-full px-3.5 py-2.5 mt-1.5 placeholder:opacity-40 shadow-none focus:shadow-none border-none', inputStyle && inputStyle))} {...rest} />

                    )}
                </Field>
                <ErrorMessage name={name} component={ErrorMsg} />
            </div>
        );
    };

export default CustomTimePicker
    ;

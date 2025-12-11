import { ErrorMessage } from 'formik';
import ErrorMsg from '../../ErrorMessage';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

const SimpleInput = (props:any) => {
    const { label, prefix, type = "text", value, disabled, onChange, maxLength, placeholder, name, labelStyle, inputStyle, ...rest } = props;
    return (
        <div className='flex flex-col mt-5 w-full'>
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

            <input
                prefix={prefix}
                defaultValue=""
                className={twMerge(clsx('text-sm rounded-lg placeholder:text-dark placeholder:text-sm placeholder:font-medium bg-whiteSmoke w-full px-3.5 py-2.5 mt-1.5 placeholder:opacity-40 shadow-none focus:shadow-none border-none', inputStyle && inputStyle))}
                type={type}
                value={value}
                disabled={disabled}
                onChange={onChange}
                maxLength={maxLength}
                {...rest}
                placeholder={placeholder}
            />

            <ErrorMessage name={name} component={ErrorMsg} />
        </div>
    );
};

export default SimpleInput;

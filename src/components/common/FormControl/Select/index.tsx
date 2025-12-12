 
import { Field, ErrorMessage } from 'formik';
import ErrorMsg from '../../ErrorMessage';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { FormControlProps } from '@/types/formTypes';

const CustomSelect = (props: FormControlProps) => {
  const { name, placeholder, label, labelStyle, require,
    inputStyle, options, value: selectedValue, ...rest } = props;

  return (
    <div className='mb-3'>
      {
        label && (
          <label
            className={twMerge(clsx('mb-3 block text-sm font-medium text-black dark:text-white', labelStyle && labelStyle))}
            htmlFor={name}
          >
            {label} {require && <span className="text-danger">*</span>}
          </label>
        )
      }
      <div className="relative z-20 bg-white dark:bg-form-input">
        <Field placeholder={placeholder} {...rest} as="select" name={name} id={name} value={selectedValue} className={twMerge(clsx("relative z-20 w-full text-black dark:text-white appearance-none rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input", inputStyle && inputStyle))}>
          <option value="" className='text-opacity-40'>{placeholder}</option>
          {
            options?.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))
          }
        </Field>
      </div>
      <ErrorMessage name={name} component={ErrorMsg} />
    </div>
  );
};

export default CustomSelect;

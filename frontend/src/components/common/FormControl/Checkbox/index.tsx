import { Field, ErrorMessage } from 'formik';
import ErrorMsg from '../../ErrorMessage';

const Checkbox = (props:any) => {
  const { name, placeholder, label, children, options, ...rest } = props;

  return (
    <div>
      <div className='flex gap-2'>
        <Field id={name} type="checkbox" className="w-6 h-6 text-darkGreen bg-gray-100 border-gray-300 rounded focus:ring-transparent" name={name} {...rest} />
        {
          children && (
            children
          )
        }
      </div>
      <ErrorMessage name={name} component={ErrorMsg} />
    </div>
  );
};

export default Checkbox;

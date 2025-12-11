import { forwardRef } from 'react';
import Input from './Input';
import PasswordInput from './PasswordInput';
import Select from './Select';
import Checkbox from './Checkbox';
import SimpleInput from './Input/Simple_Input';
import TimePicker from './TimePicker';
import FileInput from './FileInput';
import Textarea from './Textarea';
import { FileComponentProps, FormControlProps } from '@/types/formTypes';

const FormControl = forwardRef<FileComponentProps, FormControlProps>((props, ref) => {
  const { control, ...rest } = props;
  switch (control) {
    case 'input':
      return <Input {...rest} />;
    case 'file':
      return <FileInput ref={ref} {...rest} />;
    case 'simpleInput':
      return <SimpleInput {...rest} />;
    case 'select':
      return <Select {...rest} />;
    case "checkbox":
      return <Checkbox {...rest} />;
    case 'password':
      return <PasswordInput {...rest} />;
    case "textarea":
      return <Textarea {...rest} />;
    case "time":
      return <TimePicker {...rest} />;
    default:
      return null;
  }
});

export default FormControl;

import { twMerge } from 'tailwind-merge';

const ErrorMsg = (props:any) => {
  return <p className={twMerge(` text-red-500 my-2 mb-0`)}>{props.children}</p>;
};
export default ErrorMsg;

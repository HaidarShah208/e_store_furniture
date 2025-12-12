import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import Spinner from "../../Spinner";
import type { ButtonProps } from "@/types/types";

const Button = (props: ButtonProps) => {
  const {
    buttonText,
    isLoading = false,
    disabled = false,
    type = "button",
    onClick,
    className,
  } = props;

  const baseClasses =
    "w-full text-center rounded-lg p-3 transition flex items-center justify-center";

  const activeClasses =
    "border border-primary bg-primary text-white hover:bg-opacity-90";

  const disabledClasses =
    "border border-gray-300 bg-primary/70 text-white cursor-not-allowed";

  return (
    <button
      type={type || "button"}
      disabled={isLoading || disabled}
      onClick={onClick}
      className={twMerge(
        clsx(
          baseClasses,
          isLoading || disabled ? disabledClasses : activeClasses,
          className
        )
      )}
    >
      {isLoading ? (
        <>
          <Spinner />
          <div className="pl-2">Please wait...</div>
        </>
      ) : (
        buttonText
      )}
    </button>
  );
};

export default Button;

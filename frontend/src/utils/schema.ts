import * as Yup from "yup";

export const EmailSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is Required"),
  });

  export const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is Required"),
    password: Yup.string()
      .required("Password is required.")
      .min(8, "Password must be at least 8 characters long")
      .max(32, "Password cannot exceed 32 characters"),
  });


  export const RegisterSchema = Yup.object().shape({
    name: Yup.string().required("Name is required."),
    email: Yup.string().email("Invalid email").required("Email is Required"),
    officer_id:Yup.string().required('Officer ID is required'),
    password: Yup.string()
      .required("Password is required.")
      .min(8, "Password must be at least 8 characters long")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&]/,
        "Password must contain at least one special character"
      )
      .max(32, "Password cannot exceed 32 characters"),
    password_confirmation: Yup.string()
      .required("Confirm Password is required.")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  export interface ResetPasswordType {
    email?: string;
    password: string;
    password_confirmation: string;
  }
  export const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required.")
      .min(8, "Password must be at least 8 characters long")
      .max(32, "Password cannot exceed 32 characters"),
    password_confirmation: Yup.string()
      .required("Please confirm your password.")
      .oneOf([Yup.ref("password")], "Passwords must match")
      .min(8, "Password must be at least 8 characters long")
      .max(32, "Password cannot exceed 32 characters"),
  });
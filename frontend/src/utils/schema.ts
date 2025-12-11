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
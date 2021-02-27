import * as yup from "yup";

export const loginSchema = yup.object({
  login: yup
    .string()
    .required("Login is required ")
    .min(5, "Minimum 5 chars")
    .max(25, "Max 25 chars"),
  password: yup
    .string()
    .required("Password is required ")
    .min(5, "Minimum 5 chars")
    .max(30, "Max 30 chars"),
});

import * as yup from "yup";

export const searchSchema = yup.object({
  name: yup
    .string()
    .matches(/[^ ]+/, "Please write search term or leave empty"),
  results: yup
    .number()
    .required("range: 1-99999 ")
    .min(1, "Minimum 1")
    .max(99999, "Max 99999"),
  priceMin: yup
    .number()
    .required("range: 0-1000 ")
    .min(0, "Minimum 0")
    .max(1000, "Max 1000"),
  priceMax: yup
    .number()
    .required("range: 1-1000 ")
    .min(1, "Minimum 1")
    .max(1000, "Max 1000"),
  ratingMin: yup
    .number()
    .required("range: 0-5 ")
    .min(0, "Minimum 0")
    .max(5, "Max 5"),
  ratingMax: yup
    .number()
    .required("range: 1-5 ")
    .min(1, "Minimum 1")
    .max(5, "Max 5"),
});

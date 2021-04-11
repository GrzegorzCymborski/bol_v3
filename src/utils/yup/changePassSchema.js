import * as yup from 'yup';

export const changePassSchema = yup.object({
  password: yup.string().required().min(6).max(25),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null])
    .required(),
});

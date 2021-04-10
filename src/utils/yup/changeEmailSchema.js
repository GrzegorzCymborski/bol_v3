import * as yup from 'yup';

export const changeEmailSchema = yup.object({
  email: yup.string().email().required().min(5).max(25),
  confirmEmail: yup
    .string()
    .oneOf([yup.ref('email'), null])
    .required(),
});

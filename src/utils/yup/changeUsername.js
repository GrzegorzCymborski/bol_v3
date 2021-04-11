import * as yup from 'yup';

export const changeUsername = yup.object({
  username: yup.string().required().min(3).max(25),
});

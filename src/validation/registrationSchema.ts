import * as yup from 'yup';

export const registrationSchema = yup.object({
  name: yup.string().required().min(5).max(20),
  email: yup.string().email().required(),
  password: yup
    .string()
    .matches(/^(?=.*[a-z])(?=.*\d)/)
    .min(8)
    .max(20),
  re_password: yup
    .string()
    .oneOf([yup.ref('password')], 'password does not match'),
  avatar: yup.mixed().test({
    test: (value) => value.length > 0,
    message: 'file cannot be empty',
  }),
});

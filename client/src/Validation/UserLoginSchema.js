import * as yup from 'yup';

export const userLoginSchema = yup.object({
  email: yup.string().email('Input a valid email').required('Enter the email!'),
  password: yup.string()
  .required('Enter a password')
  .min(4, 'Pass word must be atleast 4 characters!')

});
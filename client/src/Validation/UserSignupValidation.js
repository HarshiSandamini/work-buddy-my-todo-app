import * as yup from 'yup';

export const userSignupSchema = yup.object({
  name: yup.string().required("Please enter the name!"),
  email: yup.string().email('Input a valid email').required('Enter the email!'),
  password: yup.string()
  .required('Enter a password')
  .min(4, 'Pass word must be atleast 4 characters!'),
  confirmPassword: yup.string().oneOf([yup.ref('password'),null], "Password not match")

});
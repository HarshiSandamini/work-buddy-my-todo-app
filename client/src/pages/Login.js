import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { Link } from 'react-router-dom';
import { Formik, Form, ErrorMessage } from "formik";
import TextField from "../components/TextField.js";
import {userLoginSchema} from "../Validation/UserLoginSchema";
import '../index.css';
import BackIcon from "../components/BackIcon";


const Login = () => {
  const [,setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();
  const handleSubmit = async (values) => {
         
    const {confirmPassword, ...data} = values;
    try {
      const response = await axios.post("http://3.110.134.249:3001/user/login", data);
                if(response.data.token){
                  setCookies("access_token", response.data.token);
                  window.localStorage.setItem("userId", response.data.userId);
                  window.localStorage.setItem("userName", response.data.userName);
                  navigate("/");
                }else{
                  alert(response.data.message);
                }
    } catch (err) {
      console.error(err);
    }
  };
return (
  <Formik
  initialValues={{ 
  name: '', 
  email: '', 
  password: '', 
  confirmPassword:'' 
  }}
  validationSchema={userLoginSchema}
  onSubmit = {handleSubmit}
  >
      
  <div className='d-flex justify-content-center align-item-center bg-secondary vh-100'>
      <div className="cnbody bg-white p-3 rounded">
          <BackIcon/>
          <h2>Login</h2>
          <Form>
              <TextField label="Email" name="email" type="email"/>
              <ErrorMessage name='email'/>
              <TextField label="Password" name="password" type="password"/>
              <ErrorMessage name='password'/>
          <button type='submit' className='btn login w-100 rounded-0'>
              Login
          </button>
          <p>Don't have an account?</p>
           <Link to="/signUp">
                SignUp
           </Link> 
          </Form>   
      </div>
  </div>
  </Formik>
)
}

export default Login
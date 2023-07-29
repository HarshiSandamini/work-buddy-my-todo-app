import React from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import { userSignupSchema } from '../Validation/UserSignupValidation';
import TextField from "../components/TextField.js";
import BackIcon from "../components/BackIcon";

const Signup = () => {

    // const [name, setName] = useState("")
    // const [email, setEmail] = useState("")
    // const [password, setPassword]= useState("")

    const navigate = useNavigate();
    const handleSubmit = async (values) => {
        
        const {confirmPassword, ...data} = values;
        try {
          await axios.post("http://localhost:3001/user/register", data);
          alert("Registration Completed! Now Login.");
          navigate("/");
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
    onSubmit = {handleSubmit}
    validationSchema={userSignupSchema}
    
    >
        

    <div className='d-flex justify-content-center align-item-center bg-secondary vh-100'>
        <div className="bg-white p-3 rounded w-25">
            <BackIcon/>
            <h2>Register</h2>
            <Form>
                <TextField label="Name" name="name" type="text"/>
                <ErrorMessage name='name'/>
                <TextField label="Email" name="email" type="email"/>
                <ErrorMessage name='email'/>
                <TextField label="Password" name="password" type="password"/>
                <ErrorMessage name='password'/>
                <TextField label="Confirm Pasword" name="confirmPassword" type="password"/>
                <ErrorMessage name='confirmPassword'/>
            
            <button type='submit' className='btn btn-success w-100 rounded-0'>
                Sign Up
            </button>
            </Form>   
        </div>
    </div>
    </Formik>
  )
}

export default Signup

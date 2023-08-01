import React from 'react';
import { useField } from 'formik';

const TextField = ({label, ...props}) => {
  const [field, meta] = useField(props);
  console.log(props);
  return (
    <div className="mb-5">
      <label>{label}</label>
      <input  className={`form-control ${meta.touched && meta.error ? 'is-invalid': ''}`}
       {...field} {...props}
       placeholder= {label}
       autoComplete='off'
       />
    </div>
    
  )
}

export default TextField

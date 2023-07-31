import React,{useState,useEffect} from 'react'
import todoLogo3 from '../images/Todo4.png'
import {Link} from 'react-router-dom'
import {useGetUserName} from '../hooks/useGetUserName'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/HandleApi';

export const Header = () => {

    const [date, setDate]=useState(null);
    const [month, setMonth]=useState(null);
    const [year, setYear]=useState(null);
    const [day, setDay]=useState(null);
    const userName = useGetUserName();

    useEffect(()=>{
        const myDate = new Date();
        const myMonth = myDate.toLocaleString('default', { month: 'long' });
        const myDate2 = myDate.getDate();
        const myYear = myDate.getFullYear();
        const myDay = myDate.toLocaleDateString('default', { weekday: 'long' });

        setMonth(myMonth);
        setDate(myDate2);
        setYear(myYear);
        setDay(myDay);
    },[])

    const [,setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();
   
    return (
        <div className='header-box'>
            <div className='leftside'>
                <div className='img'>
                  <img src={todoLogo3} alt="todologo"/>
                </div>
                <div className='content'>
                    <div className='heading-big'>
                    {!userName?"Struggling to keep up with work?":`Welcome ${userName}`}
                    </div>
                    <div className='heading-small'>
                    Lets make a list
                    </div>
                </div>
            </div>
            <div className='rightside'>
                
            {!userName&&<>
                  <Link className='btn btn-primary btn-md' to="signup">
                     SIGN UP
                  </Link>
               
               
                  <Link className='btn btn-secondary btn-md' to="login">
                     LOGIN
                  </Link>

                  <br></br>
                  <div className='date-section'>
                      <span>{date}</span>
                      <span>{month}</span>
                      <span>{year}</span>
                      <span>{day}</span>
                  </div>
                 
                </>}
                {userName &&<div className='welcome-div'>
                    <div className='date-section'>
                      <span>{date}</span>
                      <span>{month}</span>
                      <span>{year}</span>
                      <span>{day}</span>
                    </div>
                    <br></br>
                    <button className='btn btn-danger'
                    onClick={()=>logout(setCookies, navigate)}>LOGOUT</button>
                </div>} 
              
             </div>
        </div>
    )
}
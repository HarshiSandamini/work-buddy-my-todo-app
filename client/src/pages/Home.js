import React from 'react'
import { useEffect, useState } from "react";
import ToDo from "../components/ToDo";
import { addToDo, updateToDo, deleteToDo, getAllUserToDo} from "../utils/HandleApi";
import '../index.css';
import { useCookies } from "react-cookie";
import { useGetUserId } from "../hooks/useGetUserId";
import { useGetUserName } from '../hooks/useGetUserName';
// import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import boy from "../images/boy.gif"

const Home = () => {
    const [text, setText] = useState("")
    const userId = useGetUserId();
    const userName = useGetUserName();
    // const navigate = useNavigate();
    const [cookies, ] = useCookies(["access_token"]);
    const [toDo, setToDo] = useState({
        text:"",
        userOwner: userId, 
      });
    const [toDos, setToDos] = useState([])
    const [isUpdating, setIsUpdating] = useState(false)
    const [toDoId, setToDoId] = useState("")

    
    useEffect(()=>{
      // if(cookies.access_token) getAllUserToDo(setToDos, userId);
      getAllUserToDo(setToDos, userId);
      // console.log(toDos)
    }, [userId, cookies.access_token])
    
    const updateMode = (_id, text,userId) => {
      setIsUpdating(true)
      setText(text)
      setToDoId(_id)
       
    }

    const handleChange = (event) => {
      const {name, value} = event.target;
      setText(value);
      setToDo({ ...toDo, [name]: value });
    };

    // const handleSaveTodo  = (toDo, setToDoId,toDoId, cookies, setText, userId, setToDos) => {
    //   addToDo(toDo, setToDoId, cookies, setText);
    //   // addUserToDo(toDoId, userId,setToDoId, setToDos);
    //   //setText("");
    // }

    // const handleSaveTodo  = (toDo, setToDoId,toDoId, cookies, setText,text, userId, setToDos) => {
    //   addToDo(toDo, setToDoId, cookies, setText);
    //   addUserToDo(toDoId, userId,setToDoId, setToDos);
    //   //setText("");
    // }


  return (
    <div>
      <Header/>
    {userName && <div className="container">
        <div className='button-div'>
        </div>
        <h3>{userName}'s Todo list</h3>
        <div className="top">
          <input 
          type="text" 
          placeholder="Add ToDos.."
          name='text'
          id='text'
          value={text}
          onChange={handleChange}
          />
          <div className="add" 
          onClick={ isUpdating?  
          ()=> updateToDo(toDoId, text, setToDos, setText, setIsUpdating, userId, cookies):  
          ()=> addToDo(toDo, cookies, setText, setToDos, userId)}>  
            {isUpdating? "Update" : "Add"} 
          </div>
        </div>
          
        <div className="list">
          {toDos && toDos.map((todo) => <ToDo 
          key={todo._id} 
          text={todo.text}
          updateMode={()=> updateMode(todo._id, todo.text, userId)}
          deleteToDo={()=> deleteToDo(todo._id, setToDos, userId, cookies)}/>)}  
        </div>
      </div> }

      {!userName && <>
        <div className="body-image">
          <img src={boy} alt='boy' className=''/>
        </div>
      
      </>
      }
      </div>
  )
  //toDo, setToDoId, cookies, setText,toDoId, userId, setToDos
}

export default Home

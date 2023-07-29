import React from 'react'
import { useEffect, useState } from "react";
import ToDo from "../components/ToDo";
import { addToDo, addUserToDo, updateToDo, deleteToDo, getAllUserToDo} from "../utils/HandleApi";
import '../index.css';
import { useCookies } from "react-cookie";
import { useGetUserId } from "../hooks/useGetUserId";

const Home = () => {
    const [text, setText] = useState("")
    const userId = useGetUserId();
    const [cookies, ] = useCookies(["access_token"]);
    const [toDo, setToDo] = useState({
        text:"",
        userOwner: userId, 
      });
    const [toDos, setToDos] = useState([])
    const [isUpdating, setIsUpdating] = useState(false)
    const [toDoId, setToDoId] = useState("")

    
    useEffect(()=>{
      if(cookies.access_token) getAllUserToDo(setToDos, userId);
    }, [userId, cookies.access_token])
    
    const updateMode = (_id, text) => {
      setIsUpdating(true)
      setText(text)
      setToDoId(_id)
       
    }

    const handleChange = (event) => {
      const {name, value} = event.target;
      setToDo({ ...toDo, [name]: value });
    };

    // const handleSaveTodo  = (toDo, setToDoId,toDoId, cookies, setText, userId, setToDos) => {
    //   addToDo(toDo, setToDoId, cookies, setText);
    //   // addUserToDo(toDoId, userId,setToDoId, setToDos);
    //   //setText("");
    // }

    const handleSaveTodo  = (toDo, setToDoId,toDoId, cookies, setText,text, userId, setToDos) => {
      addToDo(toDo, setToDoId, cookies, setText);
      addUserToDo(toDoId, userId,setToDoId, setToDos);
      //setText("");
    }


  return (
    <div className="container">
        <h1>Harshika's Todo App</h1>
        <div className="top">
          <input 
          type="text" 
          placeholder="Add ToDos.."
          name='text'
          id='text'
          onChange={handleChange}
          />
          <div className="add" 
          onClick={ isUpdating?  
          ()=> updateToDo(toDoId, text, setToDo, setText, setIsUpdating):  
          ()=> handleSaveTodo(toDo, setToDoId, toDoId, cookies, setText,text ,userId, setToDos)}>  
            {isUpdating? "Update" : "Add"} 
          </div>
        </div>
          
        <div className="list">
          {toDos && toDos.map((todo) => <ToDo 
          key={todo._id} 
          text={todo.text}
          updateMode={()=> updateMode(todo._id, todo.text)}
          deleteToDo={()=> deleteToDo(todo._id, setToDo)}/>)}  
        </div>
      </div>
  )
  //toDo, setToDoId, cookies, setText,toDoId, userId, setToDos
}

export default Home

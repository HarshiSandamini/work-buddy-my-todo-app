import axios from "axios";
// import { useState } from "react";

const baseUrl = "http://localhost:3001/todo"
// const [toDoId, setToDoId] = useState("")

// const getAllToDo = (setToDo) => {
//     axios
//     .get(baseUrl)
//     .then(({data})=>{
//         console.log('data---->', data);
//         setToDo(data)
//     })
// }

const getAllUserToDo = (setToDos, userId) => {
    const response = axios
    .get(`${baseUrl}/user-todos/${userId}`)
    .then(({data})=>{
        console.log('data---->', data);
        setToDos(response.data)
    })
}

const addToDo = (toDo, setToDoId, cookies, setText)=>{
    axios
    .post(`${baseUrl}/save`, toDo)   //{headers: {authorization: cookies.access_token}
    .then((data)=>{
        //console.log(data);
        //setText("");
        console.log(data);
        setToDoId(data.data._id);
        console.log("todoId :",data.data._id)
        // getAllUserToDo(setToDos, userId)
    })
    .catch((err)=> console.log(err))
}


const addUserToDo = (toDoId, userId,setToDoId, setToDos)=>{
        axios
        .put(`${baseUrl}/save`,{toDoId,userId})          
        .then((data)=>{
        //console.log(data);
        // getAllUserToDo(setToDos, userId);
        setToDoId("");
        })
        .catch((err)=> console.log(err))
}

const updateToDo = (toDoId,text,setToDo, setText, setIsUpdating)=>{
    
    axios
    .post(`${baseUrl}/update`, {_id: toDoId,text})
    .then((data)=>{
        setText("")
        setIsUpdating(false)
        getAllUserToDo(setToDo)
    })
    .catch((err)=> console.log(err))
}

const deleteToDo = (toDoId,setToDo)=>{
    
    axios
    .post(`${baseUrl}/delete`, {_id: toDoId})
    .then((data)=>{
        console.log(data)
        getAllUserToDo(setToDo)
    })
    .catch((err)=> console.log(err))
}


export {addToDo, addUserToDo, updateToDo, deleteToDo, getAllUserToDo}
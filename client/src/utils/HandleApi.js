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
    axios
    .get(`${baseUrl}/user-todos/${userId}`,)
    .then(({data})=>{
        console.log('data---->', data);
        setToDos(data.userTodos)
    })
}

const addToDo = (toDo, cookies, setText, setToDos, userId)=>{
    axios
    .post(`${baseUrl}/save`, toDo, {headers: {authorization: cookies.access_token}})   //{headers: {authorization: cookies.access_token}}
    .then((data)=>{
        //console.log(data);
        setText("");
        console.log(data);
        // setToDoId(data.data._id);
        // console.log("todoId :",data.data._id)
        getAllUserToDo(setToDos, userId)
    })
    .catch((err)=> console.log(err))
}


// const addUserToDo = (toDoId, userId,setToDoId, setToDos)=>{
//         axios
//         .put(`${baseUrl}/save`,{toDoId,userId})          
//         .then((data)=>{
//         //console.log(data);
//         // getAllUserToDo(setToDos, userId);
//         setToDoId("");
//         })
//         .catch((err)=> console.log(err))
// }

const updateToDo = (toDoId,text,setToDos, setText, setIsUpdating, userId, cookies)=>{
    
    axios
    .post(`${baseUrl}/update`, {_id: toDoId,text}, {headers: {authorization: cookies.access_token}})
    .then((data)=>{
        setText("")
        setIsUpdating(false)
        getAllUserToDo(setToDos,userId)
    })
    .catch((err)=> console.log(err))
}

const deleteToDo = (toDoId,setToDos, userId, cookies)=>{
    
    axios
    .post(`${baseUrl}/delete`, {_id: toDoId}, {headers: {authorization: cookies.access_token}})
    .then((data)=>{
        console.log(data)
        getAllUserToDo(setToDos,userId)
    })
    .catch((err)=> console.log(err))
}

const logout = (setCookies, navigate) => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("userName");
    navigate("/");
}

export {addToDo, updateToDo, deleteToDo, getAllUserToDo, logout}
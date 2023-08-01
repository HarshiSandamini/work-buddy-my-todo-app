import axios from "axios";

const baseUrl = "http://3.110.134.249:3001/todo"

const getAllUserToDo = (setToDos, userId) => {
    axios
    .get(`${baseUrl}/user-todos/${userId}`,)
    .then(({data})=>{
        setToDos(data.userTodos)
    })
}

const addToDo = (toDo, cookies, setText, setToDos, userId)=>{
    axios
    .post(`${baseUrl}/save`, toDo, {headers: {authorization: cookies.access_token}}) 
    .then((data)=>{
        setText("");
        getAllUserToDo(setToDos, userId)
    })
    .catch((err)=> console.log(err))
}



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
import {ToDoModel} from '../models/ToDoModel.js'
import {UserModel} from '../models/Users.js'
import express from "express";
import { verifyToken } from './UserRoutes.js';

const router = express.Router();

router.get('/',async(req, res)=> {
    const toDo = await ToDoModel.find()
    res.json(toDo)
});

router.post('/save', verifyToken, async (req, res)=> {
    const todo = new ToDoModel(req.body);  
    try{
        const response = await todo.save();
        //console.log("Todo Added Succesfully!");
        // await user.todos.push(todo._id);
        // await user.save();
        res.json(response);
        console.log("Added Succesfully!");
    }catch (err) {
        res.json(err);
    }
  
});

// router.put("/save", async (req, res) => {
//   try {
//     const todo = await ToDoModel.findById(req.body.toDoId); 
//     const user = await UserModel.findById(req.body.userId);
//     user.todos.push(todo);
//     await user.save();
//     res.json({ todos: user.todos });
//     console.log("Todoas added Succesfully!");
//   } catch (err) {
//     res.json(err);
//   }
// });


router.get("/user-todos/:userId", async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.userId);
      const userTodos = await ToDoModel.find({
        userOwner: { $in: user._id},
      });
      res.json({ userTodos});
    } catch (err) {
      res.json(err);
    }
  });

router.post('/update', verifyToken, async (req, res) => {
    const{_id, text} = req.body
    ToDoModel
    .findByIdAndUpdate(_id,{text})
    .then(()=> res.send("Updated Succesfully..."))
    .catch((err)=> console.log(err))
});

router.post('/delete', verifyToken, async (req, res) => {
    const{_id} = req.body
    ToDoModel
    .findByIdAndDelete(_id)
    .then(()=> res.send("Deleted Succesfully..."))
    .catch((err)=> console.log(err))
});



export {router as todoRouter};
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import {todoRouter} from "./routes/ToDoRoute.js";
import { userRouter } from "./routes/UserRoutes.js";


const app = express();

app.use(express.json())
app.use(cors())

app.use("/todo",todoRouter);
app.use("/user", userRouter)

mongoose.connect("mongodb+srv://Harshi:harshi@todowork.lvq4pdf.mongodb.net/?retryWrites=true&w=majority", 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,

})


app.listen(3001, () => console.log("SERVER STARTED!"));

// console.log('gdgfdfjgdg dfj');

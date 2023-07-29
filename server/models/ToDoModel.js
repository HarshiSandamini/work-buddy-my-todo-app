import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        require: true
    },
    userOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },    
})

export const ToDoModel = mongoose.model("todos", todoSchema);
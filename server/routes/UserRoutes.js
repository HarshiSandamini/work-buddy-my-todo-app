import express from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.post("/register", async (req,res) => {
    const {name, email, password} = req.body;
    const user = await UserModel.findOne({name});

    if (user){
        res.json({message:"User already exist!"});
    }

    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = new UserModel({name, email,password:hashedPassword});
    await newUser.save();

    res.json({message:"User Registered Successfully!"});
});

router.post("/login", async (req,res) => {

    if(!req.body){
        return res.json({err: "Please Fill email and Password"})
    
    }

    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password)
        return res.json({err: "Please Fill all the fields"})

    const user = await UserModel.findOne({email});


    if(!user){
        return res.json({message:"User doesn't exist!"});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.json({message:"Userrname or Password is incorrect!"});
    }else{
    const token = jwt.sign({id:user._id},"secret");
    res.json({token, userId: user._id, userName:user.name});
    }
});

export {router as userRouter};

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if(token){
        jwt.verify(token, "secret", (err)=>{
            if(err) return res.sendStatus(403);
            next();
        });
    }else{
        res.sendStatus(401);
    }
}

import User from "../model/usermodel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import { token } from "../config/token.js";



export const signUp=async(req,res)=>{
    try{
        const{name,email,password}=req.body;
        const existUser=await User.findOne({email});
        if(existUser){
            return res.status(400).json({message:"User alredy exist"});
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({message:"Enter valid email"});
        }
        if(password.length<8){
            return res.status(400).json({message:"Enter stong password"});
        }
         let hashPassword=await bcrypt.hash(password,10);

         const user=await User.create({
            name,
            email,
              password: hashPassword}) ;
         let toke=await token(User._id);
         res.cookie("token",token,{
         httpOnly:true,  
         secure:false,
         sameSite: "Strict",
         maxAge:7*24*60*60*1000
         })
         return res.status(201).json(User);

    }
    catch(error){
        console.log("signUp error");
        return res.status(500).json({message:`signUp error ${error}`});

    }
}
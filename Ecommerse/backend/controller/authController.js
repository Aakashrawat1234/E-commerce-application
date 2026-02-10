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
         let jwtToken= token(user._id);
         res.cookie("token",jwtToken,{
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

export const login=async(req,res)=>{

    try{
        let{email,password}=req.body;
        let existUser= await User.findOne({email});
        if(!existUser){
            return res.status(404).json({message:"User does not exist"})
        }
        let isMatch=await bcrypt.compare(password,existUser.password);
        if(!isMatch){
            return res.status(401).json({message:"Incorrect password"});
        }
        const jwtToken= token(existUser._id);
        res.cookie("token",jwtToken,{
            httpOnly:true,
            secure:false,
            sameSite:"Strict",
            maxAge:7*24*60*60*1000
        })
           return res.status(200).json({
      message: "Login success",
      user: {
        id: existUser._id,
        name: existUser.name,
        email: existUser.email
      }
    });
    }
 catch (error) {
  console.log("login error", error);
  return res.status(500).json({ message: "Login error" });
}

}

export const logOut=async(req,res)=>{
    try{
        res.clearCookie("token")
        return res.status(200).json({message:"logOut sucessful"});
    }
    catch(error){
        return res.status(500).json({message:`logOut error ${error}`});
    }
}
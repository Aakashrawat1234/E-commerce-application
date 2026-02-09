import jwt from "jsonwebtoken";

export const token=async(userId)=>{
try{
let token=await jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"7d"})
}
catch(error){
console.log("token error")
}
}
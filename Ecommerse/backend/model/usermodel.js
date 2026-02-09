import mongoose from "mongoose";

const userSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            require:true,
            unique:true
        },
        password:{
            type:String,
            require:true,
        },
        cartDtata:{
            type:Object,
            default:{

            }
        }
    },
    {
        timestamps:true,minimize:false
    }
);

const User=mongoose.model("User",userSchema);

export default User;
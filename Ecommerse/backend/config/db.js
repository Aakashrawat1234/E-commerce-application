import mongoose from "mongoose";

const connect_db= async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Db  connected");
        mongoose.connection.once("open", () => {
  console.log("MongoDB connection OPEN");
});

    }
    catch(error){
        console.log("DB error");
    }
}
export default connect_db;
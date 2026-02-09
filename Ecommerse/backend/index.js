import express from "express";
 import dotenv from "dotenv";
import connect_db from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
dotenv.config();
 let port=process.env.PORT || 6000;
 let app=express();

 app.use(express.json());
 app.use(cookieParser());
 app.use("/api/auth",authRoutes);

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});


app.listen(port, () => {
  console.log(`server started at port ${port}`);
  
connect_db();

});

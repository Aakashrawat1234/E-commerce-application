import express from "express";
import { login, logOut, signUp } from "../controller/authController.js";

const authRoutes=express.Router()

authRoutes.post("/signUp",signUp);
authRoutes.post("/login", login);
authRoutes.get("/logout",logOut)

export default authRoutes;

import express from "express";
import { signUp } from "../controller/authController.js";

const authRoutes=express.Router()

authRoutes.post("/signUp",signUp);

export default authRoutes;

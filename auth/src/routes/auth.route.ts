import express, { Router } from "express";
import * as authController from "../controllers/auth.controller";
// import authMiddleware from '../middlewares/auth.middleware';

const authRouter: Router = express.Router();

// POST /api/auth/signup
authRouter.post("/register", authController.signup);

// POST /api/auth/login
authRouter.post("/login", authController.login);

// PUT /api/auth/change-password
// authRouter.put("/changepassword", authController.changePassword);

export default authRouter;

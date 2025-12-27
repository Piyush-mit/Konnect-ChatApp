import { Router } from "express";
import { findOtherUsers, logout, signin, signup } from "../controllers/user.controller";
import { requireAuth } from "../middlewares/user.middleware";

export const userRouter = Router();

userRouter.post('/signup', signup);
userRouter.post('/signin', signin);
userRouter.post('/logout', requireAuth, logout);
userRouter.get('/users', requireAuth, findOtherUsers);
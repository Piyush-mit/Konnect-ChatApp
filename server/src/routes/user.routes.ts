import { Router } from "express";
import { auth, findOtherUsers, logout, signin, signup } from "../controllers/user.controller";
import { requireAuth } from "../middlewares/user.middleware";

export const userRouter = Router();

userRouter.post('/signup', signup);
userRouter.post('/signin', signin);
userRouter.post('/logout', requireAuth, logout);
userRouter.get('/otherusers', requireAuth, findOtherUsers);
userRouter.get("/me", requireAuth, auth);

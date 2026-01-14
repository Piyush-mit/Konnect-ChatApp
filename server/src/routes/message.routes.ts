import { Router } from "express";
import { requireAuth } from "../middlewares/user.middleware";
import { getMessage, sendMessage } from "../controllers/message.controller";

export const messageRouter = Router();

messageRouter.post("/send/:id", requireAuth, sendMessage);
messageRouter.get("/:id", requireAuth, getMessage);
import { Response } from "express";
import { AuthRequest } from "../middlewares/user.middleware";
import { Chat } from "../models/chatModel";
import mongoose from "mongoose";
import { Message } from "../models/messageModel";
import { getReceiverSocketId, io } from "../socket/socket";

export const sendMessage = async (req: AuthRequest, res: Response) => {
    try {
        const senderId = req.userId;
        const receiverId = req.params.id;
        const { message } = req.body;

        if (!senderId || !receiverId) {
            return res.status(401).json({ message: "Authentication failed" });
        }

        // sort to avoid duplicates 
        const users = [senderId, receiverId].sort();
        const participants = users.map(p => new mongoose.Types.ObjectId(p));
        if (!message || typeof message != "string" || !message.trim()) {
            return res.status(400).json({ message: "Message cannot be empty" });
        }
        let chat = await Chat.findOne({
            participants: { $all: participants }
        })

        if (!chat) {
            try {
                chat = await Chat.create({ participants, messages: [] });
            } catch (error: any) {
                if (error.code === 11000) {
                    chat = await Chat.findOne({
                        participants: { $all: participants }
                    });
                } else {
                    throw error;
                }
            }
        };

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message: message.trim()
        });

        chat!.messages.push(newMessage._id)
        await chat!.save();

        const receiverSocketId = getReceiverSocketId(receiverId);

        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        return res.status(201).json({ message: "Message sent successfully", newMessage });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    };
}

export const getMessage = async (req: AuthRequest, res: Response) => {
    try {
        const senderId = req.userId;
        const receiverId = req.params.id;
        if (!senderId || !receiverId) {
            return res.status(401).json({ message: "Authentication failed" });
        }

        const participants = [senderId, receiverId].sort();

        const chat = await Chat.findOne({
            participants: { $all: participants }
        }).populate("messages");

        if (!chat) {
            return res.status(404).json({ message: "Chat not found" });
        }
        return res.status(200).json({ chat });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}
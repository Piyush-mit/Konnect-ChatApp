"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessage = exports.sendMessage = void 0;
const chatModel_1 = require("../models/chatModel");
const mongoose_1 = __importDefault(require("mongoose"));
const messageModel_1 = require("../models/messageModel");
const socket_1 = require("../socket/socket");
const sendMessage = async (req, res) => {
    try {
        const senderId = req.userId;
        const receiverId = req.params.id;
        const { message } = req.body;
        if (!senderId || !receiverId) {
            return res.status(401).json({ message: "Authentication failed" });
        }
        // sort to avoid duplicates 
        const users = [senderId, receiverId].sort();
        const participants = users.map(p => new mongoose_1.default.Types.ObjectId(p));
        if (!message || typeof message != "string" || !message.trim()) {
            return res.status(400).json({ message: "Message cannot be empty" });
        }
        let chat = await chatModel_1.Chat.findOne({
            participants: { $all: participants }
        });
        if (!chat) {
            try {
                chat = await chatModel_1.Chat.create({ participants, messages: [] });
            }
            catch (error) {
                if (error.code === 11000) {
                    chat = await chatModel_1.Chat.findOne({
                        participants: { $all: participants }
                    });
                }
                else {
                    throw error;
                }
            }
        }
        ;
        const newMessage = await messageModel_1.Message.create({
            senderId,
            receiverId,
            message: message.trim()
        });
        chat.messages.push(newMessage._id);
        await chat.save();
        const receiverSocketId = (0, socket_1.getReceiverSocketId)(receiverId);
        if (receiverSocketId) {
            socket_1.io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        return res.status(201).json({ message: "Message sent successfully", newMessage });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
    ;
};
exports.sendMessage = sendMessage;
const getMessage = async (req, res) => {
    try {
        const senderId = req.userId;
        const receiverId = req.params.id;
        if (!senderId || !receiverId) {
            return res.status(401).json({ message: "Authentication failed" });
        }
        const participants = [senderId, receiverId].sort();
        const chat = await chatModel_1.Chat.findOne({
            participants: { $all: participants }
        }).populate("messages");
        if (!chat) {
            return res.status(404).json({ message: "Chat not found" });
        }
        return res.status(200).json({ chat });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.getMessage = getMessage;
//# sourceMappingURL=message.controller.js.map
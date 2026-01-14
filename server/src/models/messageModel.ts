import mongoose from "mongoose";

export interface IMessage {
    senderId: mongoose.Types.ObjectId | string,
    receiverId: mongoose.Types.ObjectId | string,
    message: string
}
const MessageSchema = new mongoose.Schema<IMessage>({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    message: {
        type: String,
        required: true,
        trim: true,
        maxLength: 1000
    }
}, {
    timestamps: true
})

export const Message = mongoose.model("Message", MessageSchema, "messages");
import mongoose from "mongoose";

export interface IChat {
    participants: mongoose.Types.ObjectId[],
    messages: mongoose.Types.ObjectId[],
}

const ChatSchema = new mongoose.Schema<IChat>({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        required: true
    }]
}, {
    timestamps: true
})

// Ensure unique chat between same participants
ChatSchema.index({ participants: 1 }, { unique: true });

export const Chat = mongoose.model("Chat", ChatSchema);
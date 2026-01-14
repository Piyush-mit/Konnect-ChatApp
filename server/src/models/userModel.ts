import mongoose from "mongoose";

export interface IUser {
    fullname: string,
    username: string,
    password: string,
    profilePicture: string,
    gender: "male" | "female"
}

const UserSchema = new mongoose.Schema<IUser>({
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: ""
    },
    gender: {
        type: String,
        enum: ["male", "female"]
    }
}, {
    timestamps: true
})

export const User = mongoose.model("User", UserSchema, "users");
import { Request, Response } from "express";
import { User } from "../models/userModel";
import z from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../middlewares/user.middleware";

const signupSchema = z.object({
    fullname: z.string().min(5).max(20),
    username: z.string().min(5).max(20).regex(/^[a-zA-Z0-9._]+$/),
    password: z.string().min(8),
    gender: z.enum(["male", "female"])
})
const signinSchema = z.object({
    username: z.string().min(5).max(20).regex(/^[a-zA-Z0-9._]+$/),
    password: z.string().min(1)
})

export const signup = async (req: Request, res: Response) => {
    try {
        // check valid data or not
        const parse = signupSchema.safeParse(req.body);

        if (!parse.success) {
            const error = parse.error.message;
            const parsedError = JSON.parse(error);
            const invalidPart = parsedError[0].path[0];
            return res.status(400).json({ message: `Invalid ${invalidPart}` });
        }

        const { fullname, username, password, gender } = parse.data;
        const lowerCaseUsername = username.toLowerCase();
        // check existing user
        const existingUser = await User.findOne({ username: lowerCaseUsername });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user
        const parts = fullname.trim().split(/\s+/);
        const firstName = parts[0];
        const lastname = parts.slice(1)[0] || "";
        const profileUrl = `https://ui-avatars.com/api/?background=random&name=${firstName}+${lastname}`;
        const createdUser = await User.create({
            fullname: fullname,
            username: lowerCaseUsername,
            password: hashedPassword,
            profilePicture: profileUrl,
            gender: gender
        })
        // no need to check , throws error on failed creation

        // create token 
        const token = jwt.sign(
            { userId: createdUser._id },
            process.env.JWT_SECRET!,
            { expiresIn: '1d' }
        );

        // send token as cookie
        res.cookie("token", token, {
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
            sameSite: process.env.NODE_ENV == "production" ? "none" : "lax",
            maxAge: 1000 * 60 * 60 * 24
        })

        return res.status(201).json({
            message: "Account created successfully",
            fullname: createdUser.fullname,
            username: createdUser.username,
            userId: createdUser._id,
            profilePicture: createdUser.profilePicture
        });
    } catch (error: any) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const signin = async (req: Request, res: Response) => {
    try {

        const parse = signinSchema.safeParse(req.body);
        if (!parse.success) {
            const error = parse.error.message;
            const parsedError = JSON.parse(error);
            const invalidPart = parsedError[0].path[0];
            return res.status(400).json({ message: `Invalid ${invalidPart}` });
        }

        const { username, password } = parse.data;
        const lowerCaseUsername = username.toLowerCase();
        const user = await User.findOne({ username: lowerCaseUsername });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET!,
            { expiresIn: '1d' }
        );

        res.cookie("token", token, {
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 1000 * 60 * 60 * 24
        })

        return res.status(200).json({
            message: "Logged in successfully",
            fullname: user.fullname,
            username: user.username,
            userId: user._id,
            profilePicture: user.profilePicture
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const logout = (req: AuthRequest, res: Response) => {
    try {
        return res.clearCookie("token").status(200).json({ message: "Cookie cleared successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Failed to clear cookie" });
    }
}

export const findOtherUsers = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId;
        const users = await User.find({ _id: { $ne: userId! } })
            .select("_id username profilePicture gender fullname").limit(20);
        return res.status(200).json({ users });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const auth = async (req: AuthRequest, res: Response) => {
    try {
        const user = await User.findById(req.userId).select("fullname username _id profilePicture");
        res.json({ user });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}
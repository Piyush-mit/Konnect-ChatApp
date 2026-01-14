"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.findOtherUsers = exports.logout = exports.signin = exports.signup = void 0;
const userModel_1 = require("../models/userModel");
const zod_1 = __importDefault(require("zod"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signupSchema = zod_1.default.object({
    fullname: zod_1.default.string().min(5).max(20),
    username: zod_1.default.string().min(5).max(20).regex(/^[a-zA-Z0-9._]+$/),
    password: zod_1.default.string().min(8),
    gender: zod_1.default.enum(["male", "female"])
});
const signinSchema = zod_1.default.object({
    username: zod_1.default.string().min(5).max(20).regex(/^[a-zA-Z0-9._]+$/),
    password: zod_1.default.string().min(1)
});
const signup = async (req, res) => {
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
        const existingUser = await userModel_1.User.findOne({ username: lowerCaseUsername });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }
        // hash the password
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        // create user
        const parts = fullname.trim().split(/\s+/);
        const firstName = parts[0];
        const lastname = parts.slice(1)[0] || "";
        const profileUrl = `https://ui-avatars.com/api/?background=random&name=${firstName}+${lastname}`;
        const createdUser = await userModel_1.User.create({
            fullname: fullname,
            username: lowerCaseUsername,
            password: hashedPassword,
            profilePicture: profileUrl,
            gender: gender
        });
        // no need to check , throws error on failed creation
        // create token 
        const token = jsonwebtoken_1.default.sign({ userId: createdUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        // send token as cookie
        res.cookie("token", token, {
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
            sameSite: process.env.NODE_ENV == "production" ? "none" : "lax",
            maxAge: 1000 * 60 * 60 * 24
        });
        return res.status(201).json({
            message: "Account created successfully",
            fullname: createdUser.fullname,
            username: createdUser.username,
            userId: createdUser._id,
            profilePicture: createdUser.profilePicture
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.signup = signup;
const signin = async (req, res) => {
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
        const user = await userModel_1.User.findOne({ username: lowerCaseUsername });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const passwordMatch = await bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie("token", token, {
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 1000 * 60 * 60 * 24
        });
        return res.status(200).json({
            message: "Logged in successfully",
            fullname: user.fullname,
            username: user.username,
            userId: user._id,
            profilePicture: user.profilePicture
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.signin = signin;
const logout = (req, res) => {
    try {
        return res.clearCookie("token").status(200).json({ message: "Cookie cleared successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: "Failed to clear cookie" });
    }
};
exports.logout = logout;
const findOtherUsers = async (req, res) => {
    try {
        const userId = req.userId;
        const users = await userModel_1.User.find({ _id: { $ne: userId } })
            .select("_id username profilePicture gender fullname").limit(20);
        return res.status(200).json({ users });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.findOtherUsers = findOtherUsers;
const auth = async (req, res) => {
    try {
        const user = await userModel_1.User.findById(req.userId).select("fullname username _id profilePicture");
        res.json({ user });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.auth = auth;
//# sourceMappingURL=user.controller.js.map
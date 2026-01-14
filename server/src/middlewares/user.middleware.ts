import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface AuthRequest extends Request {
    userId?: string
}

export const requireAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({ message: "Authentication token missing" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Authentication failed" });
    }
}
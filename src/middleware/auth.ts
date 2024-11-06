import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "../config";
import jwt from "jsonwebtoken";

export function AuthMiddleware(request: Request, response: Response, next: NextFunction) {
    const token = request.headers.authorization?.split(" ")[1];
    if (!token) {
        response.status(401).json({ message: "Access denied" });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET!);
        (request as any).user = decoded;
        next();
    } catch (error) {
        response.status(401).json({ message: "Invalid token" });
    }
}
import { Router, Request, Response } from "express";
import { createUser, readUser, readUserById, updateUser, deleteUser } from "./user.controller";
import { CreateUserType, ReadUserType, UpdateUserType } from "./user.types";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../../config";
import { AuthMiddleware } from "../../middleware/auth";
import { RolesMiddleware } from "../../middleware/roles";
import argon2 from 'argon2'
import jwt from "jsonwebtoken";

// INIT ROUTES
const userRoutes = Router();

// DECLARE ENDPOINT FUNCTIONS
async function PostUser(request: Request<CreateUserType>, response: Response) {
    const { email, password } : CreateUserType = request.body
    if (!email || !password) {
        response.status(400).json({ message: "Missing fields" })
        return;
    }

    try {
        const hashedPassword = await argon2.hash(password!);
        const user = await createUser({ ...request.body, password: hashedPassword });
        const resultUser = { _id: user._id, email: user.email, role: user.role, isActive: user.isActive }
        response.status(201).json({ message: "Success.", user: resultUser });
    } catch (error) {
        response.status(500).json({ message: "Failure", information: (error as any).toString() })
    }
}

async function GetOneUser(request: Request<ReadUserType>, response: Response) {
    const userData: ReadUserType = request.query as any as ReadUserType
    const { email, password, isActive } = userData
    if (!email || !password) {
        response.status(400).json({ message: "Missing fields" })
        return;
    }
  
    try {
        const user = await readUser({ ...{ email }, isActive: isActive ?? true });
        if (!user) {
            response.status(404).json({ message: "User not found" });
            return;
        }

        const isPasswordValid = await argon2.verify(user.password, password);
        if (!isPasswordValid) {
            response.status(401).json({ message: "Invalid password" });
            return;
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            JWT_SECRET!,
            { expiresIn: JWT_EXPIRES_IN }
        );

        const resultUser = { _id: user._id, email: user.email, role: user.role, isActive: user.isActive }
        response.status(200).json({ message: "Success.", user: resultUser, token });
    } catch (error) {
        response.status(500).json({ message: "Failure", information: (error as any).toString() })
    }
}

async function GetUserHistory(request: Request, response: Response) {
    const userId = request.params.id
    const { isActive } = request.query as any as { isActive: boolean }

    try {
        const user = await readUserById({ _id: userId, isActive: isActive ?? true });
        if (!user) {
            response.status(404).json({ message: "User not found" });
            return;
        }

        response.status(200).json({ message: "Success.", history: user.history });
    } catch (error) {
        response.status(500).json({ message: "Failure", information: (error as any).toString() })
    }
}

async function UpdateUser(request: Request, response: Response) {
    const userId = request.params.id
    try {
        const hashedPassword = await argon2.hash(request.body.password!);
        const userData: UpdateUserType = request.body.password ? 
            { ...request.body, password: hashedPassword } : request.body
        const user = await updateUser({ _id: userId, data: userData});
        if (!user) {
            response.status(404).json({ message: "User not found" });
            return;
        }

        const resultUser = { _id: userId, email: user.email, role: user.role, isActive: user.isActive }
        response.status(201).json({ message: "Update successfully", user: resultUser });
    } catch (error) {
        response.status(500).json({ message: "Failure", information: (error as any).toString() })
    }
}

async function DeleteUser(request: Request, response: Response) {
    const userId = request.params.id

    try {
        const user = await deleteUser(userId);
        if (!user) {
            response.status(404).json({ message: "User not found" });
            return;
        }
        
        response.status(204);
    } catch (error) {
        response.status(500).json({ message: "Failure", information: (error as any).toString() })
    }
}

// DECLARE ENDPOINTS
userRoutes.post("/register", PostUser);
userRoutes.get("/login", GetOneUser);
userRoutes.get("/history/:id", AuthMiddleware, RolesMiddleware("admin", "librarian", "user"), GetUserHistory)
userRoutes.put("/:id", AuthMiddleware, RolesMiddleware("admin"), UpdateUser)
userRoutes.delete("/:id", AuthMiddleware, RolesMiddleware("admin"), DeleteUser)

// EXPORT ROUTES
export default userRoutes;

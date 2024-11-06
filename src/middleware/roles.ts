import { Request, Response, NextFunction } from "express";

export const RolesMiddleware = (...allowedRoles: string[]) => ((request: Request, response: Response, next: NextFunction) => {
    const user = (request as any).user;
    if (!user) {
        response.status(403).json({ message: "Access denied" });
        return;
    }

    const hasRole = allowedRoles.some(role => user.role === role);
    if (!hasRole && user.userId !== request.params.id) {
        response.status(403).json({ message: "You do not have permission to access this resource" });
        return;
    }

    next();
});
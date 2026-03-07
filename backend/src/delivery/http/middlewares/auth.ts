import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../../../modules/users/core/domain/services/JwtService";
import { ErrorType, HandledError } from "../../../modules/shared/domain/errors/HandledError";

const JWT_SECRET = process.env.JWT_SECRET || 'change-me-in-production';

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        next(new HandledError({
            type: ErrorType.UNAUTHORIZED,
            params: { message: 'Token not provided' },
        }));
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
        req.user = payload;
        next();
    } catch {
        next(new HandledError({
            type: ErrorType.UNAUTHORIZED,
            params: { message: 'Invalid or expired token' },
        }));
    }
};

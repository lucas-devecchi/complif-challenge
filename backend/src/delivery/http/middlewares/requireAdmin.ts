import { ErrorType, HandledError } from "../../../modules/shared/domain/errors/HandledError";
import { UserRole } from "../../../modules/users/core/domain/User";
import Middleware from "./middleware";

export const requireAdmin: Middleware = (req, res, next) => {
    if (!req.user) {
        next(new HandledError({
            type: ErrorType.UNAUTHORIZED,
            params: { message: 'Token required' },
        }));
        return;
    }

    if (req.user.role !== UserRole.ADMIN) {
        next(new HandledError({
            type: ErrorType.ACCESS_DENIED,
            params: { message: 'Admin role required' },
        }));
        return;
    }

    next();
};

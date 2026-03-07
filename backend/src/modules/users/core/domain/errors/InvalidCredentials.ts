import { HandledError } from "../../../../shared/domain/errors/HandledError";
import { ErrorType } from "../../../../shared/domain/errors/HandledError";

export class InvalidCredentials extends HandledError {
    constructor() {
        super({
            type: ErrorType.UNAUTHORIZED,
            params: { message: "Invalid credentials" },
        });
    }
}

import { NextFunction, Request, Response } from "express";

type Controller = (req: Request, res: Response) => Promise<void>;

type Middleware = (req: Request, res: Response, next: NextFunction) => (Promise<void> | void);

export const defaultController: (controller: Controller) => Middleware = (controller: Controller) => {
    return async (req, res, next) => {
        try {
            await controller(req, res);
        } catch (error: any) {
            next(error);
        }
    };
};
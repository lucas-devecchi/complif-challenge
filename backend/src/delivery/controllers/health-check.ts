import { Request, Response } from 'express';


export const healthCheckController = async (req: Request, res: Response) => {
    res.status(200).json({ message: 'OK' });
};
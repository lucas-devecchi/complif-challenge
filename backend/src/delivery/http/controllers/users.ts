import { Request, Response } from "express";
import { createUser } from "../../../modules/users/core/actions/CreateUser";
import { CreateUserDto, UserLoginDto } from "../../dtos/userDTO";
import { login } from "../../../modules/users/core/actions/Login";

export const registerController = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body as CreateUserDto;

    const user = await createUser.invoke({ name, email, password, role });
    const { password: _, ...restUser } = user;
    res.status(201).json(restUser);
};

export const loginController = async (req: Request, res: Response) => {
    const { email, password } = req.body as UserLoginDto;
    const result = await login.invoke({ email, password });
    res.status(200).json(result);
};
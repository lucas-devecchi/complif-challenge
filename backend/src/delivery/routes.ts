import { Application } from 'express';
import { defaultController } from './http/controllers/controller';
import { getAllBusinessesController, getBusinessByIdController, createBusinessController, updateBusinessController } from './http/controllers/businesses';
import { getAllAccountsController, getAccountByIdController, createAccountController, updateAccountController, deleteAccountController } from './http/controllers/accounts';
import { loginController, registerController } from './http/controllers/users';
import { authMiddleware } from './http/middlewares/auth';
import { requireAdmin } from './http/middlewares/requireAdmin';


export const setupRoutes = (app: Application): void => {
    app.post('/auth/login', defaultController(loginController));
    app.post('/auth/register', defaultController(registerController));

    app.get('/businesses', authMiddleware, defaultController(getAllBusinessesController));
    app.get('/businesses/:id', authMiddleware, defaultController(getBusinessByIdController));
    app.post('/businesses', authMiddleware, requireAdmin, defaultController(createBusinessController));
    app.patch('/businesses/:id', authMiddleware, requireAdmin, defaultController(updateBusinessController));

    app.get('/accounts', authMiddleware, defaultController(getAllAccountsController));
    app.get('/accounts/:id', authMiddleware, defaultController(getAccountByIdController));
    app.post('/accounts', authMiddleware, requireAdmin, defaultController(createAccountController));
    app.put('/accounts/:id', authMiddleware, requireAdmin, defaultController(updateAccountController));
    app.delete('/accounts/:id', authMiddleware, requireAdmin, defaultController(deleteAccountController));
};
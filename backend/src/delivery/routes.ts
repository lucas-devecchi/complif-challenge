import { Application } from 'express';
import { defaultController } from './http/controllers/controller';
import { getAllBusinessesController, getBusinessByIdController, createBusinessController, updateBusinessController } from './http/controllers/businesses';
import { getAllAccountsController, getAccountByIdController, createAccountController, updateAccountController, deleteAccountController } from './http/controllers/accounts';
import { loginController, registerController } from './http/controllers/users';


export const setupRoutes = (app: Application): void => {
    app.post('/auth/login', defaultController(loginController));
    app.post('/auth/register', defaultController(registerController));

    app.get('/businesses', defaultController(getAllBusinessesController));
    app.get('/businesses/:id', defaultController(getBusinessByIdController));
    app.post('/businesses', defaultController(createBusinessController));
    app.patch('/businesses/:id', defaultController(updateBusinessController));
    // app.delete('/businesses/:id', defaultController(deleteBusinessController));

    app.get('/accounts', defaultController(getAllAccountsController));
    app.get('/accounts/:id', defaultController(getAccountByIdController));
    app.post('/accounts', defaultController(createAccountController));
    app.put('/accounts/:id', defaultController(updateAccountController));
    app.delete('/accounts/:id', defaultController(deleteAccountController));
};
import { Application } from 'express';
import { defaultController } from './http/controllers/controller';
import { getAllBusinessesController, getBusinessByIdController, createBusinessController, updateBusinessController, deleteBusinessController } from './http/controllers/businesses';


export const setupRoutes = (app: Application): void => {
    app.get('/businesses', defaultController(getAllBusinessesController));
    app.get('/businesses/:id', defaultController(getBusinessByIdController));
    app.post('/businesses', defaultController(createBusinessController));
    app.put('/businesses/:id', defaultController(updateBusinessController));
    app.delete('/businesses/:id', defaultController(deleteBusinessController));
};
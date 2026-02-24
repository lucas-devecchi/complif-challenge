import { Application } from 'express';
import { defaultController } from './utils/default-controller';
import { healthCheckController } from './controllers/health-check';

export const setupRoutes = (app: Application): void => {
    app.get('/health-check', defaultController(healthCheckController));
};
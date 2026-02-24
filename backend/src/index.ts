import 'reflect-metadata';
import { config } from 'dotenv';
import { TypeormConnectionManager } from './config/TypeormConnectionManager';

config();

TypeormConnectionManager.start().then(async () => {
    const { Server } = await import('./delivery/app');
    Server.getInstance().start();
});
import express, { Application, NextFunction, Request, Response } from 'express';
import http from 'http';
import cors from 'cors';
import { setupRoutes } from './routes';
import { GetErrorMessage, GetErrorStatusCode } from './utils/Error';

const { PORT = 3000 } = process.env;

export class Server {
    private app: Application;
    private server: http.Server;

    private static instance: Server;

    public static getInstance(): Server {
        if (!Server.instance) {
            Server.instance = new Server();
        }
        return Server.instance;
    }

    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);

        this.middlewares();
        setupRoutes(this.app);
        this.setupErrorHandler();
    }

    private middlewares(): void {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private setupErrorHandler(): void {
        this.app.use((error: Error, _: Request, res: Response, next: NextFunction) => {
          let status = GetErrorStatusCode(error);
        //   if (status >= 500) logger.error(error);
          res.status(status).json(GetErrorMessage(error));
        });
      }

    public start(): void {
        this.server.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    }

    public getApp(): Application {
        return this.app;
    }
}

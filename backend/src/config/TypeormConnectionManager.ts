import { DataSource } from 'typeorm';
import 'reflect-metadata';

export class TypeormConnectionManager {
    private static dataSource: DataSource;

    public static async start(): Promise<void> {
        await this.createConnection();
    }

    public static getDataSource(): DataSource {
        if (this.dataSource === undefined) {
            throw new Error('TypeORM has not been initialized!');
        }
        return this.dataSource;
    }

    private static async createConnection(): Promise<void> {
        const {
            DB_HOST = 'localhost',
            DB_PORT = '5432',
            DB_USER = 'postgres',
            DB_PASSWORD = 'password',
            DB_NAME = 'postgres',
            DB_SCHEMA = 'public',
            DB_SSL = 'false',
        } = process.env;

        this.dataSource = new DataSource({
            type: 'postgres',
            host: DB_HOST,
            port: Number(DB_PORT),
            username: DB_USER,
            password: DB_PASSWORD,
            database: DB_NAME,
            schema: DB_SCHEMA,
            connectTimeoutMS: 10000,
            maxQueryExecutionTime: 30000,
            extra: {
                query_timeout: 30000,
            },
            entities: [

            ],
            synchronize: true,
            ssl: DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
        });

        await this.dataSource
            .initialize()
            .then(() => {
                console.log('PostgreSQL has been initialized!');
            })
            .catch((err: unknown) => {
                console.error('Error during PostgreSQL initialization', err);
                throw err;
            });
    }

    public static async healthCheck(): Promise<boolean> {
        if (this.dataSource === undefined) {
            console.error('TypeORM has not been initialized!');
            return false;
        }

        return this.dataSource
            .query('SELECT 1')
            .then(() => {
                return true;
            })
            .catch((err: unknown) => {
                console.error('Error during PostgreSQL health check', err);
                return false;
            });
    }
}

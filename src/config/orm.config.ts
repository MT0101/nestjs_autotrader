import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSource, DataSourceOptions } from "typeorm";

export const getTypeOrmModuleOptions = (): TypeOrmModuleOptions => {
    const dbOptions = {
        autoLoadEntities: true,
        entities: [__dirname + 'dist./**/entities/**.entity{.ts,.js}'],
        bigNumberStrings: false,
        logging: true,
    };

    switch (process.env.NODE_ENV) {
        case 'development':
            Object.assign(dbOptions, {
                type: 'mysql',
                database: 'megak_cars_marketplace_dev',
                host: 'localhost',
                port: '3306',
                username: 'root',
                password: '',
                synchronize: true,
            });
            break;

        case 'test':
            Object.assign(dbOptions, {
                type: 'mysql',
                database:  process.env.DB_TEST_NAME,
                host: 'localhost',
                port: '3306',
                username: 'root',
                password: '',
                synchronize: true,
            });
            break;

        case 'production':
            Object.assign(dbOptions, {
                type: 'mysql',
                host: process.env.DB_PROD_HOST,
                port: parseInt(process.env.DB_PROD_PORT),
                database: process.env.DB_PROD_NAME,
                username: process.env.DB_PROD_USER,
                password: process.env.DB_PROD_PASSWORD,
                synchronize: false,
            });
            break;

        default:
            throw new Error('unknown environment');
    }

    return dbOptions;
}

export const getDataSourceOptions = (): DataSourceOptions => {
    const options: DataSourceOptions = { ...getTypeOrmModuleOptions() } as DataSourceOptions;

    Object.assign(options, {
        migrationsTableName: '__migrations',
        migrations: ['./src/migrations/*.ts'],
        cli: {
            migrationsDir: "src/migrations",
        },
    } as Partial<DataSourceOptions>);

    return options;
};

export default new DataSource(getDataSourceOptions());
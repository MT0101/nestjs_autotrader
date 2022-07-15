import { DataSource, DataSourceOptions } from 'typeorm';

export const connectionSource = new DataSource({
    type: 'sqlite',
    database: 'db.sqlite',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    entities: ['./dist/**/**.entity{.ts,.js}'],
    bigNumberStrings: false,
    logging: true,
    migrationsTableName: 'migrations',
    migrations: ['migrations/*.ts'],
    cli: {
        migrationsDir: 'migrations',
    },
} as DataSourceOptions);
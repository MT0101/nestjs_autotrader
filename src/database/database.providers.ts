import { DataSource } from 'typeorm';

export const databaseProviders = [
    {
        provide: 'Dynamic_Module',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'sqlite',
                database: 'db.sqlite',
                entities: ['dist./**/**.entity{.ts,.js}'],
                logging: true,
                synchronize: true,
            });
            return dataSource.initialize();
        },
    },
];
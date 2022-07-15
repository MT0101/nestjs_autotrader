import { registerAs } from '@nestjs/config'

export default registerAs('database', () => (
    {
        type: 'mysql',
        logging: true,
        host: 'localhost',
        port: '3306',
        username: 'root',
        password: '',
        database: 'megak_cars_marketplace_dev',
        entities: ["dist/**/**.entity{.ts,.js}"],
        bigNumberStrings: false,
        migrations: ['dist/migration/*.js'],
        cli: {
                migrationsDir: 'migrations',
        },
            synchronize: true,
    }
))
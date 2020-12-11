import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { configuration } from './config/configuration';

export const getORMConfig = (): MysqlConnectionOptions => {
    const {
        dbHost,
        username,
        password,
        dbName,
    } = configuration().databaseConfig;

    const config: MysqlConnectionOptions = {
        type: 'mysql',
        host: dbHost,
        port: 3306,
        username,
        password,
        database: dbName,
        entities: [`${__dirname}/**/*.entity{.ts,.js}`],
        synchronize: true,
    };
    return config;
};

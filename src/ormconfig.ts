import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export const ORMConfig: MysqlConnectionOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'user',
    password: 'password',
    database: 'test_db',
    entities: [`${__dirname}/**/*.entity{.ts,.js}`],
    synchronize: true,
};

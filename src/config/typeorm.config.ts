import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
import { DbConfig } from 'config/config.interface';

const dbConfig = config.get<DbConfig>('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: parseInt(process.env.RDS_PORT) || dbConfig.port,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DB_NAME || dbConfig.database,
  autoLoadEntities: true,
  synchronize: Boolean(process.env.TYPORM_SYNC) || dbConfig.synchronize, // SET THIS TO FALSE FOR PRODUCTION!
};

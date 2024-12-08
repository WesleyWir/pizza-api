import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

const supportedDatabaseTypes = ['mysql', 'postgres'] as const;

const dbType = process.env.DATABASE_TYPE as (typeof supportedDatabaseTypes)[number];

if (!supportedDatabaseTypes.includes(dbType)) {
  throw new Error(`Invalid DATABASE_TYPE: ${process.env.DATABASE_TYPE}`);
}

const config: DataSourceOptions = {
  type: dbType,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '0', 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + './../../**/*.entity{.ts,.js}'],
  synchronize: false,
  migrationsRun: true,
  migrationsTableName: 'migrations',
  migrations: ['database/migrations/**/*{.ts,.js}'],
};

export const connectionSource = new DataSource(config);
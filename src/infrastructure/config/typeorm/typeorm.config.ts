import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

const config: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + './../../**/*.entity{.ts,.js}'],
  synchronize: false,
//   schema: process.env.DATABASE_SCHEMA,
  migrationsRun: true,
  migrationsTableName: 'migration_todo',
  migrations: ['database/migrations/**/*{.ts,.js}'],
  // ssl: {
  //   rejectUnauthorized: false,
  // },
};


console.log(config);
export const connectionSource = new DataSource(config as DataSourceOptions);
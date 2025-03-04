import { DataSource } from 'typeorm';
import c from 'config';

import type { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import { fileURLToPath } from 'url';
import path from 'path';

const envOptions = c.get<PostgresConnectionOptions>('database');

console.log(
  `Running against host postgres://${envOptions.username}:***@${envOptions.host}:${envOptions.port}/${envOptions.database}?currentSchema=${envOptions.schema}`,
);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const opts = {
  ...envOptions,
  migrationsTableName: 'typeorm_migrations',
  // in development the migrations are in the app's own folder so need to be resolved related to the config file
  migrations: [path.join(__dirname, 'migrations', '*.ts')],
  entities: [path.join(__dirname, 'src', '**/*.entity.ts')],
};

export default new DataSource(opts);

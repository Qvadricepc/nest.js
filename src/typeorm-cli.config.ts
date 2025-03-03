import { DataSource } from 'typeorm';
import path from 'path';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import c = require('config');

import type { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const envOptions = c.get<PostgresConnectionOptions>('database');

// Debug log (does not expose password)
console.debug(
  `Running against host postgres://${envOptions.username}:***@${envOptions.host}:${envOptions.port}/${envOptions.database}?currentSchema=${envOptions.schema}`
);

const opts = {
  ...envOptions,
  migrationsTableName: 'typeorm_migrations',
  migrations: [path.resolve(__dirname, 'migrations', '*.ts')],
  entities: [path.resolve(__dirname, 'src', '**', '*.entity.ts')],
};

export default new DataSource(opts);
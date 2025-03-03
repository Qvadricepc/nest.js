require('dotenv').config(); // ✅ Load .env variables at the top

const { DataSource } = require('typeorm');
const path = require('path');

const envOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: process.env.POSTGRES_PORT || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  schema: 'public',
};

if (!envOptions.username || !envOptions.password || !envOptions.database) {
  throw new Error('❌ Database credentials are missing! Check your .env file.');
}

console.debug(
  `Running against host postgres://${envOptions.username}:***@${envOptions.host}:${envOptions.port}/${envOptions.database}?currentSchema=${envOptions.schema}`,
);

const opts = {
  ...envOptions,
  migrationsTableName: 'typeorm_migrations',
  migrations: [path.resolve(__dirname, 'migrations', '*.ts')],
  entities: [path.resolve(__dirname, 'src', '**', '*.entity.ts')],
};

module.exports = new DataSource(opts);

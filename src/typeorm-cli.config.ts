import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './env.validate';
@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true, validate: validate }),
  ],
})
class DatasourceModule {}
export default NestFactory.create(DatasourceModule)
  .then((app) => app.get(DataSource))
  .then((dataSource) => Promise.all([dataSource, dataSource.destroy()]))
  .then(([dataSource]) => dataSource);

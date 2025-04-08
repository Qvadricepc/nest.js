import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { AppModule } from './app.module';

export const createDataSource = async (): Promise<DataSource> => {
  const app = await NestFactory.createApplicationContext(AppModule);
  const configService = app.get(ConfigService);

  const entitiesPath = ['src/**/*.entity.ts'];
  const migrationsPath = ['src/migrations/*{.ts}'];

  const dataSource = new DataSource({
    type: 'postgres',
    host: configService.get<string>('POSTGRES_HOST'),
    port: configService.get<number>('POSTGRES_PORT'),
    username: configService.get<string>('POSTGRES_USER'),
    password: configService.get<string>('POSTGRES_PASSWORD'),
    database: configService.get<string>('POSTGRES_DB'),
    entities: entitiesPath,
    migrations: migrationsPath,
    synchronize: false,
  });

  return dataSource;
};

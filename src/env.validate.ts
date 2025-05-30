import { plainToInstance, Transform } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsString,
  Min,
  Max,
  validateSync,
} from 'class-validator';

enum Environment {
  Development = 'development',
}

class EnvironmentVariables {
  // Node Environment
  @IsEnum(Environment)
  @Transform(({ value }): string => value || Environment.Development)
  NODE_ENV: Environment = Environment.Development;

  // PostgreSQL
  @IsString()
  @Transform(({ value }): string => value || 'localhost')
  POSTGRES_HOST: string = 'localhost';

  @IsString()
  @Transform(({ value }): string => value || 'postgres')
  POSTGRES_USER: string = 'postgres';

  @IsString()
  @Transform(({ value }): string => value || 'postgres')
  POSTGRES_PASSWORD: string = 'postgres';

  @IsString()
  @Transform(({ value }): string => value || 'nest_db')
  POSTGRES_DB: string = 'nest_db';

  @IsNumber()
  @Min(0)
  @Max(65535)
  @Transform(({ value }) => Number(value) || 5432)
  POSTGRES_PORT: number = 5432;

  // Redis
  @IsNumber()
  @Min(0)
  @Max(65535)
  @Transform(({ value }) => Number(value) || 6379)
  REDIS_PORT: number = 6379;

  // Minio
  @IsString()
  @Transform(({ value }): string => value || 'minioadmin')
  MINIO_ROOT_USER: string = 'minioadmin';

  @IsString()
  @Transform(({ value }): string => value || 'minioadmin')
  MINIO_ROOT_PASSWORD: string = 'minioadmin';

  @IsNumber()
  @Min(0)
  @Max(65535)
  @Transform(({ value }) => Number(value) || 9000)
  MINIO_API_PORT: number = 9000;

  @IsNumber()
  @Min(0)
  @Max(65535)
  @Transform(({ value }) => Number(value) || 9001)
  MINIO_CONSOLE_PORT: number = 9001;

  // Mailhog
  @IsNumber()
  @Min(0)
  @Max(65535)
  @Transform(({ value }) => Number(value) || 1025)
  MAILHOG_SMTP_PORT: number = 1025;

  @IsNumber()
  @Min(0)
  @Max(65535)
  @Transform(({ value }) => Number(value) || 8025)
  MAILHOG_WEB_PORT: number = 8025;

  // ElasticMQ
  @IsNumber()
  @Min(0)
  @Max(65535)
  @Transform(({ value }) => Number(value) || 9324)
  ELASTICMQ_PORT: number = 9324;
}

export function validate(
  config: Record<string, unknown>,
): EnvironmentVariables {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}

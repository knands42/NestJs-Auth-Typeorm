import { registerAs } from '@nestjs/config'
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm'
import { config } from 'dotenv'
import { get } from 'env-var'

config()

class DatabaseConfig {
  public static readonly SQL_TYPE: string = get('SQL_TYPE')
    .required()
    .asString()

  public static readonly SQL_NAME: string = get('SQL_NAME')
    .required()
    .asString()

  public static readonly SQL_DATABASE: string = get('SQL_DATABASE')
    .required()
    .asString()

  public static readonly SQL_USERNAME: string = get('SQL_USERNAME')
    .required()
    .asString()

  public static readonly SQL_PASSWORD: string = get('SQL_PASSWORD')
    .required()
    .asString()

  public static readonly SQL_HOST: string = get('SQL_HOST')
    .required()
    .asString()

  public static readonly SQL_PORT: number = get('SQL_PORT')
    .required()
    .asIntPositive()

  public static readonly NODE_ENV: string = get('NODE_ENV').asString() ?? 'dev'
}

export const typeormConfig = {
  name: DatabaseConfig.SQL_NAME ?? 'default',
  type: DatabaseConfig.SQL_TYPE ?? 'postgres',
  logging: true,
  host: DatabaseConfig.SQL_HOST ?? 'localhost',
  port: DatabaseConfig.SQL_PORT,
  username: DatabaseConfig.SQL_USERNAME,
  password: DatabaseConfig.SQL_PASSWORD,
  database:
    DatabaseConfig.NODE_ENV === 'test'
      ? `${DatabaseConfig.SQL_DATABASE}_test`
      : DatabaseConfig.SQL_DATABASE,
  dropSchema: false,
  synchronize: false,
  keepConnectionAlive: true,
  autoLoadEntities: true,
  migrationsRun: false
} as TypeOrmModuleAsyncOptions

export const databaseConfig = registerAs('database', () => typeormConfig)

import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm'
import { registerAs } from '@nestjs/config'

let databaseOptions

export const typeormConfig = registerAs('database', () => {
  databaseOptions = {
    name: process.env.SQL_NAME ?? 'default',
    type: process.env.SQL_TYPE ?? 'postgres',
    logging: true,
    host: process.env.SQL_HOST,
    port: process.env.SQL_PORT,
    username: process.env.SQL_USERNAME,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
    dropSchema: false,
    synchronize: false,
    keepConnectionAlive: true,
    autoLoadEntities: true,
    migrationsRun: false
  } as TypeOrmModuleAsyncOptions

  return databaseOptions
})

export default databaseOptions
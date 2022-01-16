import { join } from 'path'
import databaseOptions from './typeorm.config'

const database = {
  ...databaseOptions,
  migrations: [join(__dirname, '..', 'shared/database/migrations/*.{ts,js}')],
  cli: {
    migrationsDir: 'src/shared/database/migrations'
  },
  entities: [join(__dirname, '..', 'modules/**/domain/models/*.{ts,js}')]
}

export = database

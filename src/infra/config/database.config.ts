import { join } from 'path'
import { typeormConfig } from './typeorm.config'

const database = {
  ...typeormConfig,
  migrations: [join(__dirname, '..', 'database/migrations/*.{ts,js}')],
  cli: {
    migrationsDir: 'src/infra/database/migrations'
  },
  entities: [join(__dirname, '..', 'modules/**/domain/models/*.{ts,js}')]
}

export = database

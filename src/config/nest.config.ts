import { ConfigModuleOptions } from '@nestjs/config'
import { authConfig } from './auth.config'
import { typeormConfig } from './typeorm.config'

export const optionsConfig = {
  isGlobal: true,
  envFilePath: ['.env'],
  cache: true,
  load: [authConfig, typeormConfig]
} as ConfigModuleOptions

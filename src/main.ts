import 'reflect-metadata'
import {
  INestApplication,
  Logger,
  ValidationPipe,
  VersioningType
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './AppModule'
import 'colors'
import {
  AllExceptionFilter,
  ResultInterceptor,
  validationErrorFactory
} from 'infra'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  appSetup(app)

  const configService = app.get(ConfigService)
  await app.listen(configService.get('PORT'))
  Logger.log(
    `Server running on port ${configService.get('PORT')} in ${
      process.env.NODE_ENV ?? 'Debug'
    } mode`.blue.bold
  )
}

export function appSetup(app: INestApplication) {
  app.enableCors()
  app.setGlobalPrefix('api')
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1'
  })
  app.useGlobalFilters(new AllExceptionFilter())
  app.useGlobalInterceptors(new ResultInterceptor())
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: validationErrorFactory
    })
  )
}

bootstrap()

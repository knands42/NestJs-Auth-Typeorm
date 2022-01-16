import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import 'colors'
import {
  AllExceptionFilter,
  ResultInterceptor,
  validationErrorFactory
} from 'infra'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.setGlobalPrefix('api')
  app.useGlobalFilters(new AllExceptionFilter())
  app.useGlobalInterceptors(new ResultInterceptor())
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: validationErrorFactory
    })
  )

  const configService = app.get(ConfigService)
  await app.listen(configService.get('PORT'))
  Logger.log(
    `Server running on port ${configService.get('PORT')} in ${
      process.env.NODE_ENV
    } mode`.blue.bold
  )
}
bootstrap()

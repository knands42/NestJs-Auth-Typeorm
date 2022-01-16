import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import 'colors'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.setGlobalPrefix('api')

  const configService = app.get(ConfigService)
  await app.listen(configService.get('PORT'))
  Logger.log(
    `Server running on port ${configService.get('PORT')} in ${
      process.env.NODE_ENV
    } mode`.blue.bold
  )
}
bootstrap()

import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { optionsConfig } from 'config/nest.config'

@Module({
  imports: [
    ConfigModule.forRoot(optionsConfig),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('database')
      })
    })
  ]
})
export class AppModule {}

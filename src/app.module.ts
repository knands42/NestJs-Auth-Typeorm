import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { optionsConfig } from 'config/nest.config'
import { typeormConfig } from 'config/typeorm.config'

@Module({
  imports: [
    ConfigModule.forRoot(optionsConfig),
    TypeOrmModule.forRootAsync(typeormConfig)
  ]
})
export class AppModule {}

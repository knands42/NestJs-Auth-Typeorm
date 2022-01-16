import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { optionsConfig } from 'config/nest.config'
import { UserModule } from 'modules/user/user.module'

@Module({
  imports: [
    // Setup Modules
    ConfigModule.forRoot(optionsConfig),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('database')
      })
    }),

    // Custom Modules
    UserModule
  ]
})
export class AppModule {}

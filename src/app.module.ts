import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { optionsConfig } from 'infra'
import { AuthModule } from 'modules/auth'
import { UserModule } from 'modules/user/UserModule'

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
    UserModule,
    AuthModule
  ]
})
export class AppModule {}

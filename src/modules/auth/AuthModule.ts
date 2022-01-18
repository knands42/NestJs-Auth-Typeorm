import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { JwtAuthGuard } from './guard/JwtAuthGuard'
import { JwtStrategy } from './guard/JwtAuthStrategy'
import { AuthService } from './service/AuthService'

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') }
      })
    })
  ],
  providers: [
    {
      provide: 'AuthUseCase',
      useClass: AuthService
    },
    JwtStrategy,
    JwtAuthGuard
  ],
  exports: [
    {
      provide: 'AuthUseCase',
      useClass: AuthService
    },
    JwtAuthGuard
  ]
})
export class AuthModule {}

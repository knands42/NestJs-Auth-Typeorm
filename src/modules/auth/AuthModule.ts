import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtAuthGuard } from './guard/JwtAuthGuard'
import { JwtAuthStrategy } from './guard/JwtAuthStrategy'
import { AuthService } from './providers/AuthService'

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('auth.jwt_secret'),
        signOptions: {
          expiresIn: configService.get<string>('auth.jwt_expires_in')
        }
      })
    }),
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  providers: [
    {
      provide: 'AuthUseCase',
      useClass: AuthService
    },
    JwtAuthStrategy,
    JwtAuthGuard
  ],
  exports: [
    {
      provide: 'AuthUseCase',
      useClass: AuthService
    },
    JwtAuthGuard,
    JwtAuthStrategy,
    PassportModule
  ]
})
export class AuthModule {}

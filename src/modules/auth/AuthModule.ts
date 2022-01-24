import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtAuthGuard } from './guards/JwtAuthGuard'
import { JwtAuthStrategy } from './guards/JwtAuthStrategy'
import { AuthProvider } from './providers/AuthProvider'

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
      useClass: AuthProvider
    },
    JwtAuthStrategy,
    JwtAuthGuard
  ],
  exports: [
    {
      provide: 'AuthUseCase',
      useClass: AuthProvider
    },
    JwtAuthGuard,
    JwtAuthStrategy,
    PassportModule
  ]
})
export class AuthModule {}

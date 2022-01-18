import { Module } from '@nestjs/common'
import { QueryUserProvider } from './providers/QueryUserProvider'
import { UsersController } from './controller/UserController'
import { DatabaseModule } from 'modules/database/DatabaseModule'
import { AuthModule } from 'modules/auth'
import { SignUserProvider } from './providers/SignUserProvider'
import { ResponseInterceptor } from './interceptor/ResponseInterceptor'
import { RolesGuard } from './guard/RoleGuard'
import { PermissionGuard } from './guard/PermissionGuard'
import { UserCanOperate } from './guard/UserCanOperate'
import { PassportModule } from '@nestjs/passport'

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: 'QueryUserUseCase',
      useClass: QueryUserProvider
    },
    {
      provide: 'SignUserUseCase',
      useClass: SignUserProvider
    },
    ResponseInterceptor,
    RolesGuard,
    PermissionGuard,
    UserCanOperate
  ],
  exports: [{ provide: 'QueryUserUseCase', useClass: QueryUserProvider }]
})
export class UserModule {}

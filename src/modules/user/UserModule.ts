import { Module } from '@nestjs/common'
import { QueryUserProvider } from './providers/QueryUserProvider'
import { DatabaseModule } from 'modules/database/DatabaseModule'
import { AuthModule } from 'modules/auth'
import { SignUserProvider } from './providers/SignUserProvider'
import { ResponseInterceptor } from './interceptor/ResponseInterceptor'
import { RolesGuard } from './guards/RoleGuard'
import { PermissionGuard } from './guards/PermissionGuard'
import { UserCanOperateGuard } from './guards/UserCanOperateGuard'
import { PassportModule } from '@nestjs/passport'
import { UsersController } from './controller/v1/UserController'
import { UpdateUserProvider } from './providers/UpdateUserProvider'
import { DeleteUserProvider } from './providers/DeleteUserProvider'
import { OnlyAdminGuard } from './guards/OnlyAdminGuard'

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
    {
      provide: 'UpdateUserUseCase',
      useClass: UpdateUserProvider
    },
    {
      provide: 'DeleteUserUseCase',
      useClass: DeleteUserProvider
    },
    ResponseInterceptor,
    RolesGuard,
    PermissionGuard,
    OnlyAdminGuard,
    UserCanOperateGuard
  ],
  exports: [{ provide: 'QueryUserUseCase', useClass: QueryUserProvider }]
})
export class UserModule {}

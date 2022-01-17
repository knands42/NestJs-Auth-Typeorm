import { Module } from '@nestjs/common'
import { QueryUserService } from './providers/QueryUserService'
import { UsersController } from './controller/UserController'
import { DatabaseModule } from 'modules/database/DatabaseModule'
import { AuthModule } from 'modules/auth'
import { RolesGuard } from './guard/RoleGuard'

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [UsersController],
  providers: [
    {
      provide: 'QueryUserUseCase',
      useClass: QueryUserService
    }
  ],
  exports: [{ provide: 'QueryUserUseCase', useClass: QueryUserService }]
})
export class UserModule {}

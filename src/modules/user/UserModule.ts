import { Module } from '@nestjs/common'
import { QueryUserProvider } from './providers/QueryUserProvider'
import { UsersController } from './controller/UserController'
import { DatabaseModule } from 'modules/database/DatabaseModule'
import { AuthModule } from 'modules/auth'
import { SignUserProvider } from './providers/SignUserProvider'

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [UsersController],
  providers: [
    {
      provide: 'QueryUserUseCase',
      useClass: QueryUserProvider
    },
    {
      provide: 'SignUserUseCase',
      useClass: SignUserProvider
    }
  ],
  exports: [{ provide: 'QueryUserUseCase', useClass: QueryUserProvider }]
})
export class UserModule {}

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { QueryUserService } from './domain/services/QueryUserService'
import { UsersController } from './providers/controller/UsersController'
import { UserRepository } from './providers/database/repository/user.repository'

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [UsersController],
  providers: [QueryUserService]
})
export class UserModule {}

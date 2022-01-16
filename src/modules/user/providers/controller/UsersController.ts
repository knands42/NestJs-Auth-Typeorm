import { Controller, Get } from '@nestjs/common'
import { User } from 'modules/user/domain/entities/User'
import { QueryUserService } from 'modules/user/domain/services/QueryUserService'

@Controller('users')
export class UsersController {
  constructor(private readonly queryUserService: QueryUserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return await this.queryUserService.findAll()
  }
}

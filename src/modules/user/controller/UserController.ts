import { Controller, Get, Inject } from '@nestjs/common'
import { User } from 'domain/user/entities/User'
import { QueryUserUserCase } from 'domain/user/port/in/QueryUserUseCase'

@Controller('users')
export class UsersController {
  constructor(
    @Inject('QueryUserUseCase')
    private readonly queryUserUserCase: QueryUserUserCase
  ) {}

  @Get()
  async findAll(): Promise<User[]> {
    return await this.queryUserUserCase.findAll()
  }
}

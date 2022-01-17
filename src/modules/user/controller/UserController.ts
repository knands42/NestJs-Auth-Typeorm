import { Controller, Get, Inject } from '@nestjs/common'
import { QueryUserUserCase, User } from 'domain/user'

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

import { Controller, Get, Inject } from '@nestjs/common'
import { User, QueryUserUserCase } from 'domain/index'

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

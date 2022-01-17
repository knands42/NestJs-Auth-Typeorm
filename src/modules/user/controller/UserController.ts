import { Controller, Get, Inject, UseGuards } from '@nestjs/common'
import { QueryUserUserCase, User, UserRoles } from 'domain/user'
import { JwtAuthGuard } from 'modules/auth/guard/JwtAuthGuard'
import { hasRoles } from '../decorators/PermissionsDecorator'
import { RolesGuard } from '../guard/RoleGuard'

@Controller('users')
export class UsersController {
  constructor(
    @Inject('QueryUserUseCase')
    private readonly queryUserUserCase: QueryUserUserCase
  ) {}

  @Get()
  @hasRoles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAll(): Promise<User[]> {
    return await this.queryUserUserCase.findAll()
  }
}

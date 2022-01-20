import {
  Controller,
  Get,
  Inject,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { QueryUserUseCase, User, UserRoles } from 'domain/user'
import { JwtAuthGuard } from 'modules/auth/guard/JwtAuthGuard'
import { Roles } from '../../decorators/RolesDecorator'
import { RolesGuard } from '../../guard/RoleGuard'
import { ResponseInterceptor } from '../../interceptor/ResponseInterceptor'

@Controller('admin')
@UseInterceptors(ResponseInterceptor)
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(
    @Inject('QueryUserUseCase')
    private readonly queryUserUserCase: QueryUserUseCase
  ) {}

  @Get('users')
  @Roles(UserRoles.ADMIN)
  @UseGuards(RolesGuard)
  async findAll(): Promise<User[]> {
    return this.queryUserUserCase.findAll()
  }
}

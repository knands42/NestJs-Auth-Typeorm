import {
  Body,
  Controller,
  Get,
  Inject,
  Put,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { TokenPayload } from 'domain/auth/types'
import { QueryUserUseCase, User, UserRoles } from 'domain/user'
import { UpdateUserRequest } from 'domain/user/models/request/UpdateUserRequest'
import { UpdateUserUseCase } from 'domain/user/port/in/UpdateUserUseCase'
import { JwtAuthGuard } from 'modules/auth/guard/JwtAuthGuard'
import { GetTokenPayload } from 'modules/user/decorators/GetTokenPayload'
import { OnlyAdminGuard } from 'modules/user/guard/OnlyAdminGuard'
import { ResponseInterceptor } from '../../interceptor/ResponseInterceptor'

@Controller('admin')
@UseInterceptors(ResponseInterceptor)
@UseGuards(JwtAuthGuard, OnlyAdminGuard)
export class AdminController {
  constructor(
    @Inject('QueryUserUseCase')
    private readonly queryUserUserCase: QueryUserUseCase,
    @Inject('UpdateUserUseCase')
    private readonly updateUserUseCase: UpdateUserUseCase
  ) {}

  @Get('users')
  async findAll(): Promise<User[]> {
    return this.queryUserUserCase.findAll()
  }

  @Put(':id')
  async updateOne(
    @GetTokenPayload() user: TokenPayload,
    @Body() payload: UpdateUserRequest
  ): Promise<User> {
    return this.updateUserUseCase.updateOne(user.id, payload)
  }
}

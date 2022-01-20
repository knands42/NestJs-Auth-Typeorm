import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Put,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { QueryUserUseCase, User } from 'domain/user'
import { UpdateUserRequest } from 'domain/user/models/request/UpdateUserRequest'
import { DeleteUserUseCase } from 'domain/user/port/in/DeleteUserUseCase'
import { UpdateUserUseCase } from 'domain/user/port/in/UpdateUserUseCase'
import { JwtAuthGuard } from 'modules/auth/guard/JwtAuthGuard'
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
    private readonly updateUserUseCase: UpdateUserUseCase,
    @Inject('DeleteUserUseCase')
    private readonly deleteUserUseCase: DeleteUserUseCase
  ) {}

  @Get('users')
  async findAll(): Promise<User[]> {
    return this.queryUserUserCase.findAll()
  }

  @Put('users/:id')
  async updateOne(
    @Param('id') id: string,
    @Body() payload: UpdateUserRequest
  ): Promise<User> {
    return this.updateUserUseCase.updateOne(id, payload)
  }

  @Put('users/:id')
  async deleteOne(@Param('id') id: string): Promise<void> {
    return this.deleteUserUseCase.deleteOne(id)
  }
}

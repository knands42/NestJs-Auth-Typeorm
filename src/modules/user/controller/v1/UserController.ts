import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { TokenPayload } from 'domain/auth/types'
import { QueryUserUseCase, SignUpUserUseCase, User } from 'domain/user'
import { SignInRequest } from 'domain/user/models/request/SignInRequest'
import { SignUpRequest } from 'domain/user/models/request/SignUpRequest'
import { UpdateUserRequest } from 'domain/user/models/request/UpdateUserRequest'
import { SignInResponse } from 'domain/user/models/response/SignInResponse'
import { DeleteUserUseCase } from 'domain/user/port/in/DeleteUserUseCase'
import { UpdateUserUseCase } from 'domain/user/port/in/UpdateUserUseCase'
import { JwtAuthGuard } from 'modules/auth/guards/JwtAuthGuard'
import { OnlyAdminGuard } from 'modules/user/guards/OnlyAdminGuard'
import { GetTokenPayload } from '../../decorators/GetTokenPayload'
import { UserCanOperateGuard } from '../../guards/UserCanOperateGuard'
import { ResponseInterceptor } from '../../interceptor/ResponseInterceptor'

@Controller('users')
@UseInterceptors(ResponseInterceptor)
export class UsersController {
  constructor(
    @Inject('QueryUserUseCase')
    private readonly queryUserUserCase: QueryUserUseCase,
    @Inject('SignUserUseCase')
    private readonly signUpUserUseCase: SignUpUserUseCase,
    @Inject('UpdateUserUseCase')
    private readonly updateUserUseCase: UpdateUserUseCase,
    @Inject('DeleteUserUseCase')
    private readonly deleteUserUseCase: DeleteUserUseCase
  ) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async findUserInfo(@GetTokenPayload() payload: TokenPayload): Promise<User> {
    return this.queryUserUserCase.findById(payload.id)
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, UserCanOperateGuard)
  async findOne(@Param('id') id: string): Promise<User> {
    return this.queryUserUserCase.findById(id)
  }

  @UseGuards(JwtAuthGuard, UserCanOperateGuard)
  @Put(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() payload: UpdateUserRequest
  ): Promise<User> {
    return this.updateUserUseCase.updateOne(id, payload)
  }

  @UseGuards(JwtAuthGuard, UserCanOperateGuard)
  @HttpCode(204)
  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<void> {
    return this.deleteUserUseCase.deleteOne(id)
  }

  @Post('signup')
  async signUp(@Body() payload: SignUpRequest): Promise<User> {
    return this.signUpUserUseCase.signUp(payload)
  }

  @HttpCode(200)
  @Post('signin')
  async signIn(@Body() payload: SignInRequest): Promise<SignInResponse> {
    return this.signUpUserUseCase.signIn(payload)
  }
}

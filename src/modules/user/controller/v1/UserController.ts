import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { TokenPayload } from 'domain/auth/types'
import {
  QueryUserUseCase,
  SignUpUserUseCase,
  User,
  UserRoles
} from 'domain/user'
import { SignInRequest } from 'domain/user/models/request/SignInRequest'
import { SignUpRequest } from 'domain/user/models/request/SignUpRequest'
import { UpdateUserDTO } from 'domain/user/models/request/UpdateUserDTO'
import { SignInResponse } from 'domain/user/models/response/SignInResponse'
import { JwtAuthGuard } from 'modules/auth/guard/JwtAuthGuard'
import { GetTokenPayload } from '../../decorators/GetTokenPayload'
import { Roles } from '../../decorators/RolesDecorator'
import { RolesGuard } from '../../guard/RoleGuard'
import { UserCanOperate } from '../../guard/UserCanOperate'
import { ResponseInterceptor } from '../../interceptor/ResponseInterceptor'

@Controller('users')
@UseInterceptors(ResponseInterceptor)
export class UsersController {
  constructor(
    @Inject('QueryUserUseCase')
    private readonly queryUserUserCase: QueryUserUseCase,
    @Inject('SignUserUseCase')
    private readonly signUpUserUseCase: SignUpUserUseCase
  ) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async findUserInfo(@GetTokenPayload() payload: TokenPayload): Promise<User> {
    return this.queryUserUserCase.findById(payload.id)
  }

  @Get(':id')
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, UserCanOperate || RolesGuard)
  async findOne(@Param('id') id: string): Promise<User> {
    return this.queryUserUserCase.findById(id)
  }

  // @Roles(UserRoles.ADMIN)
  // @UseGuards(JwtAuthGuard, UserCanOperate || RolesGuard)
  // @Put(':id')
  // async updateOne(
  //   @GetTokenPayload() user: User,
  //   @Body() payload: UpdateUserDTO
  // ): Promise<User> {
  //   return this.signUpUserUseCase.updateOne(user.id, payload)
  // }

  @Post('signup')
  async signUp(@Body() payload: SignUpRequest): Promise<User> {
    return this.signUpUserUseCase.signUp(payload)
  }

  @Post('signin')
  async signIn(@Body() payload: SignInRequest): Promise<SignInResponse> {
    return this.signUpUserUseCase.signIn(payload)
  }
}

import {
  Body,
  Controller,
  Get,
  Header,
  Headers,
  Inject,
  Param,
  Post,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import {
  QueryUserUseCase,
  SignUpUserUseCase,
  User,
  UserRoles
} from 'domain/user'
import { SignInRequest } from 'domain/user/models/request/SignInRequest'
import { SignUpRequest } from 'domain/user/models/request/SignUpRequest'
import { SignInResponse } from 'domain/user/models/response/SignInResponse'
import { JwtAuthGuard } from 'modules/auth/guard/JwtAuthGuard'
import { AuthUser } from '../decorators/AuthUser'
import { hasRoles } from '../decorators/PermissionsDecorator'
import { RolesGuard } from '../guard/RoleGuard'
import { UserCanOperate } from '../guard/UserCanOperate'
import { ResponseInterceptor } from '../interceptor/ResponseInterceptor'

@Controller('users')
@UseInterceptors(ResponseInterceptor)
export class UsersController {
  constructor(
    @Inject('QueryUserUseCase')
    private readonly queryUserUserCase: QueryUserUseCase,
    @Inject('SignUserUseCase')
    private readonly signUserService: SignUpUserUseCase
  ) {}

  @Get()
  @hasRoles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAll(): Promise<User[]> {
    return await this.queryUserUserCase.findAll()
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async findUserInfo(@AuthUser() user: User): Promise<User> {
    return this.queryUserUserCase.findById(user.id)
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @hasRoles(UserRoles.ADMIN)
  @UseGuards(UserCanOperate || RolesGuard)
  async findOne(@Param('id') id: string): Promise<User> {
    return this.queryUserUserCase.findById(id)
  }

  @Post('signup')
  async signUp(@Body() payload: SignUpRequest): Promise<User> {
    return this.signUserService.signUp(payload)
  }

  @Post('signin')
  async signIn(@Body() payload: SignInRequest): Promise<SignInResponse> {
    return this.signUserService.signIn(payload)
  }
}

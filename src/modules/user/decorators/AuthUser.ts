import { createParamDecorator } from '@nestjs/common'
import { User } from 'domain/user'

export const AuthUser = createParamDecorator((_data, req): User => req.user)

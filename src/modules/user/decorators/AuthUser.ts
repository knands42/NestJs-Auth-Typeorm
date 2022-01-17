import { createParamDecorator } from '@nestjs/common'

export const AuthUser = createParamDecorator((_data, req) => req.user)

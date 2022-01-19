import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { TokenPayload } from 'domain/auth/types'

export const GetTokenPayload = createParamDecorator(
  (_data, req: ExecutionContext): TokenPayload =>
    req.switchToHttp().getRequest().user
)

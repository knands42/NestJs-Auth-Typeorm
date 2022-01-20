import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { TokenPayload } from 'domain/auth/types'
import { QueryUserUseCase, User } from 'domain/user'
import { from, map, Observable } from 'rxjs'
import { ROLES_KEY } from '../decorators/RolesDecorator'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject('QueryUserUseCase')
    private readonly queryUserUserCase: QueryUserUseCase
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler())
    if (!roles) return true
    console.log('MAMACO')

    const request = context.switchToHttp().getRequest()
    const user: TokenPayload = request.user

    return from(this.queryUserUserCase.findById(user.id)).pipe(
      map((user: User) => user && roles.some(role => user.role == role))
    )
  }
}

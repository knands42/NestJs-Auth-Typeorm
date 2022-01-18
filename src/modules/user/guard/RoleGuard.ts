import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { QueryUserUseCase, User } from 'domain/user'
import { from, map, Observable } from 'rxjs'

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
    const roles = this.reflector.get<string[]>('roles', context.getHandler())
    if (!roles) return true

    const request = context.switchToHttp().getRequest()
    const user: User = request.user

    return from(this.queryUserUserCase.findById(user.id)).pipe(
      map((user: User) => {
        const hasRoles = () => roles.indexOf(user.role) > -1
        return user && hasRoles()
      })
    )
  }
}

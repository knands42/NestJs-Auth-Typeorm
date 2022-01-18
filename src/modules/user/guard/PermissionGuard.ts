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
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject('QueryUserUseCase')
    private readonly queryUserUserCase: QueryUserUseCase
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const permissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler()
    )
    if (!permissions) return true

    const request = context.switchToHttp().getRequest()
    const user: User = request.user

    return from(this.queryUserUserCase.findById(user.id)).pipe(
      map((user: User) => {
        const hasPermissions = () => permissions.indexOf(user.role) > -1
        return user && hasPermissions()
      })
    )
  }
}

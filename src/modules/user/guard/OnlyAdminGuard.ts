import { CanActivate, ExecutionContext, Inject } from '@nestjs/common'
import { TokenPayload } from 'domain/auth/types'
import { QueryUserUseCase, User, UserRoles } from 'domain/user'
import { from, map, Observable } from 'rxjs'

export class OnlyAdminGuard implements CanActivate {
  constructor(
    @Inject('QueryUserUseCase')
    private readonly queryUserUseCase: QueryUserUseCase
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()

    const user: TokenPayload = request.user

    return from(this.queryUserUseCase.findById(user.id)).pipe(
      map((user: User) => user.role === UserRoles.ADMIN)
    )
  }
}

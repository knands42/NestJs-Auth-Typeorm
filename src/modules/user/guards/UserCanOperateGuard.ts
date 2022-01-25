import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { TokenPayload } from 'domain/auth/types'
import { QueryUserUseCase, User, UserRoles } from 'domain/user'
import { from, Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class UserCanOperateGuard implements CanActivate {
  constructor(
    @Inject('QueryUserUseCase')
    private readonly queryUserUseCase: QueryUserUseCase,
    private readonly reflector: Reflector
  ) {}

  canActivate(context: ExecutionContext): Observable<boolean> {
    const request = context.switchToHttp().getRequest()

    const params = request.params

    const tokenPayload = request.user as TokenPayload
    if (!tokenPayload) return of(false)

    return from(this.queryUserUseCase.findById(tokenPayload.id)).pipe(
      map((user: User) => user.id === String(params.id))
    )
  }
}

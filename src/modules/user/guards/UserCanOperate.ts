import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable
} from '@nestjs/common'
import { TokenPayload } from 'domain/auth/types'
import { QueryUserUseCase, User } from 'domain/user'
import { from, Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class UserCanOperate implements CanActivate {
  constructor(
    @Inject('QueryUserUseCase')
    private readonly queryUserUseCase: QueryUserUseCase
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()

    const params = request.params

    const tokenPayload = request.user as TokenPayload
    if (!tokenPayload) return false

    return from(this.queryUserUseCase.findById(tokenPayload.id)).pipe(
      map((user: User) => {
        const hasPermission = user.id === String(params.id)
        return user && hasPermission
      })
    )
  }
}

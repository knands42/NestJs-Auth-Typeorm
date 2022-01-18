import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable
} from '@nestjs/common'
import { QueryUserUseCase, User } from 'domain/user'
import { from, Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class UserIsCanOperate implements CanActivate {
  constructor(
    @Inject('QueryUserUserCase')
    private readonly queryUserUserCase: QueryUserUseCase
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()

    const params = request.params
    const user: User = request.user

    return from(this.queryUserUserCase.findById(user.id)).pipe(
      map((user: User) => {
        const hasPermission = user.id === String(params.id)
        return user && hasPermission
      })
    )
  }
}

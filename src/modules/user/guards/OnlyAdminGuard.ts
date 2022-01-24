import { CanActivate, ExecutionContext } from '@nestjs/common'
import { TokenPayload } from 'domain/auth/types'
import { UserRoles } from 'domain/user'
import { Observable } from 'rxjs'

export class OnlyAdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()

    const tokenPayload = request.user as TokenPayload
    if (!tokenPayload) return false

    const { role }: TokenPayload = tokenPayload

    return role === UserRoles.ADMIN
  }
}

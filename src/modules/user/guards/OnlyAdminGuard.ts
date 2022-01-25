import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { TokenPayload } from 'domain/auth/types'
import { UserRoles } from 'domain/user'
import { Observable, of } from 'rxjs'

@Injectable()
export class OnlyAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): Observable<boolean> {
    const request = context.switchToHttp().getRequest()

    const tokenPayload = request.user as TokenPayload
    if (!tokenPayload) return of(false)

    const { role }: TokenPayload = tokenPayload

    return of(role === UserRoles.ADMIN)
  }
}

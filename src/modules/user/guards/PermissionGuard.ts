import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { TokenPayload } from 'domain/auth/types'
import { UserPermissions } from 'domain/user'
import { Observable, of } from 'rxjs'
import { PERMISSIONS_KEY } from '../decorators/PermissionsDecorator'

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): Observable<boolean> {
    const permissions = this.reflector.get<string[]>(
      PERMISSIONS_KEY,
      context.getHandler()
    )
    if (!permissions) return of(true)

    const request = context.switchToHttp().getRequest()
    const { permissions: userPermissions }: TokenPayload = request.user

    return of(
      permissions.every(permission =>
        userPermissions.includes(UserPermissions[permission])
      )
    )
  }
}

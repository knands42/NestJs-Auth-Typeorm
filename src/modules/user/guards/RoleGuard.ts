import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { TokenPayload } from 'domain/auth/types'
import { Observable, of } from 'rxjs'
import { ROLES_KEY } from '../decorators/RolesDecorator'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): Observable<boolean> {
    const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler())

    if (!roles) return of(true)

    const request = context.switchToHttp().getRequest()
    const { role: userRole }: TokenPayload = request.user

    return of(roles.some(role => userRole === role))
  }
}

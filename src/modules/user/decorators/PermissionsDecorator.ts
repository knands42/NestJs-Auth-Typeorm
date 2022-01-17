import { createParamDecorator, SetMetadata } from '@nestjs/common'

export const hasRoles = (...hasPermissions: string[]) =>
  SetMetadata('permissions', hasPermissions)

import { createParamDecorator, SetMetadata } from '@nestjs/common'

export const PERMISSIONS_KEY = 'permissions'
export const Permissions = (...hasPermissions: string[]) =>
  SetMetadata(PERMISSIONS_KEY, hasPermissions)

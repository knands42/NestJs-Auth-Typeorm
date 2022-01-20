import { SetMetadata } from '@nestjs/common'

export const ROLES_KEY = 'roles'
export const Roles = (...hasRoles: string[]) => SetMetadata(ROLES_KEY, hasRoles)

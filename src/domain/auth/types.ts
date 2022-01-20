import { UserPermissions, UserRoles } from 'domain/user'

export type TokenPayload = {
  id: string
  role: UserRoles
  permissions: UserPermissions[]
  username: string
}

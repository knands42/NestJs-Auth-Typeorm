import { getConnection } from 'typeorm'
import { randomUUID } from 'crypto'
import {
  User,
  UserPermissions,
  UserRoles
} from '../../src/domain/user/entities/User'

export class DatabaseTestUtils {
  static async populateDatabase(
    username: string = 'John',
    email: string = 'johndoe@gmail.com',
    admin: boolean = false
  ): Promise<User> {
    const user = new User()
    user.name = 'John Doe'
    user.username = username
    user.email = email
    user.avatarUrl = ''
    user.password = '12345678'
    user.createdAt = new Date()
    user.updatedAt = new Date()
    user.emailVerified = false
    user.id = randomUUID()
    user.permissions = [UserPermissions.READ]
    user.role = admin ? UserRoles.ADMIN : UserRoles.USER

    await getConnection().manager.save(user)

    return user
  }

  static async truncateTable() {
    const entities = getConnection().entityMetadatas

    for (const entity of entities) {
      const repository = getConnection().getRepository(entity.name)
      await repository.clear()
    }
  }
}

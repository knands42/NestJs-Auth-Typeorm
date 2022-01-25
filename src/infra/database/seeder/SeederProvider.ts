import { Inject, Injectable } from '@nestjs/common'
import { randomUUID } from 'crypto'
import { AuthUseCase } from 'domain/auth/port/in/AuthUseCase'
import { User, UserPermissions, UserRoles } from 'domain/user'
import { Connection } from 'typeorm'

@Injectable()
export class SeederProvider {
  constructor(
    private readonly connection: Connection,
    @Inject('AuthUseCase')
    private readonly authUseCase: AuthUseCase
  ) {}

  async seed() {
    const user = await this.generateUser(false)
    const adminUser = await this.generateUser(true)

    await Promise.all([
      this.connection.manager.save(user),
      this.connection.manager.save(adminUser)
    ])
  }

  private async generateUser(admin: boolean = false): Promise<User> {
    const user = new User()
    user.name = admin ? 'John Doe Admin' : 'John Doe'
    user.username = admin ? 'john doe admin' : 'john doe'
    user.email = admin ? 'johndoeadmin@email.com' : 'johndoe@email.com'
    user.avatarUrl = ''
    user.password = await this.authUseCase.hashPassword('12345678')
    user.createdAt = new Date()
    user.updatedAt = new Date()
    user.emailVerified = false
    user.id = randomUUID()
    user.permissions = [UserPermissions.READ]
    user.role = admin ? UserRoles.ADMIN : UserRoles.USER

    return user
  }
}

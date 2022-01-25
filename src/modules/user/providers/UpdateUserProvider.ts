import { ConflictException, Inject, Injectable } from '@nestjs/common'
import { AuthUseCase } from 'domain/auth/port/in/AuthUseCase'
import {
  UserPersistenceRepositoryPort,
  UserQueryRepositoryPort
} from 'domain/database'
import { User } from 'domain/user'
import { UpdateUserRequest } from 'domain/user/models/request/UpdateUserRequest'
import { UpdateUserUseCase } from 'domain/user/port/in/UpdateUserUseCase'

@Injectable()
export class UpdateUserProvider implements UpdateUserUseCase {
  constructor(
    @Inject('UserPersistenceRepositoryPort')
    private readonly userPersistenceRepositoryPort: UserPersistenceRepositoryPort,
    @Inject('UserQueryRepositoryPort')
    private readonly userQueryRepositoryPort: UserQueryRepositoryPort,
    @Inject('AuthUseCase')
    private readonly authUseCase: AuthUseCase
  ) {}

  async updateOne(id: string, payload: UpdateUserRequest): Promise<User> {
    if (Object.keys(payload).length === 0) return

    const user = await this.userQueryRepositoryPort.findById(id)

    user.username = await this.retrieveUsernameToUpdate(payload, user)
    user.email = await this.retrieveEmailToUpdate(payload, user) // TODO: send confirmation email
    user.name = payload.name ?? user.name

    if (payload.password)
      user.password = await this.authUseCase.hashPassword(payload.password)

    return this.userPersistenceRepositoryPort.update(id, user)
  }

  private async retrieveEmailToUpdate(
    payload: UpdateUserRequest,
    user: User
  ): Promise<string> {
    if (payload.email && payload.email !== user.email) {
      const emailExists =
        await this.userQueryRepositoryPort.findByEmailOrUserName({
          email: payload.email
        })

      if (emailExists) {
        throw new ConflictException('Email already taken!')
      }
    }

    return payload?.email ?? user.email
  }

  private async retrieveUsernameToUpdate(
    payload: UpdateUserRequest,
    user: User
  ): Promise<string> {
    if (payload.username && payload.username !== user.username) {
      const usernameExists =
        await this.userQueryRepositoryPort.findByEmailOrUserName({
          username: payload.username
        })

      if (usernameExists) {
        throw new ConflictException('Username already taken!')
      }
    }

    return payload?.username ?? user.username
  }
}

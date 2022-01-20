import { Inject, Injectable } from '@nestjs/common'
import { UserPersistenceRepositoryPort } from 'domain/database'
import { User } from 'domain/user'
import { UpdateUserRequest } from 'domain/user/models/request/UpdateUserRequest'
import { UpdateUserUseCase } from 'domain/user/port/in/UpdateUserUseCase'

@Injectable()
export class UpdateUserProvider implements UpdateUserUseCase {
  constructor(
    @Inject('UserPersistenceRepositoryPort')
    private readonly userPersistenceRepositoryPort: UserPersistenceRepositoryPort
  ) {}

  async updateOne(id: string, payload: UpdateUserRequest): Promise<User> {
    return this.userPersistenceRepositoryPort.update(id, payload)
  }
}

import { Inject, Injectable } from '@nestjs/common'
import {
  UserPersistenceRepositoryPort,
  UserQueryRepositoryPort
} from 'domain/database'
import { DeleteUserUseCase } from 'domain/user/port/in/DeleteUserUseCase'

@Injectable()
export class DeleteUserProvider implements DeleteUserUseCase {
  constructor(
    @Inject('UserPersistenceRepositoryPort')
    private readonly userPersistenceRepositoryPort: UserPersistenceRepositoryPort,
    @Inject('UserQueryRepositoryPort')
    private readonly userQueryRepositoryPort: UserQueryRepositoryPort
  ) {}

  async deleteOne(id: string): Promise<void> {
    await this.userQueryRepositoryPort.findById(id)
    await this.userPersistenceRepositoryPort.delete(id)
  }
}

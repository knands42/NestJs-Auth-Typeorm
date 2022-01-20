import { Inject, Injectable } from '@nestjs/common'
import { UserPersistenceRepositoryPort } from 'domain/database'
import { DeleteUserUseCase } from 'domain/user/port/in/DeleteUserUseCase'

@Injectable()
export class DeleteUserProvider implements DeleteUserUseCase {
  constructor(
    @Inject('UserPersistenceRepositoryPort')
    private readonly userPersistenceRepositoryPort: UserPersistenceRepositoryPort
  ) {}

  async deleteOne(id: string): Promise<void> {
    await this.userPersistenceRepositoryPort.delete(id)
  }
}

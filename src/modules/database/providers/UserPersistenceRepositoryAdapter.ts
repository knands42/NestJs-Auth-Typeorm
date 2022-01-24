import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserPersistenceRepositoryPort } from 'domain/database'
import { User } from 'domain/user'
import { UpdateUserRequest } from 'domain/user/models/request/UpdateUserRequest'
import { UserPersistenceRepository } from '../repository/UserPersistenceRepository'

@Injectable()
export class UserPersistenceRepositoryAdapter
  implements UserPersistenceRepositoryPort
{
  constructor(
    @InjectRepository(UserPersistenceRepository)
    private userPersistenceRepository: UserPersistenceRepository
  ) {}

  async persist(user: User): Promise<User> {
    return this.userPersistenceRepository.save(user)
  }

  async update(id: string, user: User): Promise<User> {
    await this.userPersistenceRepository.update(id, user)
    return user
  }

  async delete(id: string): Promise<void> {
    await this.userPersistenceRepository.delete(id)
  }
}

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserPersistenceRepositoryPort, User } from 'domain/index'
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
}

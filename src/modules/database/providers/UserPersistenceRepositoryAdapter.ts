import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserPersistenceRepositoryPort } from 'domain/database/port/out/UserPersistenceRepositoryPort'
import { User } from 'domain/user/entities/User'
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

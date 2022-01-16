import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserQueryRepositoryPort } from 'domain/database/port/out/UserQueryRepositoryPort'
import { User } from 'domain/user/entities/User'
import { UserQueryRepository } from '../repository/UserQueryRepository'

@Injectable()
export class UserQueryRepositoryAdapter implements UserQueryRepositoryPort {
  constructor(
    @InjectRepository(UserQueryRepository)
    private userQueryRepository: UserQueryRepository
  ) {}

  async getAll(): Promise<User[]> {
    return this.userQueryRepository.find()
  }
}

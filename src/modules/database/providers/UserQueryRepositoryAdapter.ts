import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserQueryRepositoryPort, User } from 'domain/index'
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

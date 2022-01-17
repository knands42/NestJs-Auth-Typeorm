import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserQueryRepositoryPort } from 'domain/database'
import { User } from 'domain/user'
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

  async getById(id: string): Promise<User> {
    return this.userQueryRepository.findOne(id)
  }
}

import { Inject, Injectable } from '@nestjs/common'
import { UserQueryRepositoryPort } from 'domain/database'
import { QueryUserUserCase, User } from 'domain/user'

@Injectable()
export class QueryUserService implements QueryUserUserCase {
  constructor(
    @Inject('UserQueryRepositoryPort')
    private readonly userQueryRepositoryPort: UserQueryRepositoryPort
  ) {}

  async findAll(): Promise<User[]> {
    return this.userQueryRepositoryPort.getAll()
  }

  async findById(id: string): Promise<User> {
    return this.userQueryRepositoryPort.getById(id)
  }
}

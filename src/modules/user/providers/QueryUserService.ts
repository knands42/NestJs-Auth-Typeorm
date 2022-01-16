import { Inject, Injectable } from '@nestjs/common'
import { QueryUserUserCase, User } from 'domain/index'
import { UserQueryRepositoryPort } from 'domain/database/port/out/UserQueryRepositoryPort'

@Injectable()
export class QueryUserService implements QueryUserUserCase {
  constructor(
    @Inject('UserQueryRepositoryPort')
    private readonly userQueryRepositoryPort: UserQueryRepositoryPort
  ) {}

  async findAll(): Promise<User[]> {
    return this.userQueryRepositoryPort.getAll()
  }
}

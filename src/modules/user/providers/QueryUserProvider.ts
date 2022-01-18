import { Inject, Injectable } from '@nestjs/common'
import { UserQueryRepositoryPort } from 'domain/database'
import { QueryUserUseCase, User } from 'domain/user'

@Injectable()
export class QueryUserProvider implements QueryUserUseCase {
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

  async findByUsernameOrEmail(username: string, email: string): Promise<User> {
    return this.userQueryRepositoryPort.findByEmailOrUserName(username, email)
  }
}

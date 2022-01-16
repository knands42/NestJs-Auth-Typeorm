import { Inject, Injectable } from '@nestjs/common'
import { UserQueryRepositoryPort } from 'domain/database/port/out/UserQueryRepositoryPort'
import { User } from '../../../domain/user/entities/User'
import { QueryUserUserCase } from '../../../domain/user/port/in/QueryUserUseCase'

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

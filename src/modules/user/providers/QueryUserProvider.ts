import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { UserQueryRepositoryPort } from 'domain/database'
import { QueryUserUseCase, User } from 'domain/user'
import { FindByUsernameOrEmail } from 'domain/user/models/types'

@Injectable()
export class QueryUserProvider implements QueryUserUseCase {
  constructor(
    @Inject('UserQueryRepositoryPort')
    private readonly userQueryRepositoryPort: UserQueryRepositoryPort
  ) {}

  async findAll(): Promise<User[]> {
    return this.userQueryRepositoryPort.findAll()
  }

  async findById(id: string): Promise<User> {
    const user = await this.userQueryRepositoryPort.findById(id)

    if (!user) throw new NotFoundException('User could not be found!')

    return user
  }

  async findByUsernameOrEmail(data: FindByUsernameOrEmail): Promise<User> {
    const user = this.userQueryRepositoryPort.findByEmailOrUserName(data)

    if (!user) throw new NotFoundException('User could not be found!')

    return user
  }
}

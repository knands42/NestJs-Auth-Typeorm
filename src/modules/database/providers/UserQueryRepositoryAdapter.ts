import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserQueryRepositoryPort } from 'domain/database'
import { User } from 'domain/user'
import { FindByUsernameOrEmail } from 'domain/user/models/types'
import { UserQueryRepository } from '../repository/UserQueryRepository'

@Injectable()
export class UserQueryRepositoryAdapter implements UserQueryRepositoryPort {
  constructor(
    @InjectRepository(UserQueryRepository)
    private userQueryRepository: UserQueryRepository
  ) {}

  async findAll(): Promise<User[]> {
    return this.userQueryRepository.find()
  }

  async findById(id: string): Promise<User> {
    return this.userQueryRepository.findOne(id)
  }

  async findByEmailOrUserName({
    email,
    username
  }: FindByUsernameOrEmail): Promise<User> {
    return this.userQueryRepository.findOne({
      where: [{ email }, { username }]
    })
  }
}

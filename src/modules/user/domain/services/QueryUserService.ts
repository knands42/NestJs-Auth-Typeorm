import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from 'modules/user/providers/database/repository/user.repository'
import { User } from '../entities/User'

@Injectable()
export class QueryUserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find()
  }
}

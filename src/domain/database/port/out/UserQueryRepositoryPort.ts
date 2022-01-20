import { User } from 'domain/user/entities/User'
import { FindByUsernameOrEmail } from 'domain/user/models/types'

export interface UserQueryRepositoryPort {
  findAll(): Promise<User[]>
  findById(id: string): Promise<User>
  findByEmailOrUserName(data: FindByUsernameOrEmail): Promise<User>
}

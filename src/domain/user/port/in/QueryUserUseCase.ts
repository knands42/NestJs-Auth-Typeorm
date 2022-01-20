import { FindByUsernameOrEmail } from 'domain/user/models/types'
import { User } from '../../entities/User'

export interface QueryUserUseCase {
  findAll(): Promise<User[]>
  findById(id: string): Promise<User>
  findByUsernameOrEmail(data: FindByUsernameOrEmail): Promise<User>
}

import { User } from '../../entities/User'

export interface QueryUserUseCase {
  findAll(): Promise<User[]>
  findById(id: string): Promise<User>
  findByUsernameOrEmail(username: string, email: string): Promise<User>
}

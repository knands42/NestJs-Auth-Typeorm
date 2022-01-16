import { User } from '../../entities/User'

export interface UserRepositoryPort {
  findAll(): Promise<User[]>
}

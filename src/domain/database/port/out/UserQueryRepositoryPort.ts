import { User } from 'domain/user/entities/User'

export interface UserQueryRepositoryPort {
  getAll(): Promise<User[]>
}

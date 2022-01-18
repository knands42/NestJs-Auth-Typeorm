import { User } from 'domain/user/entities/User'

export interface UserQueryRepositoryPort {
  getAll(): Promise<User[]>
  getById(id: string): Promise<User>
  findByEmailOrUserName(username: string, email: string): Promise<User>
}

import { User } from 'domain/user/entities/User'

export interface UserPersistenceRepositoryPort {
  persist(user: User): Promise<User>
  update(id: string, user: User): Promise<User>
  delete(id: string): Promise<void>
}

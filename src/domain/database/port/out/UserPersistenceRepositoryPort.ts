import { User } from 'domain/user/entities/User'

export interface UserPersistenceRepositoryPort {
  persist(user: User): Promise<User>
}

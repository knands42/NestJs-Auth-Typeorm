import { User } from 'domain/user/entities/User'
import { UpdateUserRequest } from 'domain/user/models/request/UpdateUserRequest'

export interface UserPersistenceRepositoryPort {
  persist(user: User): Promise<User>
  update(id: string, user: UpdateUserRequest): Promise<User>
}
